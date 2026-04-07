"use client";

import React, { useRef, useEffect } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.css";
import { DarkGradientBg } from "../ui/bg/elegant-bg";
import { LiquidMetalButton } from "../ui/li-contact-btn";

gsap.registerPlugin(ScrollTrigger);

const outfit = Outfit({ subsets: ["latin"] });

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.865l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headLine1Ref = useRef<HTMLSpanElement>(null);
  const headLine2Ref = useRef<HTMLSpanElement>(null);
  const headLine3Ref = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger: ScrollTrigger.Vars = {
      trigger: section,
      start: "top 90%", // begin animating in early
      end: "bottom top", // only reverse AFTER the whole section scrolls off
      toggleActions: "play reverse play reverse",
    };

    const ctx = gsap.context(() => {
      // 1. Brand watermark
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: trigger,
        },
      );

      // 2. Heading lines — staggered blur-up
      gsap.fromTo(
        [headLine1Ref.current, headLine2Ref.current, headLine3Ref.current],
        { opacity: 0, y: 45, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.16,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: trigger,
        },
      );

      // 3. CTA button — slight pop-in
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 30, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          delay: 0.4,
          ease: "back.out(1.4)",
          scrollTrigger: trigger,
        },
      );

      // 4. Social block — slides from the right
      gsap.fromTo(
        socialRef.current,
        { opacity: 0, x: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.0,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: trigger,
        },
      );

      // 5. Footer — rises up last
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: 0.55,
          ease: "power2.out",
          scrollTrigger: trigger,
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <DarkGradientBg>
        <main id="contact">
          <div ref={sectionRef} className={`contact-root ${outfit.className}`}>
            <div
              style={{ width: "100%", height: "600px", position: "relative" }}
            >
              <div className="contact-grid-background" />

              {/* Layer 1 — brand watermark */}
              <div ref={brandRef} className="brand-text-wrap">
                <span className="brand-text">sadia</span>
              </div>

              {/* Layer 3 — foreground content */}
              <div className="content-layer">
                {/* Left — heading + CTA */}
                <div className="content-card">
                  <h1 className="contact-heading">
                    <span ref={headLine1Ref} className="heading-line">
                      Let&apos;s Build Something
                    </span>{" "}
                    <br />
                    <span ref={headLine2Ref} className="heading-line contact-heading-accent">
                      Remarkable
                    </span>{" "}
                    <br />
                    <span ref={headLine3Ref} className="heading-line">
                      Together
                    </span>
                  </h1>

                  {/* CTA button — added mt-8 for top breathing room */}
                  <div ref={btnRef} className="mt-14">
                    <LiquidMetalButton label="Get Started" />
                  </div>
                </div>

                {/* Right — social links as LiquidMetalButtons */}
                <div ref={socialRef} className="social-block">
                  <div className="social-title">
                    Social Links <span className="social-arrow">↓</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <LiquidMetalButton
                      viewMode="icon"
                      icon={<LinkedInIcon />}
                      hoverLabel="LinkedIn"
                    />
                    <LiquidMetalButton
                      viewMode="icon"
                      icon={<XTwitterIcon />}
                      hoverLabel="X"
                    />
                    <LiquidMetalButton
                      viewMode="icon"
                      icon={<GitHubIcon />}
                      hoverLabel="GitHub"
                    />
                  </div>
                </div>
              </div>

              <div ref={footerRef} className="footer-bottom">
                <span className="footer-copy">
                  Copyright &copy; 2026 Sadia Studio
                </span>
                <div className="footer-legal">
                  <Link href="/privacy" className="footer-legal-link">
                    Privacy &amp; Policy
                  </Link>
                  <Link href="/terms" className="footer-legal-link">
                    Terms &amp; Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </DarkGradientBg>
    </>
  );
}
