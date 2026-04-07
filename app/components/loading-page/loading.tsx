"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./loading.css";

// ── Named constants — no more magic numbers ───────────────────────────────────
const TIMING = {
  digit1Delay: 5,
  digit1Duration: 2,
  digit2Delay: 1,
  digit2Duration: 6,
  digit3Delay: 1,
  digit3Duration: 5,
  progressDelay: 7,
  progressPhase1: 2,
  progressPhase2: 1.5,
  progressFade: 0.5,
  wipeInDuration: 0.75,
  wipeOutDuration: 0.2,
  wipeStagger: 0.1,
  navDuration: 1,
  h1Duration: 1,
  h1Stagger: 0.1,
};

interface LoadingProps {
  onComplete?: () => void;
}

// ── Static digit data defined outside JSX to avoid key-prop issues ────────────
const DIGIT_2_NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const DIGIT_3_INITIAL_NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Loading({ onComplete }: LoadingProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const createdNodes = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const shell = shellRef.current;
    const nav = document.querySelector("nav");
    let isMounted = true;

    document.documentElement.classList.add("loading");

    shell?.setAttribute("aria-hidden", "true");
    shell?.setAttribute("inert", "");

    if (nav) gsap.set(nav, { y: -150 });

    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (!isMounted) return;

        // ── Create the digit elements ──────────────────────────────────────────
        const digit3 = digit3Ref.current;
        if (digit3) {
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
              const div = document.createElement("div");
              div.className = "num";
              div.textContent = String(j);
              digit3.appendChild(div);
              createdNodes.current.push(div);
            }
          }
          const finalDigit = document.createElement("div");
          finalDigit.className = "num";
          finalDigit.textContent = "0";
          digit3.appendChild(finalDigit);
          createdNodes.current.push(finalDigit);
        }

        // ── Digit scroll animation ────────────────────────────────────────────
        function animateDigit(
          digitEl: HTMLDivElement,
          duration: number,
          delay: number,
        ) {
          const numHeight =
            (digitEl.querySelector(".num") as HTMLElement)?.clientHeight ?? 0;
          const totalDistance =
            (digitEl.querySelectorAll(".num").length - 1) * numHeight;
          gsap.to(digitEl, {
            y: -totalDistance,
            duration,
            delay,
            ease: "power2.inOut",
          });
        }

        if (digit1Ref.current)
          animateDigit(digit1Ref.current, TIMING.digit1Duration, TIMING.digit1Delay);
        if (digit2Ref.current)
          animateDigit(digit2Ref.current, TIMING.digit2Duration, TIMING.digit2Delay);
        if (digit3Ref.current)
          animateDigit(digit3Ref.current, TIMING.digit3Duration, TIMING.digit3Delay);

        // ── Wipe timeline ─────────────────────────────────────────────────────
        const wipeTl = gsap.timeline({ paused: true });

        wipeTl.to(".loader-wipe-bg", {
          scaleX: 1,
          duration: TIMING.wipeInDuration,
          stagger: TIMING.wipeStagger,
          ease: "power2.in",
          onComplete: () => {
            if (shell) shell.style.display = "none";
          },
        });

        wipeTl.to(".loader-wipe-bg", {
          scaleX: 0,
          transformOrigin: "left",
          duration: TIMING.wipeOutDuration,
          stagger: TIMING.wipeStagger,
          ease: "power3.in",
          onComplete: () => {
            document.querySelectorAll(".loader-wipe-bg").forEach((el) => {
              (el as HTMLElement).style.display = "none";
            });
            onComplete?.();
          },
        });

        if (nav) {
          wipeTl.to(
            nav,
            { y: 0, duration: TIMING.navDuration, ease: "power3.out" },
            "-=0",
          );
        }

        // ── FIX: guard against h1 span not yet in DOM ─────────────────────────
        const h1Spans = document.querySelectorAll("h1 span");
        if (h1Spans.length > 0) {
          wipeTl.to(
            h1Spans,
            {
              top: "0px",
              stagger: TIMING.h1Stagger,
              duration: TIMING.h1Duration,
              ease: "power3.out",
            },
            "<",
          );
        }

        // ── Progress bar ──────────────────────────────────────────────
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { width: "0%" });

          gsap
            .timeline({ delay: TIMING.progressDelay })
            .to(progressBarRef.current, {
              width: "30%",
              duration: TIMING.progressPhase1,
              ease: "power4.in",
            })
            .to(progressBarRef.current, {
              width: "100%",
              duration: TIMING.progressPhase2,
              ease: "power3.out",
            })
            .to(progressBarRef.current, {
              opacity: 0,
              duration: TIMING.progressFade,
              ease: "power3.out",
              onComplete: () => { wipeTl.play(); },
            });
        }
      });
    });

    return () => {
      isMounted = false;
      document.documentElement.classList.remove("loading");
      ctx.revert();

      createdNodes.current.forEach((node) => node.parentNode?.removeChild(node));
      createdNodes.current = [];
    };
  }, []);

  return (
    <>
      <div className="pre-loader-shell" ref={shellRef}>
        <div className="pre-loader">
          <p className="loading-text">Loading</p>
          <div className="counter">
            {/* digit-1: static two items, no list key needed */}
            <div className="digit-1" ref={digit1Ref}>
              <div className="num">0</div>
              <div className="num offset">1</div>
            </div>

            {/* digit-2: FIX — render from array with explicit keys */}
            <div className="digit-2" ref={digit2Ref}>
              {DIGIT_2_NUMS.map((n, i) => (
                <div
                  key={`d2-${i}`}
                  className={i === 1 ? "num offset" : "num"}
                >
                  {n}
                </div>
              ))}
            </div>

            {/* digit-3: FIX — render from array with explicit keys;
                extra rows are appended imperatively in useEffect */}
            <div className="digit-3" ref={digit3Ref}>
              {DIGIT_3_INITIAL_NUMS.map((n, i) => (
                <div key={`d3-${i}`} className="num">
                  {n}
                </div>
              ))}
            </div>

            <div className="digit-4">%</div>
          </div>
          <div className="progress-bar" ref={progressBarRef}></div>
        </div>
      </div>

      <div className="loader-wipe-bg" style={{ backgroundColor: "#1e80cf" }}></div>
      <div className="loader-wipe-bg" style={{ backgroundColor: "#d6ebfc" }}></div>
      <div className="loader-wipe-bg" style={{ backgroundColor: "#249afa" }}></div>
      <div className="loader-wipe-bg" style={{ backgroundColor: "#0068c9" }}></div>
    </>
  );
}