'use client'
import { motion, Variants } from 'framer-motion';
import React, { useEffect } from 'react';
import { Database, MonitorSmartphone, Palette, Layers } from 'lucide-react';

interface ImageRevealProps {
    leftImage: string;
    middleImage: string;
    rightImage: string;
}

const SpaceGradient = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 z-0 pointer-events-none bg-[#0a0a0a] rounded-2xl overflow-hidden ${className}`}>
        <div className="stars bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40"></div>
        <div className="cometHalo"></div>
        <div className="comet"></div>
    </div>
);

const DarkGlassGradient = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 z-0 pointer-events-none bg-[#111215] rounded-2xl overflow-hidden ${className}`}>
        {/* Intense top-left glow */}
        <div className="absolute top-0 left-0 w-full h-full" style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.9) 0%, rgba(30, 255, 150, 0.5) 12%, rgba(10, 100, 150, 0.2) 30%, transparent 55%)'
        }}></div>
        
        {/* Right side rays/glare */}
        <div className="absolute inset-0" style={{
            background: 'linear-gradient(235deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 15%, transparent 35%), linear-gradient(215deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 25%, transparent 45%)'
        }}></div>
        
        {/* Soft diagonal glass glare */}
        <div className="absolute inset-0" style={{
            background: 'linear-gradient(115deg, transparent 15%, rgba(255, 255, 255, 0.07) 30%, rgba(255, 255, 255, 0.01) 50%, transparent 60%)'
        }}></div>
        
        {/* Sharp edge highlight (Top and Left) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
            boxShadow: 'inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.45), inset -1px -1px 2px rgba(0, 0, 0, 0.4)'
        }}></div>
    </div>
);

const RightGlassGradient = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 z-0 pointer-events-none bg-[#111215] rounded-2xl overflow-hidden ${className}`}>
        {/* Intense top-left glow (Purple/Cyan) */}
        <div className="absolute top-0 left-0 w-full h-full" style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.9) 0%, rgba(147, 51, 234, 0.5) 12%, rgba(6, 182, 212, 0.2) 30%, transparent 55%)'
        }}></div>
        
        {/* Right side rays/glare */}
        <div className="absolute inset-0" style={{
            background: 'linear-gradient(235deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 15%, transparent 35%), linear-gradient(215deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 25%, transparent 45%)'
        }}></div>
        
        {/* Soft diagonal glass glare */}
        <div className="absolute inset-0" style={{
            background: 'linear-gradient(115deg, transparent 15%, rgba(255, 255, 255, 0.07) 30%, rgba(255, 255, 255, 0.01) 50%, transparent 60%)'
        }}></div>
        
        {/* Sharp edge highlight (Top and Left) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
            boxShadow: 'inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.45), inset -1px -1px 2px rgba(0, 0, 0, 0.4)'
        }}></div>
    </div>
);

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
    
    const [spread, setSpread] = React.useState(0)

    useEffect(() => {
        const calculate = () => setSpread(window.innerWidth * 0.20)
        calculate()                                        // run once on mount
        window.addEventListener('resize', calculate)       // re-run on resize
        return () => window.removeEventListener('resize', calculate)  // cleanup
    }, [])
    
    const containerVariants: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.2,
            }
        }
    };

    const leftImageVariants: Variants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: -8,
            x: -spread,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: -8,
            x: -spread - 10,
            y: -15,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    const middleImageVariants: Variants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: 0,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 0,
            x: 0,
            y: -15,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    const rightImageVariants: Variants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: 8,
            x: spread,
            y: 50,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 8,
            x: spread,
            y: 10,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    return (

        <motion.div
            className="relative flex items-center justify-center w-full max-w-4xl h-full my-12 "
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {/* Left Image - Lowest z-index */}
            <motion.div
                className="card-hover group absolute origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
                variants={leftImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 10, '--hover-bg': 'linear-gradient(135deg, #f6d365, #fda085)' } as React.CSSProperties}
            >
                <DarkGlassGradient />
                 <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase drop-shadow-lg">Backend</span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-start p-6 sm:p-8 z-30 pointer-events-none text-left">
                    <div className="card-text flex items-center gap-3 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                        <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                            <Database className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className=" tracking-wide">Backend</span>
                    </div>
                    <p className="card-desc opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 leading-relaxed">
                        Architecting robust and scalable server-side solutions and databases:
                    </p>
                    <ul className="card-list opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300">
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            Node.js
                        </li>
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            MongoDB
                        </li>
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            PostgreSQL
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* Middle Image - Middle z-index */}
            <motion.div
                className="card-hover group absolute origin-bottom-left overflow-hidden rounded-xl shadow-lg bg-white"
                variants={middleImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 20, '--hover-bg': 'linear-gradient(135deg, #5ee7df, #b490ca)' } as React.CSSProperties}
            >
                <SpaceGradient />
                <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase drop-shadow-lg">Frontend</span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-start p-6 sm:p-8 z-30 pointer-events-none text-left">
                    <div className="card-text flex items-center gap-3 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                        <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                            <Layers className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="tracking-wide">Frontend</span>
                    </div>
                    <p className="card-desc opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 leading-relaxed">
                        I use the latest tools and technologies to build functional and scalable products:
                    </p>
                    <ul className="card-list opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300">
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            Tailwind CSS
                        </li>
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            Next.js
                        </li>
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            TypeScript
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* Right Image - Highest z-index */}
            <motion.div
                className="card-hover group absolute origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
                variants={rightImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 10, '--hover-bg': 'linear-gradient(135deg, #96fbc4, #f9f586)' } as React.CSSProperties}
            >
                 <RightGlassGradient />
                <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase drop-shadow-lg">UI/UX</span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-start p-6 sm:p-8 z-30 pointer-events-none text-left">
                    <div className="card-text flex items-center gap-3 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                        <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                            <Palette className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="tracking-wide">UI/UX Design</span>
                    </div>
                    <p className="card-desc opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 leading-relaxed">
                        I am a designer first, developer second. I can help design clean and modern interfaces:
                    </p>
                    <ul className="card-list opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300">
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 shadow-[0_20_8px_rgba(168,85,247,0.8)]"></span>
                            User-Centered Design
                        </li>
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            Modern & Clean UI
                        </li>
                        <li className="card-list-item">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                            Responsive Layouts
                        </li>
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}
