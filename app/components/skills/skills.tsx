'use client'
import { motion, Variants } from 'framer-motion';
import React, { useEffect } from 'react';

interface ImageRevealProps {
    leftImage: string;
    middleImage: string;
    rightImage: string;
}

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
            rotate: -7,
            x: -spread,
            y: -10,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: -9,
            x: -spread - 10,
            y: 0,
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
            rotate: 2,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: -1,
            x: 0,
            y: -10,
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
            rotate: 10,
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
                className="card-hover absolute origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
                variants={leftImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 30, '--hover-bg': 'linear-gradient(135deg, #f6d365, #fda085)' } as React.CSSProperties}
            >
                <img
                    src={leftImage}
                    alt="Left image"
                    className="absolute inset-0 object-cover w-full h-full p-2 rounded-2xl z-0"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-30 gap-1 pointer-events-none">
                    <span className="card-label">Design</span>       {/* change per card */}
                    <span className="card-sublabel">UI · UX</span>   {/* change per card */}
                </div>
            </motion.div>

            {/* Middle Image - Middle z-index */}
            <motion.div
                className="card-hover absolute origin-bottom-left overflow-hidden rounded-xl shadow-lg bg-white"
                variants={middleImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 20, '--hover-bg': 'linear-gradient(135deg, #5ee7df, #b490ca)' } as React.CSSProperties}
            >
                <img
                    src={middleImage}
                    alt="Middle image"
                    className="absolute inset-0 object-cover w-full h-full p-2 rounded-2xl z-0"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-30 gap-1 pointer-events-none">
                    <span className="card-label">Design</span>       {/* change per card */}
                    <span className="card-sublabel">UI · UX</span>   {/* change per card */}
                </div>
            </motion.div>

            {/* Right Image - Highest z-index */}
            <motion.div
                className="card-hover absolute origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
                variants={rightImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 10, '--hover-bg': 'linear-gradient(135deg, #96fbc4, #f9f586)' } as React.CSSProperties}
            >
                <img
                    src={rightImage}
                    alt="Right image"
                    className="absolute inset-0 object-cover w-full h-full p-2 rounded-2xl z-0"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-30 gap-1 pointer-events-none">
                    <span className="card-label">Design</span>       {/* change per card */}
                    <span className="card-sublabel">UI · UX</span>   {/* change per card */}
                </div>
            </motion.div>
        </motion.div>
    );
}
