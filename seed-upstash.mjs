import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8").replace(/^\uFEFF/, "");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...vals] = trimmed.split("=");
      if (key && vals.length > 0) {
        const val = vals.join("=").replace(/^["']|["']$/g, "");
        process.env[key.trim()] = val.trim();
      }
    }
  });
}

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error("❌ UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be in .env.local");
  process.exit(1);
}

const redis = new Redis({ url, token });
const collections = ["projects", "links", "settings", "reviews", "inquiries"];

async function seed() {
  console.log("🚀 Syncing data/store/ to Upstash Redis...\n");

  for (const col of collections) {
    const filePath = path.join(process.cwd(), "data", "store", `${col}.json`);
    if (fs.existsSync(filePath)) {
      // Strip UTF-8 BOM cleanly
      const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
      const data = JSON.parse(raw);
      await redis.set(col, JSON.stringify(data));
      console.log(`✓ Seeded '${col}' (${Array.isArray(data) ? data.length + ' records' : 'object'})`);
    } else {
      console.log(`⚠️ Skipped '${col}' (file not found)`);
    }
  }

  console.log("\n✨ Database is now seeded and live on Upstash!");
}

seed().catch(console.error);