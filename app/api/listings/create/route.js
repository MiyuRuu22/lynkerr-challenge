import { connectDB } from "@/lib/mongodb";
import Listing from "@/models/Listing";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return new Response(
        JSON.stringify({ message: "Invalid token" }),
        { status: 401 }
      );
    }

    const { title, location, imageUrl, description, price } = await req.json();

    if (!title || !location || !imageUrl || !description) {
      return new Response(
        JSON.stringify({ message: "Required fields are missing" }),
        { status: 400 }
      );
    }

    const listing = await Listing.create({
      title,
      location,
      imageUrl,
      description,
      price: price || null,
      creatorId: decoded.userId,
      creatorName: decoded.name,
    });

    return new Response(
      JSON.stringify({
        message: "Listing created successfully",
        listing,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}