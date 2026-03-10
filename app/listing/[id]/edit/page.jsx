"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return formData.imageUrl || "";
  }, [imageFile, formData.imageUrl]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load listing");
          setLoading(false);
          return;
        }

        const listing = data.listing;

        const tokenUser = JSON.parse(localStorage.getItem("user") || "{}");

        if (!tokenUser || tokenUser.id !== listing.creatorId) {
          router.push(`/listing/${id}`);
          return;
        }

        setFormData({
          title: listing.title || "",
          location: listing.location || "",
          description: listing.description || "",
          price: listing.price?.toString() || "",
          imageUrl: listing.imageUrl || "",
        });
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, router]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setError("");
  };

  const uploadImageToCloudinary = async (file) => {
    const base64 = await fileToBase64(file);

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64 }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const res = await fetch(`/api/listings/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: finalImageUrl,
          price: formData.price ? Number(formData.price) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update listing");
        setIsSubmitting(false);
        return;
      }

      router.push(`/listing/${id}`);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-2xl text-gray-600">Loading listing...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Edit Travel Experience
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Update your listing details and cover image.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Experience Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Replace Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:opacity-90"
            />
            <p className="mt-2 text-xs text-gray-500">
              Leave this empty if you want to keep the current image.
            </p>
          </div>

          {previewUrl && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-medium text-gray-800">Image Preview</p>
              </div>
              <img
                src={previewUrl}
                alt="Listing preview"
                className="h-64 w-full object-cover"
              />
            </div>
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
            required
          />

          <input
            name="price"
            placeholder="Price (optional)"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black px-4 py-3 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating Listing..." : "Update Listing"}
          </button>
        </form>
      </div>
    </main>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}