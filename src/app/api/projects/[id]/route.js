import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const items = readCollection("projects", []);
  const project = items.find((p) => String(p.id) === String(id) || p.slug === id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const items = readCollection("projects", []);
  const index = items.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[index] = { ...items[index], ...body, updated_at: new Date().toISOString() };
  writeCollection("projects", items);
  return NextResponse.json(items[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const items = readCollection("projects", []);
  const filtered = items.filter((p) => String(p.id) !== String(id));
  writeCollection("projects", filtered);
  return NextResponse.json({ success: true });
}