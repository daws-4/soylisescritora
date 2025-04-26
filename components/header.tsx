"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BookOpen, ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Lis", href: "/about" },
    { name: "Reseñas", href: "/reviews" },
    { name: "Tienda", href: "/store" },
    { name: "Contacto", href: "/contact" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-800">Lis Samarah</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-rose-700 ${
                  pathname === item.href ? "text-rose-700" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/reviews"
              className="text-sm font-medium text-gray-700 hover:text-rose-700 flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Reseñas</span>
            </Link>
            <Link
              href="/store"
              className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Tienda</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-rose-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-base font-medium ${
                  pathname === item.href ? "text-rose-700" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                href="/reviews"
                className="w-full justify-start border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Reseñas</span>
              </Link>
              <Link
                href="/store"
                className="w-full justify-start bg-rose-700 hover:bg-rose-800 px-4 py-2 rounded-md text-white flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Tienda</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
