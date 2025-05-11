"use client";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import axios from 'axios';
import { useEffect, useState } from 'react';

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
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/posts');
        const allReviews: Post[] = response.data;

        // Filter for 'published' status and get the latest 3
        const publishedReviews = allReviews
          .filter(review => review.status === 'published')
          // .reverse(); // Reverse to show the latest first

        setReviews(publishedReviews);
      } catch (err: any) {
        setError(err.message || "Failed to fetch reviews");
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-pink-500 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Reseñas</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              Descubre perspectivas únicas sobre libros a través de la mirada crítica de Lis Samarah
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-12 bg-white w-full px-4 text-black">cargando reviews...</div>
      ) : error ? (
        <div className="py-12 bg-white w-full px-4 text-black">Error: {error}</div>
      ) : (
        <>
              {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-rose-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-rose-900 mb-4">Reseñas de Libros</h2>
              <p className="mb-6 text-gray-700">
                Análisis profundos de las obras literarias más destacadas del panorama actual y clásicos
                imprescindibles.
              </p>
              <Link
                href="/reviews/books"
                className="inline-block px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Ver reseñas de libros
              </Link>
            </div>
          </div>
        </div>
      </section> */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Últimas Reseñas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentReviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={review.coverImage || "/placeholder.svg"}
                        alt={review.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-rose-800">{review.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">Por {review.author}</p>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-3">{review.excerpt}</p>
                      <Link
                        href={`/reviews/${review.slug}`}
                        className="text-rose-700 font-medium hover:text-rose-800 transition-colors"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 py-8 bg-white">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-4 py-2 rounded-full ${currentPage === pageNumber ? 'bg-rose-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}