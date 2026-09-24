import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { readCollection, writeCollection } from "@/lib/db";

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

const DEFAULT_SETTINGS = [
  {
    id: "portfolio_config",
    availableForHire: true,
    availabilityText: "Available for Q4 2026 Engagements",
    contactEmail: "oduor.markochieng@gmail.com",
    contactPhone: "+254718178521",
    location: "Nairobi & Siaya, Kenya",
    resumeUrl: "/resume.pdf",
    profileImageUrl: "/photo/about.webp",
    headlineTagline: "Let's build something cool.",
    updated_at: new Date().toISOString()
  }
];

export async function GET() {
  const settings = readCollection("settings", DEFAULT_SETTINGS);
  return NextResponse.json(settings[0] || DEFAULT_SETTINGS[0]);
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const settings = readCollection("settings", DEFAULT_SETTINGS);
    const updated = {
      ...settings[0],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    writeCollection("settings", [updated]);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}