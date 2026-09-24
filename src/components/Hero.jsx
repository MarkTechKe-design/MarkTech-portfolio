"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
      gsap.from(".hero-line",  { y: 90, opacity: 0, stagger: 0.1, duration: 1.1, ease: "power4.out", delay: 0.6 });

      gsap.from(".hero-letter", {
        y: 100,
        opacity: 0,
        rotateX: -40,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.7
      });

      gsap.from(".hero-sub",   { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.4 });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 60%",
          end:   "bottom 10%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[120vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl">
        <p className="hero-label text-[11px] md:text-xs text-[#ff6b1a] tracking-[0.3em] uppercase font-bold mb-6">
          Systems Architect · Full-Stack Engineer · IT Operations
        </p>

        <h1
          className="font-black tracking-tighter leading-[0.88] mb-10 flex flex-col relative z-10"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
        >
          <span className="hero-line block ghost z-0">I am</span>
          <span className="block text-white -mt-1 md:-mt-4 z-10 hero-perspective whitespace-nowrap">
            {"Oduor Mark.".split("").map((char, index) => (
              <span key={index} className="hero-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <div className="max-w-xl hero-sub flex flex-col gap-5">
          <BlurText
            text="I engineer resilient enterprise web platforms, manage mission-critical IT infrastructure, and lead high-performing digital marketing and brand operations."
            delay={25}
            animateBy="words"
            direction="bottom"
            stepDuration={0.2}
            className="text-base md:text-lg text-white/70 font-medium leading-relaxed"
          />
          <BlurText
            text="Experience spanning ICT technical administration at JOOUST, web & social media management at Powerstar Supermarkets, and lead architecture for MarkCare HMS and EduFlow."
            delay={20}
            animateBy="words"
            direction="bottom"
            stepDuration={0.18}
            className="text-xs md:text-sm text-white/50 leading-relaxed font-mono"
          />

          <p className="mt-6 text-[10px] text-[#ff6b1a] tracking-[0.4em] uppercase font-bold">
            Explore Experience & Platforms ↓
          </p>
        </div>
      </div>
    </section>
  );
}