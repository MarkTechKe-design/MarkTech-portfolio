import { NextResponse } from "next/server";
import { readCollection } from "@/lib/db";

export async function GET() {
  const projects = readCollection("projects", []);
  const inquiries = readCollection("inquiries", []);
  return NextResponse.json({
    totalVisits: 1420,
    uniqueVisitors: 890,
    projectsCount: projects.length,
    inquiriesCount: inquiries.length,
    recentVisits: [],
    searches: []
  });
}
