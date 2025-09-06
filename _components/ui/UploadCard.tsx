
export default function UploadCard({
  title,
  help,
  children,
}: { title: string; help?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-surface ring-1 ring-neutral/10 p-4 sm:p-5 space-y-3">
      <header className="flex items-center justify-between">
        <h3 className="font-semibold text-body">{title}</h3>
        {help ? <span className="text-xs text-body/60">{help}</span> : null}
      </header>
      {children}
    </section>
  );
}
