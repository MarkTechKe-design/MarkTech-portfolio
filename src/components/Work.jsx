"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/projects";

export default function Work() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(PRODUCTS);
        }
      })
      .catch(() => {
        setProjects(PRODUCTS);
      });
  }, []);

  return (
    <section
      id="work-section"
      className="relative w-full bg-[#080808] text-white px-6 md:px-16 py-20 md:py-28 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold mb-3">
              Selected Architecture & Platforms
            </p>
            <h2
              className="font-black text-white tracking-tighter leading-[0.9] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Engineering<br />
              <span className="text-white/25">Platforms.</span>
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
              Production systems designed for deterministic uptime, multi-tenant clinical workflows,
              institutional governance, and forensic software verification.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-[#ff6b1a]/50 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#ff6b1a] hover:text-black transition-all duration-300"
            >
              View Full Catalog ({projects.length}+ Systems)
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.slice(0, 3).map((product, idx) => {
            const tagsList = product.tech 
              ? product.tech.split(",").map(t => t.trim()) 
              : (Array.isArray(product.technologies) ? product.technologies.map(t => t.name) : (product.tags || []));

            return (
              <div
                key={product.id || idx}
                className="group relative bg-white/[0.02] border border-white/5 hover:border-[#ff6b1a]/40 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] text-[#ff6b1a] tracking-[0.25em] uppercase font-bold px-3 py-1 bg-[#ff6b1a]/10 rounded-full font-mono">
                      {product.category}
                    </span>
                    <span className="text-white/30 text-xs font-mono font-bold">0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-3 group-hover:text-[#ff6b1a] transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed mb-6">
                    {product.description || product.tagline}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tagsList.slice(0, 4).map((techName) => (
                      <span
                        key={techName}
                        className="text-[10px] text-white/70 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-mono"
                      >
                        {techName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={product.link || `https://github.com/MarkTechKe-design`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#ff6b1a] font-bold group-hover:translate-x-1 transition-transform"
                  >
                    Explore Architecture
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </a>
                  <span className="text-[10px] text-white/30 uppercase font-mono tracking-widest">
                    {product.year || "Production"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}