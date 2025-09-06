
// super-small IndexedDB wrapper for local drafts + blobs
const DB_NAME = "beatshop";
const DB_VERSION = 1;
const DRAFTS = "drafts";
const FILES = "files";

type DraftRecord = {
  id: string;
  trackName: string;
  bpm: number;
  price: number;
  free: boolean;
  genres: string[];
  tags: string;
  createdAt: number;
  fileKeys: {
    cover?: string;
    audioUntagged?: string;
    audioTagged?: string;
    stems?: string;
  };
};

async function openDB(): Promise<IDBDatabase> {
  return await new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DRAFTS)) {
        db.createObjectStore(DRAFTS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(FILES)) {
        db.createObjectStore(FILES, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>) {
  const db = await openDB();
  return await new Promise<T>((resolve, reject) => {
    const t = db.transaction(store, mode);
    const s = t.objectStore(store);
    const r = fn(s);
    r.onsuccess = () => resolve(r.result as T);
    r.onerror = () => reject(r.error);
  });
}

export async function putFile(key: string, blob: Blob) {
  await tx(FILES, "readwrite", (s) => s.put({ key, blob, type: blob.type }));
}
export async function getFile(key: string): Promise<Blob | undefined> {
  const rec = await tx(FILES, "readonly", (s) => s.get(key)) as any;
  return rec?.blob as Blob | undefined;
}
export async function delFile(key: string) {
  await tx(FILES, "readwrite", (s) => s.delete(key));
}

export type DraftInput = {
  trackName: string;
  bpm: number;
  price: number;
  free: boolean;
  genres: string[];
  tags: string;
  cover?: File | null;
  audioUntagged?: File | null;
  audioTagged?: File | null;
  stems?: File | null;
};

export async function saveDraft(input: DraftInput) {
  const id = crypto.randomUUID();
  const fileKeys: DraftRecord["fileKeys"] = {};
  // store files (if present)
  if (input.cover)        { fileKeys.cover = `${id}-cover`; await putFile(fileKeys.cover, input.cover); }
  if (input.audioUntagged){ fileKeys.audioUntagged = `${id}-u`; await putFile(fileKeys.audioUntagged, input.audioUntagged); }
  if (input.audioTagged)  { fileKeys.audioTagged = `${id}-t`; await putFile(fileKeys.audioTagged, input.audioTagged); }
  if (input.stems)        { fileKeys.stems = `${id}-s`; await putFile(fileKeys.stems, input.stems); }

  const rec: DraftRecord = {
    id,
    trackName: input.trackName,
    bpm: Number(input.bpm || 0),
    price: Number(input.price || 0),
    free: !!input.free,
    genres: input.genres || [],
    tags: input.tags || "",
    createdAt: Date.now(),
    fileKeys,
  };
  await tx(DRAFTS, "readwrite", (s) => s.add(rec));
  return id;
}

export async function listDrafts(): Promise<DraftRecord[]> {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const t = db.transaction(DRAFTS, "readonly");
    const s = t.objectStore(DRAFTS);
    const req = s.getAll();
    req.onsuccess = () => resolve(req.result as DraftRecord[]);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteDraft(id: string) {
  // remove files tied to the draft
  const drafts = await listDrafts();
  const rec = drafts.find((d) => d.id === id);
  if (rec) {
    for (const k of Object.values(rec.fileKeys)) if (k) await delFile(k);
  }
  await tx(DRAFTS, "readwrite", (s) => s.delete(id));
}

/** Convenience: drafts with object URLs for display/playback */
export async function draftsWithUrls() {
  const recs = await listDrafts();
  const results = await Promise.all(
    recs.map(async (r) => {
      const coverBlob = r.fileKeys.cover ? await getFile(r.fileKeys.cover) : undefined;
      const uBlob     = r.fileKeys.audioUntagged ? await getFile(r.fileKeys.audioUntagged) : undefined;
      const tBlob     = r.fileKeys.audioTagged ? await getFile(r.fileKeys.audioTagged) : undefined;
      return {
        ...r,
        urls: {
          cover: coverBlob ? URL.createObjectURL(coverBlob) : null,
          audioUntagged: uBlob ? URL.createObjectURL(uBlob) : null,
          audioTagged: tBlob ? URL.createObjectURL(tBlob) : null,
        },
      };
    })
  );
  return results;
}
