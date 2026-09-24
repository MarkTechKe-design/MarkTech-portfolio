"use client";
import Link from "next/link";

const SERVICES = [
  {
    category: "Full-Stack Engineering",
    title: "Enterprise Web Applications & Cloud Architecture",
    description: "Designing end-to-end distributed systems using Next.js App Router, Laravel, and TypeScript. Multi-tenant database partitioning, strict relational schemas in PostgreSQL/MySQL, automated CI/CD pipelines, and high-concurrency RESTful APIs.",
    deliverables: ["Full-Stack Next.js / Laravel Platforms", "PostgreSQL & Database Modeling", "API & Third-Party Integrations", "Type-Safe Architectural Blueprints"],
    badge: "Engineering Tier 01"
  },
  {
    category: "Healthcare Informatics",
    title: "Clinical EHR / HMS & Hospital Management Systems",
    description: "Leveraging dual qualifications in Computer Science and Kenya Registered Community Health Nursing (KRCHN) to engineer compliant clinical encounter tracking, automated triage queues, pharmacy stock reconciliation, and branch-aware multi-clinic portals.",
    deliverables: ["Custom EHR / HMS Core Platforms", "Clinical Triage & Patient Enrolment", "Billing & Pharmacy Stock Automation", "HIPAA/Data Protection Compliance"],
    badge: "Domain Specialized"
  },
  {
    category: "IT Infrastructure",
    title: "Enterprise IT Systems & Campus Network Administration",
    description: "Hands-on institutional IT infrastructure management informed by university laboratory experience at JOOUST. LAN/WAN network topology, Linux/Windows server administration, hardware diagnostics, and preventive workstation maintenance.",
    deliverables: ["Campus & Enterprise LAN/WAN Setup", "Workstation & Server Maintenance", "Network Diagnostics & Cabling", "User Technical Support & SLAs"],
    badge: "Field Validated"
  },
  {
    category: "Operations & Growth",
    title: "Digital Operations, Internal Tooling & Social Marketing",
    description: "Data-driven commercial expansion informed by operations leadership at Powerstar Supermarkets. Engineering automated staff biometric/attendance systems, KPI audit reporting, e-commerce catalog sync, and high-engagement social media campaigns.",
    deliverables: ["Staff Attendance & HR Tooling", "Operational KPI Audit Portals", "E-Commerce Catalog Management", "Social Media Campaigns & Brand Growth"],
    badge: "Business Growth"
  }
];

export default function Services() {
  return (
    <section
      id="services-section"
      className="relative w-full bg-[#080808] text-white px-6 md:px-16 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full space-y-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold mb-3">
              Capabilities & Deliverables
            </p>
            <h2
              className="font-black text-white tracking-tighter leading-[0.9] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              What I<br />
              <span className="text-white/25">Deliver.</span>
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
              Targeted service packages tailored for institutions, startups, and growing enterprises requiring resilient software, reliable IT infrastructure, and measurable digital growth.
            </p>
          </div>

          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ff6b1a] text-black text-xs font-bold font-mono uppercase tracking-[0.2em] hover:bg-[#ff8c42] transition-colors"
            >
              Request a Proposal →
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {SERVICES.map((s, idx) => (
            <div
              key={idx}
              className="group bg-white/[0.02] border border-white/5 hover:border-[#ff6b1a]/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#ff6b1a] tracking-[0.25em] uppercase font-mono font-bold px-3 py-1 bg-[#ff6b1a]/10 rounded-full">
                    {s.badge}
                  </span>
                  <span className="text-xs text-white/30 font-mono">0{idx + 1}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-[#ff6b1a] transition-colors">
                  {s.title}
                </h3>

                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {s.description}
                </p>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-white/40 font-bold">
                    Key Deliverables:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {s.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/80 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b1a]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-white/40 font-mono">{s.category}</span>
                <Link
                  href="/contact"
                  className="text-xs font-mono font-bold text-[#ff6b1a] hover:underline uppercase tracking-wider"
                >
                  Engage on This →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}