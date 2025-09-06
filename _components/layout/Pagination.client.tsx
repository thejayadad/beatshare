// @/_components/layout/Pagination.client.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  page,
  perPage,
  total,
}: {
  page: number;
  perPage: number;
  total: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const last = Math.max(1, Math.ceil(total / perPage));
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const push = (p: number) => {
    const q = new URLSearchParams(sp.toString());
    q.set("page", String(p));
    q.delete("per"); // ignore old per param if present
    router.push(`?${q.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const windowPages = Array.from({ length: Math.min(last, 5) }, (_, i) => {
    const start = Math.max(1, Math.min(page - 2, last - 4));
    return start + i;
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* pager */}
      <div className="join">
        <button className="btn btn-sm join-item" disabled={page <= 1} onClick={() => push(page - 1)}>
          Prev
        </button>
        {windowPages.map((n) => (
          <button
            key={n}
            className={`btn btn-sm join-item ${n === page ? "btn-active" : "btn-ghost"}`}
            onClick={() => push(n)}
          >
            {n}
          </button>
        ))}
        <button className="btn btn-sm join-item" disabled={page >= last} onClick={() => push(page + 1)}>
          Next
        </button>
      </div>

      {/* clarity text */}
      <div className="text-xs text-body/70">
        Showing <span className="font-medium">{from}</span>–<span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{total}</span> • Page{" "}
        <span className="font-medium">{page}</span> of <span className="font-medium">{last}</span>
      </div>
    </div>
  );
}
