import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: String,
  location: String,
  imageUrl: String,
  description: String,
  price: Number,
  creatorId: String,
  creatorName: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Listing || mongoose.model("Listing", ListingSchema);