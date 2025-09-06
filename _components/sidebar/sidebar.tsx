
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Heart,
  Music4,
  ListMusic,
  Upload,
  LogOut,
} from "lucide-react";

function NavLink({
  href,
  icon: Icon,
  label,
}: { href: string; icon: React.ComponentType<any>; label: string }) {
  const path = usePathname();
  const active = path === href || (href !== "/" && path.startsWith(href));

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition
        hover:bg-[rgba(108,99,255,.06)] hover:ring-1 hover:ring-[var(--p)]/30
        ${active ? "bg-[rgba(108,99,255,.10)] ring-1 ring-[var(--p)]/40" : ""}
      `}
      title={label}
    >
      <Icon className={`h-5 w-5 ${active ? "text-brand" : "text-body/80"}`} />
      <span className="hidden lg:inline text-body">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="
        h-full border-r border-dotted border-muted bg-surface
        w-16 lg:w-72 shrink-0
        sticky top-0
      "
    >
      <div className="flex flex-col h-full">
        {/* Top: brand mini block (optional) */}
        <div className="px-3 py-3">
         
        </div>

        {/* Primary nav */}
        <nav className="px-2 pt-2 space-y-1">
          <NavLink href="/" icon={Home} label="Home" />
          <NavLink href="/search" icon={Search} label="Search" />
       </nav>

        {/* Collapsibles */}
        <div className="mt-4 px-2 space-y-2">
          {/* Favorites Section */}
          <div className="collapse bg-surface rounded-xl ring-1 ring-neutral/10">
            <input type="checkbox" />
            <div className="collapse-title py-2 px-3 flex items-center gap-3">
              <Heart className="h-5 w-5 text-body/80" />
              <span className="hidden lg:inline text-body font-medium">
                Favorites
              </span>
            </div>
            <div className="collapse-content px-2 pb-2">
              <ul className="menu menu-sm rounded-box">
                <li><Link href="/favorites/latest" className="text-body">Latest</Link></li>
                <li><Link href="/favorites/top" className="text-body">Top Rated</Link></li>
                <li><Link href="/favorites/tags" className="text-body">By Tag</Link></li>
              </ul>
            </div>
          </div>

          {/* Playlists Section */}
          <div className="collapse bg-surface rounded-xl ring-1 ring-neutral/10">
            <input type="checkbox" />
            <div className="collapse-title min-h-0 py-2 px-3 flex items-center gap-3">
              <ListMusic className="h-5 w-5 text-body/80" />
              <span className="hidden lg:inline text-body font-medium">
                Playlists
              </span>
            </div>
            <div className="collapse-content px-2 pb-2">
              <ul className="menu menu-sm rounded-box">
                <li><Link href="/playlists" className="text-body">All Playlists</Link></li>
                <li><Link href="/playlists/new" className="text-body">Create Playlist</Link></li>
              </ul>
            </div>
          </div>

          {/* My Uploads Section */}
          <div className="collapse bg-surface rounded-xl ring-1 ring-neutral/10">
            <input type="checkbox" />
            <div className="collapse-title min-h-0 py-2 px-3 flex items-center gap-3">
              <Upload className="h-5 w-5 text-body/80" />
              <span className="hidden lg:inline text-body font-medium">
                My Uploads
              </span>
            </div>
            <div className="collapse-content px-2 pb-2">
              <ul className="menu menu-sm rounded-box">
                <li><Link href="/upload" className="text-body">Upload Beat</Link></li>
                <li><Link href="/my-beats" className="text-body">Manage Uploads</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 mt-24" />

        {/* Logout at bottom */}
        <div className="p-2 pb-3">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center justify-center lg:justify-start gap-3 rounded-xl px-3 py-2
                         hover:bg-[rgba(108,99,255,.06)] hover:ring-1 hover:ring-[var(--p)]/30"
              title="Log out"
            >
              <LogOut className="h-5 w-5 text-body/80" />
              <span className="hidden lg:inline text-body">Log out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
