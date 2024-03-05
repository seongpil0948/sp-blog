'use client'
import { fileNameFromPath } from '@/app/_utils'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { useEffect, useRef } from 'react'

// refer: https://poke-holo.simey.me/
// refer: https://www.youtube.com/watch?v=YDCCauu4lIk&t=67s
export function ImageCard({ src }: { src: string }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const imgRef = imageRef.current
    const contRef = containerRef.current
    const overRef = overlayRef.current
    if (!imgRef || !contRef || !overRef) return

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.offsetX
      const y = event.offsetY
      const rotateY = -(x / 5) + 40
      const rotateX = y / 30 - 20

      const bgPosition = `${x / 5 + y / 5}%`
      const opacity = x / 200
      overRef.style.backgroundPosition = bgPosition
      overRef.style.filter = `opacity(${opacity}) brightness(1.2)`
      contRef.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseOut = () => {
      overRef.style.filter = 'opacity(0)'
      contRef.style.transform = 'perspective(350px) rotateX(0deg) rotateY(0deg)'
    }

    contRef.addEventListener('mousemove', handleMouseMove)
    contRef.addEventListener('mouseout', handleMouseOut)

    return () => {
      contRef.removeEventListener('mousemove', handleMouseMove)
      contRef.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className="m-2 cursor-pointer"
        style={{
          // aspectRatio: '1/1.5',
          width: '200px',
          transition: 'all 0.1s',
          position: 'relative',
        }}
      >
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255 ,0.6) 50%, transparent 54%)',
            filter: 'brightness(1.1) opacity(0.8)',
            mixBlendMode: 'color-dodge',
            backgroundSize: '150% 150%',
            backgroundPosition: '100%',
            transition: 'all 0.1s',
          }}
        />
        <Image onClick={onOpen} ref={imageRef} src={src} alt={src} />
      </div>
      <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {fileNameFromPath(src)}
              </ModalHeader>
              <ModalBody>
                <div
                  onClick={onClose}
                  className="flex h-full flex-col items-center justify-center align-middle"
                >
                  <Image src={src} alt={src} className=" m-auto " />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
