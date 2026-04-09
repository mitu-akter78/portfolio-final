"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Outfit } from "next/font/google";
import Card from "./card"
import { CARDS, SPREAD } from "./cards.data"
import "./card.css"
import { TextScrollReveal } from "../ui/TextScrollReveal";

gsap.registerPlugin(ScrollTrigger)

const TOTAL_SCROLL_MULTIPLIER = 3.5

export default function ScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  /* ── Lenis smooth scroll ──────────────────────────────── */
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  /* ── GSAP scroll animations ───────────────────────────── */
  useGSAP(
    () => {
      const cards = cardRefs.current
      const total = () => window.innerHeight * TOTAL_SCROLL_MULTIPLIER
      const spread = () => window.innerHeight * 1.1

      // Pin the cards section
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: () => `+=${total()}`,
        pin: true,
        pinSpacing: true,
      })

      // Phase 1 — fan into arc
      cards.forEach((card, i) => {
        const s = SPREAD[i]
        gsap.fromTo(
          card,
          { x: 0, y: 0, rotation: 0 },
          {
            x: s.x,
            y: s.y,
            rotation: s.rot,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top top",
              end: () => `+=${spread()}`,
              scrub: 1.2,
            },
          }
        )
      })

      // Phase 2 — flip each card staggered
      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>(".sc-card-inner")
        const stagger = i * 0.055
        const t0 = 0.30 + stagger
        const t1 = Math.min(0.68 + stagger, 0.94)
        const targetRot = SPREAD[i].rot

        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: "top top",
          end: () => `+=${total()}`,
          scrub: 1.8,
          onUpdate(self) {
            const p = self.progress
            if (p < t0 || p > t1) return
            const raw = (p - t0) / (t1 - t0)
            // ease-in-out cubic
            const e = raw < 0.5
              ? 4 * raw * raw * raw
              : 1 - Math.pow(-2 * raw + 2, 3) / 2

            if (!inner) return
            gsap.set(inner, { rotateY: 180 * e })
          },
        })
      })
    },
    { scope: containerRef }
  )

  /* ── Cleanup on unmount ───────────────────────────────── */
  useEffect(() => {
    const handleResize = () => {
      clearTimeout((handleResize as any)._t)
        ; (handleResize as any)._t = setTimeout(() => ScrollTrigger.refresh(), 250)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="sc-root" ref={containerRef} id="skills">
      
      <div className="skills-grid-background" />
      
      <div className="flex flex-col items-center justify-center px-6">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="sc-hero">
          <TextScrollReveal
            as="h1"
            animation="bottom"
            splitBy="chars"
            triggerStart="top 95%"
            triggerEnd="bottom 30%"
            className="sc-hero-text text-white flex flex-col items-start justify-start text-left"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            my skills
          </TextScrollReveal>
        </section>

        {/* ── Cards ─────────────────────────────────────────── */}
        <section className="sc-cards" ref={sectionRef}>
          {CARDS.map((card, i) => (
            <Card
              key={card.num}
              data={card}
              zIndex={CARDS.length - i}
              style={{ '--accent': card.accent, '--bg': card.bg } as any}
              ref={(el) => {
                if (el) cardRefs.current[i] = el
              }}
            />
          ))}
        </section>
      </div>
    </div>
  )
}