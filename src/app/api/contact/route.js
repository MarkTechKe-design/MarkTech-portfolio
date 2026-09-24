import { NextResponse } from "next/server";
import { insertItem } from "@/lib/db";

export async function POST(request) {
  try {
    const { name, email, message, phone } = await request.json();

    if (!name || (!email && !phone)) {
      return NextResponse.json({ error: "Name and contact method are required." }, { status: 400 });
    }

    const saved = insertItem("inquiries", {
      name,
      email: email || "N/A",
      phone: phone || "N/A",
      message: message || "No message body",
      status: "unread",
    });

    return NextResponse.json({ success: true, inquiry: saved });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}