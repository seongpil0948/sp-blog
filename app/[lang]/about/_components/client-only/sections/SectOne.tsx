'use client'

import { useScroll } from 'framer-motion'
import { use, useEffect, useRef } from 'react'

export default function SectionOne() {
  // body overflow hidden when initial
  // listen scrolldown event and scroll to next section
  // body overflow auto when done scroll to next section
  const ref = useRef<HTMLDivElement>(null)

  // const {} = useScroll()

  const handleScroll = (evt: Event) => {
    const next = document.querySelector<HTMLDivElement>('section.scene.two')
    if (!next || !ref.current) return console.log('next or ref.current is null')
    console.log('in wheel event', ref.current, evt)

    setTimeout(() => {
      next.scrollIntoView({ behavior: 'smooth', block: 'end' })
      document.body.style.overflow = 'auto'
      window.removeEventListener('wheel', handleScroll)
    }, 300)
    console.log(
      'scrollHeight : ',
      ref.current.scrollHeight,
      'scrollTop : ',
      ref.current.scrollTop,
      'clientHeight : ',
      ref.current.clientHeight,
    )
  }

  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
    document.body.style.overflow = 'hidden'
    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  })

  return (
    <section ref={ref} className="scene one">
      <header>
        <h1>Lorem ipsum dolor sit amet.</h1> Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Totam suscipit sint ab beatae nihi
      </header>
    </section>
  )
}
