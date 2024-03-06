'use client'

import { ImageCard } from '@/app/_components/client-only/card/dynamic'
import { useIntersect } from '@/app/_utils/hooks/intersect'
import { ReactNode, useEffect, useRef, useState } from 'react'

export default function CertSection(props: { certData: string[] }) {
  const { certData } = props

  const isDoneCertScroll = () => {
    if (!certConatinerRef.current)return 
    const cert = certConatinerRef.current
    const scrollHeight = cert.scrollHeight
    const clientHeight = cert.clientHeight
    const scrollTop = cert.scrollTop
    console.log(scrollTop, clientHeight, scrollHeight)
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log('done')
      return true
    }
    return false
  }

  const isCertScrollMode = () => {
    const body = document.querySelector('body')
    if (!body) return false
    console.log('body.style.overflow in isCertScrollMode : ', body.style.overflow)
    return body.style.overflow === 'hidden'
  }

  const startInnerScroll = () => {
    console.log('startInnerScroll')
    const body = document.querySelector('body')
    if (!sectionRef.current || !certConatinerRef.current || !body) return
    else if (isCertScrollMode()) return console.error('scroll is already in progress')
    else if (isDoneCertScroll()) return console.log('scroll is already done')

    // only available scroll in certConatinerRef
    body.style.overflow = 'hidden'
    sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    certConatinerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const endInnerScroll = () => {
    console.log('endInnerScroll')
    const body = document.querySelector('body')
    if (!body) return
    else if (!isDoneCertScroll()) return console.error("scroll is not done")
    body.style.overflow = 'auto'
  }

  const sectionRef = useIntersect(
    (entry) => {
      console.log('entry : ', entry)
      if (entry.isIntersecting && entry.intersectionRatio > 0.9) {
        console.log('section is visible')
      }
      if (entry.intersectionRatio > 0.5) {
        console.log('section is visible 50%')
      }

      if (entry.intersectionRatio > 0.9) {
        console.log('section is visible 90%')
      }

      if (entry.intersectionRatio === 1) {
        console.log('section is visible 100%')
      }
    },
    {
      root: null,
      rootMargin: '0px',
      // // 타겟의 가시성이 0%, 30%, 100%일 때 모두 옵저버가 실행됩니다.
      // threshold: [0, 0.3, 1]
      threshold: [0, 1]
      
    }
  )
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
