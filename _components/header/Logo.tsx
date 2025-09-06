import Link from "next/link";

export default function Logo() {
  return (
   <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2"
            aria-label="BeatShop home"
          >
            <div className="h-8 w-8 rounded-xl bg-brand-10 ring-1 ring-brand grid place-items-center">
              <span className="font-black text-brand">b</span>
            </div>
            <span className="hidden lg:inline font-semibold tracking-tight text-body">
              BeatShop
            </span>
          </Link>
  );
}
