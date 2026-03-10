"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SaveButton({ listingId }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`/api/listings/saved-status/${listingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSaved(data.saved);
      } catch (error) {
        console.error("Failed to check saved status", error);
      }
    };

    checkSavedStatus();
  }, [listingId]);

  const handleToggleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const endpoint = saved ? "/api/listings/unsave" : "/api/listings/save";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        setLoading(false);
        return;
      }

      setSaved(!saved);
    } catch (error) {
      console.error("Save toggle failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
        onClick={handleToggleSave}
        disabled={loading}
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
        {loading ? "Saving..." : saved ? "Saved" : "Save"}
    </button>
  );
}