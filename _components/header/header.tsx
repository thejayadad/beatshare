import Link from "next/link";
import Logo from "./Logo";
import CreateButton from "./CreateButton";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur border-b border-dotted border-muted">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-6 py-2">
        <div className="navbar-start">
          <Logo />
        </div>

        <div className="navbar-center" />

        <div className="navbar-end gap-1 sm:gap-2">
          <Link href="/tracks" className="btn btn-ghost rounded-2xl px-3 sm:px-4 text-body">
            <span className="hidden xs:inline">My Tracks</span>
            <span className="xs:hidden" aria-hidden>🎵</span>
          </Link>

          <CreateButton />
          <CartButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
