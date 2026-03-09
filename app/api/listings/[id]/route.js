import { connectDB } from "@/lib/mongodb";
import Listing from "@/models/Listing";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return new Response(
        JSON.stringify({ message: "Listing not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ listing }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET LISTING ERROR:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}