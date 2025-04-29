'use client'
import type React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, FileText, PlusCircle, Settings, LogOut } from "lucide-react"
import axios from 'axios'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // En un entorno real, verificaríamos la autenticación del usuario
  // Para este ejemplo, simulamos que el usuario está autenticado
  const authenticated = true // isAuthenticated()

  if (!authenticated) {
    redirect("/login")
  }

  const handleLogout = async() => {
    const logout = confirm("¿Estás seguro de que quieres cerrar sesión?")
    if (logout) {
      await axios.get("/api/auth/logout")
    }
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-pink-500">Dashboard</h2>
          <p className="text-sm text-gray-500">Gestión de contenidos</p>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>Resumen</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/publications"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Publicaciones</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/new"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                <span>Nueva publicación</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Configuración</span>
              </Link>
            </li>
            <li className="border-t border-gray-200 mt-6 pt-4">
              <div
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-500"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span onClick={handleLogout}>Cerrar sesión</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
