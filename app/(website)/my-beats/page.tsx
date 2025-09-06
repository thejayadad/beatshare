import LocalBeatsList from "@/_components/beats/LocalBeatList";

export default function MyBeatsPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 py-6 space-y-4">
      <h1 className="section-accent text-xl sm:text-2xl font-semibold text-body">My Beats (Local)</h1>
      <LocalBeatsList />
    </div>
  );
}
