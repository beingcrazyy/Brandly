// Minimal IndexedDB blob store. Structured brand data only ever stores a fileId;
// the actual bytes (logos, mockups, fonts, docs) live here so localStorage stays small.
"use client";

const DB_NAME = "brandly-files";
const STORE = "files";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export interface StoredFile {
  blob: Blob;
  name: string;
  mimeType: string;
}

export async function putFile(id: string, file: File | Blob, name: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ blob: file, name, mimeType: file.type }, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function getFile(id: string): Promise<StoredFile | null> {
  const db = await openDb();
  const result = await new Promise<StoredFile | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return result;
}

export async function deleteFile(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

const urlCache = new Map<string, string>();

/** Resolves a fileId to an object URL, caching so repeated renders don't re-read IndexedDB. */
export async function resolveFileUrl(id: string): Promise<string | null> {
  const cached = urlCache.get(id);
  if (cached) return cached;
  const stored = await getFile(id);
  if (!stored) return null;
  const url = URL.createObjectURL(stored.blob);
  urlCache.set(id, url);
  return url;
}

export function makeFileId(): string {
  return `f_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export async function downloadFile(id: string, filename: string): Promise<void> {
  const stored = await getFile(id);
  if (!stored) return;
  const url = URL.createObjectURL(stored.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
