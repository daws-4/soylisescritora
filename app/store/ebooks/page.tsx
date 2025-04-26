import Link from "next/link"
import Image from "next/image"
import { getEbookProducts } from "@/lib/store-data"
import { ShoppingBag } from "lucide-react"

export const metadata = {
  title: "E-books | Tienda Lis Samarah",
  description: "Versiones digitales de las obras de Lis Samarah para leer en cualquier dispositivo",
}

export default function EbooksPage() {
  const ebooks = getEbookProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-pink-500 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">E-books</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              Versiones digitales de las obras de Lis Samarah para leer en cualquier dispositivo
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {ebooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {ebooks.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.coverImage || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-rose-800">{product.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">Por {product.author}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-rose-700">{product.price.toFixed(2)} €</span>
                      <Link
                        href={`/store/${product.slug}`}
                        className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors flex items-center gap-2"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Ver detalles</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No hay e-books disponibles en este momento.</p>
              <Link
                href="/store"
                className="inline-block mt-4 px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Volver a la tienda
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
