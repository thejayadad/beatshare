// app/(site)/layout.tsx (or your route layout)
import Header from "@/_components/header/header";
import Sidebar from "@/_components/sidebar/sidebar";
import { PlayerProvider } from "@/_components/player/PlayerProvider";
import PlayerBar from "@/_components/player/PlayerBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <div className="bg-[#ffffff] text-neutral grid grid-rows-[auto_1fr]">
        <Header />
        <main className="flex min-h-0">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </main>
      </div>
      <PlayerBar />
    </PlayerProvider>
  );
}
