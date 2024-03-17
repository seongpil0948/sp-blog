'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import gsap from 'gsap'
import House from '../../_logic/House'
import Player from '../../_logic/Player'
import StateVillage from '../../_logic/Village'

export default function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const s = new StateVillage({ canvasRef })
    if (!s.isInitialized) return

    const renderer = getRenderer(s.canvas)
    const scene = new THREE.Scene()
    const cameraPosition = new THREE.Vector3(1, 5, 5)
    const camera = getCamera.orthographic(cameraPosition)
    scene.add(camera)

    // Light
    const ambientLight = new THREE.AmbientLight('white', 1)
    scene.add(ambientLight)
    const directionalLight = getDirectionalLight()
    scene.add(directionalLight)

    // Mesh
    const meshes: THREE.Mesh[] = []
    const floorMesh = meshFactory.floor()
    scene.add(floorMesh)
    meshes.push(floorMesh)
    const pointerMesh = meshFactory.pointer()
    scene.add(pointerMesh)
    const spotMesh = meshFactory.spot()
    scene.add(spotMesh)

    const gltfLoader = new GLTFLoader()
    const house = new House({
      gltfLoader,
      scene,
      modelSrc: '/glb/house.glb',
      x: 5,
      y: -1.3,
      z: 2,
    })
    const player = new Player({
      scene,
      meshes,
      gltfLoader,
      // modelSrc: '/glb/ilbuni.glb',
      modelSrc: '/glb/ilbuni.glb',
    })

    const raycaster = new THREE.Raycaster()
    let destinationPoint = new THREE.Vector3()
    let angle = 0

    // 그리기
    const clock = new THREE.Clock()

    function draw() {
      const delta = clock.getDelta()

      if (player.mixer) player.mixer.update(delta)

      if (player.isInitialized) {
        camera.lookAt(player.modelMesh.position)
        if (s.isPressed) {
          raycasting()
        }

        if (player.moving) {
          // 걸어가는 상태
          angle = player.getAngle(destinationPoint)
          player.moveTo(angle, cameraPosition, camera)

          if (player.isCloseTo(destinationPoint)) {
            player.moving = false
            console.log('멈춤')
          }

          if (player.isOnTheSpot(spotMesh.position)) {
            if (!house.visible) {
              console.log('나와')
              house.visible = true
              spotMesh.material.color.set('seagreen')
              gsap.to(house.modelMesh.position, {
                duration: 1,
                y: 1,
                ease: 'Bounce.easeOut',
              })
              gsap.to(camera.position, {
                duration: 1,
                y: 3,
              })
            }
          } else if (house.visible) {
            console.log('들어가')
            house.visible = false
            spotMesh.material.color.set('yellow')
            gsap.to(house.modelMesh.position, {
              duration: 0.5,
              y: -1.3,
            })
            gsap.to(camera.position, {
              duration: 1,
              y: 5,
            })
          }
        } else {
          // 서 있는 상태
          if (player.actions) {
            player.actions[1].stop()
            player.actions[0].play()
          }
        }
      }

      renderer.render(scene, camera)
      renderer.setAnimationLoop(draw)
    }

    function checkIntersects() {
      // raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(meshes)
      for (const item of intersects) {
        if (item.object.name === 'floor' && player.modelMesh) {
          destinationPoint.x = item.point.x
          destinationPoint.y = 0.3
          destinationPoint.z = item.point.z
          player.modelMesh.lookAt(destinationPoint)
          // console.log(item.point)
          player.moving = true
          pointerMesh.position.x = destinationPoint.x
          pointerMesh.position.z = destinationPoint.z
        }
        break
      }
    }

    function setSize() {
      camera.left = -(window.innerWidth / window.innerHeight)
      camera.right = window.innerWidth / window.innerHeight
      camera.top = 1
      camera.bottom = -1

      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    }
    // 마우스 좌표를 three.js에 맞게 변환
    function calculateMousePosition(e: MouseEvent | Touch) {
      s.mouse = new THREE.Vector2(
        (e.clientX / s.canvas.clientWidth) * 2 - 1,
        -((e.clientY / s.canvas.clientHeight) * 2 - 1),
      )
    }

    // 변환된 마우스 좌표를 이용해 래이캐스팅
    function raycasting() {
      raycaster.setFromCamera(s.mouse, camera)
      checkIntersects()
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e)
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        destinationPoint.z = player.modelMesh.position.z - 5
        player.moving = true
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        destinationPoint.z = player.modelMesh.position.z + 5
        player.moving = true
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        destinationPoint.x = player.modelMesh.position.x - 5
        player.moving = true
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        destinationPoint.x = player.modelMesh.position.x + 5
        player.moving = true
      }

      // space 키일 경우 카메라를 perspective로 변경
      if (e.key === ' ') {
        console.log('space, go to perspective')
      }

      if (player.moving) {
        player.modelMesh.lookAt(destinationPoint)
        pointerMesh.position.x = destinationPoint.x
        pointerMesh.position.z = destinationPoint.z
      }
    }
    const handleMouseDown = (e: MouseEvent) => {
      s.isPressed = true
      calculateMousePosition(e)
    }
    const handleMouseUp = () => {
      s.isPressed = false
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (s.isPressed) {
        calculateMousePosition(e)
      }
    }
    const handleTouchStart = (e: TouchEvent) => {
      s.isPressed = true
      calculateMousePosition(e.touches[0])
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (s.isPressed) {
        calculateMousePosition(e.touches[0])
      }
    }
    const handleTouchEnd = () => {
      s.isPressed = false
    }
    window.addEventListener('resize', setSize)
    s.canvas.addEventListener('mousedown', handleMouseDown)
    s.canvas.addEventListener('mouseup', handleMouseUp)
    s.canvas.addEventListener('mousemove', handleMouseMove)
    s.canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    s.canvas.addEventListener('touchend', handleTouchEnd)
    s.canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    draw()
    return () => {
      window.removeEventListener('resize', setSize)
      s.canvas.removeEventListener('mousedown', handleMouseDown)
      s.canvas.removeEventListener('mouseup', handleMouseUp)
      s.canvas.removeEventListener('mousemove', handleMouseMove)
      s.canvas.removeEventListener('touchstart', handleTouchStart)
      s.canvas.removeEventListener('touchend', handleTouchEnd)
      s.canvas.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    ></canvas>
  )
}

function getDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight('white', 0.5)
  const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1)
  directionalLight.position.x = directionalLightOriginPosition.x
  directionalLight.position.y = directionalLightOriginPosition.y
  directionalLight.position.z = directionalLightOriginPosition.z
  directionalLight.castShadow = true

  // mapSize 세팅으로 그림자 퀄리티 설정
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  // 그림자 범위
  directionalLight.shadow.camera.left = -100
  directionalLight.shadow.camera.right = 100
  directionalLight.shadow.camera.top = 100
  directionalLight.shadow.camera.bottom = -100
  directionalLight.shadow.camera.near = -100
  directionalLight.shadow.camera.far = 100
  return directionalLight
}

const getCamera = {
  perspective: () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    return camera
  },
  orthographic: (postion: THREE.Vector3) => {
    const camera = new THREE.OrthographicCamera(
      -(window.innerWidth / window.innerHeight), // left
      window.innerWidth / window.innerHeight, // right,
      1, // top
      -1, // bottom
      -1000,
      1000,
    )
    camera.position.set(...postion.toArray())
    camera.zoom = 0.2
    camera.updateProjectionMatrix()
    return camera
  },
}

function getRenderer(canvas: HTMLCanvasElement, isShadow = true) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  if (isShadow) {
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }
  return renderer
}

const meshFactory = {
  floor: () => {
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({
        map: getGridImg(),
      }),
    )
    floorMesh.name = 'floor'
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.receiveShadow = true
    return floorMesh
  },
  pointer: () => {
    const pointerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 'crimson',
        transparent: true,
        opacity: 0.5,
      }),
    )
    pointerMesh.rotation.x = -Math.PI / 2
    pointerMesh.position.y = 0.01
    pointerMesh.receiveShadow = true
    return pointerMesh
  },
  spot: () => {
    const spotMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshStandardMaterial({
        color: 'yellow',
        transparent: true,
        opacity: 0.5,
      }),
    )
    spotMesh.position.set(5, 0.005, 5)
    spotMesh.rotation.x = -Math.PI / 2
    spotMesh.receiveShadow = true
    return spotMesh
  },
}

const getGridImg = () => {
  const textureLoader = new THREE.TextureLoader()
  const floorTexture = textureLoader.load('/image/grid.png')
  floorTexture.wrapS = THREE.RepeatWrapping
  floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.x = 10
  floorTexture.repeat.y = 10
  return floorTexture
}
