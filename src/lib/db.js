import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "store");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

export function readCollection(collection, fallback = []) {
  const file = getFilePath(collection);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) || fallback;
  } catch (err) {
    console.error(`Error reading collection ${collection}:`, err);
    return fallback;
  }
}

export function writeCollection(collection, data) {
  const file = getFilePath(collection);
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error(`Error writing collection ${collection}:`, err);
    return false;
  }
}

export function insertItem(collection, item, fallback = []) {
  const items = readCollection(collection, fallback);
  const newItem = {
    id: item.id || Date.now().toString(),
    created_at: new Date().toISOString(),
    ...item,
  };
  items.unshift(newItem);
  writeCollection(collection, items);
  return newItem;
}

export function updateItem(collection, id, updates) {
  const items = readCollection(collection);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates, updated_at: new Date().toISOString() };
  writeCollection(collection, items);
  return items[idx];
}

export function deleteItem(collection, id) {
  const items = readCollection(collection);
  const filtered = items.filter((i) => i.id !== id);
  writeCollection(collection, filtered);
  return true;
}