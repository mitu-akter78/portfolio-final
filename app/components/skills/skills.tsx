"use client"

import { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import Matter from "matter-js";

/*
  Fonts needed in index.html / global CSS:
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap");
*/


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

       

      </section>
    </>
  );
}