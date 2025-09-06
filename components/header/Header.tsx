
import Link from "next/link";
import Logo from "../../_components/header/Logo";
import CreateButton from "../../_components/header/CreateButton";
import CartButton from "../../_components/header/CartButton";
import UserMenu from "../../_components/header/UserMenu";

/**
 * Navbar behavior
 * - Left: Logo
 * - Right: My Tracks, Create, Cart, UserMenu
 * - Mobile: "My Tracks" becomes an icon-only button; spacing stays tight
 * - Light, dotted border bottom (neutral-200)
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-dotted border-neutral-200 bg-base-100/80 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        {/* left */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* center (empty for now; keeps layout flexible) */}
        <div className="navbar-center" />

        {/* right */}
        <div className="navbar-end gap-1 sm:gap-2">
          {/* My Tracks */}
          <Link
            href="/tracks"
            className="btn btn-ghost rounded-2xl px-3 sm:px-4"
          >
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
