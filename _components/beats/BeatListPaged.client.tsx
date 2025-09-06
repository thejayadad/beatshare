"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MoreVertical, ShoppingCart, Play } from "lucide-react";
import { usePlayer } from "@/_components/player/PlayerProvider";
import type { BeatItem } from "@/lib/demoData";

export default function BeatListPaged({ items }: { items: BeatItem[] }) {
  const player = usePlayer();
  const queue = items.map(({ id, title, artist, cover, src }) => ({ id, title, artist, cover, src }));

  return (
    <ul className="space-y-4">
      {items.map((r) => (
        <li key={r.id} className="rounded-3xl bg-surface ring-1 ring-neutral/10 px-3 sm:px-4 py-3 hover:ring-[var(--p)]/40 transition">
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-4 items-start">
            {/* cover / play */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); player.playTrack(queue.find(x => x.id === r.id)!, queue); }}
              className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden group"
              aria-label={`Play ${r.title} by ${r.artist}`}
            >
              <Image src={r.cover} alt="" fill className="object-cover" />
              <span className="absolute left-1 top-1 rounded-md bg-black/70 text-white text-[10px] px-1.5 py-0.5">
                {r.price === "FREE" ? "FREE" : r.price}
              </span>
              <span className="absolute left-1 bottom-1 rounded-md bg-black/70 text-white text-[10px] px-1.5 py-0.5">
                {r.bpm} BPM
              </span>
              <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <div className="rounded-full p-2 text-white" style={{ backgroundColor: "var(--p)" }}>
                  <Play className="h-4 w-4" />
                </div>
              </div>
            </a>

            {/* middle */}
            <div className="min-w-0">
              <Link href={r.href} className="block text-body font-semibold leading-tight">{r.title}</Link>
              <div className="text-body/70 text-sm">{r.artist}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full text-xs ring-1 ring-neutral/20 text-body/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col items-end gap-3">
              {r.price !== "FREE" && (
                <button
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white"
                  style={{ backgroundColor: "var(--p)" }}
                  title="Add to cart"
                >
                  {r.price}
                  <ShoppingCart className="h-3.5 w-3.5" />
                </button>
              )}
              <div className="flex items-center gap-2 text-body/70">
                <button className="btn btn-ghost btn-circle btn-xs"><Heart className="h-4 w-4" /></button>
                <button className="btn btn-ghost btn-circle btn-xs"><MoreVertical className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
