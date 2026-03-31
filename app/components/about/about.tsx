"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Outfit } from "next/font/google";
import "./about.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function About() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Lenis is handled globally in providers.tsx — do NOT instantiate it here

    gsap.registerPlugin(ScrollTrigger);

    let split: SplitType | null = null;
    let triggers: ScrollTrigger[] = [];

    const initAnimation = () => {
      if (!textRef.current) return;

      // Clean up previous instances scoped to this component only
      triggers.forEach((t) => t.kill());
      triggers = [];
      if (split) split.revert();

      gsap.set(textRef.current, { fontWeight: 900 });

      split = new SplitType(textRef.current, { types: "lines,words,chars" });
      const chars = split.chars;

      if (chars) {
        // READ all widths in one pass to avoid layout thrashing
        const widths = chars.map((char) => char.getBoundingClientRect().width);

        // WRITE all at once after — no reflows triggered between reads
        chars.forEach((char, i) => {
          gsap.set(char, {
            width: widths[i],
            display: "inline-block",
            textAlign: "center",
          });
        });

        gsap.set(chars, { fontWeight: 200 });

        const anim = gsap.to(chars, {
          fontWeight: 900,
          ease: "sine.inOut",
          paused: true,
          stagger: { each: 0.05, from: "start" },
        });

        // Save the trigger so we only kill THIS component's triggers on cleanup
        const st = ScrollTrigger.create({
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
          animation: anim,
        });

        triggers.push(st);
      }
    };

    requestAnimationFrame(() => {
      initAnimation();
      ScrollTrigger.refresh();
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      triggers.forEach((t) => t.kill()); // ✅ only kills this component's triggers
      if (split) split.revert();
    };
  }, []);

  return (
    <main
      className="about-grid-wrapper">    
    <div className="about-grid-background" />  
    <div
    className={`about-content w-full text-slate-900 ${outfit.variable} font-sans overflow-hidden border-t-2 border-blue-950`}
    >
      <div className="heading flex justify-end w-full ">
        <h2
          className="text-5xl md:text-8xl font-black uppercase tracking-wider"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          About Me
        </h2>
      </div>

      <div className="min-h-screen py-12 md:py-20 px-6 md:px-12">
        <h1
          ref={textRef}
          className="about-text text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight sm:leading-snug md:leading-normal text-left max-w-[80%]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          I am a versatile AI assistant, designed to help you build, create,
          and explore. From writing code to crafting stories, I adapt to your
          needs, turning your ideas into reality through the power of language
          and logic.
        </h1>
      </div>
      </div>
    </main>
  );
}