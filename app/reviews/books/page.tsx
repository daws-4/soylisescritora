import Link from "next/link"
import Image from "next/image"
import { getBookReviews } from "@/lib/reviews-data"
import { Star } from "lucide-react"

export const metadata = {
  title: "Reseñas de Libros | Lis Samarah",
  description:
    "Descubre análisis profundos de las obras literarias más destacadas a través de la mirada crítica de Lis Samarah",
}

export default function BookReviewsPage() {
  const bookReviews = getBookReviews()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-pink-500 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Reseñas de Libros</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              Análisis profundos de las obras literarias más destacadas del panorama actual y clásicos imprescindibles
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {bookReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookReviews.map((review) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No hay reseñas de libros disponibles en este momento.</p>
              <Link
                href="/reviews"
                className="inline-block mt-4 px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Ver todas las reseñas
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
