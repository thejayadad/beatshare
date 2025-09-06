"use client";
import Link from "next/link";

export default function CreateButton() {
  return (
    <Link
      href="/create"
      className="btn btn-sm sm:btn-md text-white rounded-2xl shadow-sm"
      style={{ backgroundColor: "var(--p)", borderColor: "var(--p)" }}
    >
      + Create
    </Link>
  );
}
