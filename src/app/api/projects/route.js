import { NextResponse } from "next/server";
import { readCollection, insertItem, updateItem, deleteItem } from "@/lib/db";

const SEED_PROJECTS = [
  {
    id: "markcare-hms-core",
    slug: "markcare-hms",
    title: "MarkCare HMS Core",
    description: "Multi-facility, branch-aware healthcare management system for clinical encounters, triage automation, and fiscal reconciliation.",
    category: "Healthcare Informatics",
    tech: "Next.js 15, TypeScript, PostgreSQL, Tailwind CSS, Prisma",
    client: "Healthcare Providers & Clinical Networks",
    month: "August",
    year: "2026",
    services: "Architecture, Clinical Workflows, Full-Stack",
    image_url: "/photo/about.webp",
    link: "https://github.com/MarkTechKe-design",
    sort_order: 1,
    visible: true,
    created_at: "2026-08-10T12:00:00.000Z",
    tags: ["Next.js App Router", "TypeScript", "PostgreSQL", "Prisma ORM"]
  },
  {
    id: "eduflow-academic",
    slug: "eduflow-platform",
    title: "EduFlow Academic Suite",
    description: "Integrated institutional learning platform managing curriculum pacing, multi-role staff authentication, and student evaluation pipelines.",
    category: "Institutional Systems",
    tech: "Laravel 11, Inertia.js, React, TypeScript, MySQL",
    client: "Academic Institutions & Training Centers",
    month: "July",
    year: "2026",
    services: "Full-Stack Development, Role-Based Access, Security",
    image_url: "/photo/about.webp",
    link: "https://github.com/MarkTechKe-design",
    sort_order: 2,
    visible: true,
    created_at: "2026-07-15T08:30:00.000Z",
    tags: ["Laravel", "Inertia.js", "React", "TypeScript", "MySQL"]
  },
  {
    id: "veriq-forensics",
    slug: "veriq-framework",
    title: "VERIQ Forensic Verification Engine",
    description: "Automated codebase telemetry and behavioral audit system designed to trace regressions, data mutations, and transactional integrity.",
    category: "Systems & Telemetry",
    tech: "TypeScript, Node.js, Shell, Git Automation",
    client: "Enterprise Audit & Forensic Teams",
    month: "June",
    year: "2026",
    services: "Systems Verification, Telemetry Auditing, CI/CD",
    image_url: "/photo/about.webp",
    link: "https://github.com/MarkTechKe-design",
    sort_order: 3,
    visible: true,
    created_at: "2026-06-01T10:00:00.000Z",
    tags: ["Node.js", "Systems Verification", "Telemetry", "Git Hook Engine"]
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get("all") === "true";

  let projects = readCollection("projects", SEED_PROJECTS);

  if (!projects || projects.length === 0) {
    projects = SEED_PROJECTS;
  }

  if (!showAll) {
    projects = projects.filter((p) => p.visible !== false);
  }

  projects.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return NextResponse.json(projects);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const slug = (body.title || "system")
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    const newProject = insertItem("projects", {
      ...body,
      slug: body.slug || slug,
      visible: body.visible !== undefined ? body.visible : true,
      created_at: new Date().toISOString(),
    }, SEED_PROJECTS);

    return NextResponse.json(newProject);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create system" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, ...updates } = await request.json();
    const updated = updateItem("projects", id, updates);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update system" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    deleteItem("projects", id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete system" }, { status: 500 });
  }
}