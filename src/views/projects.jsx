"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/projects";

function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function safeUrl(url) {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function ProjectShowcase({ items, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const router = useRouter();
  const current = items[idx];

  const go = useCallback((next) => {
    if (next < 0 || next >= items.length || next === idx) return;
    setIdx(next);
  }, [items.length, idx]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "ArrowLeft") go(idx - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [idx, go, onClose]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-[#ff6b1a] tracking-[0.4em] uppercase font-bold">
          {current.category || "Case Study"}
        </span>
        <button
          onClick={onClose}
          className="text-xs uppercase tracking-widest text-white/50 hover:text-white px-4 py-2 border border-white/10 rounded-full"
        >
          Close (Esc)
        </button>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">
          {current.title}
        </h2>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {current.description}
        </p>
        <div>
          <button
            onClick={() => router.push(current.detailUrl || `/project/${current.id}`)}
            className="inline-flex items-center gap-3 bg-[#ff6b1a] text-black font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#ff8c42] transition-colors"
          >
            Explore Case Study
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-white/40 font-mono">
        <span>{idx + 1} / {items.length}</span>
        <div className="flex gap-4">
          <button disabled={idx === 0} onClick={() => go(idx - 1)} className="hover:text-white disabled:opacity-20">PREV</button>
          <button disabled={idx === items.length - 1} onClick={() => go(idx + 1)} className="hover:text-white disabled:opacity-20">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert static PRODUCTS to card format
  const staticItems = PRODUCTS.map((p, idx) => ({
    id: p.slug,
    title: p.title,
    description: p.tagline,
    category: p.category,
    image: p.coverImage,
    tech: p.technologies.map((t) => t.name).join(" · "),
    detailUrl: `/project/${p.slug}`,
    num: `0${idx + 1}`,
  }));

  const [items, setItems] = useState(staticItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showcaseIdx, setShowcaseIdx] = useState(null);

  useEffect(() => {
    fetch("/api/works")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const cmsItems = data
            .filter((d) => !PRODUCTS.some((p) => p.slug === d.id || p.id === d.id))
            .map((d, i) => ({
              id: d.id,
              title: d.title,
              description: d.description || "",
              category: d.category || "Client Project",
              image: d.photo_url || d.image_url || "/photo/about.webp",
              tech: d.tech || "",
              detailUrl: `/project/${d.id}`,
              num: `0${staticItems.length + i + 1}`,
            }));

          setItems([...staticItems, ...cmsItems]);
        }
      })
      .catch(() => {
        // Fall back to static flagship products cleanly
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];

  const filtered = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 md:px-16 pt-32 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-medium mb-4">
            Engineering Catalog
          </p>
          <h1
            className="font-black text-white tracking-tighter leading-[0.88] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Software &<br />
            <span className="text-white/20">Case Studies.</span>
          </h1>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#ff6b1a] text-black font-bold"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => router.push(item.detailUrl)}
              className="group cursor-pointer bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-[#ff6b1a]/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] text-[#ff6b1a] tracking-[0.3em] uppercase font-bold px-3 py-1 bg-[#ff6b1a]/10 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-white/30 text-xs font-mono">{item.num}</span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-4 group-hover:text-[#ff6b1a] transition-colors">
                  {item.title}
                </h3>

                <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                {item.tech && (
                  <p className="text-[11px] text-white/30 font-mono border-t border-white/5 pt-4">
                    {item.tech}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showcaseIdx !== null && (
        <ProjectShowcase
          items={filtered}
          startIdx={showcaseIdx}
          onClose={() => setShowcaseIdx(null)}
        />
      )}
    </main>
  );
}