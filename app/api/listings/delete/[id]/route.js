import { connectDB } from "@/lib/mongodb";
import Listing from "@/models/Listing";
import jwt from "jsonwebtoken";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

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

    const listing = await Listing.findById(id);

    if (!listing) {
      return new Response(
        JSON.stringify({ message: "Listing not found" }),
        { status: 404 }
      );
    }

    if (listing.creatorId !== decoded.userId) {
      return new Response(
        JSON.stringify({ message: "Forbidden" }),
        { status: 403 }
      );
    }

    await Listing.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Listing deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE LISTING ERROR:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}