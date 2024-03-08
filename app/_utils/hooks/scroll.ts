'use client'
import { useEffect } from "react"


export function useRedirectScroll(props: RedirectScrollProps) {
  const { fromRef, toRef } = props

  useEffect(() => {
    const { to } = getRef()
    const handleScroll = (evt: Event) => {
      if (isDoneInnerScroll()) endInnerScroll(evt)
    }
    to.addEventListener('scroll', handleScroll)
    return () => to.removeEventListener('scroll', handleScroll)
  })

  const getRef = () => {
    if (!fromRef.current || !toRef.current) throw new Error('no ref')
    const body = getBodyRef()
    return { from: fromRef.current, to: toRef.current, body }
  }

  const isFromScrollMode = () => getBodyRef().style.overflow === 'hidden'

  const isDoneInnerScroll = () => {
    const { to } = getRef()
    const scrollHeight = to.scrollHeight
    const clientHeight = to.clientHeight
    const scrollTop = to.scrollTop
    const ratio = ((scrollTop + clientHeight) / scrollHeight) * 100
    if (ratio > 99) {
      return true
    }
    return false
  }

  const startInnerScroll = () => {
    const { from, to, body } = getRef()
    if (isFromScrollMode()) return // scroll is already in progress
    else if (isDoneInnerScroll()) return console.log('scroll is already done')

    from.scrollIntoView({ behavior: 'smooth' })
    to.scrollTo({ top: 0, behavior: 'smooth' })
    startRedirectWheel(body, to)
  }

  const endInnerScroll = (evt: Event) => {
    if (!isDoneInnerScroll()) return console.error("scroll is not done")
    const { body, to } = getRef()
    stopRedirectWheel(body, to)
  }


  const handleRedirectWheel = (to: HTMLElement, evt: WheelEvent) => {
    // evt.preventDefault()
    // to.dispatchEvent(new WheelEvent('wheel', evt))
    to.scrollBy({ top: evt.deltaY * 3, behavior: 'smooth' })
  }
  const startRedirectWheel = (from: HTMLElement, to: HTMLElement) => {
    from.style.overflow = 'hidden'
    from.addEventListener('wheel', (evt) => handleRedirectWheel(to, evt))
  }
  const stopRedirectWheel = (from: HTMLElement, to: HTMLElement) => {
    from.style.overflow = 'auto'
    from.removeEventListener('wheel', (evt) => handleRedirectWheel(to, evt))
  }
  return {
    startRedirectWheel,
    stopRedirectWheel,
    isFromScrollMode,
    isDoneInnerScroll,
    startInnerScroll,
    endInnerScroll

  }
}

const getBodyRef = () => {
  const body = document.querySelector('body')
  if (!body) throw new Error('no ref')
  return body
}

export interface RedirectScrollProps {
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
}