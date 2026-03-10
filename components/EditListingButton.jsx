"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditListingButton({ listingId, creatorId }) {
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem("user") || "{}");
    setCanEdit(!!tokenUser?.id && tokenUser.id === creatorId);
    setMounted(true);
  }, [creatorId]);

  if (!mounted || !canEdit) {
    return null;
  }

  return (
    <button
      onClick={() => router.push(`/listing/${listingId}/edit`)}
      className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      Edit
    </button>
  );
}