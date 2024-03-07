'use client'

import { ImageCard } from '@/app/_components/client-only/card/dynamic'
import { useIntersect } from '@/app/_utils/hooks/intersect'
import { ReactNode, useEffect, useRef, useState } from 'react'

export default function CertSection(props: { certData: string[] }) {
  const { certData } = props
  const colOne: ReactNode[] = []
  const colTwo: ReactNode[] = []
  for (let i = 0; i < certData.length; i++) {
    const c = certData[i]
    if (i % 2 === 0) {
      colOne.push(<ImageCard key={i + c} src={c} />)
    } else {
      colTwo.push(<ImageCard key={i + c} src={c} />)
    }
  }

  const getRef =()=> {
    const body = document.querySelector('body')
    if (!sectionRef.current || !certConatinerRef.current || !body) throw new Error('no ref')
    return {sect: sectionRef.current, cert: certConatinerRef.current, body}    
  }

  const isDoneCertScroll = () => {
    const {cert} = getRef()
    const scrollHeight = cert.scrollHeight
    const clientHeight = cert.clientHeight
    const scrollTop = cert.scrollTop
    const ratio = ((scrollTop + clientHeight) / scrollHeight) * 100
    if (ratio > 99) {
      console.log('done')
      return true
    }
    return false
  }

  const isCertScrollMode = () => {
    const {body} = getRef()
    return body.style.overflow === 'hidden'
  }

  const handleRedirectWheel = (to: HTMLElement, evt: WheelEvent) => {
      // evt.preventDefault()
      // to.dispatchEvent(new WheelEvent('wheel', evt))
      to.scrollBy({ top: evt.deltaY * 1.5, behavior: 'smooth' })
  }
  const startRedirectWheel = (from: HTMLElement, to: HTMLElement) => {
    from.style.overflow = 'hidden'
    from.addEventListener('wheel', (evt) => handleRedirectWheel(to, evt))
  }
  const stopRedirectWheel = (from: HTMLElement, to: HTMLElement) => {
    from.style.overflow = 'auto'
    from.removeEventListener('wheel', (evt) => handleRedirectWheel(to, evt))
  }

  const startInnerScroll = () => {
    const {sect, cert, body} = getRef()
    if (isCertScrollMode()) return // scroll is already in progress
    else if (isDoneCertScroll()) return console.log('scroll is already done')

    sect.scrollIntoView({ behavior: 'smooth' })
    cert.scrollTo({ top: 0, behavior: 'smooth' })
    startRedirectWheel(body, cert)
  }

  const endInnerScroll = (evt: Event) => {
    if (!isDoneCertScroll()) return console.error("scroll is not done")
    const {body, cert} = getRef()
    stopRedirectWheel(body, cert)
  }

  const sectionRef = useIntersect(
    (entry) => {
      if (!entry.isIntersecting) return
      if (entry.intersectionRatio === 1) {
        startInnerScroll()
      }
    },
    { root: null, rootMargin: '0px', threshold: [0, 1] }
  )
  const certConatinerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!certConatinerRef.current) return
    const cert = certConatinerRef.current
    const handleScroll = (evt: Event) => {
      if (isDoneCertScroll()) endInnerScroll(evt)
    }
    cert.addEventListener('scroll', handleScroll)
    return () => cert.removeEventListener('scroll',handleScroll)
  })




  return (
    <section ref={sectionRef} className="scene two flex">
      <header>
        <h1>Lorem ipsum dolor sit amet.</h1> Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Totam suscipit sint ab beatae nihi
      </header>
      (
      <div
        ref={certConatinerRef}
        className="grid grid-cols-2"
        style={{
          width: '50vw',
          overflow: 'auto',
        }}
      >
        <GridCol>{colOne}</GridCol>
        <GridCol>{colTwo}</GridCol>
      </div>
      )
    </section>
  )
}

function GridCol({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-2">{children}</div>
}
