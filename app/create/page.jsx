"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateListingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    imageUrl: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in");
      return;
    }

    try {
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? Number(formData.price) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create listing");
        return;
      }

      router.push("/feed");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Travel Experience</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Experience Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
            required
          />

          <input
            name="price"
            placeholder="Price (optional)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg px-4 py-3 hover:opacity-90"
          >
            Create Listing
          </button>

        </form>
      </div>
    </main>
  );
}