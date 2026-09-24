import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export async function POST(req) {
  try {
    const { sessionId } = await req.json().catch(() => ({}));
    if (!sessionId) return NextResponse.json({ success: false });

    if (redis) {
      // Set session active with 45s TTL (client pings every 30s)
      await redis.set(`active_session:${sessionId}`, "1", { ex: 45 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}