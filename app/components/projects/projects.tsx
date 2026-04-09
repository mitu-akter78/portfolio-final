"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { FaArrowLeft, FaArrowRight, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiFramer, SiNodedotjs, SiGraphql, SiVercel, SiPrisma, SiThreedotjs, SiWebgl, SiFirebase, SiStripe } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import "./project.css";
import { TextScrollReveal } from "../ui/TextScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    id: "card-1",
    title: "Signal Drift",
    description: "A comprehensive platform for monitoring and analyzing signal drift in real-time. Built with modern web technologies for maximum performance.",
    techStack: [FaReact, SiTailwindcss, SiTypescript, SiNextdotjs, SiNodedotjs, SiGraphql],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: "card-2",
    title: "Phase Shift",
    description: "Advanced analytics dashboard for tracking phase shifts across multiple data streams. Features interactive visualizations and real-time updates.",
    techStack: [SiNextdotjs, SiTailwindcss, SiFramer, SiVercel, SiPrisma, SiTypescript],
    images: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop",
    ]
  },
  {
    id: "card-3",
    title: "Null Space",
    description: "An immersive digital experience exploring the concept of null space. Combines stunning visuals with cutting-edge web performance.",
    techStack: [FaReact, SiTypescript, SiFramer, SiThreedotjs, SiWebgl, SiTailwindcss],
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
    ]
  }
];

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 70;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const CardContent = ({ data }: { data: typeof cardData[0] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const imagesLength = data.images.length;

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imagesLength);
    }, 5000);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [imagesLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % imagesLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [imagesLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + imagesLength) % imagesLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [imagesLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.2;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + imagesLength) % imagesLength === index;
    const isRight = (activeIndex + 1) % imagesLength === index;
    const isMobile = containerWidth < 768;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        ...(isMobile && { width: "80%", left: "10%" }),
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(10deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        ...(isMobile && { width: "80%", left: "10%" }),
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-10deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        ...(isMobile && { width: "80%", left: "10%" }),
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <div className="projects col flex flex-col justify-center md:justify-between p-0 md:p-4 h-full gap-4 md:gap-0 ">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8">{data.title}</h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.p
                className="text-sm sm:text-base lg:text-lg opacity-90 line-clamp-4 md:line-clamp-none max-w-md font-sans normal-case"
              >
                {data.description.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 md:mt-8">
          <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 mb-2 md:mb-3 font-mono">Tech Stack</p>
          <div className="flex flex-wrap gap-3 md:gap-4 items-center">
            {data.techStack.map((Icon, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 10 },
                  visible: (i) => ({
                    opacity: 1, scale: 1, y: 0,
                    transition: { duration: 0.4, delay: 0.2 + i * 0.1, type: "spring", stiffness: 120 }
                  }),
                  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } }
                }}
                className="cursor-pointer"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="col relative flex flex-col justify-center p-0 md:p-4">
        <div className="relative w-full h-full perspective-[1000px]" ref={imageContainerRef}>
          {data.images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${data.title} ${index + 1}`}
              className="absolute w-full h-full object-cover rounded-xl md:rounded-2xl shadow-2xl"
              style={getImageStyle(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default function Projects() {
  const stickyRef = useRef<HTMLElement>(null);
  // ← refs now point at the wrappers, not the inner cards
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const wrappers = wrapperRefs.current;
    const totalCards = wrappers.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    wrappers.forEach((wrapper, i) => {
      gsap.set(wrapper, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    const trigger = ScrollTrigger.create({
      trigger: stickyRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (cardData.length - 1)}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(
          Math.floor(progress / segmentSize),
          totalCards - 1
        );
        const segProgress =
          (progress - activeIndex * segmentSize) / segmentSize;

        wrappers.forEach((wrapper, i) => {
          if (i < activeIndex) {
            gsap.set(wrapper, { yPercent: -250, rotationX: 35 });
          } else if (i === activeIndex) {
            gsap.set(wrapper, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            });
          } else {
            const behindIndex = i - activeIndex;
            gsap.set(wrapper, {
              yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
              rotationX: 0,
              scale: 1 - (behindIndex - segProgress) * cardScaleStep,
            });
          }
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="project-grid-background" />

        <div className="project-heading-wrapper">
          <div className="project-heading">
            <TextScrollReveal
              as="h1"
              animation="bottom"
              splitBy="chars"
              triggerStart="top 85%"
              triggerEnd="bottom 30%"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              my projects
            </TextScrollReveal>
          </div>
        </div>

        <section className="sticky-cards" ref={stickyRef} id="projects">
          <div className="project-grid-background" />
          <div className="blob1"></div>

          {cardData.map((card, i) => (
            // ← wrapper carries the border gradient + GSAP transform
            <div
              key={card.id}
              className="card-wrapper"
              ref={(el) => { wrapperRefs.current[i] = el; }}
            >
              {/* inner card carries only background + layout */}
              <div id={card.id} className="card">
                <CardContent data={card} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}