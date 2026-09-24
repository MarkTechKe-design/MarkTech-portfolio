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

const DEFAULT_LINKS = {
  github: "https://github.com/MarkTechKe-design",
  linkedin: "https://linkedin.com/in/oduor-mark",
  twitter: "https://x.com/MarkTechKe",
  whatsapp: "https://wa.me/254718178521",
  email: "mailto:oduor.markochieng@gmail.com",
  instagram: "",
  youtube: "",
  behance: "",
  dribbble: ""
};

export async function GET() {
  const stored = readCollection("links", [DEFAULT_LINKS]);
  const links = stored && stored.length > 0 ? { ...DEFAULT_LINKS, ...stored[0] } : DEFAULT_LINKS;
  return NextResponse.json(links);
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const stored = readCollection("links", [DEFAULT_LINKS]);
    const current = stored && stored.length > 0 ? stored[0] : DEFAULT_LINKS;

    const updated = {
      ...current,
      ...body,
      updated_at: new Date().toISOString()
    };

    writeCollection("links", [updated]);
    return NextResponse.json({ success: true, links: updated });
  } catch (err) {
    console.error("Error saving links:", err);
    return NextResponse.json({ error: "Failed to save links" }, { status: 500 });
  }
}