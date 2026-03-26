"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./nav.css";

/* ─────────────────────────────────────────────
   RollingLink
───────────────────────────────────────────── */
function RollingLink({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const top = ref.current.querySelector(".roll-top");
    const bottom = ref.current.querySelector(".roll-bottom");
    gsap.to(top, { y: "-110%", duration: 0.5, ease: "power3.inOut" });
    gsap.fromTo(bottom, { y: "110%" }, { y: "0%", duration: 0.5, ease: "power3.inOut" });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    const top = ref.current.querySelector(".roll-top");
    const bottom = ref.current.querySelector(".roll-bottom");
    gsap.to(top, { y: "0%", duration: 0.5, ease: "power3.inOut" });
    gsap.to(bottom, { y: "110%", duration: 0.5, ease: "power3.inOut" });
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`rolling-link ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="roll-top">{children}</span>
      <span className="roll-bottom" style={{ transform: "translateY(110%)" }}>
        {children}
      </span>
    </a>
  );
}

/* ─────────────────────────────────────────────
   Arrow icon
───────────────────────────────────────────── */
function ArrowIcon() {
  return <span className="arrow-icon">↗</span>;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const PRIMARY_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];
const SOCIAL_LINKS = [
  { label: "Github", href: "#" },
  { label: "Linkdin", href: "#" },
  { label: "Fiver", href: "#" },
];

/* ─────────────────────────────────────────────
   Nav
───────────────────────────────────────────── */
export default function Nav() {
  useEffect(() => {
    const navToggler = document.querySelector(".nav-toggler");
    const navBgs = document.querySelectorAll(".nav-bg");
    let isMenuOpen = false;
    let isAnimating = false;

    if (!navToggler) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => { isAnimating = false; },
      onReverseComplete: () => {
        gsap.set(".nav-link-inner", { y: "100%" });
        isAnimating = false;
      },
    });

    function animateLinksIn() {
      gsap.fromTo(
        ".nav-link-inner",
        { y: "100%" },
        { y: "0%", duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.8 }
      );
    }

    const handleToggle = () => {
      if (isAnimating) return;
      isAnimating = true;
      navToggler.classList.toggle("open");
      if (!isMenuOpen) {
        tl.play();
        animateLinksIn();
      } else {
        tl.reverse();
      }
      isMenuOpen = !isMenuOpen;
    };

    navToggler.addEventListener("click", handleToggle);

    tl.to(navBgs, { scaleX: 1, duration: 0.75, stagger: 0.1, ease: "power3.inOut" });
    tl.to(
      ".nav-items",
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.75, ease: "power3.inOut" },
      "-=0.6"
    );

    return () => {
      tl.kill();
      navToggler.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <>
      {/* ── Top bar (untouched) ── */}
      <nav>
        <div className="nav-logo">
          <a href="#home">
            <span>Sadia</span>
          </a>
        </div>
        <button className="nav-toggler">
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ── Overlay ── */}
      <div className="nav-content">
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>

        {/* ── Panel ── */}
        <div className="nav-items">

          {/* Left: primary links + mobile socials */}
          <div className="nav-left">

            {PRIMARY_LINKS.map((item) => (
              <div key={item} className="link-reveal-wrap">
                <div className="nav-link-inner" style={{ transform: "translateY(100%)" }}>
                  <RollingLink href={`#${item.toLowerCase()}`} className="nav-primary-link">
                    {item}
                  </RollingLink>
                </div>
              </div>
            ))}

            {/* Mobile socials */}
            <div className="nav-socials-mobile">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <div key={label} className="link-reveal-wrap">
                  <div className="nav-link-inner" style={{ transform: "translateY(100%)" }}>
                    <RollingLink href={href} className="nav-social-link">
                      {label} <ArrowIcon />
                    </RollingLink>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: desktop socials + SADIA */}
          <div className="nav-right">

            <div className="nav-socials-desktop">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <div key={label} className="link-reveal-wrap">
                  <div className="nav-link-inner" style={{ transform: "translateY(100%)" }}>
                    <RollingLink href={href} className="nav-social-link">
                      {label} <ArrowIcon />
                    </RollingLink>
                  </div>
                </div>
              ))}
            </div>

            <div className="link-reveal-wrap" style={{ overflow: "visible" }}>
              <div className="nav-link-inner nav-sadia" style={{ transform: "translateY(100%)" }}>
                SADIA
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
