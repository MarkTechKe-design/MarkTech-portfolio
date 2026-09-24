import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss,
  SiPython, SiCplusplus, SiFigma,
  SiHtml5, SiCss, SiTypescript, SiPhp,
  SiGit, SiDocker, SiNodedotjs, SiPostgresql, SiMysql, SiRedis,
  SiVercel, SiPostman, SiLaravel
} from "react-icons/si";
import { TbSql, TbNetwork, TbServer, TbDeviceDesktopAnalytics } from "react-icons/tb";

export const SECTION = {
  label: "Engineering & Professional Profile",
};

export const HEADING = {
  line1: "Engineering",
  line2: "resilient",
  line3: "systems.",
};

// *word* = highlighted/bold in BlurText
export const BIO = [
  "I am a *Systems Architect*, *Full-Stack Software Engineer*, and *IT Specialist* with proven experience spanning software engineering, systems administration, network operations, and digital growth management. Whether designing distributed web applications, optimizing internal business operations, or leading digital brand engagement, I deliver structured, measurable technical solutions.",
  "My hands-on industry background includes serving as an *ICT Technician at Jaramogi Oginga Odinga University of Science and Technology (JOOUST - Siaya Branch)*, where I managed campus-wide network infrastructure, user technical support, workstation diagnostics, and computer laboratory systems.",
  "At *Powerstar Supermarkets*, I served as *Social Media Manager & Web Systems Lead*, driving digital marketing initiatives while architecting comprehensive business management platformsâ€”integrating staff attendance workflows, online video meetings, e-commerce catalog operations, and operational KPI audit tracking systems.",
  "My academic foundation couples a *Diploma in Information & Communication Technology (Distinction)* from Siaya National Polytechnic with a *Diploma in Kenya Registered Community Health Nursing* from KMTC, alongside an ongoing Bachelor of Science in *Computer Science* at the *University of the People* on scholarship.",
  "I am available for full-time and contract roles across *Software Engineering*, *IT Support & Systems Administration*, *Digital Marketing*, and *Social Media & Brand Management*."
];

export const RESUME_URL = "/resume.pdf";

export const TECH = [
  { name: "Next.js",        icon: SiNextdotjs },
  { name: "TypeScript",     icon: SiTypescript },
  { name: "React",          icon: SiReact },
  { name: "Laravel",        icon: SiLaravel },
  { name: "PHP",            icon: SiPhp },
  { name: "PostgreSQL",     icon: SiPostgresql },
  { name: "MySQL",          icon: SiMysql },
  { name: "Tailwind CSS",   icon: SiTailwindcss },
  { name: "Node.js",        icon: SiNodedotjs },
  { name: "IT & Networking",icon: TbNetwork },
  { name: "Linux / Server", icon: TbServer },
  { name: "KPI / Analytics",icon: TbDeviceDesktopAnalytics },
  { name: "Docker",         icon: SiDocker },
  { name: "Git & GitHub",   icon: SiGit },
  { name: "SQL",            icon: TbSql },
  { name: "Postman",        icon: SiPostman },
];

export const EDUCATION = [
  {
    institution: "University of the People",
    qualification: "BSc in Computer Science (Undergraduate Scholar)",
    year: "Ongoing"
  },
  {
    institution: "Siaya National Polytechnic",
    qualification: "Diploma in Information & Communication Technology (Distinction)",
    year: "Graduated"
  },
  {
    institution: "Kenya Medical Training College (KMTC)",
    qualification: "Diploma in Kenya Registered Community Health Nurse (KRCHN)",
    year: "Graduated"
  }
];

export const EXPERIENCE = [
  {
    role: "Social Media Manager & Web Operations Lead",
    company: "Powerstar Supermarkets",
    period: "Jan 2025 â€“ Jul 2026",
    description: "Spearheaded digital marketing campaigns, customer engagement, and administrative system architectureâ€”including e-commerce catalog workflows, staff attendance tracking, online video meeting tooling, and KPI audit dashboards."
  },
  {
    role: "ICT Technician",
    company: "JOOUST (Siaya Branch)",
    period: "Sep 2023 â€“ Dec 2023",
    description: "Maintained university computer labs, campus network connectivity, hardware diagnostics, software installations, and provided direct IT support to faculty and students."
  }
];

export const ACHIEVEMENTS = [
  "Engineered MarkCare HMS Core featuring multi-branch tenancy, clinical encounters, and automated billing workflows.",
  "Designed EduFlow academic management platform using Laravel, Inertia.js, React, and TypeScript.",
  "Developed internal operations suite for Powerstar Supermarkets (staff attendance, meeting orchestration, and KPI metrics).",
  "Graduated with Distinction in Information & Communication Technology from Siaya National Polytechnic.",
  "Awarded academic scholarship for Computer Science at University of the People."
];

export const ASPIRATIONS = [
  "Spearhead healthcare informatics across East Africa to digitize paper-based clinical records into type-safe architectures.",
  "Architect distributed cloud platforms that combine rigorous transactional safety with low-latency interfaces.",
  "Bridge institutional IT administration with AI-augmented telemetry and automated verification frameworks."
];