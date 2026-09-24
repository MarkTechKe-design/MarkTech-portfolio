import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const items = readCollection("reviews", []);
  const filtered = items.filter((r) => String(r.id) !== String(id));
  writeCollection("reviews", filtered);
  return NextResponse.json({ success: true });
}