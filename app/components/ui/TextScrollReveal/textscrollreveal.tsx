'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ───────────────────────────────────────────────────────────────────
export type AnimationT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'z'
  | 'blur'
  | undefined;

export type SplitUnit = 'words' | 'chars';

export interface TextScrollRevealProps {
  children: string;
  as?: React.ElementType;
  /** Animate word by word or character by character */
  splitBy?: SplitUnit;
  /** Animation style */
  animation?: AnimationT;
  /** Seconds of stagger between each unit — controls wave spread */
  staggerValue?: number;
  /** ScrollTrigger start e.g. "top 85%" */
  triggerStart?: string;
  /** ScrollTrigger end e.g. "bottom 20%" — longer range = slower reveal */
  triggerEnd?: string;
  /** Duration of each unit's tween */
  duration?: number;
  /** GSAP ease */
  ease?: string;
  /** Show ScrollTrigger debug markers */
  markers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function getFromVars(animation: AnimationT): gsap.TweenVars {
  const base: gsap.TweenVars = { opacity: 0 };
  switch (animation) {
    case 'left':   return { ...base, x: -60 };
    case 'right':  return { ...base, x: 60 };
    case 'top':    return { ...base, y: -40 };
    case 'blur':   return { ...base, filter: 'blur(12px)', y: 20 };
    case 'z':      return { ...base, scale: 0.5, y: 20 };
    case 'bottom':
    default:       return { ...base, y: 48 };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export const TextScrollReveal = ({
  children,
  as: Component = 'p',
  splitBy = 'words',
  animation,
  staggerValue = 0.08,
  triggerStart = 'top 85%',
  triggerEnd = 'bottom 20%',
  duration = 0.6,
  ease = 'power3.out',
  markers = false,
  className,
  style,
}: TextScrollRevealProps) => {
  const wrapperRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let split: SplitType | null = null;
    let triggers: ScrollTrigger[] = [];
    let tl: gsap.core.Timeline | null = null;

    const init = () => {
      // Clean up previous run
      triggers.forEach((t) => t.kill());
      triggers = [];
      tl?.kill();
      if (split) split.revert();

      // SplitType injects spans around each word/char so GSAP can target them
      split = new SplitType(el, {
        types: splitBy === 'chars' ? 'words,chars' : 'words',
        tagName: 'span',
      });

      const units = splitBy === 'chars' ? split.chars : split.words;
      if (!units || units.length === 0) return;

      const fromVars = getFromVars(animation);

      // Set every unit to its hidden starting state
      gsap.set(units, { ...fromVars, willChange: 'transform, opacity' });

      // Build the timeline
      // stagger is what makes units come in one-by-one instead of all at once
      // scrub ties the timeline progress directly to scroll position —
      // scroll down = plays forward, scroll up = plays backward automatically
      tl = gsap.timeline({ paused: true });
      tl.to(units, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        ease,
        stagger: staggerValue,
      });

      const st = ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        end: triggerEnd,
        markers,
        scrub: 1,  // 1s smoothing lag — feels natural, not instant/snappy
        animation: tl,
      });

      triggers.push(st);
    };

    // rAF ensures fonts and layout are settled before SplitType measures
    const raf = requestAnimationFrame(() => {
      init();
      ScrollTrigger.refresh();
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      triggers.forEach((t) => t.kill());
      tl?.kill();
      if (split) split.revert();
    };
  }, [children, splitBy, animation, staggerValue, triggerStart, triggerEnd, duration, ease, markers]);

  return (
    <Component
      ref={wrapperRef}
      className={cn('block', className)}
      style={style}
      aria-label={children}
    >
      {children}
    </Component>
  );
};

export default TextScrollReveal;