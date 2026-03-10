"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteListingButton({ listingId, creatorId }) {
  const router = useRouter();

  const [canDelete, setCanDelete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem("user") || "{}");
    setCanDelete(!!tokenUser?.id && tokenUser.id === creatorId);
    setMounted(true);
  }, [creatorId]);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/listings/delete/${listingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete listing");
        setLoading(false);
        return;
      }

      router.push("/feed");
    } catch {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  if (!mounted || !canDelete) return null;

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}