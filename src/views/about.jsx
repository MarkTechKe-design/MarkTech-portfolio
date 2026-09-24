"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlurText from "@/components/BlurText";
import { SECTION, HEADING, BIO, TECH, EDUCATION, EXPERIENCE, ACHIEVEMENTS, ASPIRATIONS } from "@/app/about/content";

export default function AboutPage() {
  const [profileImage, setProfileImage] = useState("/photo/about.webp");
  const [imgError, setImgError] = useState(false);

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

  const PILLARS = [
    {
      title: "Enterprise Web & Platform Engineering",
      tagline: "Scalable Full-Stack Web Architecture",
      desc: "Architecting end-to-end web applications with Next.js, TypeScript, and Laravel. Specializing in strict database integrity, relational modeling in PostgreSQL/MySQL, and high-performance client experiences.",
      tags: ["Next.js 15", "TypeScript", "Laravel", "PostgreSQL", "REST APIs", "Tailwind CSS"],
      accent: "border-[#ff6b1a]/40 bg-[#ff6b1a]/5"
    },
    {
      title: "Healthcare Informatics & Clinical Logic",
      tagline: "Bridging Medicine & Code",
      desc: "A rare synergy combining formal Kenya Registered Community Health Nurse training with Computer Science. Designing deterministic EHR systems, clinical queues, triage workflows, and fiscal reconciliation (MarkCare HMS Core).",
      tags: ["Clinical Workflows", "EHR Systems", "Branch-Aware Tenancy", "MarkCare Core"],
      accent: "border-emerald-500/40 bg-emerald-500/5"
    },
    {
      title: "IT Infrastructure & Systems Administration",
      tagline: "Mission-Critical Campus & Enterprise IT",
      desc: "Proven field experience managing campus networks, workstation diagnostics, structured cabling, operating systems maintenance, and user support operations at JOOUST Siaya Branch.",
      tags: ["Network Topology", "Hardware Diagnostics", "User Support", "Server Management", "Linux/Windows"],
      accent: "border-sky-500/40 bg-sky-500/5"
    },
    {
      title: "Business Automation & Digital Operations",
      tagline: "Data-Driven Commercial Growth",
      desc: "Spearheading modern retail and organizational workflows: staff biometric/attendance integration, e-commerce catalog pipelines, video conference orchestration, and automated KPI audit dashboards.",
      tags: ["KPI Auditing", "Staff Attendance", "E-Commerce", "Digital Marketing", "Social Media Ops"],
      accent: "border-purple-500/40 bg-purple-500/5"
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 md:px-16 pt-32 pb-24 w-full">
      <div className="max-w-7xl mx-auto w-full space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
          <div>
            <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold mb-3">
              {SECTION.label}
            </p>
            <h1
              className="font-black text-white tracking-tighter leading-[0.88]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              {HEADING.line1}<br />
              {HEADING.line2} <span className="text-white/20">{HEADING.line3}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/60">
              Open to Engineering & IT Engagements
            </span>
          </div>
        </div>

        {/* Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
            <p className="text-2xl md:text-3xl font-black text-white font-mono">03+</p>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Flagship Architectures</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
            <p className="text-2xl md:text-3xl font-black text-[#ff6b1a] font-mono">Distinction</p>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">In ICT Qualification</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
            <p className="text-2xl md:text-3xl font-black text-white font-mono">Dual-Domain</p>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Healthcare & Computer Science</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
            <p className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">100%</p>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Operational Reliability</p>
          </div>
        </div>

        {/* Two-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Identity, Credentials, Social */}
          <div className="lg:col-span-4 w-full">
            <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 sticky top-28 space-y-6">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                {!imgError ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={profileImage}
                    alt="Oduor Mark"
                    className="w-full h-full object-cover"
                    onError={() => {
                      if (profileImage !== "/photo/about.webp") {
                        setProfileImage("/photo/about.webp");
                      } else {
                        setImgError(true);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02] text-white/30 space-y-2">
                    <span className="text-3xl font-mono font-bold text-[#ff6b1a]">OM</span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">Oduor Mark</span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Oduor Mark</h2>
                <p className="text-[#ff6b1a] text-xs font-mono tracking-widest uppercase mt-1">
                  Systems Architect · IT & Digital Ops
                </p>
              </div>

              {/* Education */}
              {EDUCATION && (
                <div className="border-t border-white/5 pt-5 space-y-3">
                  <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold font-mono">
                    Formal Education & Honors
                  </p>
                  <div className="space-y-3">
                    {EDUCATION.map((edu, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <p className="text-xs font-bold text-white leading-snug">
                          {edu.qualification}
                        </p>
                        <p className="text-[11px] text-white/50">
                          {edu.institution}
                        </p>
                        <span className="text-[10px] text-[#ff6b1a] font-mono block">
                          {edu.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="border-t border-white/5 pt-5 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center bg-[#ff6b1a] text-black font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#ff8c42] transition-colors"
                >
                  Initiate Discussion
                </Link>
                <a
                  href="https://github.com/MarkTechKe-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center border border-white/10 text-white font-medium py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-white/5 transition-colors font-mono"
                >
                  GitHub: MarkTechKe-design
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Bento Pillars, Experience, Aspirations */}
          <div className="lg:col-span-8 w-full space-y-12">
            
            {/* Executive Summary */}
            <div className="space-y-5 text-white/75 text-base md:text-lg font-light leading-relaxed">
              {BIO.map((paragraph, idx) => (
                <div key={idx} className="w-full">
                  <BlurText
                    text={paragraph}
                    delay={12}
                    animateBy="words"
                    direction="bottom"
                    stepDuration={0.18}
                    className="leading-relaxed"
                  />
                </div>
              ))}
            </div>

            {/* Strategic Pillars (Bento Grid) */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                Specialized Domains of Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {PILLARS.map((pillar, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl border ${pillar.accent} transition-all duration-300 hover:border-white/20 space-y-3 flex flex-col justify-between`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff6b1a]">
                        {pillar.tagline}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed font-light mt-2">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Experience */}
            {EXPERIENCE && (
              <div className="border-t border-white/5 pt-8">
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                  Professional Track Record
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

            {/* Key Achievements */}
            {ACHIEVEMENTS && (
              <div className="border-t border-white/5 pt-8">
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                  Verified Engineering & Academic Milestones
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {ACHIEVEMENTS.map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b1a] mt-2 shrink-0" />
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
                        {ach}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Aspirations & Future Direction */}
            {ASPIRATIONS && (
              <div className="border-t border-white/5 pt-8" id="aspirations">
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                  Vision & Strategic Aspirations
                </h3>
                <div className="bg-gradient-to-br from-[#ff6b1a]/10 via-transparent to-white/[0.02] border border-[#ff6b1a]/20 p-6 md:p-8 rounded-2xl space-y-4">
                  {ASPIRATIONS.map((asp, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-[#ff6b1a] font-mono text-xs font-bold mt-0.5">0{idx + 1}.</span>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        {asp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Stack Pills */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono mb-6">
                Technical Stack & Infrastructure Tooling
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
                {TECH.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.name}
                      className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-3.5 hover:border-[#ff6b1a]/40 transition-colors"
                    >
                      {Icon && <Icon className="w-4 h-4 text-[#ff6b1a] shrink-0" />}
                      <span className="text-xs font-mono font-medium text-white/90 truncate">
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
    </main>
  );
}