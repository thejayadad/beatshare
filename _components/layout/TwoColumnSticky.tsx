export default function TwoColumn({
  left,
  right,
  gap = "gap-6",
}: { left: React.ReactNode; right: React.ReactNode; gap?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 ${gap}
                     grid grid-cols-1 lg:grid-cols-12 items-start`}>
      <main className="lg:col-span-8 min-w-0 space-y-4">
        {left}
      </main>

      {/* right stacks under on mobile */}
      <aside className="lg:col-span-4 min-w-0 space-y-4">
        {right}
      </aside>
    </div>
  );
}
