
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export type Beat = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  href: string;
};

export default function BeatCard({ beat }: { beat: Beat }) {
  return (
    <Link
      href={beat.href}
      className="
        group relative block rounded-3xl bg-surface ring-1 ring-neutral/10
        hover:ring-[var(--p)]/40 hover:shadow-xl transition
      "
    >
      {/* Cover */}
      <div className="relative aspect-square overflow-hidden rounded-3xl card-reflection">
        <Image
          src={beat.coverUrl}
          alt={`${beat.title} cover`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
        />
        {/* subtle bottom gradient for readability if you overlay text later */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Play button on hover */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="
              opacity-0 group-hover:opacity-100 transition
              rounded-full p-3 sm:p-4 shadow-lg ring-1 ring-[var(--p)]/30
            "
            style={{ backgroundColor: "var(--p)" }}
          >
            <Play className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--pc)]" />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="px-2.5 sm:px-3 pb-3 pt-2">
        <div className="text-base sm:text-lg font-semibold text-body clamp-1">
          {beat.artist}
        </div>
        <div className="text-body/70 text-sm clamp-2">{beat.title}</div>
      </div>
    </Link>
  );
}
