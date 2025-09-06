
"use client";
import { useRef, useState, useEffect } from "react";

export default function ImagePicker({ name, label }: { name: string; label: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-body">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative h-28 w-28 rounded-2xl overflow-hidden ring-1 ring-neutral/10 bg-subtle">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-xs text-body/60">No image</div>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn btn-sm rounded-xl text-white"
          style={{ backgroundColor: "var(--p)", borderColor: "var(--p)" }}
        >
          Upload Image
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        onChange={(e) => {
          const f = e.currentTarget.files?.[0];
          if (f) setPreview(URL.createObjectURL(f));
        }}
        hidden
      />
    </div>
  );
}
