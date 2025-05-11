'use client'
import Link from "next/link"
import Image from "next/image"
import axios from 'axios'
import { useEffect, useState } from "react"
import { FileText, BookOpen, Newspaper, PenTool, Clock } from "lucide-react"
import type { Publication, PublicationType } from "@/lib/dashboard-types"


export default function DashboardPage() {

  interface Post {
    _id: string;
    title: string;
    type: string;
    coverImage?: string;
    publishedAt?: string;
    updatedAt?: string;
    status?: string;
  }

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts')
        setPosts(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
        console.log("Posts fetched:", posts)
      }
    }

    fetchPosts()
  }, [])




  function getPublishedPublications() {
    return posts.filter((pub) => pub.status === "published")
  }
  
  function getDraftPublications() {
    return posts.filter((pub) => pub.status === "draft")
  }
  
  function getArchivedPublications() {
    return posts.filter((pub) => pub.status === "archived")
  }
  
  function getPublicationById(id: string) {
    return posts.find((pub) => pub._id === id)
  }
  
  function getPublicationsByType(type: PublicationType) {
    return posts.filter((pub) => pub.type === type)
  }
  
  function getPublicationStats() {
    return {
      total: posts.length,
      published: getPublishedPublications().length,
      draft: getDraftPublications().length,
      archived: getArchivedPublications().length,
      reviews: getPublicationsByType("review").length,
      articles: getPublicationsByType("article").length,
      news: getPublicationsByType("news").length,
    }
  }
  


  const stats = getPublicationStats()
  const recentPublications = posts.slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link
          href="/dashboard/posts/new"
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center gap-2"
        >
          <PenTool className="w-4 h-4" />
          <span>Nueva publicación</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total publicaciones</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</h3>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-pink-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link href="/dashboard/publications" className="text-pink-500 hover:underline">
              Ver todas
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Reseñas</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.reviews}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link href="/dashboard/publications?type=review" className="text-pink-500 hover:underline">
              Ver reseñas
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Artículos</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.articles}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <PenTool className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link href="/dashboard/publications?type=article" className="text-pink-500 hover:underline">
              Ver artículos
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Noticias</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.news}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Newspaper className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link href="/dashboard/publications?type=news" className="text-pink-500 hover:underline">
              Ver noticias
            </Link>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Estado de publicaciones</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Publicadas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.published}</h3>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Borradores</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.draft}</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Archivadas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.archived}</h3>
          </div>
        </div>
      </div>

      {/* Recent Publications */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Publicaciones recientes</h2>
          <Link href="/dashboard/publications" className="text-sm text-pink-500 hover:underline">
            Ver todas
          </Link>
        </div>
       {loading? '' : <div className="space-y-4">
          {recentPublications.map((publication) => (
            <div key={publication._id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={publication.coverImage || "/placeholder.svg"}
                  alt={publication.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-800 truncate">{publication.title}</h3>
                <p className="text-sm text-gray-500">
                  {publication.type === "review" ? "Reseña" : publication.type === "article" ? "Artículo" : "Noticia"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(publication.publishedAt || publication.updatedAt || Date.now()).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <Link
                  href={`/dashboard/posts/${publication._id}`}
                  className="px-3 py-1 bg-pink-100 text-pink-500 rounded-md hover:bg-pink-200 transition-colors text-sm"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}
