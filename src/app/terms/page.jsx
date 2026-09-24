export const metadata = {
  title: "Terms of Service | Mark Tech",
  description: "Terms of technical engagement and architectural services for Mark Tech.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 md:px-16 pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4 pb-8 border-b border-white/5">
          <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold">
            Engagement Framework
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight font-mono">
            Terms of Service
          </h1>
          <p className="text-xs text-white/40 font-mono">
            Last Updated: September 2026 · Mark Tech Infrastructure
          </p>
        </div>

        <div className="space-y-8 text-sm text-white/70 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              1. Engineering Engagements
            </h2>
            <p>
              All software architecture, full-stack systems engineering, and IT infrastructure administration agreements executed by Mark Tech (Oduor Mark) are governed by specific service contracts and milestone definitions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              2. Intellectual Property & Codebases
            </h2>
            <p>
              Proprietary platforms, including MarkCare HMS Core, EduFlow Academic Suite, and VERIQ Framework, are subject to their respective institutional licenses. Public open-source components are distributed under standard MIT or GNU licenses on GitHub.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}