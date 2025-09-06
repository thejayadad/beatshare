"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;         // mp3/ogg url (put files in /public/audio for now)
};

type Ctx = {
  queue: Track[];
  index: number;           // -1 if nothing loaded
  current: Track | null;
  isPlaying: boolean;
  progress: number;        // seconds
  duration: number;        // seconds
  volume: number;          // 0..1
  loop: boolean;

  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (sec: number) => void;
  setVolume: (v: number) => void;
  toggleLoop: () => void;
};

const PlayerContext = createContext<Ctx | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVol] = useState(0.85);
  const [loop, setLoop] = useState(false);

  // ensure one audio element
  const audio = useMemo(() => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) audioRef.current = new Audio();
    return audioRef.current;
  }, []);

  const loadByIndex = useCallback(
    async (i: number, autoplay = true) => {
      if (!audio || !queue[i]) return;
      const t = queue[i];
      audio.src = t.src;
      audio.loop = loop;
      audio.volume = volume;
      audio.currentTime = 0;
      setDuration(0);
      setProgress(0);
      setIndex(i);
      if (autoplay) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    },
    [audio, queue, loop, volume]
  );

  const playTrack = useCallback(
    (track: Track, newQueue?: Track[]) => {
      if (!audio) return;
      if (newQueue) setQueue(newQueue);
      // find in queue (newQueue may not be set immediately, so compute base)
      const baseQueue = newQueue ?? queue;
      const found = baseQueue.findIndex((t) => t.id === track.id);
      if (found >= 0) {
        // existing
        setQueue(baseQueue);
        loadByIndex(found, true);
      } else {
        // append
        const appended = [...baseQueue, track];
        setQueue(appended);
        loadByIndex(appended.length - 1, true);
      }
    },
    [audio, queue, loadByIndex]
  );

  const togglePlay = useCallback(async () => {
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  const next = useCallback(() => {
    setIndex((i) => {
      const ni = i + 1 < queue.length ? i + 1 : i;
      if (ni !== i) loadByIndex(ni, true);
      return ni;
    });
  }, [queue.length, loadByIndex]);

  const prev = useCallback(() => {
    if (!audio) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setIndex((i) => {
      const pi = i > 0 ? i - 1 : 0;
      if (pi !== i) loadByIndex(pi, true);
      return pi;
    });
  }, [audio, loadByIndex]);

  const seek = useCallback(
    (sec: number) => {
      if (!audio) return;
      audio.currentTime = Math.max(0, Math.min(sec, duration || sec));
      setProgress(audio.currentTime);
    },
    [audio, duration]
  );

  const setVolume = useCallback(
    (v: number) => {
      const vv = Math.max(0, Math.min(1, v));
      setVol(vv);
      if (audio) audio.volume = vv;
    },
    [audio]
  );

  const toggleLoop = useCallback(() => {
    setLoop((l) => {
      if (audio) audio.loop = !l;
      return !l;
    });
  }, [audio]);

  // wire listeners
  useEffect(() => {
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      if (!audio.loop) next();
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, [audio, next]);

  // body padding when player is visible
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("has-player", index >= 0);
  }, [index]);

  const value: Ctx = {
    queue,
    index,
    current: index >= 0 ? queue[index] ?? null : null,
    isPlaying,
    progress,
    duration,
    volume,
    loop,
    playTrack,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleLoop,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
