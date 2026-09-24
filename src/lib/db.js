import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

const storeDir = path.join(process.cwd(), "data", "store");

function cleanJsonParse(raw, fallback) {
  try {
    const clean = raw.replace(/^\uFEFF/, "");
    return JSON.parse(clean);
  } catch (err) {
    console.error("[JSON-PARSE-ERR]:", err);
    return fallback;
  }
}

function readLocalStore(collectionName, fallback = []) {
  try {
    const filePath = path.join(storeDir, `${collectionName}.json`);
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return cleanJsonParse(raw, fallback);
  } catch (err) {
    console.error(`[DB-LOCAL-READ-ERR] ${collectionName}:`, err);
    return fallback;
  }
}

function writeLocalStore(collectionName, data) {
  try {
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir, { recursive: true });
    }
    const filePath = path.join(storeDir, `${collectionName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}

export async function getCollection(collectionName, fallback = []) {
  if (redis) {
    try {
      const data = await redis.get(collectionName);
      if (data !== null && data !== undefined) {
        return typeof data === "string" ? cleanJsonParse(data, fallback) : data;
      }
    } catch (err) {
      console.warn(`[UPSTASH-GET-FALLBACK] ${collectionName}:`, err.message);
    }
  }
  return readLocalStore(collectionName, fallback);
}

export async function setCollection(collectionName, data) {
  if (redis) {
    try {
      await redis.set(collectionName, JSON.stringify(data));
    } catch (err) {
      console.error(`[UPSTASH-SET-ERR] ${collectionName}:`, err);
    }
  }
  writeLocalStore(collectionName, data);
  return true;
}

export function readCollection(collectionName, fallback = []) {
  return readLocalStore(collectionName, fallback);
}

export function writeCollection(collectionName, data) {
  if (redis) {
    redis.set(collectionName, JSON.stringify(data)).catch((err) => {
      console.error(`[UPSTASH-BG-WRITE-ERR] ${collectionName}:`, err);
    });
  }
  return writeLocalStore(collectionName, data);
}

export async function insertItem(collectionName, item) {
  const list = await getCollection(collectionName, []);
  const newItem = {
    id: item.id || Date.now().toString(),
    ...item,
    created_at: item.created_at || new Date().toISOString()
  };
  list.unshift(newItem);
  await setCollection(collectionName, list);
  return newItem;
}

export async function updateItem(collectionName, id, updates) {
  const list = await getCollection(collectionName, []);
  const index = list.findIndex((i) => String(i.id) === String(id));
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
  await setCollection(collectionName, list);
  return list[index];
}

export async function deleteItem(collectionName, id) {
  const list = await getCollection(collectionName, []);
  const filtered = list.filter((i) => String(i.id) !== String(id));
  await setCollection(collectionName, filtered);
  return true;
}