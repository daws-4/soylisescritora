import Link from "next/link"
import Image from "next/image"
import { getAllReviews, getBookReviews, getMovieReviews } from "@/lib/reviews-data"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  const allReviews = getAllReviews()
  const bookReviews = getBookReviews()
  const movieReviews = getMovieReviews()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-rose-900 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Reseñas</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              Descubre perspectivas únicas sobre libros y películas a través de la mirada crítica de Lis Samarah
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
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
            <div className="bg-rose-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-rose-900 mb-4">Reseñas de Películas</h2>
              <p className="mb-6 text-gray-700">
                Críticas cinematográficas que exploran narrativa, dirección, actuaciones y el impacto cultural de films
                destacados.
              </p>
              <Link
                href="/reviews/movies"
                className="inline-block px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Ver reseñas de películas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Últimas Reseñas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={review.coverImage || "/placeholder.svg"}
                    alt={review.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                    {review.category === "book" ? "Libro" : "Película"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{review.title}</h3>
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
    </div>
  )
}
