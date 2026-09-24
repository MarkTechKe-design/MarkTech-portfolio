import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const items = readCollection("inquiries", []);
  const filtered = items.filter((item) => String(item.id) !== String(id));
  writeCollection("inquiries", filtered);
  return NextResponse.json({ success: true });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const items = readCollection("inquiries", []);
  const updated = items.map((item) => (String(item.id) === String(id) ? { ...item, ...body } : item));
  writeCollection("inquiries", updated);
  return NextResponse.json({ success: true });
}