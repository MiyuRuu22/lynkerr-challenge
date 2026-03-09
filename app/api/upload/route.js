import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ message: "No image provided" }),
        { status: 400 }
      );
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "lynkerr",
    });

    return new Response(
      JSON.stringify({ url: uploadedImage.secure_url }),
      { status: 200 }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Upload failed" }),
      { status: 500 }
    );
  }
}