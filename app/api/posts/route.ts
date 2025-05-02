import reviews from "@/models/reviews";
import { connectDB } from "@/lib/db";

export async function POST(request: Request) {
  await connectDB();
  try {
    const data = await request.json();
    console.log(data);
    const {
      title,
      excerpt,
      content,
      coverImage,
      type,
      status,
      rating,
      category,
      author,
      publishDate,
      tags,
    } = data;
    console.log(
      title,
      excerpt,
      content,
      coverImage,
      type,
      status,
      rating,
      category,
      author,
      publishDate,
      tags
    );

    // Create a new review document
    const newReview = new reviews({
      title,
      excerpt,
      content,
      coverImage,
      type,
      status,
      rating,
      category,
      author,
      publishDate,
      tags,
    });

    // Save the review to the database
    await newReview.save();

    return new Response(
      JSON.stringify({ message: "Publication created successfully!" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating publication:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create publication" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
