"use client";
import { useEffect, useState } from "react";

const FALLBACK_REVIEWS = [
  {
    id: "rev-1",
    author: "Systems Operations Directorate",
    role: "Institutional ICT Administration",
    company: "Campus Partner",
    content: "Mark displayed exceptional attention to operational uptime and lab diagnostics. His structured approach to campus networking and user support kept faculty operations running smoothly.",
    rating: 5,
  },
  {
    id: "rev-2",
    author: "Commercial Operations Lead",
    role: "Retail & E-Commerce Division",
    company: "Powerstar Supermarkets",
    content: "Oduor Mark combined web engineering with practical social marketing. The staff attendance workflows and KPI tracking tools he architected brought immediate accountability to our daily operations.",
    rating: 5,
  },
  {
    id: "rev-3",
    author: "Clinical Informatics Advisor",
    role: "Healthcare Systems Consultant",
    company: "HealthTech Kenya",
    content: "Finding someone who understands clinical triage and database normalization at the same time is rare. His work on MarkCare HMS demonstrates deep domain insight that off-the-shelf software misses.",
    rating: 5,
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="reviews-section"
      className="relative w-full bg-[#080808] text-white px-6 md:px-16 py-20 md:py-28 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold mb-3">
              Client Endorsements & Peer Verification
            </p>
            <h2
              className="font-black text-white tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Tested.<br />
              <span className="text-white/25">Endorsed.</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-white/40">
            Managed via Secure Administrative Portal
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {reviews.slice(0, 3).map((r, idx) => (
            <div
              key={r.id || idx}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-7 flex flex-col justify-between space-y-6 hover:border-[#ff6b1a]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#ff6b1a]">
                  {"★".repeat(r.rating || 5)}
                </div>
                <p className="text-sm text-white/70 font-light leading-relaxed italic">
                  &ldquo;{r.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-sm font-bold text-white font-mono">
                  {r.author || r.name}
                </p>
                <p className="text-xs text-white/40">
                  {r.role} · <span className="text-[#ff6b1a]">{r.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}