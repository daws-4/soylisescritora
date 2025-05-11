import reviews from "@/models/reviews";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { idd: string } }
) {
  await connectDB();
  const { idd } = params;
  console.log("Getting review with ID:", idd);
  try {
    const review = await reviews.findById(idd);
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

export async function POST(request: Request) {
  try {
    await connectDB();

    const reqBody = await request.json();

    let {
      title,
      excerpt,
      content,
      coverImage,
      type,
      status,
      category,
      rating,
      author,
      publishDate,
      tags,
    } = reqBody;

    // Validate required fields
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert tags string to array
    const tagsArray = tags
      ? tags.split(",").map((tag: string) => tag.trim())
      : [];

    // Create the slug from the title
    const slug = slugify(title);

    // Create a new review document
    const newReview = new reviews({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      type,
      status,
      category,
      rating,
      author,
      publishDate,
      tags: tagsArray,
    });

    // Save the review to the database
    await newReview.save();

    return NextResponse.json(
      { message: "Publication created successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Failed to create review", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { idd: string } }
) {
  await connectDB();
  const { idd } = params;

  try {
    const body = await request.json();
    let {
      title,
      excerpt,
      content,
      coverImage,
      type,
      status,
      category,
      rating,
      author,
      publishDate,
      tags,
    } = body;

    const review = await reviews.findById(idd);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    // Update the review fields
    review.title = title;
    review.excerpt = excerpt;
    review.content = content;
    review.coverImage = coverImage;
    review.type = type;
    review.status = status;
    review.category = category;
    review.rating = rating;
    review.author = author;

    // Format the publishDate to YYYY-MM-DD
    review.publishDate = publishDate ? new Date(publishDate) : null;

    // Convert the tags string to an array
    review.tags = tags ? tags.split(",").map((tag: string) => tag.trim()) : [];

    // Update the slug
    review.slug = slugify(title);

    await review.save();

    return NextResponse.json(
      { message: "Review updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { message: "Failed to update review" },
      { status: 500 }
    );
  }
}
