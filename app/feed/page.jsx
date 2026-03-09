import Link from "next/link";
import { headers } from "next/headers";

async function getListings() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/listings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  return res.json();
}

export default async function FeedPage() {
  const data = await getListings();
  const listings = data.listings;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Travel Experiences
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Discover unique local adventures shared by travelers and hosts.
            </p>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No listings available yet
            </h2>
            <p className="mt-2 text-gray-600">
              Be the first to create and share a travel experience.
            </p>
            <Link
              href="/create"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Create Listing
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

                  <p className="mb-3 text-sm font-medium text-gray-500">
                    📍 {listing.location}
                  </p>

                  <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-700">
                    {listing.description}
                  </p>

                  <div className="border-t border-gray-100 pt-4 text-sm text-gray-500">
                    <p className="font-medium text-gray-700">
                      By {listing.creatorName}
                    </p>
                    <p className="mt-1">
                      {new Date(listing.createdAt).toLocaleString()}
                    </p>
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