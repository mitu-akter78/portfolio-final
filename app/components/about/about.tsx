"use client"

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "lenis";
import "./about.css";


export default function DystopianWorld() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateChars = (chars: Element[], reverse = false) => {
      const staggerOptions = {
        each: 0.35,
        from: reverse ? "start" : "end",
        ease: "linear",
      };
      gsap.fromTo(
        chars,
        { fontWeight: 100 },
        {
          fontWeight: 900,
          duration: 1,
          ease: "none",
          stagger: staggerOptions,
          scrollTrigger: {
            trigger: (chars[0] as HTMLElement).closest(".marquee-container"),
            start: "50% bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    };

    // Slight rAF delay so DOM is fully painted before SplitType runs
    const rafId = requestAnimationFrame(() => {
      const splitText = new SplitType(".item h1", { types: "chars" });

      const marqueeContainers = document.querySelectorAll(".marquee-container");
      marqueeContainers.forEach((container, index) => {
        let start = "0%";
        let end = "-15%";
        if (index % 2 === 0) {
          start = "0%";
          end = "10%";
        }

        const marquee = container.querySelector(".marquee");
        const words = marquee!.querySelectorAll(".item h1");

        gsap.fromTo(
          marquee,
          { x: start },
          {
            x: end,
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "150% top",
              scrub: true,
            },
          }
        );

        words.forEach((word) => {
          const chars = Array.from(word.querySelectorAll(".char"));
          if (chars.length) {
            const reverse = index % 2 !== 0;
            animateChars(chars, reverse);
          }
        });
      });

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // Store lenis on window for cleanup access
      (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    });

    return () => {
      cancelAnimationFrame(rafId);
      const w = window as Window & { __lenis?: Lenis };
      if (w.__lenis) {
        w.__lenis.destroy();
        delete w.__lenis;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="container">
      
      
      <section className="marquees"></section>
      
      <section className="marquees">
        <div className="marquee-container" id="marquee-1">
          <div className="marquee">
            <div className="item">
              <img src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&q=80" alt="" />
            </div>
            <div className="item with-text"><h1>Unique</h1></div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80" alt="" />
            </div>
          </div>
        </div>
        <div className="marquee-container" id="marquee-2">
          <div className="marquee">
            <div className="item">
              <img src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" alt="" />
            </div>
            <div className="item with-text"><h1>Release</h1></div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80" alt="" />
            </div>
          </div>
        </div>
        <div className="marquee-container" id="marquee-3">
          <div className="marquee">
            <div className="item">
              <img src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&q=80" alt="" />
            </div>
            <div className="item with-text"><h1>2500</h1></div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&q=80" alt="" />
            </div>
          </div>
        </div>
        <div className="marquee-container" id="marquee-4">
          <div className="marquee">
            <div className="item">
              <img src="https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&q=80" alt="" />
            </div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=600&q=80" alt="" />
            </div>
            <div className="item with-text"><h1>Rarity</h1></div>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="footer">
        <h1>The End</h1>
      </section>
    </div>
  );
}