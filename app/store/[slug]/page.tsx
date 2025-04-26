import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, getAllProducts } from "@/lib/store-data"
import { ShoppingBag, TruckIcon, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Producto no encontrado",
    }
  }

  return {
    title: `${product.title} | Tienda Lis Samarah`,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const products = getAllProducts()

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Product Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Link href="/store" className="inline-flex items-center text-rose-700 hover:text-rose-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-[500px] w-full">
              <Image
                src={product.coverImage || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>

            <div className="space-y-6">
              <div className="inline-block bg-rose-100 px-3 py-1 rounded-full text-sm font-medium text-rose-800 mb-2">
                {product.category === "book" ? "Libro" : product.category === "ebook" ? "E-book" : "Merchandising"}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-rose-800">{product.title}</h1>

              <p className="text-lg text-gray-700">{product.description}</p>

              <div className="flex items-center">
                <span className="text-3xl font-bold text-rose-700 mr-4">{product.price.toFixed(2)} €</span>
                {product.inStock ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">En stock</span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Agotado</span>
                )}
              </div>

              {product.category === "book" && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Autor:</span> <p className='text-rose-800'>{product.author}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fecha de publicación:</span><p className='text-rose-800'>{" "}
                      {new Date(product.publishDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Páginas:</span> <p className='text-rose-800'>{product.pages}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">ISBN:</span> <p className='text-rose-800'>{product.isbn}</p>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <button
                  className={`w-full py-3 rounded-md flex items-center justify-center gap-2 ${product.inStock
                      ? "bg-rose-700 text-white hover:bg-rose-800"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    } transition-colors`}
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>{product.inStock ? "Añadir al carrito" : "Producto agotado"}</span>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <TruckIcon className="h-5 w-5 text-rose-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-rose-800">Envío gratuito en pedidos superiores a 30€</p>
                    <p className="text-sm text-gray-600">Entrega estimada: 2-3 días laborables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-rose-900">Descripción del producto</h2>
            <div className="prose prose-rose max-w-none text-gray-700">{product.longDescription}</div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-rose-900">También te puede interesar</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {getAllProducts()
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedProduct.coverImage || "/placeholder.svg"}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1 text-rose-800">{relatedProduct.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-rose-700">{relatedProduct.price.toFixed(2)} €</span>
                      <Link
                        href={`/store/${relatedProduct.slug}`}
                        className="text-rose-700 hover:text-rose-800 text-sm font-medium"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
