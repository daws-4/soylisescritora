import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Lis Samarah</h3>
            <p className="text-gray-300">
              Escritora y crítica literaria, compartiendo pasión por la literatura y el cine.
            </p>
            <div className="flex space-x-4">
              <Link target="_blank" rel="noopener noreferrer nofollow" href="https://facebook.com" className="hover:text-rose-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link target="_blank" rel="noopener noreferrer nofollow" href="https://instagram.com" className="hover:text-rose-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link target="_blank" rel="noopener noreferrer nofollow" href="https://twitter.com" className="hover:text-rose-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Lis
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Reseñas
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-300 hover:text-white transition-colors">
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Reseñas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews/books" className="text-gray-300 hover:text-white transition-colors">
                  Libros
                </Link>
              </li>
              <li>
                <Link href="/reviews/movies" className="text-gray-300 hover:text-white transition-colors">
                  Películas
                </Link>
              </li>
              <li>
                <Link href="/reviews/latest" className="text-gray-300 hover:text-white transition-colors">
                  Últimas Reseñas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">España</li>
              <li>
                <Link
                  href="mailto:contacto@lissamarah.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contacto@lissamarah.com
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Formulario de Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lis Samarah. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
