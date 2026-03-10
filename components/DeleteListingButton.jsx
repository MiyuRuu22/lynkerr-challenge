"use client";

import { useRouter } from "next/navigation";

export default function DeleteListingButton({ listingId, creatorId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this listing?");

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

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
        return;
      }

      router.push("/feed");

    } catch {
      alert("Something went wrong");
    }
  };

  const tokenUser = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  if (!tokenUser || tokenUser.id !== creatorId) {
    return null;
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      Delete
    </button>
  );
}