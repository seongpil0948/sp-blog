'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import StateVillage from '../../_logic/Village'
import BridgeEnterModal from './BridgeEnterModal'
export default function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bridgeEnterRef = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const s = new StateVillage({ canvasRef, cameraMode: 'orthographic' })
    const renderer = getRenderer(s.canvas)
    const raycaster = new THREE.Raycaster()

    // 그리기
    const clock = new THREE.Clock()
    function _draw() {
      const delta = clock.getDelta()
      if (s.player.mixer) s.player.mixer.update(delta)
      if (s.isInitialized) {
        s.camera.orthographic.lookAt(s.player.modelMesh.position)

        if (s.cameraMode === 'perspective') {
          s.controls.update()
        } else {
          if (s.isPressed) {
            raycasting()
          }
        }
        if (s.player.moving) {
          s.updatePosition()
          s.camera.perspective.lookAt(s.player.modelMesh.position)
          if (s.player.isCloseTo(s.destinationPoint)) {
            s.player.moving = false
          }

          if (s.player.isOnTheSpot(s.spotMesh.position)) {
            if (!s.house.visible) {
              s.house.visible = true
              s.spotMesh.material.color.set('seagreen')
              gsap.to(s.house.modelMesh.position, {
                duration: 1,
                y: 1,
                ease: 'Bounce.easeOut',
              })
              gsap.to(s.camera.orthographic.position, {
                duration: 1,
                y: 3,
              })
              console.log(bridgeEnterRef.current)
              if (bridgeEnterRef.current) {
                bridgeEnterRef.current.open()
              }
            }
          } else if (s.house.visible) {
            s.house.visible = false
            s.spotMesh.material.color.set('yellow')
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
      renderer.render(s.scene, s.cameraCurrent)
      renderer.setAnimationLoop(draw)
    }
    function draw() {
      if (s.initializable) {
        s.initialize().then(_draw)
      } else {
        _draw()
      }
    }

    function checkIntersects() {
      const intersects = raycaster.intersectObjects(s.meshes)
      if (!s.isInitialized) return
      for (const item of intersects) {
        if (item.object.name === 'floor') {
          s.destinationPoint = new THREE.Vector3(
            item.point.x,
            0.3,
            item.point.z,
          )
        }
        break
      }
    }

    function setSize() {
      const aspect = window.innerWidth / window.innerHeight
      s.camera.orthographic.left = -aspect
      s.camera.orthographic.right = aspect
      s.camera.orthographic.top = 1
      s.camera.orthographic.bottom = -1
      s.camera.orthographic.updateProjectionMatrix()

      s.camera.perspective.aspect = aspect
      s.camera.perspective.updateProjectionMatrix()

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
      let d = s.destinationPoint.clone()
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        d.z = s.player.modelMesh.position.z - 5
        s.player.moving = true
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        d.z = s.player.modelMesh.position.z + 5
        s.player.moving = true
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        d.x = s.player.modelMesh.position.x - 5
        s.player.moving = true
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        d.x = s.player.modelMesh.position.x + 5
        s.player.moving = true
      }

      // space 키일 경우 카메라를 perspective로 변경
      if (e.key === ' ') {
        s.cameraMode =
          s.cameraMode === 'orthographic' ? 'perspective' : 'orthographic'
      }

      if (s.player.moving) {
        s.destinationPoint = d
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
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      />
      <BridgeEnterModal ref={bridgeEnterRef} />
    </>
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
