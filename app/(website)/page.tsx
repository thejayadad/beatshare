// app/page.tsx (or your Home route)
import RightRail from "@/_components/right-rail/RightRail";
import BeatListPaged from "@/_components/beats/BeatListPaged.client";
import { demoBeats } from "@/lib/demoData";
import Pagination from "@/_components/layout/Pagination.client";
import TwoColumn from "@/_components/layout/TwoColumnSticky"; // or TwoColumn if that's your file

export default function Home({
  searchParams,
}: { searchParams: { page?: string; per?: string } }) {
  const PER = 10; // <- fixed
  const pageRaw = Number(searchParams.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  const all = demoBeats(60);
  const start = (page - 1) * PER;
  const items = all.slice(start, start + PER);

  return (
    <div className="py-6 sm:py-8 space-y-8">
      <TwoColumn
        left={
          <>
            <BeatListPaged items={items} />
            <Pagination page={page} perPage={PER} total={all.length} />
          </>
        }
        right={<RightRail />}
      />
    </div>
  );
}
