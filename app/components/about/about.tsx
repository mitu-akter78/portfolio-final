"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "lenis";
// import "./about.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export default function About() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Adjust smoothing if needed
    });

    const lenisUpdate = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(lenisUpdate);

    gsap.ticker.lagSmoothing(0);

    let split: SplitType | null = null;
    let animation: gsap.core.Tween | null = null;

    const initAnimation = () => {
      if (!textRef.current) return;

      // Revert previous split and animation on resize to maintain responsiveness
      if (split) split.revert();
      if (animation) animation.kill();

      // 1. Force the container to the maximum font weight to calculate the widest possible layout
      gsap.set(textRef.current, { fontWeight: 900 });

      // Split text into lines, words, and chars for better wrapping
      split = new SplitType(textRef.current, { types: 'lines,words,chars' });
      const chars = split.chars;

      if (chars) {
        // 2. Lock the width of each character to its maximum (boldest) width
        // This prevents words from jumping to the next line when the font weight animates
        chars.forEach((char) => {
          const widths = chars.map((char) => char.getBoundingClientRect().width);
          chars.forEach((char, i) => {
            gsap.set(char, { width: widths[i], textAlign: 'center', display: 'inline-block' });
          });
        });

        // 3. Set initial font weight back to the thinnest state
        gsap.set(chars, { fontWeight: 100 });

        // 4. Create ScrollTrigger animation with a staggered effect
        animation = gsap.to(chars, {
          fontWeight: 900,
          ease: 'sine.inOut',
          stagger: {
            each: 0.05,
            from: 'start',
          },
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true, // Adds a 1-second smoothing delay to the scrub
          },
        });
      }
    };

    // Run SplitType inside requestAnimationFrame
    requestAnimationFrame(() => {
      initAnimation();
      ScrollTrigger.refresh();
    });

    // Handle window resize for responsive text splitting
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      gsap.ticker.remove(lenisUpdate);
      lenis.destroy();
      if (split) split.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className={`w-full bg-[radial-gradient(circle_at_center,#93c5fd_0%,#ffffff_100%)] text-slate-900 ${outfit.variable} font-sans overflow-hidden`}>
      <div className="flex justify-end w-full">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit)' }}>
          About Me
        </h2>
      </div>
      <div className="min-h-[150vh] flex items-center justify-center px-6 sm:px-8 md:px-16 py-16">
        <h1
          ref={textRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[1.15] md:leading-tight text-center max-w-6xl mx-auto"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          I am a versatile AI assistant, designed to help you build, create, and explore. From writing code to crafting stories, I adapt to your needs, turning your ideas into reality through the power of language and logic.
        </h1>
      </div>
    </main>
  );
};