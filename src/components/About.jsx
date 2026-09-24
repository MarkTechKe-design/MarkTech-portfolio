"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurText from "@/components/BlurText";
import { SECTION, HEADING, BIO, TECH, EDUCATION, EXPERIENCE } from "@/app/about/content";

export default function About() {
  const [profileImage, setProfileImage] = useState("/photo/about.webp");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.profileImageUrl) {
          setProfileImage(data.profileImageUrl);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about-section"
      className="relative w-full bg-[#080808] text-white px-6 md:px-16 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold mb-3">
              {SECTION.label}
            </p>
            <h2
              className="font-black text-white tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {HEADING.line1}<br />
              {HEADING.line2} <span className="text-white/20">{HEADING.line3}</span>
            </h2>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ff6b1a] font-bold hover:translate-x-1 transition-transform"
          >
            Read Complete Engineering Dossier →
          </Link>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <p className="text-xl md:text-2xl font-black text-white font-mono">03+</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Core Platforms</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <p className="text-xl md:text-2xl font-black text-[#ff6b1a] font-mono">Distinction</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">ICT Academic Honor</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <p className="text-xl md:text-2xl font-black text-white font-mono">Dual-Domain</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">CS & Healthcare</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <p className="text-xl md:text-2xl font-black text-emerald-400 font-mono">100%</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Deterministic Uptime</p>
          </div>
        </div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 w-full">
            <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImage}
                  alt="Oduor Mark"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Oduor Mark
                </h3>
                <p className="text-[#ff6b1a] text-xs font-mono tracking-widest uppercase mt-1">
                  Systems Architect · IT & Digital Ops
                </p>
              </div>

              {EDUCATION && EDUCATION.length > 0 && (
                <div className="border-t border-white/5 pt-5 space-y-3">
                  <p className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-mono font-bold">
                    Education & Credentials
                  </p>
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <p className="text-xs text-white/90 font-bold leading-snug">
                        {edu.qualification}
                      </p>
                      <p className="text-[11px] text-white/50">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-white/5 pt-5 flex flex-col gap-3">
                <Link
                  href="/about"
                  className="w-full inline-flex items-center justify-center bg-[#ff6b1a] text-black font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-[#ff8c42] transition-colors"
                >
                  Full Bio & Career History
                </Link>
                <a
                  href="https://github.com/MarkTechKe-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center border border-white/10 text-white font-medium py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-white/5 transition-colors font-mono"
                >
                  GitHub: MarkTechKe-design
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Track Record & Tools */}
          <div className="lg:col-span-8 w-full space-y-12">
            <div className="space-y-5 text-white/70 text-base md:text-lg font-light leading-relaxed">
              {BIO.slice(0, 3).map((paragraph, idx) => (
                <div key={idx} className="w-full">
                  <BlurText
                    text={paragraph}
                    delay={15}
                    animateBy="words"
                    direction="bottom"
                    stepDuration={0.2}
                    className="leading-relaxed"
                  />
                </div>
              ))}
            </div>

            {/* Experience */}
            {EXPERIENCE && EXPERIENCE.length > 0 && (
              <div className="w-full border-t border-white/5 pt-8">
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                  Industry & Practical Experience
                </h3>
                <div className="space-y-5">
                  {EXPERIENCE.map((exp, idx) => (
                    <div
                      key={idx}
                      className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-2 hover:border-[#ff6b1a]/40 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-white">
                          {exp.role} <span className="text-[#ff6b1a]">@ {exp.company}</span>
                        </h4>
                        <span className="text-xs text-white/40 font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Systems & Tech Stack */}
            <div className="w-full border-t border-white/5 pt-8">
              <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                Technical Stack & Operational Tooling
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
                {TECH && TECH.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.name}
                      className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-3.5 hover:border-[#ff6b1a]/40 transition-colors"
                    >
                      {Icon && <Icon className="w-4 h-4 text-[#ff6b1a] shrink-0" />}
                      <span className="text-xs font-mono text-white/90 truncate">
                        {t.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}