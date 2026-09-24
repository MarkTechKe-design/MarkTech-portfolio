"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import PageShell from "../../../components/PageShell";
import { getProductBySlug } from "@/data/projects";

function safeUrl(url) {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [canonicalProduct, setCanonicalProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    // 1. Resolve canonical static product first
    const staticMatch = getProductBySlug(id);
    if (staticMatch) {
      setCanonicalProduct(staticMatch);
      setLoading(false);
      return;
    }

    // 2. Fall back to dynamic CMS project in Supabase via API
    fetch(`/api/works/${id}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setProject(data);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!project && !canonicalProduct) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    gsap.from(".proj-hero-text", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      delay: 0.2,
    });
    gsap.from(".proj-body", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.4,
    });
  }, [project, canonicalProduct]);

  return (
    <PageShell>
      <div className="min-h-screen bg-[#080808] text-white">
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-6 h-6 border-2 border-white/20 border-t-[#ff6b1a] rounded-full animate-spin" />
          </div>
        )}

        {notFound && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <p className="text-white/20 text-sm tracking-widest uppercase">
              Project not found
            </p>
            <Link
              href="/projects"
              className="text-[#ff6b1a] text-[11px] tracking-[0.4em] uppercase hover:opacity-70 transition-opacity"
            >
              Back to projects
            </Link>
          </div>
        )}

        {/* FLAGSHIP CANONICAL PRODUCT VIEW */}
        {canonicalProduct && (
          <>
            {/* HERO */}
            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#080808]" />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 md:pb-14">
                <div className="proj-hero-text">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase font-bold border border-[#ff6b1a]/30 px-3 py-1 rounded-full">
                      {canonicalProduct.category}
                    </span>
                    <span className="text-[10px] text-white/50 tracking-widest uppercase border border-white/10 px-3 py-1 rounded-full">
                      {canonicalProduct.status}
                    </span>
                  </div>
                  <h1
                    className="font-black tracking-tighter leading-[0.88] text-white"
                    style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
                  >
                    {canonicalProduct.title}
                  </h1>
                  <p className="text-white/60 text-base md:text-xl font-light mt-4 max-w-3xl leading-relaxed">
                    {canonicalProduct.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* BODY & CASE STUDY */}
            <div className="proj-body px-6 md:px-16 py-16 md:py-20 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-[1fr_320px] gap-12 md:gap-20">
                {/* Main Content */}
                <div>
                  <section className="mb-14">
                    <h2 className="font-black text-xl text-white mb-4 tracking-tight">
                      Executive Summary
                    </h2>
                    <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
                      {canonicalProduct.caseStudy.executiveSummary}
                    </p>
                  </section>

                  <section className="mb-14">
                    <h2 className="font-black text-xl text-white mb-4 tracking-tight">
                      Problem Statement
                    </h2>
                    <p className="text-white/60 text-base font-light leading-relaxed">
                      {canonicalProduct.caseStudy.problemStatement}
                    </p>
                  </section>

                  <section className="mb-14">
                    <h2 className="font-black text-xl text-white mb-4 tracking-tight">
                      Solution Architecture
                    </h2>
                    <p className="text-white/60 text-base font-light leading-relaxed">
                      {canonicalProduct.caseStudy.solutionArchitecture}
                    </p>
                  </section>

                  {/* Engineering Challenges */}
                  <section className="mb-14">
                    <h2 className="font-black text-xl text-white mb-6 tracking-tight">
                      Architectural Challenges & Mitigations
                    </h2>
                    <div className="space-y-6">
                      {canonicalProduct.caseStudy.challenges.map((c, i) => (
                        <div
                          key={i}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
                        >
                          <h3 className="text-base font-bold text-white mb-2">
                            {c.challenge}
                          </h3>
                          <p className="text-sm text-white/50 mb-3 leading-relaxed">
                            <strong className="text-[#ff6b1a] font-normal">Mitigation: </strong>
                            {c.architecturalMitigation}
                          </p>
                          <p className="text-xs text-white/40 font-mono">
                            Outcome: {c.outcome}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Capabilities Matrix */}
                  <section>
                    <h2 className="font-black text-xl text-white mb-6 tracking-tight">
                      Verified Capabilities & Roadmap
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {canonicalProduct.caseStudy.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-white">
                              {cap.title}
                            </span>
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase tracking-wider ${
                                cap.status === "VERIFIED"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : cap.status === "INTEGRATION-READY"
                                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}
                            >
                              {cap.status}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">
                            {cap.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div>
                  <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:sticky md:top-28 space-y-6">
                    <h3 className="font-bold text-white text-base tracking-tight">
                      Architecture Stack
                    </h3>

                    <div>
                      <p className="text-[9px] text-white/30 tracking-[0.4em] uppercase mb-3">
                        Technologies
                      </p>
                      <ul className="space-y-3">
                        {canonicalProduct.technologies.map((t) => (
                          <li key={t.name} className="text-xs">
                            <span className="font-bold text-white block">
                              {t.name}
                            </span>
                            <span className="text-white/40 text-[11px] leading-tight block">
                              {t.purpose}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <Link
                        href="/#contact-section"
                        className="w-full inline-flex items-center justify-center bg-[#ff6b1a] text-black font-bold py-3 rounded-xl text-[11px] uppercase tracking-widest hover:bg-[#ff8c42] transition-colors"
                      >
                        Inquire About Platform
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DYNAMIC CMS PROJECT VIEW */}
        {project && !canonicalProduct && (
          <>
            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#080808]" />
              )}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 md:pb-14">
                <div className="proj-hero-text">
                  {project.category && (
                    <span className="inline-block text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase font-medium mb-3 border border-[#ff6b1a]/30 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  )}
                  <h1
                    className="font-black tracking-tighter leading-[0.88] text-white"
                    style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
                  >
                    {project.title}
                  </h1>
                </div>
              </div>
            </div>

            <div className="proj-body px-6 md:px-16 py-16 md:py-20 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-[1fr_280px] gap-12 md:gap-20">
                <div>
                  {project.description && (
                    <>
                      <h2 className="font-black text-xl text-white mb-5 tracking-tight">
                        Overview
                      </h2>
                      <p className="text-white/55 text-base md:text-lg font-light leading-relaxed mb-12">
                        {project.description}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:sticky md:top-28">
                    <h3 className="font-bold text-white text-base tracking-tight mb-4">
                      Project Details
                    </h3>
                    {project.link && (
                      <a
                        href={safeUrl(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center bg-[#ff6b1a] text-black font-bold py-3 rounded-xl text-[11px] uppercase tracking-widest hover:bg-[#ff8c42] transition-colors"
                      >
                        View External Link
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}