import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ saved: false }), { status: 200 });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ saved: false }), { status: 200 });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Response(JSON.stringify({ saved: false }), { status: 200 });
    }

    const saved = user.savedListings.some(
      (listingId) => listingId.toString() === id
    );

    return new Response(JSON.stringify({ saved }), { status: 200 });
  } catch (error) {
    console.error("SAVED STATUS ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}