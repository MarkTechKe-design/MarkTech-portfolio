import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export async function GET() {
  try {
    const projects = await getCollection("projects", []);
    const inquiries = await getCollection("inquiries", []);

    let totalVisits = 0;
    let uniqueVisitors = 0;
    let recentVisits = [];
    let searches = [];

    if (redis) {
      const [visitsCount, uniqueIps, rawVisits, rawSearches] = await Promise.all([
        redis.get("analytics:total_visits"),
        redis.scard("analytics:unique_ips"),
        redis.lrange("analytics:recent_visits", 0, 49),
        redis.get("analytics:searches")
      ]);

      totalVisits = Number(visitsCount) || 0;
      uniqueVisitors = Number(uniqueIps) || 0;
      recentVisits = Array.isArray(rawVisits)
        ? rawVisits.map((item) => (typeof item === "string" ? JSON.parse(item) : item))
        : [];
      searches = Array.isArray(rawSearches) ? rawSearches : [];
    } else {
      const visits = await getCollection("visits", []);
      totalVisits = visits.length;
      uniqueVisitors = new Set(visits.map((v) => v.ip)).size;
      recentVisits = visits.slice(0, 50);
      searches = await getCollection("searches", []);
    }

    return NextResponse.json({
      totalVisits,
      uniqueVisitors,
      projectsCount: projects.length,
      inquiriesCount: inquiries.length,
      recentVisits,
      searches
    });
  } catch (error) {
    console.error("[STATS-ERROR]:", error);
    return NextResponse.json({
      totalVisits: 0,
      uniqueVisitors: 0,
      projectsCount: 0,
      inquiriesCount: 0,
      recentVisits: [],
      searches: []
    });
  }
}