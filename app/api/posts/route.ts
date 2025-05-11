import reviews from "@/models/reviews";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(request: Request) {
  await connectDB();
  try {
    const allReviews = await reviews.find({});

    return new Response(JSON.stringify(allReviews), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return new Response(JSON.stringify({ message: "Failed to get reviews" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

async function generateUniqueSlug(title: string): Promise<string> {
  let slug = slugify(title);
  let count = 1;
  while (true) {
    const existingReview = await reviews.findOne({ slug });
    if (!existingReview) {
      break;
    }
    slug = `${slugify(title)}-${count}`;
    count++;
  }
  return slug;
}
export async function POST(request: Request) {
  await connectDB();
  try {
    const data = await request.json();
    console.log(data);
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
    } = data;
    tags = tags ? tags.split(",").map((tag: string) => tag.trim()) : [];
    console.log(
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
      tags
    );

    // Create the slug from the title
     const slug = await generateUniqueSlug(title);


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

export async function PUT(request: Request) {
  await connectDB();
  try {
    const data = await request.json();
    const { id } = data;

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing review ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Find the existing review
    const existingReview = await reviews.findById(id);

    if (!existingReview) {
      return new Response(JSON.stringify({ message: "Review not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let {
      title = existingReview.title, // Default to existing value
      excerpt = existingReview.excerpt,
      content = existingReview.content,
      coverImage = existingReview.coverImage,
      type = existingReview.type,
      status = existingReview.status,
      rating = existingReview.rating,
      category = existingReview.category,
      author = existingReview.author,
      publishDate = existingReview.publishDate,
      tags = existingReview.tags,
    } = data;

    // Generate a unique slug if the title is being updated
    const slug =
      title !== existingReview.title
        ? await generateUniqueSlug(title)
        : existingReview.slug;

    // Convert tags string to array
    tags =
      typeof tags === "string"
        ? tags.split(",").map((tag: string) => tag.trim())
        : tags;

    // Update the review
    existingReview.title = title;
    existingReview.slug = slug;
    existingReview.excerpt = excerpt;
    existingReview.content = content;
    existingReview.coverImage = coverImage;
    existingReview.type = type;
    existingReview.status = status;
    existingReview.rating = rating;
    existingReview.category = category;
    existingReview.author = author;
    existingReview.publishDate = publishDate;
    existingReview.tags = tags;

    const updatedReview = await existingReview.save();

    return new Response(
      JSON.stringify({
        message: "Review updated successfully!",
        review: updatedReview,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update review" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing review ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await connectDB();

    const review = await reviews.findByIdAndDelete(id);

    if (!review) {
      return new Response(JSON.stringify({ message: "Review not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({ message: "Review deleted successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete review" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}