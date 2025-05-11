import reviews from "@/models/reviews";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

// Get review by Slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  const { slug } = params;
  console.log("Getting review with slug:", slug);
  try {
    const review = await reviews.findOne({ slug });
    console.log(review);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.log("Error getting review:", error);
    console.error("Error getting review:", error);
    return NextResponse.json(
      { message: "Failed to get review" },
      { status: 500 }
    );
  }
}