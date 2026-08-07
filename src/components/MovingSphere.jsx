'use client';

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SphereBg from './SphereBg'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['#hero', '#experience', '#skills', '#projects', '#about', '#contact']

const SECTION_STATES = [
  { scale: 1.3, x: 0, y: 0 },
  { scale: 1.45, x: 0, y: -4 },
  { scale: 1.6, x: 0, y: -8 },
  { scale: 1.75, x: 0, y: -2 },
  { scale: 1.55, x: 0, y: 4 },
  { scale: 1.3, x: 0, y: 10 },
]

export default function MovingSphere({ side = 'right' }) {
  const containerRef = useRef(null)
  const mirror = side === 'left' ? -1 : 1

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = SECTION_IDS
      .map(id => document.querySelector(id))
      .filter(Boolean)

    if (sections.length < 2) return

    gsap.set(container, {
      scale: SECTION_STATES[0].scale,
      x: `${SECTION_STATES[0].x * mirror}vw`,
      y: `${SECTION_STATES[0].y}vh`,
    })

    const totalScroll = document.documentElement.scrollHeight - window.innerHeight
    const milestones = sections.map(el => el.offsetTop)
    const lastEnd = milestones[milestones.length - 1] + sections[sections.length - 1].offsetHeight

    const rawDurations = milestones.map((top, i) => {
      if (i === 0) return 0
      const start = milestones[i - 1]
      const end = i < milestones.length - 1 ? milestones[i] : lastEnd
      return (end - start) / totalScroll
    })

    const maxDur = Math.max(...rawDurations)
    const minDur = Math.min(...rawDurations.filter(d => d > 0))
    const durations = rawDurations.map((d, i) =>
      i === 0 ? 0 : (d - minDur) / (maxDur - minDur) * (0.3 - 0.08) + 0.08
    )
    durations[durations.length - 1] = 0.38

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        ease: 'none',
      })

      for (let i = 1; i < sections.length; i++) {
        const state = SECTION_STATES[i]
        tl.to(container, {
          scale: state.scale,
          x: `${state.x * mirror}vw`,
          y: `${state.y}vh`,
          duration: durations[i],
          ease: 'none',
        })
      }
    })

    return () => ctx.revert()
  }, [mirror])

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] pointer-events-none z-[5] will-change-transform"
    >
      <SphereBg opacity={1} radiusRatio={0.5} />
    </div>
  )
}
