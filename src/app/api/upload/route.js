import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { readCollection, writeCollection } from "@/lib/db";
import fs from "fs";
import path from "path";

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

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const targetType = formData.get("targetType"); // 'resume' | 'profile' | 'general'

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = "";

    if (targetType === "resume") {
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      fs.writeFileSync(path.join(publicDir, "resume.pdf"), buffer);
      publicUrl = `/resume.pdf?v=${Date.now()}`;
    } else if (targetType === "profile") {
      const photoDir = path.join(process.cwd(), "public", "photo");
      if (!fs.existsSync(photoDir)) fs.mkdirSync(photoDir, { recursive: true });
      
      // Determine file extension to preserve encoding integrity
      const originalExt = path.extname(file.name) || ".webp";
      const fileName = `about${originalExt}`;
      fs.writeFileSync(path.join(photoDir, fileName), buffer);
      
      // Also write directly as about.webp for fallback consistency
      fs.writeFileSync(path.join(photoDir, "about.webp"), buffer);
      publicUrl = `/photo/about.webp?v=${Date.now()}`;

      // Persist to settings store
      try {
        const settings = readCollection("settings", [{}]);
        const updated = {
          ...settings[0],
          profileImageUrl: publicUrl,
          updated_at: new Date().toISOString()
        };
        writeCollection("settings", [updated]);
      } catch (e) {
        console.error("Failed to update settings store with photo url:", e);
      }
    } else {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      fs.writeFileSync(path.join(uploadDir, safeName), buffer);
      publicUrl = `/uploads/${safeName}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      timestamp: Date.now()
    });
  } catch (err) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}