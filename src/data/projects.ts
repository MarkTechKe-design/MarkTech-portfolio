import type { ProductContract } from '@/types/product';

export const PRODUCTS: ProductContract[] = [
  {
    id: "markcare-hms-core",
    slug: "markcare-hms",
    title: "MarkCare HMS Core",
    tagline: "Multi-facility, branch-aware healthcare management system for clinical workflows and fiscal integrity.",
    category: "Healthcare Informatics",
    status: "Active Development",
    featured: true,
    order: 1,
    coverImage: "/photo/about.webp",
    technologies: [
      {
        name: "Next.js App Router",
        layer: "Frontend",
        purpose: "Server and Client Component routing, static and dynamic rendering pipelines"
      },
      {
        name: "TypeScript",
        layer: "Frontend",
        purpose: "End-to-end static type enforcement across clinical entities and route params"
      },
      {
        name: "Tailwind CSS",
        layer: "Frontend",
        purpose: "Responsive administrative interface and clinical queue layouts"
      },
      {
        name: "Prisma ORM",
        layer: "Backend",
        purpose: "Type-safe database abstraction and schema migrations"
      },
      {
        name: "MySQL / Relational DB",
        layer: "Database",
        purpose: "Relational patient records, ledger transactions, and foreign-key constraints"
      },
      {
        name: "RBAC & Audit Engine",
        layer: "Security",
        purpose: "Role-segregated authorization (Doctor, Nurse, Pharmacist, Cashier, Admin)"
      }
    ],
    caseStudy: {
      executiveSummary: "MarkCare HMS is a specialized hospital management platform engineered to resolve record fragmentation, medication expiry losses, and billing leakages across multi-facility healthcare environments.",
      problemStatement: "Regional healthcare facilities frequently struggle with manual paper workflows, untracked pharmaceutical expiration leading to stock write-offs, and disjointed cashier handoffs that obscure daily collections.",
      solutionArchitecture: "Engineered an App Router architecture featuring facility-to-branch hierarchical tenancy, automated queue state transitions from triage to doctor consultation, and auditable transaction logging for all fee collections.",
      challenges: [
        {
          challenge: "Preventing medication batch waste and stockouts in high-volume dispensary units",
          architecturalMitigation: "Implemented First-Expired, First-Out (FEFO) algorithmic allocation linked directly to pharmacy inventory batches and expiration dates",
          outcome: "Automated batch selection enforces dispensing of near-expiry stock before later arrivals without manual inventory sorting"
        },
        {
          challenge: "Ensuring strict data separation across parent facilities and satellite branch clinics",
          architecturalMitigation: "Enforced tenant scoping through branch-aware session middleware and database query boundaries",
          outcome: "Branch users are strictly restricted to local clinic records while central administrators retain consolidated auditing access"
        }
      ],
      capabilities: [
        {
          title: "Multi-Facility & Branch Architecture",
          description: "Hierarchical data segregation supporting centralized administration and localized clinic workflows.",
          status: "VERIFIED"
        },
        {
          title: "Outpatient (OPD) & Triage Pipeline",
          description: "Vital signs recording, queue prioritization, and doctor consultation recording.",
          status: "VERIFIED"
        },
        {
          title: "FEFO Pharmacy Inventory",
          description: "First-Expired, First-Out stock dispensing, batch tracking, and low-inventory threshold notifications.",
          status: "VERIFIED"
        },
        {
          title: "Inpatient (IPD) Ward & Bed Management",
          description: "Ward occupancy tracking, bed allocation, and daily clinical progress notes.",
          status: "VERIFIED"
        },
        {
          title: "Cashier Reconciliation & Ledger Handover",
          description: "Departmental fee capture, bill generation, and end-of-shift cashier ledger reconciliation.",
          status: "VERIFIED"
        },
        {
          title: "KRA eTIMS Fiscal Compliance Middleware",
          description: "Architectural integration adapter for automated statutory tax signature transmission.",
          status: "INTEGRATION-READY"
        },
        {
          title: "M-Pesa C2B/B2C STK Push Billing",
          description: "Payment gateway integration adapter for automated patient fee settlement.",
          status: "INTEGRATION-READY"
        },
        {
          title: "Web-Based DICOM PACS Imaging Viewer",
          description: "Cloud-native diagnostic imaging viewer for radiology workflows.",
          status: "ROADMAP"
        }
      ],
      telemetryMetrics: []
    },
    mediaGallery: [],
    createdAt: "2026-05-15T00:00:00.000Z",
    updatedAt: "2026-09-20T00:00:00.000Z"
  },
  {
    id: "eduflow-platform",
    slug: "eduflow",
    title: "EduFlow Educational Platform",
    tagline: "Academic management and institutional record system engineered with Laravel, Inertia.js, and React.",
    category: "Educational Systems",
    status: "Active Development",
    featured: true,
    order: 2,
    coverImage: "/photo/about.webp",
    technologies: [
      {
        name: "Laravel Core",
        layer: "Backend",
        purpose: "RESTful and session services, Eloquent ORM, and institutional business logic"
      },
      {
        name: "Inertia.js",
        layer: "Frontend",
        purpose: "Server-driven routing bridge eliminating client-side API boilerplate"
      },
      {
        name: "React & TypeScript",
        layer: "Frontend",
        purpose: "Single-page application views, interactive dashboards, and typed props"
      },
      {
        name: "Tailwind CSS",
        layer: "Frontend",
        purpose: "Accessible typography and responsive student management portals"
      },
      {
        name: "PostgreSQL / Relational DB",
        layer: "Database",
        purpose: "Relational academic records, fee ledgers, and institutional enrollments"
      },
      {
        name: "CSRF & Session Security",
        layer: "Security",
        purpose: "Cookie-based session encryption and multi-role authentication middleware"
      }
    ],
    caseStudy: {
      executiveSummary: "EduFlow is an integrated institutional management platform designed to unify student enrollment lifecycles, examination grading schemes, and tuition fee ledgers under a monolithic SPA architecture.",
      problemStatement: "Schools and training institutions struggle with disparate tools for student records, timetable scheduling conflicts, and untracked fee balances across academic terms.",
      solutionArchitecture: "Built with a modern hybrid stack pairing Laravel's robust transactional backend with Inertia.js and React, providing the fluid feel of an SPA with server-side authentication and routing reliability.",
      challenges: [
        {
          challenge: "Eliminating CSRF and session desynchronization across async Inertia form submissions",
          architecturalMitigation: "Configured unified Laravel session pipelines with strictly typed Inertia middleware sharing authenticated user context",
          outcome: "Seamless single-page state preservation across complex multi-step student enrollment workflows"
        },
        {
          challenge: "Preventing double-entry ledger errors during high-volume tuition fee collection",
          architecturalMitigation: "Enforced database transactions around all student balance updates and receipt allocations",
          outcome: "Atomic write guarantees ensure balance ledgers remain strictly balanced against physical bank deposits"
        }
      ],
      capabilities: [
        {
          title: "Student Enrollment Lifecycle",
          description: "Complete student record tracking from initial registration through historical term rollover.",
          status: "VERIFIED"
        },
        {
          title: "Academic Grading & Transcript Engine",
          description: "Configurable grading scales, exam result aggregation, and academic report compilation.",
          status: "VERIFIED"
        },
        {
          title: "Tuition Fee Ledger & Invoicing",
          description: "Student balance tracking, term invoice generation, and transaction receipt auditing.",
          status: "VERIFIED"
        },
        {
          title: "Course Scheduling & Timetabling",
          description: "Departmental lecture scheduling with automated room and instructor conflict checks.",
          status: "VERIFIED"
        },
        {
          title: "Multi-Role Session Authorization",
          description: "Role-specific interfaces for Administrators, Teachers, Students, and Guardians.",
          status: "VERIFIED"
        },
        {
          title: "Automated M-Pesa Tuition Settlement",
          description: "Direct mobile money callback processing for real-time student ledger updates.",
          status: "INTEGRATION-READY"
        },
        {
          title: "Real-Time Virtual Classroom Integration",
          description: "WebRTC and Jitsi video conference orchestration for remote lectures.",
          status: "ROADMAP"
        }
      ],
      telemetryMetrics: []
    },
    mediaGallery: [],
    createdAt: "2026-06-10T00:00:00.000Z",
    updatedAt: "2026-09-18T00:00:00.000Z"
  },
  {
    id: "veriq-framework",
    slug: "veriq",
    title: "VERIQ Engineering & Verification Framework",
    tagline: "Forensic code auditing, deterministic build reproduction, and telemetry governance framework.",
    category: "Verification & Telemetry",
    status: "Production",
    featured: true,
    order: 3,
    coverImage: "/photo/about.webp",
    technologies: [
      {
        name: "Node.js Process Engine",
        layer: "Backend",
        purpose: "CLI execution harness, child process isolation, and read-only test runners"
      },
      {
        name: "TypeScript Compiler API",
        layer: "DevOps",
        purpose: "Static contract verification, AST inspection, and type boundary validation"
      },
      {
        name: "Webpack & Next.js Tracing",
        layer: "DevOps",
        purpose: "Chunk manifest inspection, static trace validation, and build artifact forensics"
      },
      {
        name: "CVE & Advisory Engine",
        layer: "Security",
        purpose: "Deterministic dependency tree audit and vulnerability impact verification"
      },
      {
        name: "Change-Control Reporter",
        layer: "Security",
        purpose: "Non-mutating diff audits and evidence-first executive gate certification"
      }
    ],
    caseStudy: {
      executiveSummary: "VERIQ is a forensic software engineering and auditing protocol that guarantees system stability through evidence-first, non-mutating reproduction gates and strictly verified change control.",
      problemStatement: "Modern web applications frequently suffer from silent security regressions, untested dependency bloat, and transient compiler failures caused by uncontrolled iterative patching.",
      solutionArchitecture: "A formal 7-stage operational workflow (AUDIT → ANALYZE → VERIFY → INSPECT → IMPLEMENT → TEST → REPORT) that mandates empirical proof before code modification and requires multi-pass verification before release.",
      challenges: [
        {
          challenge: "Preventing destructive side-effects during architectural exploration and vulnerability testing",
          architecturalMitigation: "Enforced strict read-only pre-flight harnesses that inspect file descriptors and Git diff trees without mutating worktrees",
          outcome: "Guaranteed zero untracked code modifications during investigative audit cycles"
        },
        {
          challenge: "Distinguishing genuine code defects from environmental and filesystem concurrency locks",
          architecturalMitigation: "Implemented sequential reproduction matrices that isolate worker process contention from source code errors",
          outcome: "Eliminated false-positive refactoring by isolating intermittent platform issues through deterministic test runs"
        }
      ],
      capabilities: [
        {
          title: "7-Stage Forensic Engineering Protocol",
          description: "Structured lifecycle mandating audit evidence before implementation authorization.",
          status: "VERIFIED"
        },
        {
          title: "Deterministic Build Reproduction Matrix",
          description: "Multi-pass compilation verification ensuring build stability across isolated worker threads.",
          status: "VERIFIED"
        },
        {
          title: "Non-Mutating Change-Control Auditing",
          description: "Rigorous Git diff and filesystem state tracking to prevent scope creep.",
          status: "VERIFIED"
        },
        {
          title: "Dependency & Advisory Impact Verification",
          description: "Direct vs. transitive CVE impact correlation avoiding breaking major version upgrades.",
          status: "VERIFIED"
        },
        {
          title: "CI/CD Telemetry Gate Bot",
          description: "Automated GitHub Actions workflow certifying build integrity and diff governance on pull requests.",
          status: "ROADMAP"
        }
      ],
      telemetryMetrics: []
    },
    mediaGallery: [],
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-09-24T00:00:00.000Z"
  }
];

export const PRODUCTS_MAP: Record<string, ProductContract> = Object.fromEntries(
  PRODUCTS.map((product) => [product.slug, product])
);

export function getProductBySlug(slug: string): ProductContract | undefined {
  return PRODUCTS_MAP[slug];
}

export function getFeaturedProducts(): ProductContract[] {
  return PRODUCTS.filter((product) => product.featured);
}