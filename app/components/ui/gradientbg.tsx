"use client"

import react from "react";
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface GradientBackgroundProps {
  cometColor?: string
  haloColor?: string
  angle?: number
}

export function GradientBackground({
  cometColor = 'rgba(210,180,255,0.9)',
  haloColor  = 'rgba(140,100,255,0.35)',
  angle      = -22,
}: GradientBackgroundProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {/* Outer halo */}
      <div style={{
        position:      'absolute',
        width:         '140%',
        height:        '200px',
        top:           '14%',
        left:          '50%',
        transform:     `translateX(-55%) rotate(${angle}deg)`,
        borderRadius:  '50%',
        background:    `radial-gradient(ellipse at center, ${haloColor} 0%, transparent 75%)`,
        filter:        'blur(40px)',
        pointerEvents: 'none',
      }} />
 
      {/* Comet core */}
      <div style={{
        position:      'absolute',
        width:         '120%',
        height:        '140px',
        top:           '18%',
        left:          '50%',
        transform:     `translateX(-55%) rotate(${angle}deg)`,
        borderRadius:  '50%',
        background:    `radial-gradient(ellipse at center, white 0%, ${cometColor} 18%, rgba(100,80,220,0.25) 62%, transparent 80%)`,
        filter:        'blur(22px)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  )
}