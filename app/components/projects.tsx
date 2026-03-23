"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./project.css";

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: string;
  label: string;
  title: string;
  img: string;
}

const cardData: CardData[] = [
  {
    id: "card-1",
    label: "Quiet Control",
    title: "Signal Drift",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
  },
  {
    id: "card-2",
    label: "Soft Noise",
    title: "Phase Shift",
    img: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&auto=format&fit=crop",
  },
  {
    id: "card-3",
    label: "Dark Edge",
    title: "Null Space",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
  },
  {
    id: "card-4",
    label: "Raw Form",
    title: "Dead Zone",
    img: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop",
  },
];

export default function Projects() {
  const stickyRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const cards = cardRefs.current;
    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    const trigger = ScrollTrigger.create({
      trigger: stickyRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(
          Math.floor(progress / segmentSize),
          totalCards - 1
        );
        const segProgress =
          (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 35 });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            });
          } else {
            const behindIndex = i - activeIndex;
            gsap.set(card, {
              yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
              rotationX: 0,
              scale: 1 - (behindIndex - segProgress) * cardScaleStep,
            });
          }
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <section className="intro">
        <h1>Enter the Frame</h1>
      </section>

      <section className="sticky-cards" ref={stickyRef}>
        {cardData.map((card, i) => (
          <div
            key={card.id}
            id={card.id}
            className="card"
            ref={(el) => (cardRefs.current[i] = el!)}
          >
            <div className="col">
              <p>{card.label}</p>
              <h1>{card.title}</h1>
            </div>
            <div className="col">
              <img src={card.img} alt={card.title} />
            </div>
          </div>
        ))}
      </section>

      <section className="outro">
        <h1>Loop Complete</h1>
      </section>
    </>
  );
}