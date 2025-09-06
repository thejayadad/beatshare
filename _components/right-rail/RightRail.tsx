import Image from "next/image";

export default function RightRail() {
  return (
    <>
      <div className="card bg-surface ring-1 ring-neutral/10 rounded-3xl overflow-hidden">
        <figure className="relative aspect-[16/11]">
          <Image
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"
            alt="Promo"
            fill
            className="object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h3 className="card-title text-body text-base">Get Your Tracks Heard</h3>
          <p className="text-body/70 text-sm">Boost visibility with featured slots.</p>
          <div className="card-actions">
            <button className="btn btn-sm rounded-xl text-white"
                    style={{ backgroundColor: "var(--p)", borderColor: "var(--p)" }}>
              Promote
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-surface ring-1 ring-neutral/10 rounded-3xl overflow-hidden">
        <figure className="relative aspect-[16/11]">
          <Image
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop"
            alt="Find your sound"
            fill
            className="object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h3 className="card-title text-body text-base">Find Your Sound</h3>
          <p className="text-body/70 text-sm">Curated playlists for buyers.</p>
          <div className="card-actions">
            <button className="btn btn-sm btn-ghost rounded-xl text-body">Explore</button>
          </div>
        </div>
      </div>
    </>
  );
}
