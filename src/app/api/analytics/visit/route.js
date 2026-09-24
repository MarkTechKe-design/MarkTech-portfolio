import { NextResponse } from "next/server";
import { getCollection, setCollection } from "@/lib/db";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { page = "/", referrer = "", source = "" } = body;

    // Extract visitor geolocation and device information from headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const country = req.headers.get("x-vercel-ip-country") || "KE";
    const city = req.headers.get("x-vercel-ip-city") || "Nairobi";
    const userAgent = req.headers.get("user-agent") || "";

    const visitRecord = {
      id: crypto.randomUUID(),
      page,
      referrer,
      source,
      country,
      city,
      userAgent,
      ip: ip.replace(/:\d+$/, ""),
      timestamp: new Date().toISOString()
    };

    if (redis) {
      // Increment aggregate visit counter
      await redis.incr("analytics:total_visits");
      
      // Track unique IP address into a Redis set
      await redis.sadd("analytics:unique_ips", ip);

      // Keep recent visits list capped to latest 100 entries
      await redis.lpush("analytics:recent_visits", JSON.stringify(visitRecord));
      await redis.ltrim("analytics:recent_visits", 0, 99);
    } else {
      // Local fallback file store
      const visits = await getCollection("visits", []);
      visits.unshift(visitRecord);
      await setCollection("visits", visits.slice(0, 100));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[VISIT-TRACK-ERROR]:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}