import BeatCard, { Beat } from "./BeatCard";

export default function BeatGrid({ items }: { items: Beat[] }) {
  return (
    <div
      className="
        grid gap-5
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      {items.map((b) => (
        <BeatCard key={b.id} beat={b} />
      ))}
    </div>
  );
}
