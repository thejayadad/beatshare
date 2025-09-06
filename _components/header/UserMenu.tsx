"use client";
import Link from "next/link";

export default function UserMenu() {
  const user = { name: "Thejayadad" };

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost px-2 gap-2" aria-label="User menu">
        <div className="avatar placeholder">
          <div className="w-8 rounded-full bg-[rgba(0,191,166,.15)] ring-1 ring-muted grid place-items-center">
            <span className="text-[11px] font-medium" style={{ color: "var(--s)" }}>TJ</span>
          </div>
        </div>
        <span className="hidden sm:inline font-medium text-body">{user.name}</span>
        <svg className="h-4 w-4 opacity-60 text-body" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
        </svg>
      </button>

      <ul className="menu dropdown-content bg-surface rounded-2xl shadow-lg ring-1 ring-muted w-56 mt-3 p-2">
        <li className="menu-title px-3 pt-2 text-xs text-body/70">Account</li>
        <li><Link href="/profile" className="text-body">View Profile</Link></li>
        <li><Link href="/tracks"  className="text-body">My Tracks</Link></li>
        <li><Link href="/upload"  className="text-body">Upload</Link></li>
        <li><Link href="/settings" className="text-body">Settings</Link></li>

        <li className="menu-title px-3 pt-3 text-xs text-body/70">Tools</li>
        <li><Link href="/ai-assistant" className="text-body">AI Assistant</Link></li>
        <li><Link href="/promote" className="text-body">Promote</Link></li>

        <li>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="text-body">Log out</button>
          </form>
        </li>
      </ul>
    </div>
  );
}
