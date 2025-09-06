"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MoreVertical, ShoppingCart, Play } from "lucide-react";
import { usePlayer, Track as PlayerTrack } from "@/_components/player/PlayerProvider";

type Row = PlayerTrack & {
  bpm: number;
  price: string;   // "$29.99" or "FREE"
  href: string;
  tags: string[];
};

const rows: Row[] = [
  {
    id: "1",
    title: "All Over Me",
    artist: "phyllis.prod",
    bpm: 89,
    price: "$50.00",
    cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    href: "/beat/1",
    tags: ["indie rock", "bedroom pop type beat", "guitar"],
    src: "/audio/demo1.wav", // put a small mp3 in /public/audio
  },
  {
    id: "2",
    title: "ADL pt.16 | Yeat Type Beat x BNYX Type Beat",
    artist: "Ray Offkey",
    bpm: 131,
    price: "$29.99",
    cover: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1200&auto=format&fit=crop",
    href: "/beat/2",
    tags: ["yeat", "bnyx", "trap"],
    src: "/audio/demo2.wav",
  },
  {
    id: "3",
    title: "side eye",
    artist: "dmo",
    bpm: 142,
    price: "$25.00",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    href: "/beat/3",
    tags: ["experimental", "underground"],
    src: "/audio/demo3.wav",
  },
];

export default function BeatList() {
  const player = usePlayer();
  const queue: PlayerTrack[] = rows.map(({ id, title, artist, cover, src }) => ({
    id, title, artist, cover, src,
  }));

  return (
    <ul className="space-y-4">
      {rows.map((r) => (
        <li
          key={r.id}
          className="rounded-3xl bg-surface ring-1 ring-neutral/10 px-3 sm:px-4 py-3 hover:ring-[var(--p)]/40 transition"
        >
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-4 items-start">
            {/* cover (click to play) */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                player.playTrack(
                  { id: r.id, title: r.title, artist: r.artist, cover: r.cover, src: r.src },
                  queue
                );
              }}
              className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden group"
              aria-label={`Play ${r.title} by ${r.artist}`}
            >
              <Image src={r.cover} alt="" fill className="object-cover" />
              <span className="absolute left-1 top-1 rounded-md bg-black/70 text-white text-[10px] px-1.5 py-0.5">
                FREE
              </span>
              <span className="absolute left-1 bottom-1 rounded-md bg-black/70 text-white text-[10px] px-1.5 py-0.5">
                {r.bpm} BPM
              </span>

              {/* hover play badge */}
              <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <div className="rounded-full p-2 text-white" style={{ backgroundColor: "var(--p)" }}>
                  <Play className="h-4 w-4" />
                </div>
              </div>
            </a>

            {/* middle */}
            <div className="min-w-0">
              <Link href={r.href} className="block text-body font-semibold leading-tight">
                {r.title}
              </Link>
              <div className="text-body/70 text-sm">{r.artist}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 rounded-full text-xs ring-1 ring-neutral/20 text-body/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* right actions */}
            <div className="flex flex-col items-end gap-3">
              <button
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white"
                style={{ backgroundColor: "var(--p)" }}
                title="Add to cart"
              >
                {r.price}
                <ShoppingCart className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center gap-2 text-body/70">
                <button className="btn btn-ghost btn-circle btn-xs" title="Like">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="btn btn-ghost btn-circle btn-xs" title="More">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
