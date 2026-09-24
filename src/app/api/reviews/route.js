import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { readCollection, insertItem, deleteItem, updateItem } from "@/lib/db";

async function isAdmin() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

const SEED_REVIEWS = [
  {
    id: "rev-1",
    author: "Systems Operations Directorate",
    role: "Institutional ICT Administration",
    company: "Campus Partner",
    content: "Mark displayed exceptional attention to operational uptime and lab diagnostics. His structured approach to campus networking and user support kept faculty operations running smoothly.",
    rating: 5,
    visible: true,
    created_at: "2026-08-15T09:30:00.000Z"
  },
  {
    id: "rev-2",
    author: "Commercial Operations Lead",
    role: "Retail & E-Commerce Division",
    company: "Powerstar Supermarkets",
    content: "Oduor Mark combined web engineering with practical social marketing. The staff attendance workflows and KPI tracking tools he architected brought immediate accountability to our daily operations.",
    rating: 5,
    visible: true,
    created_at: "2026-07-20T14:15:00.000Z"
  },
  {
    id: "rev-3",
    author: "Clinical Informatics Advisor",
    role: "Healthcare Systems Consultant",
    company: "HealthTech Kenya",
    content: "Finding someone who understands clinical triage and database normalization at the same time is rare. His work on MarkCare HMS demonstrates deep domain insight that off-the-shelf software misses.",
    rating: 5,
    visible: true,
    created_at: "2026-09-02T11:00:00.000Z"
  }
];

export async function GET() {
  const reviews = readCollection("reviews", SEED_REVIEWS);
  return NextResponse.json(reviews);
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const created = insertItem("reviews", { 
    ...body, 
    visible: true,
    created_at: new Date().toISOString() 
  }, SEED_REVIEWS);
  return NextResponse.json(created);
}

export async function PATCH(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, ...updates } = await request.json();
  const updated = updateItem("reviews", id, updates);
  return NextResponse.json(updated);
}

export async function DELETE(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  deleteItem("reviews", id);
  return NextResponse.json({ success: true });
}