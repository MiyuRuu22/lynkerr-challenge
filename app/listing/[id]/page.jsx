import { headers } from "next/headers";
import SaveButton from "@/components/SaveButton";
import DeleteListingButton from "@/components/DeleteListingButton";
import EditListingButton from "@/components/EditListingButton";

async function getListing(id) {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/listings/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch listing");
  }

  return res.json();
}

export default async function ListingPage({ params }) {
  const { id } = await params;

  const data = await getListing(id);
  const listing = data.listing;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">
            {listing.title}
          </h1>

          <p className="text-gray-500 mb-4">{listing.location}</p>

          <p className="text-gray-700 mb-6">{listing.description}</p>

          {listing.price && (
            <p className="text-xl font-semibold mb-4 text-gray-900">
              ${listing.price}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <div>
              <p>Created by {listing.creatorName}</p>
              <p>{new Date(listing.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3">
              <SaveButton listingId={listing._id.toString()} />
              <EditListingButton
                listingId={listing._id.toString()}
                creatorId={listing.creatorId}
              />
              <DeleteListingButton
                listingId={listing._id.toString()}
                creatorId={listing.creatorId}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}