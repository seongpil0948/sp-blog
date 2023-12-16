'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { App } from '../../_classes/app'

interface Props {
  className?: string
}

export const WaveView = (props: Props) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const app = new App(ref.current)
    app.animate()

    return () => {
      window.removeEventListener('resize', app.resize.bind(app), false)
      app.canvasRef.remove()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        width: '50vw',
        height: '50vh',
      }}
      {...props}
    />
  )
}
