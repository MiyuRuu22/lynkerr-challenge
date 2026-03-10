"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FeedSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmed = search.trim();

    if (!trimmed) {
      router.push("/feed");
      return;
    }

    router.push(`/feed?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="mt-6 mb-10">
      <form onSubmit={handleSearchSubmit} className="mx-auto max-w-xl">
        <div className="flex h-10 items-center rounded-xl border border-gray-300 bg-white px-3 shadow-sm transition focus-within:border-black focus-within:shadow">
          <svg
            className="mr-2 h-[18px] w-[18px] text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              if (!value.trim()) {
                router.push("/feed");
              } else {
                router.push(`/feed?q=${encodeURIComponent(value)}`);
              }
            }}
            placeholder="Search experiences or locations"
            className="w-full bg-transparent text-sm leading-none text-gray-900 outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                router.push("/feed");
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </form>
    </div>
  );
}