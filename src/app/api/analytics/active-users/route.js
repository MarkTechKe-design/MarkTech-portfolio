import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export async function GET() {
  try {
    if (redis) {
      const keys = await redis.keys("active_session:*");
      return NextResponse.json({ activeUsers: keys.length });
    }
    return NextResponse.json({ activeUsers: 0 });
  } catch {
    return NextResponse.json({ activeUsers: 0 });
  }
}