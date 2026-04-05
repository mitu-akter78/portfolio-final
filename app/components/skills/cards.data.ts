import { CardData } from "./card"

export const CARDS: CardData[] = [
  {
    title: "Craft",
    sub: "Design",
    num: "01",
    bg: "#0d0820",
    accent: "#9b8cf8",
    textColor: "#ede8ff",
    backTitle: "Design",
    items: [
      "Visual Composition",
      "Typography Systems",
      "Color Theory",
      "Spatial Design",
      "Brand Identity",
    ],
    art: `<svg viewBox="0 0 270 405" xmlns="http://www.w3.org/2000/svg">
      <rect width="270" height="405" fill="#0d0820"/>
      <radialGradient id="rg1" cx="55%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#9b8cf8" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#0d0820" stop-opacity="0"/>
      </radialGradient>
      <rect width="270" height="405" fill="url(#rg1)"/>
      <circle cx="135" cy="200" r="110" fill="none" stroke="#9b8cf8" stroke-width="0.6" stroke-opacity="0.22"/>
      <circle cx="135" cy="200" r="78"  fill="none" stroke="#9b8cf8" stroke-width="0.6" stroke-opacity="0.2"/>
      <circle cx="135" cy="200" r="46"  fill="none" stroke="#9b8cf8" stroke-width="0.6" stroke-opacity="0.18"/>
      <circle cx="135" cy="200" r="14"  fill="none" stroke="#9b8cf8" stroke-width="0.6" stroke-opacity="0.4"/>
      <circle cx="135" cy="200" r="3"   fill="#9b8cf8" fill-opacity="0.7"/>
      <line x1="25"  y1="200" x2="245" y2="200" stroke="#9b8cf8" stroke-width="0.4" stroke-opacity="0.18"/>
      <line x1="135" y1="90"  x2="135" y2="310" stroke="#9b8cf8" stroke-width="0.4" stroke-opacity="0.18"/>
      <line x1="57"  y1="122" x2="213" y2="278" stroke="#9b8cf8" stroke-width="0.3" stroke-opacity="0.1"/>
      <line x1="213" y1="122" x2="57"  y2="278" stroke="#9b8cf8" stroke-width="0.3" stroke-opacity="0.1"/>
    </svg>`,
  },
  {
    title: "Code",
    sub: "Development",
    num: "02",
    bg: "#040f0a",
    accent: "#34d399",
    textColor: "#d0ffe8",
    backTitle: "Development",
    items: [
      "React / Next.js",
      "TypeScript",
      "Three.js / WebGL",
      "Node.js",
      "Database Design",
    ],
    art: `<svg viewBox="0 0 270 405" xmlns="http://www.w3.org/2000/svg">
      <rect width="270" height="405" fill="#040f0a"/>
      <radialGradient id="rg2" cx="40%" cy="60%" r="55%">
        <stop offset="0%" stop-color="#34d399" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#040f0a" stop-opacity="0"/>
      </radialGradient>
      <rect width="270" height="405" fill="url(#rg2)"/>
      <rect x="30"  y="30" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.07"/>
      <rect x="70"  y="30" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.04"/>
      <rect x="110" y="30" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.09"/>
      <rect x="150" y="30" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.04"/>
      <rect x="190" y="30" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.06"/>
      <rect x="30"  y="70" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.05"/>
      <rect x="70"  y="70" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.10"/>
      <rect x="110" y="70" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.03"/>
      <rect x="150" y="70" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.07"/>
      <rect x="190" y="70" width="32" height="32" rx="3" fill="#34d399" fill-opacity="0.04"/>
      <rect x="45" y="150" width="180" height="110" rx="6" fill="none" stroke="#34d399" stroke-width="0.7" stroke-opacity="0.25"/>
      <text x="62" y="182" font-family="monospace" font-size="10" fill="#34d399" fill-opacity="0.55">&lt;Component /&gt;</text>
      <text x="78" y="202" font-family="monospace" font-size="9"  fill="#34d399" fill-opacity="0.3">  state = {}</text>
      <text x="78" y="220" font-family="monospace" font-size="9"  fill="#34d399" fill-opacity="0.3">  render()</text>
      <text x="62" y="240" font-family="monospace" font-size="10" fill="#34d399" fill-opacity="0.4">&lt;/Component&gt;</text>
    </svg>`,
  },
  {
    title: "Motion",
    sub: "Animation",
    num: "03",
    bg: "#110a00",
    accent: "#fbbf24",
    textColor: "#fff8e0",
    backTitle: "Motion",
    items: [
      "GSAP / ScrollTrigger",
      "Framer Motion",
      "CSS Animation",
      "Lottie / Rive",
      "3D / WebGL",
    ],
    art: `<svg viewBox="0 0 270 405" xmlns="http://www.w3.org/2000/svg">
      <rect width="270" height="405" fill="#110a00"/>
      <radialGradient id="rg3" cx="35%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#110a00" stop-opacity="0"/>
      </radialGradient>
      <rect width="270" height="405" fill="url(#rg3)"/>
      <path d="M0,202 C67,125 135,82 202,202 S270,282 270,202"  fill="none" stroke="#fbbf24" stroke-width="1.2" stroke-opacity="0.4"/>
      <path d="M0,220 C67,143 135,100 202,220 S270,300 270,220" fill="none" stroke="#fbbf24" stroke-width="0.5" stroke-opacity="0.18"/>
      <path d="M0,184 C67,107 135,64 202,184 S270,264 270,184"  fill="none" stroke="#fbbf24" stroke-width="0.5" stroke-opacity="0.18"/>
      <path d="M0,238 C67,161 135,118 202,238 S270,318 270,238" fill="none" stroke="#fbbf24" stroke-width="0.3" stroke-opacity="0.1"/>
      <path d="M0,166 C67,89 135,46 202,166 S270,246 270,166"   fill="none" stroke="#fbbf24" stroke-width="0.3" stroke-opacity="0.1"/>
      <circle cx="135" cy="154" r="7"  fill="#fbbf24" fill-opacity="0.7"/>
      <circle cx="135" cy="154" r="14" fill="none" stroke="#fbbf24" stroke-width="0.6" stroke-opacity="0.35"/>
      <circle cx="135" cy="154" r="24" fill="none" stroke="#fbbf24" stroke-width="0.4" stroke-opacity="0.18"/>
    </svg>`,
  },
  {
    title: "Think",
    sub: "Strategy",
    num: "04",
    bg: "#120305",
    accent: "#fb7185",
    textColor: "#ffe0e4",
    backTitle: "Strategy",
    items: [
      "UX Research",
      "Systems Thinking",
      "Product Strategy",
      "User Journey Mapping",
      "Rapid Prototyping",
    ],
    art: `<svg viewBox="0 0 270 405" xmlns="http://www.w3.org/2000/svg">
      <rect width="270" height="405" fill="#120305"/>
      <radialGradient id="rg4" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#fb7185" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#120305" stop-opacity="0"/>
      </radialGradient>
      <rect width="270" height="405" fill="url(#rg4)"/>
      <polygon points="135,38 248,295 22,295"   fill="none" stroke="#fb7185" stroke-width="0.8" stroke-opacity="0.3"/>
      <polygon points="135,88 213,270 57,270"   fill="none" stroke="#fb7185" stroke-width="0.6" stroke-opacity="0.22"/>
      <polygon points="135,138 178,245 92,245"  fill="none" stroke="#fb7185" stroke-width="0.5" stroke-opacity="0.18"/>
      <polygon points="135,183 155,225 115,225" fill="none" stroke="#fb7185" stroke-width="0.4" stroke-opacity="0.3"/>
      <circle cx="135" cy="205" r="5" fill="#fb7185" fill-opacity="0.55"/>
      <line x1="135" y1="38"  x2="135" y2="205" stroke="#fb7185" stroke-width="0.3" stroke-opacity="0.12"/>
      <line x1="248" y1="295" x2="135" y2="205" stroke="#fb7185" stroke-width="0.3" stroke-opacity="0.12"/>
      <line x1="22"  y1="295" x2="135" y2="205" stroke="#fb7185" stroke-width="0.3" stroke-opacity="0.12"/>
    </svg>`,
  },
  {
    title: "Vision",
    sub: "Direction",
    num: "05",
    bg: "#02060f",
    accent: "#38bdf8",
    textColor: "#e0f4ff",
    backTitle: "Creative Direction",
    items: [
      "Art Direction",
      "Concept Development",
      "Visual Narrative",
      "Brand Voice",
      "Creative Leadership",
    ],
    art: `<svg viewBox="0 0 270 405" xmlns="http://www.w3.org/2000/svg">
      <rect width="270" height="405" fill="#02060f"/>
      <radialGradient id="rg5" cx="50%" cy="48%" r="58%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#02060f" stop-opacity="0"/>
      </radialGradient>
      <rect width="270" height="405" fill="url(#rg5)"/>
      <circle cx="42"  cy="68"  r="1.5" fill="#38bdf8" fill-opacity="0.7"/>
      <circle cx="198" cy="42"  r="1"   fill="#38bdf8" fill-opacity="0.5"/>
      <circle cx="88"  cy="130" r="0.8" fill="#38bdf8" fill-opacity="0.4"/>
      <circle cx="230" cy="155" r="1.2" fill="#38bdf8" fill-opacity="0.6"/>
      <circle cx="22"  cy="225" r="1"   fill="#38bdf8" fill-opacity="0.35"/>
      <circle cx="250" cy="300" r="1.5" fill="#38bdf8" fill-opacity="0.5"/>
      <circle cx="60"  cy="350" r="0.8" fill="#38bdf8" fill-opacity="0.4"/>
      <circle cx="170" cy="370" r="1.1" fill="#38bdf8" fill-opacity="0.55"/>
      <circle cx="110" cy="50"  r="0.7" fill="#38bdf8" fill-opacity="0.45"/>
      <circle cx="245" cy="230" r="0.9" fill="#38bdf8" fill-opacity="0.38"/>
      <circle cx="135" cy="200" r="62"  fill="none" stroke="#38bdf8" stroke-width="0.7" stroke-opacity="0.28"/>
      <circle cx="135" cy="200" r="38"  fill="none" stroke="#38bdf8" stroke-width="0.5" stroke-opacity="0.18"/>
      <line x1="73"  y1="200" x2="197" y2="200" stroke="#38bdf8" stroke-width="0.4" stroke-opacity="0.25"/>
      <line x1="135" y1="138" x2="135" y2="262" stroke="#38bdf8" stroke-width="0.4" stroke-opacity="0.25"/>
      <circle cx="135" cy="200" r="10" fill="none" stroke="#38bdf8" stroke-width="0.8" stroke-opacity="0.5"/>
      <circle cx="135" cy="200" r="3"  fill="#38bdf8" fill-opacity="0.75"/>
    </svg>`,
  },
]

export const SPREAD = [
  { x: "-35vw", y: "8vh",  rot: -21 },
  { x: "-18vw", y: "-2vh", rot: -9  },
  { x:   "0vw", y: "-5vh", rot:  0  },
  { x:  "18vw", y: "-2vh", rot:  9  },
  { x:  "35vw", y: "8vh",  rot:  21 },
]