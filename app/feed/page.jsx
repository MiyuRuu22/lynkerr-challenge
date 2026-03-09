async function getListings() {
  const res = await fetch("http://localhost:3000/api/listings", {
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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Travel Experiences</h1>

        {listings.length === 0 ? (
          <p className="text-gray-600">No listings available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <a
                key={listing._id}
                href={`/listing/${listing._id}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition block"
              >
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">{listing.location}</p>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {listing.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>By {listing.creatorName}</p>
                    <p>{new Date(listing.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}