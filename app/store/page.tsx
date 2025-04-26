import Link from "next/link"
import Image from "next/image"
import { getAllProducts, getBookProducts, getEbookProducts, getMerchandiseProducts } from "@/lib/store-data"
import { ShoppingBag, Book, Smartphone, Gift } from "lucide-react"

export const metadata = {
  title: "Tienda | Lis Samarah",
  description: "Adquiere las obras originales de Lis Samarah y productos exclusivos relacionados con sus libros",
}

export default function StorePage() {
  const allProducts = getAllProducts()
  const bookProducts = getBookProducts()
  const ebookProducts = getEbookProducts()
  const merchandiseProducts = getMerchandiseProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-pink-500 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Tienda</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              Adquiere las obras originales de Lis Samarah y productos exclusivos relacionados con sus libros
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Categorías</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-rose-50 rounded-lg p-8 text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-rose-700" />
              </div>
              <h3 className="text-xl font-bold text-rose-900 mb-4">Libros Físicos</h3>
              <p className="mb-6 text-gray-700">
                Adquiere las obras de Lis Samarah en formato físico para tu biblioteca personal.
              </p>
              <Link
                href="/store/books"
                className="inline-block px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Ver libros
              </Link>
            </div>
            <div className="bg-rose-50 rounded-lg p-8 text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-rose-700" />
              </div>
              <h3 className="text-xl font-bold text-rose-900 mb-4">E-books</h3>
              <p className="mb-6 text-gray-700">
                Versiones digitales de las obras de Lis Samarah para leer en cualquier dispositivo.
              </p>
              <Link
                href="/store/ebooks"
                className="inline-block px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Ver e-books
              </Link>
            </div>
            <div className="bg-rose-50 rounded-lg p-8 text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-rose-700" />
              </div>
              <h3 className="text-xl font-bold text-rose-900 mb-4">Merchandising</h3>
              <p className="mb-6 text-gray-700">Productos exclusivos inspirados en las obras de Lis Samarah.</p>
              <Link
                href="/store/merchandise"
                className="inline-block px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors"
              >
                Ver productos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Productos Destacados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts
              .filter((p) => p.featured)
              .map((product) => (
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
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                      {product.category === "book"
                        ? "Libro"
                        : product.category === "ebook"
                          ? "E-book"
                          : "Merchandising"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
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
          <div className="text-center mt-12">
            <Link
              href="/store/all"
              className="inline-block px-6 py-3 border border-rose-700 text-rose-700 rounded-md hover:bg-rose-50 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-rose-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-rose-900 mb-6 text-center">Información de Envío</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-rose-700">1</span>
                </div>
                <h3 className="font-bold mb-2 text-rose-800">Envío Nacional</h3>
                <p className="text-sm text-gray-700">
                  Envío gratuito en pedidos superiores a 30€. Entrega en 2-3 días laborables.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-rose-700">2</span>
                </div>
                <h3 className="font-bold mb-2 text-rose-800">Envío Internacional</h3>
                <p className="text-sm text-gray-700 ">
                  Disponible a Europa y América. Consulta tiempos y costes de envío.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-rose-700">3</span>
                </div>
                <h3 className="font-bold mb-2 text-rose-800">Devoluciones</h3>
                <p className="text-sm text-gray-700">
                  30 días para devoluciones. El producto debe estar en perfectas condiciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
