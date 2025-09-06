
"use client";
import { useState } from "react";

export default function AudioPicker({
  name,
  label,
  accept = "audio/mpeg,audio/wav,audio/x-wav,audio/wave,audio/vnd.wave",
}: { name: string; label: string; accept?: string }) {
  const [fileName, setFileName] = useState<string>("");
  const [url, setUrl] = useState<string | null>(null);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-body">{label}</label>
      <input
        type="file"
        name={name}
        accept={accept}
        className="file-input file-input-bordered file-input-sm w-full"
        onChange={(e) => {
          const f = e.currentTarget.files?.[0];
          if (!f) return;
          setFileName(f.name);
          setUrl(URL.createObjectURL(f));
        }}
      />
      <div className="text-xs text-body/70 truncate">{fileName}</div>
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <audio src={url} controls className="w-full rounded-xl" />
      )}
    </div>
  );
}
