'use client'

import { ImageCard } from '@/app/_components/client-only/card/dynamic'
import { useIntersect } from '@/app/_utils/hooks/intersect'
import { useRedirectScroll } from '@/app/_utils/hooks/scroll'
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

  const { startInnerScroll, } = useRedirectScroll({
    fromRef: sectionRef,
    toRef: certConatinerRef,
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
