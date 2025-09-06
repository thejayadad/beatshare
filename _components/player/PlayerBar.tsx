"use client";

import Image from "next/image";
import { usePlayer } from "./PlayerProvider";
import {
  Play, Pause, SkipBack, SkipForward, Repeat, Volume2, VolumeX,
  Heart, Share2
} from "lucide-react";

function fmt(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PlayerBar() {
  const {
    current, isPlaying, togglePlay, prev, next,
    progress, duration, seek,
    volume, setVolume, loop, toggleLoop
  } = usePlayer();

  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral/10 bg-surface/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4" style={{ height: "var(--player-h)" }}>
          {/* left: artwork + meta */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-1 ring-neutral/15">
              <Image src={current.cover} alt="" fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="font-medium leading-tight truncate text-body">{current.title}</div>
              <div className="text-sm text-body/70 truncate">{current.artist}</div>
            </div>
          </div>

          {/* center: controls + progress */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="btn btn-ghost btn-sm rounded-full" onClick={prev} aria-label="Previous">
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                className="btn btn-sm rounded-full text-white"
                style={{ backgroundColor: "var(--p)", borderColor: "var(--p)" }}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              <button className="btn btn-ghost btn-sm rounded-full" onClick={next} aria-label="Next">
                <SkipForward className="h-5 w-5" />
              </button>

              <button
                className={`btn btn-ghost btn-sm rounded-full ${loop ? "text-brand" : ""}`}
                onClick={toggleLoop}
                aria-label="Loop"
                title="Loop"
              >
                <Repeat className="h-5 w-5" />
              </button>
            </div>

            {/* progress */}
            <div className="mt-1 flex items-center gap-2 w-full">
              <span className="text-[11px] tabular-nums text-body/70">{fmt(progress)}</span>
              <input
                type="range"
                min={0}
                max={Math.max(duration, 1)}
                step={0.1}
                value={Math.min(progress, duration || 0)}
                onChange={(e) => seek(parseFloat(e.currentTarget.value))}
                className="range range-xs flex-1"
              />
              <span className="text-[11px] tabular-nums text-body/70">{fmt(duration)}</span>
            </div>
          </div>

          {/* right: volume + actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button className="btn btn-ghost btn-sm rounded-full" aria-label="Like">
              <Heart className="h-5 w-5" />
            </button>
            <button className="btn btn-ghost btn-sm rounded-full" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </button>

            {volume > 0 ? <Volume2 className="h-5 w-5 text-body/70" /> : <VolumeX className="h-5 w-5 text-body/70" />}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.currentTarget.value))}
              className="range range-xs w-28"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
