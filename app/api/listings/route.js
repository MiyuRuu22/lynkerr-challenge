import { connectDB } from "@/lib/mongodb";
import Listing from "@/models/Listing";

export async function GET() {
  try {
    await connectDB();

    const listings = await Listing.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ listings }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET LISTINGS ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}