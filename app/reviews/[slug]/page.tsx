"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReviewBySlug, getAllReviews } from "@/lib/reviews-data";
import { Star } from "lucide-react";
import type { Metadata } from "next";
import axios from "axios";
import { useEffect, useState } from "react";

interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export default  function ReviewPage({ params }: ReviewPageProps) {
  const slugp = params.slug;

  interface Post {
    _id: string;
    title: string;
    excerpt: string;
    author: string;
    rating: number;
    content: string;
    slug: string;
    type: string;
    coverImage?: string;
    publishedAt?: string;
    updatedAt?: string;
    status?: string;
    tags: string[];
    publishDate: string;
  }

  const [review, setReview] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/posts/slug/${slugp}`);
        setReview(response.data);
      } catch (err: any) {
        console.error("Failed to fetch review:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [slugp]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!review) {
    return <div>Review not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-pink-500 to-rose-700">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="relative h-[300px] w-[200px] md:h-[400px] md:w-[300px] flex-shrink-0">
            {review.coverImage && (
              <Image
                src={review.coverImage}
                alt={review.title}
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            )}
          </div>
          <div className="text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{review.title}</h1>
            <p className="text-xl">Por {review.author}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-none text-white/50"
                    }`}
                />
              ))}
            </div>
            <p className="text-lg text-rose-100">{review.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-rose lg:prose-lg">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {review.tags &&
                  review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <p className="text-gray-500">
                Publicado el{" "}
                {review.publishDate &&
                  new Date(review.publishDate).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </p>
            </div>

            <div className="markdown-content">
              <p className="text-gray-700 mb-4 text-lg font-semibold text-justify word-spacing-1 leading-loose">
                {review.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-rose-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-rose-900 mb-4">
            ¿Te ha gustado esta reseña?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            Descubre más análisis y críticas de Lis Samarah sobre tus obras
            favoritas y nuevos descubrimientos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/reviews"
              className="px-6 py-3 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
            >
              Ver más reseñas
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-rose-700 text-rose-700 rounded-md hover:bg-rose-50 transition-colors"
            >
              Sugerir una obra para reseñar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}