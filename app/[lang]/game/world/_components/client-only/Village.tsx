'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import StateVillage from '../../_logic/Village'

export default function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const s = new StateVillage({ canvasRef, cameraMode: 'orthographic' })
    const renderer = getRenderer(s.canvas)
    // cameraPerspective.position.x = s.player.modelMesh?.position.x
    // cameraPerspective.position.z = s.player.modelMesh?.position.z + 5
    s.scene.add(s.camera.orthographic)

    s.scene.add(s.light.ambient)
    s.scene.add(s.light.directional)

    // Mesh

    const floorMesh = meshFactory.floor()
    s.scene.add(floorMesh)
    s.meshes.push(floorMesh)
    const pointerMesh = meshFactory.pointer()
    s.scene.add(pointerMesh)
    const spotMesh = meshFactory.spot()
    s.scene.add(spotMesh)

    const raycaster = new THREE.Raycaster()
    let destinationPoint = new THREE.Vector3()
    let angle = 0

    // 그리기
    const clock = new THREE.Clock()

    function draw() {
      const delta = clock.getDelta()

      if (s.player.mixer) s.player.mixer.update(delta)

      if (s.player.isInitialized) {
        s.camera.orthographic.lookAt(s.player.modelMesh.position)
        if (s.isPressed) {
          raycasting()
        }

        if (s.player.moving) {
          // 걸어가는 상태
          angle = s.player.getAngle(destinationPoint)
          s.player.moveTo(angle, s.cameraPosition, s.camera.orthographic)

          if (s.player.isCloseTo(destinationPoint)) {
            s.player.moving = false
          }

          if (s.player.isOnTheSpot(spotMesh.position)) {
            if (!s.house.visible) {
              s.house.visible = true
              spotMesh.material.color.set('seagreen')
              gsap.to(s.house.modelMesh.position, {
                duration: 1,
                y: 1,
                ease: 'Bounce.easeOut',
              })
              gsap.to(s.camera.orthographic.position, {
                duration: 1,
                y: 3,
              })
            }
          } else if (s.house.visible) {
            s.house.visible = false
            spotMesh.material.color.set('yellow')
            gsap.to(s.house.modelMesh.position, {
              duration: 0.5,
              y: -1.3,
            })
            gsap.to(s.camera.orthographic.position, {
              duration: 1,
              y: 5,
            })
          }
        } else {
          // 서 있는 상태
          if (s.player.actions) {
            s.player.actions[1].stop()
            s.player.actions[0].play()
          }
        }
      }
      renderer.render(s.scene, s.camera.orthographic)
      renderer.setAnimationLoop(draw)
    }

    function checkIntersects() {
      // raycaster.setFromCamera(mouse, s.camera);

      const intersects = raycaster.intersectObjects(s.meshes)
      for (const item of intersects) {
        if (item.object.name === 'floor' && s.player.modelMesh) {
          destinationPoint.x = item.point.x
          destinationPoint.y = 0.3
          destinationPoint.z = item.point.z
          s.player.modelMesh.lookAt(destinationPoint)
          // console.log(item.point)
          s.player.moving = true
          pointerMesh.position.x = destinationPoint.x
          pointerMesh.position.z = destinationPoint.z
        }
        break
      }
    }

    function setSize() {
      s.camera.orthographic.left = -(window.innerWidth / window.innerHeight)
      s.camera.orthographic.right = window.innerWidth / window.innerHeight
      s.camera.orthographic.top = 1
      s.camera.orthographic.bottom = -1

      s.camera.orthographic.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(s.scene, s.cameraCurrent)
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
      raycaster.setFromCamera(s.mouse, s.cameraCurrent)
      checkIntersects()
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        destinationPoint.z = s.player.modelMesh.position.z - 5
        s.player.moving = true
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        destinationPoint.z = s.player.modelMesh.position.z + 5
        s.player.moving = true
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        destinationPoint.x = s.player.modelMesh.position.x - 5
        s.player.moving = true
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        destinationPoint.x = s.player.modelMesh.position.x + 5
        s.player.moving = true
      }

      // space 키일 경우 카메라를 perspective로 변경
      if (e.key === ' ') {
        console.log('space, go to perspective')
      }

      if (s.player.moving) {
        s.player.modelMesh.lookAt(destinationPoint)
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
