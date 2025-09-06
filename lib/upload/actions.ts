
"use server";

import { redirect } from "next/navigation";
// Later: import { put } from "@vercel/blob";  // when you wire Blob

export async function handleUpload(formData: FormData) {
  // Pull fields
  const trackName = String(formData.get("trackName") || "");
  const bpm = Number(formData.get("bpm") || 0);
  const price = Number(formData.get("price") || 0);
  const free = formData.get("free") === "on";
  const genres = (formData.getAll("genres") as string[]) || [];
  const tags = String(formData.get("tags") || "");
  const cover = formData.get("cover") as File | null;
  const audioUntagged = formData.get("audioUntagged") as File | null;
  const audioTagged = formData.get("audioTagged") as File | null;
  const stems = formData.get("stems") as File | null;

  // TODO: when ready, push files to Blob:
  // const coverUrl = cover ? (await put(`covers/${crypto.randomUUID()}-${cover.name}`, cover, { access: "public" })).url : null;
  // ...same for audioUntagged, audioTagged, stems...

  // For now, just fake a “saved” object and bounce to a success page
  const payload = {
    trackName, bpm, price, free, genres, tags,
    coverName: cover?.name ?? null,
    audioUntaggedName: audioUntagged?.name ?? null,
    audioTaggedName: audioTagged?.name ?? null,
    stemsName: stems?.name ?? null,
  };

  redirect(`/upload/success?data=${encodeURIComponent(JSON.stringify(payload))}`);
}
