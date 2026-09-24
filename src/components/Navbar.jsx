"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-5 md:px-16 py-3.5 md:py-6 ${
          scrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group z-50"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b1a] group-hover:scale-125 transition-transform" />
            <span className="font-black text-sm md:text-base tracking-[0.2em] text-white uppercase font-mono">
              MARK<span className="text-white/40 font-light ml-1">TECH</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] font-mono text-white/60">
            <Link href="/projects" className="hover:text-white transition-colors">
              Platforms
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Profile
            </Link>
            <a href="/#services-section" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Live Availability Pill (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>

            {/* Resume / CV Link */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/80 transition-colors"
            >
              <span>CV</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7m0 0L3 5m3 3l3-3M2 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>

            {/* Hire / Connect CTA (Desktop + Tablet) */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex px-4 md:px-5 py-2 rounded-full bg-[#ff6b1a] hover:bg-[#ff8c42] text-black text-[11px] uppercase font-bold tracking-[0.2em] font-mono transition-transform hover:scale-105"
            >
              Hire / Connect
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white z-50 focus:outline-none"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-40 transition-all duration-300 md:hidden flex flex-col justify-between px-6 pt-28 pb-10 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          {/* Status badge in mobile drawer */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Q4 2026 Engagements</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black text-white hover:text-[#ff6b1a] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black text-white hover:text-[#ff6b1a] transition-colors"
            >
              Systems & Platforms
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black text-white hover:text-[#ff6b1a] transition-colors"
            >
              Profile & Dossier
            </Link>
            <a
              href="/#services-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black text-white hover:text-[#ff6b1a] transition-colors"
            >
              What I Deliver
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black text-white hover:text-[#ff6b1a] transition-colors"
            >
              Contact & WhatsApp
            </Link>
          </nav>
        </div>

        {/* Mobile Action Controls at Drawer Bottom */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center py-3.5 rounded-xl bg-[#ff6b1a] text-black font-bold text-xs uppercase tracking-[0.2em] font-mono shadow-lg shadow-orange-500/20"
          >
            Hire / Connect Now →
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider"
          >
            Download CV / Resume (PDF)
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7m0 0L3 5m3 3l3-3M2 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>

          <div className="pt-2 text-center text-[10px] text-white/40 font-mono">
            +254 718 178 521 · oduor.markochieng@gmail.com
          </div>
        </div>
      </div>
    </>
  );
}