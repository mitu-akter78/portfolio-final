'use client'

import { useRef, useEffect } from 'react'
import type Lenis from 'lenis'
import ImageReveal from "./skills";
import "./skills.css";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lenis: InstanceType<typeof Lenis> | undefined
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const [{ default: LenisClass }, gsap, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      // Lenis smooth scroll
      lenis = new LenisClass({ duration: 1.2, smoothWheel: true })
      gsap.default.ticker.add((time: number) => lenis?.raf(time * 1000))
      gsap.default.ticker.lagSmoothing(0)
      gsap.default.registerPlugin(ScrollTrigger)

      ctx = gsap.default.context(() => {

        // — Entrance animation —
        gsap.default.timeline({ defaults: { ease: 'power3.out' } })
          .from(headingRef.current, { x: 80, autoAlpha: 0, duration: 1 })
          .from(cardsRef.current,  { y: 80, autoAlpha: 0, duration: 0.9 }, '-=0.5')

        // — Scroll-driven parallax on heading —
        // gsap.default.to(headingRef.current, {
        //   x: -80,
        //   ease: 'none',
        //   scrollTrigger: {
        //     trigger: sectionRef.current,
        //     start: 'top top',
        //     end: 'bottom top',
        //     scrub: 1.5,
        //   }
        // })

      }, sectionRef)
    }

    init()
    return () => { lenis?.destroy(); ctx?.revert() }
  }, [])

  return (
    <div ref={sectionRef} className="grid-wrapper">    
    <div className="grid-background" />  
    <div className="relative flex flex-col items-center justify-center h-[1000px] border-t-2 border-blue-950 overflow-visible">
      <div className="text-center mb-16">
        <h2 ref={headingRef} className="absolute top-5 right-5 text-6xl sm:text-6xl md:text-8xl text-top font-bold tracking-tight text-gray-900">
          My Skills
        </h2>
      </div>
      <div ref={cardsRef}>
        <ImageReveal
            leftImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=400"
            middleImage="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=400&h=400"
            rightImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=400"
        />
      </div>
    </div>
    </div>
  );
}
