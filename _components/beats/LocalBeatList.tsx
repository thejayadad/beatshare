"use client";

import { useEffect, useState } from "react";
import { draftsWithUrls, deleteDraft } from "@/lib/localdb";
import { usePlayer } from "@/_components/player/PlayerProvider";
import Image from "next/image";
import { Trash2, Play } from "lucide-react";

type Item = Awaited<ReturnType<typeof draftsWithUrls>>[number];

export default function LocalBeatsList() {
  const [items, setItems] = useState<Item[] | null>(null);
  const player = usePlayer();

  async function load() { setItems(await draftsWithUrls()); }
  useEffect(() => { load(); return () => {
    // revoke object urls on unmount
    items?.forEach(i => {
      if (i.urls.cover) URL.revokeObjectURL(i.urls.cover);
      if (i.urls.audioUntagged) URL.revokeObjectURL(i.urls.audioUntagged);
      if (i.urls.audioTagged) URL.revokeObjectURL(i.urls.audioTagged);
    });
  }; }, []); // eslint-disable-line

  if (!items) return <div className="text-body/70">Loading drafts…</div>;
  if (items.length === 0) return <div className="text-body/70">No local drafts yet. Try <a className="link" href="/upload">uploading a beat</a>.</div>;

  return (
    <ul className="space-y-4">
      {items.map((r) => (
        <li key={r.id} className="rounded-3xl bg-surface ring-1 ring-neutral/10 p-3 sm:p-4">
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-start">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden">
              {r.urls.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.urls.cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-xs text-body/60 bg-subtle">No image</div>
              )}
            </div>

            <div className="min-w-0">
              <div className="font-semibold text-body leading-tight">{r.trackName}</div>
              <div className="text-sm text-body/70">{r.genres.join(" • ") || "No genre"}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.tags.split(",").filter(Boolean).map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full text-xs ring-1 ring-neutral/20 text-body/70">
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                className="btn btn-sm rounded-full text-white"
                style={{ backgroundColor: "var(--p)", borderColor: "var(--p)" }}
                onClick={() => {
                  const src = r.urls.audioUntagged || r.urls.audioTagged;
                  if (!src) return;
                  player.playTrack({
                    id: r.id,
                    title: r.trackName,
                    artist: "You",
                    cover: r.urls.cover || "/favicon.ico",
                    src,
                  }, items.map(i => ({
                    id: i.id, title: i.trackName, artist: "You",
                    cover: i.urls.cover || "/favicon.ico",
                    src: i.urls.audioUntagged || i.urls.audioTagged || "",
                  })).filter(x => x.src));
                }}
              >
                <Play className="h-4 w-4" />
                Preview
              </button>

              <button
                className="btn btn-ghost btn-sm"
                onClick={async () => { await deleteDraft(r.id); await load(); }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
