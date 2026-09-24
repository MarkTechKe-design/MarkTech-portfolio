export const metadata = {
  title: "Privacy Policy | Mark Tech",
  description: "Data privacy, security standards, and telemetry disclosure for Mark Tech systems.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 md:px-16 pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4 pb-8 border-b border-white/5">
          <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold">
            Data Governance
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight font-mono">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/40 font-mono">
            Last Updated: September 2026 · Mark Tech Infrastructure
          </p>
        </div>

        <div className="space-y-8 text-sm text-white/70 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              1. Information Collection & Scope
            </h2>
            <p>
              Mark Tech collects information transmitted voluntarily through direct contact submissions, consultation bookings, and technical engagement inquiries (including names, professional emails, and project specifications).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              2. Clinical Systems (MarkCare HMS) & Institutional Compliance
            </h2>
            <p>
              Healthcare architectures engineered under MarkCare HMS Core adhere to strict clinical data segregation, multi-facility branch separation, and local data protection regulations. Health records and patient triage logs are never ingested into public telemetry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              3. Telemetry & Hosting Independence
            </h2>
            <p>
              This portfolio operates on self-hosted, atomic file stores. We do not sell, license, or share user telemetry with third-party advertising brokers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}