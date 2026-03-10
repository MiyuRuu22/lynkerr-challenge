import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
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

    const { listingId } = await req.json();

    if (!listingId) {
      return new Response(
        JSON.stringify({ message: "Listing ID is required" }),
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    user.savedListings = user.savedListings.filter(
      (id) => id.toString() !== listingId
    );

    await user.save();

    return new Response(
      JSON.stringify({ message: "Listing removed from saved items" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("UNSAVE LISTING ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}