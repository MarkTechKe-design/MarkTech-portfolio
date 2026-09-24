"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter, FiPhone, FiMail, FiArrowUpRight } from "react-icons/fi";

const DEFAULT_LINKS = {
  github: "https://github.com/MarkTechKe-design",
  linkedin: "https://linkedin.com/in/oduor-mark",
  twitter: "https://x.com/MarkTechKe",
  whatsapp: "https://wa.me/254718178521",
  email: "mailto:oduor.markochieng@gmail.com",
};

export default function Footer() {
  const [links, setLinks] = useState(DEFAULT_LINKS);

  useEffect(() => {
    fetch("/api/links")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object") {
          setLinks((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/5 pt-20 pb-12 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Col 1: Brand & Operational Identity */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b1a] group-hover:scale-125 transition-transform" />
              <span className="font-black text-xl tracking-[0.25em] uppercase font-mono">
                MARK<span className="text-white/40 font-light ml-1">TECH</span>
              </span>
            </Link>
            
            <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm">
              Led by <span className="text-white font-medium">Oduor Mark</span>. Enterprise software engineering, clinical informatics logic, mission-critical campus IT administration, and data-driven commercial operations.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#ff6b1a] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b1a] animate-pulse" />
              <span>Available for Technical & Institutional Engagements</span>
            </div>

            {/* Live Synchronized Social Quick Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6b1a]/50 text-white/70 hover:text-[#ff6b1a] transition-all"
                  title="GitHub Organization"
                >
                  <FiGithub className="w-4 h-4" />
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6b1a]/50 text-white/70 hover:text-[#ff6b1a] transition-all"
                  title="LinkedIn Profile"
                >
                  <FiLinkedin className="w-4 h-4" />
                </a>
              )}
              {links.twitter && (
                <a
                  href={links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6b1a]/50 text-white/70 hover:text-[#ff6b1a] transition-all"
                  title="X / Twitter Handle"
                >
                  <FiTwitter className="w-4 h-4" />
                </a>
              )}
              {links.whatsapp && (
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 text-white/70 hover:text-emerald-400 transition-all"
                  title="WhatsApp Direct Channel"
                >
                  <FiPhone className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Flagship Architectures */}
          <div className="lg:col-span-3 space-y-4 font-mono">
            <p className="text-[11px] text-white tracking-[0.25em] uppercase font-bold text-white/90">
              System Platforms
            </p>
            <ul className="space-y-2.5 text-xs text-white/50 font-light font-sans">
              <li>
                <Link href="/projects" className="hover:text-[#ff6b1a] transition-colors flex items-center justify-between group">
                  <span>MarkCare HMS Core</span>
                  <span className="text-[10px] text-white/30 font-mono group-hover:text-[#ff6b1a]">EHR</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#ff6b1a] transition-colors flex items-center justify-between group">
                  <span>EduFlow Academic Suite</span>
                  <span className="text-[10px] text-white/30 font-mono group-hover:text-[#ff6b1a]">LMS</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#ff6b1a] transition-colors flex items-center justify-between group">
                  <span>VERIQ Forensic Engine</span>
                  <span className="text-[10px] text-white/30 font-mono group-hover:text-[#ff6b1a]">Audit</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#ff6b1a] transition-colors flex items-center justify-between group">
                  <span>Full Platform Catalog</span>
                  <FiArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#ff6b1a]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Dossier & Milestones */}
          <div className="lg:col-span-3 space-y-4 font-mono">
            <p className="text-[11px] text-white tracking-[0.25em] uppercase font-bold text-white/90">
              Dossier & Milestones
            </p>
            <ul className="space-y-2.5 text-xs text-white/50 font-light font-sans">
              <li>
                <Link href="/about" className="hover:text-[#ff6b1a] transition-colors">
                  Biography & Dual-Domain Focus
                </Link>
              </li>
              <li>
                <Link href="/about#aspirations" className="hover:text-[#ff6b1a] transition-colors">
                  Aspirations & Strategic Goals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ff6b1a] transition-colors">
                  Academic Credentials & Distinctions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ff6b1a] transition-colors">
                  JOOUST & Commercial Track Record
                </Link>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b1a] transition-colors flex items-center gap-1.5 text-white/70">
                  <span>Download Curriculum Vitae (PDF)</span>
                  <FiArrowUpRight className="w-3 h-3 text-[#ff6b1a]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Legal */}
          <div className="lg:col-span-2 space-y-4 font-mono">
            <p className="text-[11px] text-white tracking-[0.25em] uppercase font-bold text-white/90">
              Governance
            </p>
            <ul className="space-y-2.5 text-xs text-white/50 font-light font-sans">
              <li>
                <Link href="/privacy" className="hover:text-[#ff6b1a] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#ff6b1a] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ff6b1a] transition-colors">
                  Direct Inquiries
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#ff6b1a] transition-colors text-white/30 hover:text-white/60">
                  Operations Console
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} MARK TECH · Engineered with Next.js 15 & Local Atomic Store.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60">Operational Node: Siaya & Nairobi, KE</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}