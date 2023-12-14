'use client'
import { useEffect, useRef } from 'react'
import { useFireWork } from './hook'

export default function FireWork() {
  const { play, stop } = useFireWork({ parentSelector: '.firework-container' })
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    stop()
    play()

    intervalRef.current = setInterval(() => {
      const elList = document.querySelectorAll('.firework')
      elList.forEach((e) => {
        e.remove()
      })
    }, 5000)

    return () => {
      stop()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [play, stop])

  // eslint-disable-next-line react/no-unescaped-entities
  return <div className="flex-center-col">Let's celebrate!</div>
}
