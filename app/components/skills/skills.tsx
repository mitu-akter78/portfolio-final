'use client'
import { motion, Variants } from 'framer-motion';
import React from 'react';

interface ImageRevealProps {
    leftImage: string;
    middleImage: string;
    rightImage: string;
}

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
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
            x: -150,
            y: 10,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 1,
            x: -160,
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
            rotate: 6,
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
            rotate: -6,
            x: 200,
            y: 20,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 3,
            x: 200,
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
            className="relative flex items-center justify-center w-full max-w-4xl h-[400px] my-12 "
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {/* Left Image - Lowest z-index */}
            <motion.div
                className="card-hover w-[220px] h-[320px] absolute origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
                variants={leftImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 20 }}
            >
                <img
                    src={leftImage}
                    alt="Left image"
                    className="absolute inset-0 object-cover w-full h-full p-2 rounded-2xl z-0"
                />
                <span className="relative z-10 text-white drop-shadow-md pointer-events-none">BACKEND</span>
            </motion.div>

            {/* Middle Image - Middle z-index */}
            <motion.div
                className="card-hover w-[220px] h-[320px] absolute origin-bottom-left overflow-hidden rounded-xl shadow-lg bg-white"
                variants={middleImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 20 }}
            >
                <img
                    src={middleImage}
                    alt="Middle image"
                    className="absolute inset-0 object-cover w-full h-full p-2 rounded-2xl z-0"
                />
                <span className="relative z-10 text-white drop-shadow-md pointer-events-none">FRONTEND</span>
            </motion.div>

            {/* Right Image - Highest z-index */}
            <motion.div
                className="card-hover w-[220px] h-[320px] absolute origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
                variants={rightImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 10 }}
            >
                <img
                    src={rightImage}
                    alt="Right image"
                    className="absolute inset-0 object-cover w-full h-full p-2 rounded-2xl z-0"
                />
                <span className="relative z-10 text-white drop-shadow-md pointer-events-none">UI/UX</span>
            </motion.div>
        </motion.div>
    );
}