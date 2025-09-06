"use client";

import UploadCard from "@/_components/ui/UploadCard";
import ImagePicker from "@/_components/upload/ImagePicker.client";
import AudioPicker from "@/_components/upload/AudioPicker.client";
import { saveDraft } from "@/lib/localdb";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-3 gap-5"
      encType="multipart/form-data"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true); setError(null);
        const fd = new FormData(e.currentTarget as HTMLFormElement);
        try {
          await saveDraft({
            trackName: String(fd.get("trackName") || ""),
            bpm: Number(fd.get("bpm") || 0),
            price: Number(fd.get("price") || 0),
            free: fd.get("free") === "on",
            genres: fd.getAll("genres") as string[],
            tags: String(fd.get("tags") || ""),
            cover: fd.get("cover") as File | null,
            audioUntagged: fd.get("audioUntagged") as File | null,
            audioTagged: fd.get("audioTagged") as File | null,
            stems: fd.get("stems") as File | null,
          });
          router.push("/my-beats");
        } catch (err: any) {
          setError(err?.message || "Failed to save locally");
        } finally {
          setBusy(false);
        }
      }}
    >
      {/* Left column: media */}
      <div className="lg:col-span-1 space-y-5">
        <UploadCard title="Cover">
          <ImagePicker name="cover" label="Artwork (JPG/PNG)" />
        </UploadCard>

        <UploadCard title="Audio">
          <div className="space-y-4">
            <AudioPicker name="audioUntagged" label="Untagged MP3/WAV" />
            <AudioPicker name="audioTagged" label="Custom tagged MP3 (optional)" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-body">Stems archive (optional)</label>
              <input type="file" name="stems" accept=".zip,.rar,.7z" className="file-input file-input-bordered file-input-sm w-full" />
            </div>
          </div>
        </UploadCard>
      </div>

      {/* Right column: details */}
      <div className="lg:col-span-2 space-y-5">
        <UploadCard title="Basic details">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text text-body">Track Name</span></label>
              <input name="trackName" required placeholder="Track Name" className="input input-bordered rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text text-body">BPM</span></label>
                <input name="bpm" type="number" inputMode="numeric" min={40} max={220} placeholder="140" className="input input-bordered rounded-xl" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-body">Price (USD)</span></label>
                <input name="price" type="number" step="0.01" placeholder="29.99" className="input input-bordered rounded-xl" />
              </div>
            </div>
          </div>

          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <fieldset className="space-y-2">
              <div className="text-sm font-medium text-body">Genres</div>
              <div className="flex flex-wrap gap-2">
                {["Trap", "Hip Hop", "R&B", "Pop", "Indie", "Rock"].map((g) => (
                  <label key={g} className="badge badge-outline gap-2 cursor-pointer">
                    <input type="checkbox" name="genres" value={g} className="checkbox checkbox-xs" />
                    <span className="text-body/80">{g}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-control">
              <label className="label"><span className="label-text text-body">Tags (comma separated)</span></label>
              <input name="tags" placeholder="melodic, future, guitar" className="input input-bordered rounded-xl" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <input type="checkbox" name="free" className="toggle" />
            <span className="text-sm text-body">Free download (voice tag)</span>
          </div>
        </UploadCard>

        {error && <div className="alert alert-error rounded-xl">{error}</div>}

        <div className="flex items-center justify-between">
          <button type="button" className="btn btn-ghost rounded-xl" onClick={() => history.back()}>Cancel</button>
          <div className="flex gap-2">
            <button disabled={busy} className="btn btn-ghost rounded-xl" title="Saved locally">Save draft</button>
            <button
              disabled={busy}
              className="btn rounded-xl text-white"
              style={{ backgroundColor: "var(--p)", borderColor: "var(--p)" }}
              title="Saved locally"
            >
              {busy ? "Saving…" : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
