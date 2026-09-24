"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const VideoScrub = dynamic(() => import("../components/VideoScrub"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0a0a0a] pointer-events-none -z-10" />
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://marktech-portfolio.vercel.app/#person",
      "name": "Oduor Mark",
      "alternateName": "Mark Tech",
      "url": "https://marktech-portfolio.vercel.app",
      "image": "https://marktech-portfolio.vercel.app/photo/about.webp",
      "jobTitle": [
        "Systems Architect",
        "Full-Stack Software Engineer",
        "IT Operations Lead",
        "Social Media & Digital Operations Manager"
      ],
      "knowsAbout": [
        "Web Application Development",
        "Next.js & React",
        "Laravel & PHP",
        "Enterprise IT Infrastructure",
        "Healthcare Informatics (EHR/HMS)",
        "Progressive Web Apps (PWA)",
        "E-Commerce Catalog & Social Media Management"
      ],
      "sameAs": [
        "https://github.com/MarkTechKe-design",
        "https://x.com/MarkTechKe"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://marktech-portfolio.vercel.app/#service",
      "name": "Mark Tech Systems Engineering & IT Services",
      "url": "https://marktech-portfolio.vercel.app",
      "provider": {
        "@id": "https://marktech-portfolio.vercel.app/#person"
      },
      "description": "Enterprise software engineering, IT administration, custom web platform development, and social media brand management.",
      "areaServed": "KE",
      "serviceType": [
        "Software Engineering",
        "Full-Stack Web Development",
        "IT Administration and Technical Support",
        "Digital Marketing and Social Media Management"
      ]
    }
  ]
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const blurWrapRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      if (blurWrapRef.current && footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const vh = window.innerHeight;
        const opacity = footerTop >= vh ? 1 : Math.max(0, footerTop / vh);
        blurWrapRef.current.style.opacity = opacity;
      }
    });

    const tick = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <main className="w-full text-white overflow-x-hidden relative bg-[#080808]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grain-overlay" />
      <Cursor />

      {/* 3D Interactive Scrub Character */}
      {mounted && <VideoScrub />}

      <Navbar />

      <div ref={blurWrapRef} className="bottom-blur" />

      {/* Content Flow */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Work />
        <Services />
        <Reviews />
        <Contact />
        <div ref={footerRef}><Footer /></div>
      </div>
    </main>
  );
}