'use client'

import { ImageCard } from '@/app/_components/client-only/card/dynamic'
import { ReactNode, useEffect, useRef, useState } from 'react'

export default function CertSection(props: { certData: string[] }) {
  const { certData } = props
  const sectionRef = useRef<HTMLDivElement>(null)
  const certConatinerRef = useRef<HTMLDivElement>(null)

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

  // const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  // useEffect(() => {
  //   const scrollHandler = () => {
  //     if (!sectionRef.current || !certConatinerRef.current) return;
  //     const cert = certConatinerRef.current
  //     const sect = sectionRef.current

  //     const scrollTop = cert.scrollTop
  //     const scrollHeight = cert.scrollHeight;

  //     console.log(scrollTop, window.innerHeight, scrollHeight)
  //     if (scrollTop + window.innerHeight >= scrollHeight) {
  //       setIsScrolledToBottom(true);
  //     }
  //   };
  //   document.getElementById('section3').addEventListener('scroll', scrollHandler);
  //   return () => document.getElementById('section3').removeEventListener('scroll', scrollHandler);
  // }, []);
  // sectionRef.current?.scrollIntoView

  // if section is visible

  return (
    <section ref={sectionRef} className="scene one flex">
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
