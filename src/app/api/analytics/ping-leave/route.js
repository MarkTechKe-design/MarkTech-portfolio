import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export async function POST(req) {
  try {
    const { sessionId } = await req.json().catch(() => ({}));
    if (sessionId && redis) {
      await redis.del(`active_session:${sessionId}`);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}