"use client";

import { useRouter } from "next/navigation";

export default function EditListingButton({ listingId, creatorId }) {
  const router = useRouter();

  const tokenUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  if (!tokenUser || tokenUser.id !== creatorId) {
    return null;
  }

  return (
    <button
      onClick={() => router.push(`/listing/${listingId}/edit`)}
      className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      Edit
    </button>
  );
}