"use client"

import { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import Matter from "matter-js";

/*
  Fonts needed in index.html / global CSS:
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap");
*/

const { Engine, World, Bodies, Body } = Matter;

interface CardData {
  id: string;
  num: string;
  title: string;
  desc: string;
  accent: string;
  tags: string[];
}

interface TagSize {
  w: number;
  h: number;
}

interface CardState {
  active: boolean;
  engine: Matter.Engine | null;
  rafId: number | null;
  tagEls: HTMLDivElement[];
  tagBodies: Matter.Body[];
  tagSizes: TagSize[];
  delayedCall: gsap.core.Tween | null;
}

const CARDS: CardData[] = [
  {
    id: "fe",
    num: "01",
    title: "Frontend",
    desc: "Interfaces that feel alive",
    accent: "#e8ff47",
    tags: ["React", "TypeScript", "GSAP", "Tailwind", "Vite", "Vue.js", "Framer"],
  },
  {
    id: "be",
    num: "02",
    title: "Backend",
    desc: "Systems that never flinch",
    accent: "#47ffe8",
    tags: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "GraphQL", "REST"],
  },
  {
    id: "ux",
    num: "03",
    title: "UI / UX",
    desc: "Design with intent, not habit",
    accent: "#ff47a8",
    tags: ["Figma", "Motion", "Research", "Systems", "A11y", "Wireframes"],
  },
];

/* ─── measure a tag's pixel footprint before physics ─── */
function measureTag(label: string, accent: string): TagSize {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "absolute",
    visibility: "hidden",
    top: "-9999px",
    fontFamily: "'DM Serif Display', serif",
    fontSize: "13px",
    padding: "5px 14px",
    borderRadius: "100px",
    border: `1px solid ${accent}44`,
    whiteSpace: "nowrap",
  });
  el.textContent = label;
  document.body.appendChild(el);
  const size = { w: el.offsetWidth + 2, h: el.offsetHeight + 2 };
  el.remove();
  return size;
}

