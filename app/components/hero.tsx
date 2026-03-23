"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './hero.css'

const SENSITIVITY = 0.3
const LERP = 0.04
const STAGGER_DELAY = 8

interface Layer {
  el: Element
  delay: number
  current: { x: number; y: number }
}

interface TrailPoint {
  x: number
  y: number
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const depthLayers = gsap.utils.toArray<Element>('.depth-layer')
    const totalDepthLayers = depthLayers.length

    const mouse = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const onMouseLeave = () => {
      mouse.x = 0
      mouse.y = 0
    }

    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseleave', onMouseLeave)

    const BUFFER_SIZE = totalDepthLayers * STAGGER_DELAY + 1
    const cursorTrail: TrailPoint[] = []

    const layers: Layer[] = depthLayers.map((node, i) => ({
      el: node,
      delay: (totalDepthLayers - 1 - i) * STAGGER_DELAY,
      current: { x: 0, y: 0 },
    }))

    const ticker = () => {
      const rect = hero.getBoundingClientRect()

      cursorTrail.push({
        x: mouse.x * rect.width * SENSITIVITY,
        y: mouse.y * rect.height * SENSITIVITY,
      })

      if (cursorTrail.length > BUFFER_SIZE) {
        cursorTrail.shift()
      }

      layers.forEach((layer) => {
        const trailIndex = Math.max(0, cursorTrail.length - 1 - layer.delay)
        const targetPos = cursorTrail[trailIndex]

        layer.current.x += (targetPos.x - layer.current.x) * LERP
        layer.current.y += (targetPos.y - layer.current.y) * LERP

        gsap.set(layer.el, {
          x: layer.current.x,
          y: layer.current.y,
        })
      })
    }

    gsap.ticker.add(ticker)

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      gsap.ticker.remove(ticker)
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="depth-layer"><div className="depth-mask"></div></div>
      <div className="depth-layer"><div className="depth-mask"></div></div>
      <div className="depth-layer"><div className="depth-mask"></div></div>
      <div className="depth-layer"><div className="depth-mask"></div></div>
      <div className="depth-layer"><div className="depth-mask"></div></div>
      <div className="depth-layer">
        <div className="logo">
          <img src="./logo.svg" alt="logo" />
        </div>
      </div>
    </section>
  )
}