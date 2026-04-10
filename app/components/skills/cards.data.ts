import { CardData } from "./card"

export const CARDS: CardData[] = [
  {
    title: "BACKEND",
    sub: "Development",
    num: "01",
    bg: "linear-gradient(135deg, #000763 0%, #04a2fd 100%)",
    accent: "#04a2fd",
    textColor: "#ffffff",
    backTitle: "BACKEND DEVELOPMENT",
    backSubtitle: "I can help develop solutions that will help you grow your business:",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity="0.9"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity="0.6"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity="0.6"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity="0.35"/>
    </svg>`,
    items: [
      {
        label: "Node.js",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>`
      },
      {
        label: "Next.js",
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="48" height="48" fill="url(#pattern0_178_7)"/>
          <defs>
            <pattern id="pattern0_178_7" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_178_7" transform="scale(0.0208333)"/>
            </pattern>
            <image id="image0_178_7" width="48" height="48" preserveAspectRatio="none" style="filter: brightness(0) invert(1);" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEu0lEQVR4Ac3BUWjcdwEA4O/+d9ADbyPgPRwssuDOMrRglDCGHG2QoHEN9oQVy+hqdEMn1LaIYnQRC+twpZluTyJ1ztCVIlvX2FWIWNhFg1rIQ4p9cOU6ki6VIKcGuUkIfw8Dv8C1a5LeXe62fl9Ce+WQRx4ZZAUVVFFGGYvaJGFr0hjEHvSjR2PmUMJvMIllLUpoTQ7fwzC61C3hBiqYQ0WQRQ+yuA9d6pbwKxzHoiYlNCeDp3EEacE1TOACphHbXAoFDKGIBwTLeAHPoqpBCY0bwMvoFkzhO5ixNX0Ywy7BAr6KixqQ0JijeBopXMYIJrXXEI7hk4jxLI66g6TNpTCOQ4hwHPtwVftdxS+wDTvRjzzeQM0GkjaWwhnsQ4wnMIaazqnhIuYxhF58HOdQs46kjY1jHxaxG+e9f2bxJh7BQ/gozllH0vqO4hBi7Ma09991XMIB9CKBkvdIut0Afo4IT+C8D851vIMiCvgz3naTpFtl8Ht04TjGfPBmcQ8K+CxOYsWayK1G0Y3LGHX3GMFldGPUTSJ1ORwWjCB294gxKjiMnDWRuhGkMYVJd58LmEIaI9YkBWmcQhp78XeNOYJT+DYKeAOxO0vjVXwEf9K4K/g6HsSLiCPBILpwDTMadxB59OBRPKcxORRxUHNmcA1dGLQqEhQFE5qTEjyOGIcxqLMmBEWrIsEuwQWtmcYPBSeR1TkXBLusipBDD5YwrXVjmEI3fqZzplFFD3IR8oIbiLUuxjCW8Cie1Bkx5gX5CHlBxdbN4VuCn6JHZ1QE+QgZwZz2eAW/RgZnkNJ+c4JMhKygon2ewgIexoj2qwiykbpY+yzhccGP8LAOiVAR5LRXCc8jhVPIaJ+soBKhKujWfiO4jDzG1MWCitb0CKoRyoKc9ouxH8v4BoqCBXwBw1qTFZQjlAX3IaX9ruD7gpPICSZxRfNSuF9QjrCIeXShoDNewO+QxUlbU0AG81iMBCXBkM55EhUM4aDWDQlKVkWCCcEenbOAbwpO4EGt2SOYsCoSTGIJefTpnNfwEtI4g5Tm9CGPJUxaFQmWMS44oXGx5h3BHHpxTHNOCMaxbFVS3SwOIo9LKLuzFbyLVxBrzAouYRifwR8x586G8AMsYy+qViXVVXEPCtiBl1CzuRm8hlhzFrAN/ejHOJZtLIUzyOF5TFiTdKu/4AC2Yxsu6pw/4PPYgW6cs7GfoIgFfBkr1iTdagV/xWPYiXnM6owaSvga+vAWrrjdMH6MGHvxNzdJut3bSKIfQ3gT13XGv/BvDGEAp/EfdQWcRYRn8EvvkbS+Ej6GXjyCS7iuM2bwKfTi0xgXFPAq7sVpHLKOpI2dxyfwEA7gHczqjIs4gB14F9txFvfiLPajZh1JG6vhdTyAXhSRxhRq2uu/eAuPYQBfQoTT2I/YBpI2V8PrSKCAnfgibuCq9tqOz+FD+B+ewSHUbCKhcQN4Gd2CEr6LGVvThxPoF/wDT+GcBiQ0J4NRHEZaUMYEfotpxDaXQgG7UUResIwXcQxVDUpoTQ4j+Aq61FUxhwrm8E/Bh9GDLHqQUbeEcTyHRU1K2Jo0BlFEP+7XmHmUMIFJLGtRQnvlkEceGWQFFVRRRhmL2uT/hiw05TJhFuQAAAAASUVORK5CYII="/>
          </defs>
          </svg>
       `},
      {
        label: "Supabase",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>`
      },
      {
        label: "PostgreSQL",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>`
      },
    ],
    art: `radial-gradient(circle at 10% 90%, #5eecff 0%, #04a2fd 40%, #000763 100%)`,
  },
  {
    title: "FRONTEND",
    sub: "Development",
    num: "02",
    bg: "linear-gradient(145deg, #000763 0%, #04a2fd 50%, #000763 100%)",
    accent: "#04a2fd",
    textColor: "#ffffff",
    backTitle: "FRONTEND DEVELOPMENT",
    backSubtitle: "I use the latest tools and technologies to build functional and scalable products:",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 17.5L12 22L22 17.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.5"/>
      <path d="M2 12L12 16.5L22 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>
      <path d="M2 6.5L12 11L22 6.5L12 2L2 6.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`,
    items: [
      {
        label: "React",
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="48" height="48" fill="url(#pattern0_178_9)"/>
         <defs>
          <pattern id="pattern0_178_9" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_178_9" transform="scale(0.0208333)"/>
          </pattern>
          <image id="image0_178_9" width="48" height="48" preserveAspectRatio="none" style="filter: brightness(0) invert(1);" xlink:href="data:image/png;base64,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"/>
          </defs>
          </svg>
            `},
      {
        label: "TailwindCSS",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.173.667 1.716 1.219C13.313 10.44 14.522 11.7 17 11.7c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.173-.667-1.716-1.219C15.687 7.26 14.478 6 12 6zM7.5 11.7C5.1 11.7 3.6 12.9 3 15.3c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.173.667 1.716 1.219C8.813 16.14 10.022 17.4 12.5 17.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.173-.667-1.716-1.219C11.187 12.96 9.978 11.7 7.5 11.7z"/>
        </svg>`
      },
      {
        label: "TypeScript",
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`
      },
      {
        label: "GSAP",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10"/>
          <path d="M14 8H10a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-4h-2"/>
        </svg>`
      },
    ],
    art: `radial-gradient(circle at 50% 50%, #5eecff 0%, #04a2fd 40%, #000763 100%)`,
  },
  {
    title: "UI/UX",
    sub: "Design",
    num: "03",
    bg: "linear-gradient(235deg, #000763 0%, #04a2fd 100%)",
    accent: "#04a2fd",
    textColor: "#ffffff",
    backTitle: "UI/UX Design",
    backSubtitle: "I design clean and modern interfaces:",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="currentColor" fill-opacity="0.15"/>
    </svg>`,
    items: [
      {
        label: "User-Centered Design",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>`
      },
      {
        label: "Modern & Clean UI",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>`
      },
      {
        label: "Responsive Layouts",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8"/>
          <path d="M12 17v4"/>
          <path d="M17 7h2M17 11h2"/>
        </svg>`
      },
      {
        label: "Wireframes & Prototypes",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>`
      },
    ],
    art: `radial-gradient(circle at 80% 10%, #5eecff 0%, #04a2fd 40%, #000763 100%)`,
  },
]

export const SPREAD = [
  { x: "-22vw", y: "2vh", rot: -12 },
  { x: "0vw", y: "-4vh", rot: 0 },
  { x: "22vw", y: "2vh", rot: 12 },
]