"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedListings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/listings/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch saved listings");
          setLoading(false);
          return;
        }

        setListings(data.listings);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedListings();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-600">Loading saved listings...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Saved Experiences
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Your bookmarked travel experiences in one place.
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No saved listings yet
            </h2>
            <p className="mt-2 text-gray-600">
              Save experiences you like and they will appear here.
            </p>
            <Link
              href="/feed"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Explore Feed
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link
                key={listing._id}
                href={`/listing/${listing._id}`}
                className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  {listing.price && (
                    <span className="absolute right-3 top-3 rounded-full bg-black px-3 py-1 text-sm font-medium text-white shadow">
                      ${listing.price}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    {listing.title}
                  </h2>

                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
                    <svg
                      className="h-[15px] w-[15px] flex-shrink-0 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                    <span className="leading-none">{listing.location}</span>
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-700">
                    {listing.description}
                  </p>

                  <div className="border-t border-gray-100 pt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="h-[15px] w-[15px] flex-shrink-0 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21a8 8 0 0 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="font-medium leading-none">
                        {listing.creatorName}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <svg
                        className="h-[15px] w-[15px] flex-shrink-0 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="leading-none">
                        {new Date(listing.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}