function SkillCard({ data }: { data: CardData }) {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const tagsContRef  = useRef<HTMLDivElement>(null);

  const stateRef = useRef<CardState>({
    active: false,
    engine: null,
    rafId: null,
    tagEls: [],
    tagBodies: [],
    tagSizes: [],
    delayedCall: null,
  });

  /* pre-measure tag sizes once on mount */
  useEffect(() => {
    stateRef.current.tagSizes = data.tags.map((t) => measureTag(t, data.accent));

    /* set initial state of back-face content */
    gsap.set(titleRef.current, { opacity: 0, y: 22 });
    gsap.set(lineRef.current,  { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(descRef.current,  { opacity: 0, y: 14 });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── physics ─── */
  function startPhysics() {
    const s    = stateRef.current;
    if (!tagsContRef.current) return;

    const W = wrapperRef.current!.offsetWidth;
    const H = wrapperRef.current!.offsetHeight;

    s.engine = Engine.create({ gravity: { x: 0, y: 2 } });

    const T = 24;
    World.add(s.engine.world, [
      Bodies.rectangle(W / 2, H + T / 2,     W * 4, T,     { isStatic: true }), // floor
      Bodies.rectangle(-T / 2, H / 2,         T, H * 4,     { isStatic: true }), // left
      Bodies.rectangle(W + T / 2, H / 2,      T, H * 4,     { isStatic: true }), // right
    ]);

    data.tags.forEach((label, i) => {
      const el = document.createElement("div") as HTMLDivElement;
      el.textContent = label;
      Object.assign(el.style, {
        position:   "absolute",
        fontFamily: "'DM Serif Display', serif",
        fontStyle:  "italic",
        fontSize:   "13px",
        color:      "#e8e8d8",
        background: "#111",
        border:     `1px solid ${data.accent}50`,
        borderRadius: "100px",
        padding:    "5px 14px",
        whiteSpace: "nowrap",
        opacity:    "0",
        willChange: "transform, opacity",
      });
      tagsContRef.current!.appendChild(el);
      s.tagEls.push(el);

      const { w, h } = s.tagSizes[i];
      const sx = Math.max(w / 2 + 8, Math.min(W - w / 2 - 8, W * 0.2 + Math.random() * W * 0.6));
      const sy = -(h / 2 + i * (h + 5) + 10);

      const body = Bodies.rectangle(sx, sy, w, h, {
        chamfer:     { radius: h / 2 },
        restitution: 0.2,
        friction:    0.55,
        density:     0.0018,
      });
      Body.setAngle(body, (Math.random() - 0.5) * 0.5);
      World.add(s.engine.world, body);
      s.tagBodies.push(body);

      gsap.to(el, { opacity: 1, duration: 0.3, delay: i * 0.04, ease: "power2.out" });
    });

    function tick() {
      Engine.update(s.engine!, 1000 / 60);
      s.tagEls.forEach((el, i) => {
        const { x, y } = s.tagBodies[i].position;
        const a = s.tagBodies[i].angle;
        const { w, h } = s.tagSizes[i];
        el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${a}rad)`;
      });
      s.rafId = requestAnimationFrame(tick);
    }
    s.rafId = requestAnimationFrame(tick);
  }

  function stopPhysics() {
    const s = stateRef.current;
    if (s.rafId)   { cancelAnimationFrame(s.rafId); s.rafId = null; }
    if (s.engine)  { Engine.clear(s.engine); s.engine = null; }
    const toRemove = [...s.tagEls];
    gsap.to(toRemove, {
      opacity: 0, duration: 0.15, ease: "power2.in",
      onComplete: () => toRemove.forEach((el) => el.remove()),
    });
    s.tagEls    = [];
    s.tagBodies = [];
  }

  function cleanup() {
    const s = stateRef.current;
    if (s.delayedCall) s.delayedCall.kill();
    stopPhysics();
  }

  /* ─── hover enter ─── */
  function onEnter() {
    const s = stateRef.current;
    if (s.active) return;
    s.active = true;

    gsap.to(innerRef.current, {
      rotationY: 180,
      duration: 0.72,
      ease: "power2.inOut",
      onComplete: () => {
        if (!s.active) return;

        const tl = gsap.timeline();
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" })
          .to(lineRef.current,  { opacity: 1, scaleX: 1, duration: 0.32, ease: "power3.out" }, "-=0.24")
          .to(descRef.current,  { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" }, "-=0.2")
          .call(() => { if (s.active) startPhysics(); }, undefined, "+=0.05");
      },
    });
  }

  /* ─── hover leave ─── */
  function onLeave() {
    const s = stateRef.current;
    if (!s.active) return;
    s.active = false;

    if (s.delayedCall) s.delayedCall.kill();
    stopPhysics();

    gsap.killTweensOf([titleRef.current, lineRef.current, descRef.current]);
    gsap.set(titleRef.current, { opacity: 0, y: 22 });
    gsap.set(lineRef.current,  { opacity: 0, scaleX: 0 });
    gsap.set(descRef.current,  { opacity: 0, y: 14 });

    gsap.to(innerRef.current, {
      rotationY: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  }

  const accent = data.accent;

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position:   "relative",
        width:      "260px",
        height:     "340px",
        perspective: "1200px",
        cursor:     "pointer",
        flexShrink: 0,
      }}
    >
      {/* ── FLIP CONTAINER ── */}
      <div
        ref={innerRef}
        style={{
          width:          "100%",
          height:         "100%",
          position:       "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ════════════════════════
            FRONT FACE
        ════════════════════════ */}
        <div
          style={{
            position:           "absolute",
            inset:              0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius:       "16px",
            border:             "1px solid #1e1e1e",
            background:         "#111",
            display:            "flex",
            flexDirection:      "column",
            alignItems:         "center",
            justifyContent:     "center",
            overflow:           "hidden",
          }}
        >
          {/* giant watermark number */}
          <span style={{
            position:   "absolute",
            bottom:     "-18px",
            right:      "12px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize:   "130px",
            lineHeight: 1,
            color:      accent,
            opacity:    0.04,
            userSelect: "none",
            letterSpacing: "-0.02em",
          }}>
            {data.num}
          </span>

          {/* small index */}
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle:  "italic",
            fontSize:   "12px",
            color:      "#2c2c2c",
            letterSpacing: "0.25em",
          }}>
            {data.num}
          </span>

          {/* tiny accent dash */}
          <div style={{
            width:      "20px",
            height:     "1px",
            background: accent,
            opacity:    0.35,
            margin:     "10px 0 8px",
          }} />

          {/* Main heading */}
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize:   "68px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color:      accent,
          }}>
            {data.title}
          </h2>

          {/* hover nudge */}
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle:  "italic",
            fontSize:   "11px",
            color:      "#222",
            marginTop:  "14px",
          }}>
            hover to explore
          </span>
        </div>

        {/* ════════════════════════
            BACK FACE
        ════════════════════════ */}
        <div
          style={{
            position:           "absolute",
            inset:              0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform:          "rotateY(180deg)",
            borderRadius:       "16px",
            border:             `1px solid ${accent}28`,
            background:         "#111",
            overflow:           "hidden",
            display:            "flex",
            flexDirection:      "column",
          }}
        >
          {/* top accent stripe */}
          <div style={{
            height:     "2px",
            background: `linear-gradient(90deg, ${accent}, ${accent}00)`,
            flexShrink: 0,
          }} />

          {/* ── header block (solid bg so it masks tags behind it) ── */}
          <div style={{
            padding:    "16px 18px 14px",
            background: "#111",
            position:   "relative",
            zIndex:     2,
            flexShrink: 0,
          }}>
            <h2
              ref={titleRef}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize:   "52px",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color:      accent,
                willChange: "transform, opacity",
              }}
            >
              {data.title}
            </h2>

            <div
              ref={lineRef}
              style={{
                width:      "100%",
                height:     "1px",
                background: `linear-gradient(90deg, ${accent}60, ${accent}00)`,
                margin:     "10px 0 8px",
                willChange: "transform, opacity",
              }}
            />

            <p
              ref={descRef}
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle:  "italic",
                fontSize:   "13px",
                color:      "#555",
                lineHeight: 1.4,
                willChange: "transform, opacity",
              }}
            >
              {data.desc}
            </p>
          </div>

          {/* ── physics tags zone ── */}
          <div
            ref={tagsContRef}
            style={{
              position: "absolute",
              inset:    0,
              zIndex:   1,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Timeline ─── */
function Timeline() {
  return (
    <div style={{
      position: "relative",
      display:  "flex",
      alignItems: "center",
      width:    "calc(3 * 260px + 2 * 28px)",
      margin:   "0 auto",
    }}>
      {/* full line */}
      <div style={{
        position:   "absolute",
        left:       "36px",
        right:      "36px",
        top:        "50%",
        transform:  "translateY(-50%)",
        height:     "1px",
        background: "linear-gradient(90deg, transparent, #1e1e1e 15%, #1e1e1e 85%, transparent)",
      }} />

      {CARDS.map((card, i) => (
        // FIX: key belongs on the outermost element returned from .map().
        // Shorthand <> can't take props, so use <Fragment key={...}> instead.
        <Fragment key={card.id}>
          <div style={{ width: "260px", display: "flex", justifyContent: "center", position: "relative", zIndex: 1, flexShrink: 0 }}>
            <div style={{
              width:      "8px",
              height:     "8px",
              borderRadius: "50%",
              background: "#111",
              border:     "1px solid #252525",
            }} />
          </div>
          {i < CARDS.length - 1 && (
            <div style={{ width: "28px", flexShrink: 0 }} />
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ─── Root ─── */
export default function SkillsCards() {
  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap");
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <section style={{
        width:          "100%",
        minHeight:      "100svh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "16px",
        background:     "#0d0d0d",
        padding:        "3rem 2rem",
      }}>

        {/* eyebrow label */}
        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle:  "italic",
          fontSize:   "12px",
          color:      "#282828",
          letterSpacing: "0.28em",
          textTransform: "lowercase",
          marginBottom: "4px",
        }}>
          skills &amp; expertise
        </p>

        {/* Cards row */}
        <div style={{
          display: "flex",
          gap:     "28px",
          alignItems: "flex-start",
        }}>
          {CARDS.map((card) => (
            <SkillCard key={card.id} data={card} />
          ))}
        </div>

        {/* Timeline */}
        <Timeline />

      </section>
    </>
  );
}