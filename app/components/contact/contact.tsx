"use client";

import React from "react";
import ShapesPit from "./ballpit";
import { Outfit } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import "./contact.css";
import SocialBtn from "../ui/social-btn";
import ContactBtn from "../ui/contact-btn";

const outfit = Outfit({ subsets: ["latin"] });

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <main>

      <div className={`contact-root ${outfit.className}`}>
        
        <div className="contact-grid-background" />

        {/* Layer 1 — brand text, behind everything */}
        <div className="brand-text-wrap">
          <span className="brand-text">sadia</span>
        </div>

        {/* Layer 2 — ballpit */}
        <div className="ballpit-layer">
          <ShapesPit count={420} />
        </div>

        {/* Layer 3 — foreground content */}
        <div className="content-layer">
          <motion.div
            className="content-card"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={itemVariants} className="contact-heading">
              Let's Build Something <br />
              <span className="contact-heading-accent">Remarkable</span> <br />
              Together
            </motion.h1>

            <ContactBtn />
            
          </motion.div>

          <div className="social-block">
            <div className="social-title">
              Social Links <span className="social-arrow">↓</span>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">𝕏</span>
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">in</span>
                <span>LinkedIn</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">gh</span>
                <span>GitHub</span>
              </a><SocialBtn />
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span className="footer-copy">Copyright &copy; 2025 neurezstudio</span>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">Privacy &amp; Policy</Link>
            <Link href="/terms" className="footer-legal-link">Terms &amp; Conditions</Link>
          </div>
        </div>

      </div>
    </main>
  );
}