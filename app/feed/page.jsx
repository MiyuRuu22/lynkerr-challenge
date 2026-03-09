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

export default async function FeedPage({ searchParams }) {
  const { q = "" } = await searchParams;

  const data = await getListings();
  const listings = data.listings;

  const query = q.toLowerCase().trim();

  const filteredListings = query
    ? listings.filter((listing) => {
        const title = listing.title?.toLowerCase() || "";
        const location = listing.location?.toLowerCase() || "";
        return title.includes(query) || location.includes(query);
      })
    : listings;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
        <section className="relative mb-10 overflow-hidden rounded-3xl">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
                }}
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative px-8 py-14 text-center text-white sm:px-12">
                <h1 className="text-3xl font-bold sm:text-4xl">
                Explore Travel Experiences
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
                Discover unforgettable adventures shared by travelers and hosts
                around the world.
                </p>
            </div>
            </section>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Latest Experiences
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Discover unique local adventures shared by travelers and hosts.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {query ? (
              <>
                {filteredListings.length} experience
                {filteredListings.length !== 1 ? "s" : ""} found for{" "}
                <span className="font-medium text-gray-700">"{q}"</span>
              </>
            ) : (
              <span>Browse all experiences</span>
            )}
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
        ) : filteredListings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No matching experiences
            </h2>
            <p className="mt-2 text-gray-600">
              Try a different title or location search.
            </p>
            <Link
              href="/feed"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Clear Search
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
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