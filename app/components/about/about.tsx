"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Outfit } from "next/font/google";
import "./about.css";
import { TextScrollReveal } from "../ui/TextScrollReveal";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function About() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let split: SplitType | null = null;
    let triggers: ScrollTrigger[] = [];

    const initAnimation = () => {
      if (!textRef.current) return;

      triggers.forEach((t) => t.kill());
      triggers = [];
      if (split) split.revert();

      gsap.set(textRef.current, { fontWeight: 900 });

      split = new SplitType(textRef.current, { types: "lines,words,chars" });
      const chars = split.chars;

      if (chars) {
        const widths = chars.map((char) => char.getBoundingClientRect().width);

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
      triggers.forEach((t) => t.kill());
      if (split) split.revert();
    };
  }, []);

  return (
    <main className="about-grid-wrapper" id="about">
      <div className="about-grid-background" />
      <div
        className={`about-content text-[#ffffff] overflow-hidden`}
      >
        <div className="about-inner">

          <div className="heading">
            <TextScrollReveal
              as="h1"
              animation="bottom"
              splitBy="chars"
              triggerStart="top 85%"
              triggerEnd="bottom 40%"
            >
              ABOUT ME
            </TextScrollReveal>
          </div>

          <p
            ref={textRef}
            className="about-text"
          >
            Hi, I'm Sadia — A Creative Developer & Designer. 
            I Build Fast, Scalable, And User-Focused Web Applications That Turn Complex Ideas Into Clear, Intuitive Experiences. 
            I Focus On Creating Well-Structured Systems That Are Reliable, Easy To Maintain, And Built To Evolve Over Time. 
            I Work With Modern Web Technologies And AI-Assisted Workflows To Deliver Efficient, High-Quality Solutions.
          </p>

        </div>
      </div>
    </main>
  );
}