"use client"
import axios from 'axios'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { PublicationType, PublicationStatus } from "@/lib/dashboard-types"
import { Search, Filter, PlusCircle, Edit, Trash, Eye, Archive, Loader2, BookCheck } from "lucide-react";
import { addToast, Button } from "@heroui/react";

export default function PublicationsPage() {
  interface Post {
    id: string;
    title: string;
    type: string;
    coverImage?: string;
    publishedAt?: string;
    updatedAt?: string;
    status?: string;
  }

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingLoading, setDeletingLoading] = useState(false)
  const [archivingLoading, setArchivingLoading] = useState(false)

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
  useEffect(() => {
    fetchPosts()
  }, [])
  const postPost = async (id: string) => {
    setArchivingLoading(true)
    try {
      const response = await axios.put(`/api/posts/`, { status: "published", id })
      if (response.status !== 200) {
        throw new Error("Failed to archive post")
      }
      console.log("Post archived:", response.data)
      fetchPosts()
      addToast({
        title: "Post archived",
        description: "The post has been archived successfully.",
        color: "success",
      })
    } catch (error) {
      console.log(error)
      addToast({
        title: "Error archiving post",
        description: "There was an error archiving the post.",
        color: "danger",
      })
    } finally {
      setArchivingLoading(false)
    }
  }
  const archivePost = async (id: string) => {
    setArchivingLoading(true)
    try {
      const response = await axios.put(`/api/posts/`, { status: "archived", id })
      if (response.status !== 200) {
        throw new Error("Failed to archive post")
      }
      console.log("Post archived:", response.data)
      fetchPosts()   
      addToast({
        title: "Post archived",
        description: "The post has been archived successfully.",
        color: "success",
      })
    } catch (error) {
      console.log(error)
      addToast({
        title: "Error archiving post",
        description: "There was an error archiving the post.",
        color: "danger",
      })
    } finally {
      setArchivingLoading(false)
    }
  }
  const deletePost = async (id: string) => {
    setDeletingLoading(true)
    try {
      const response = await axios.delete(`/api/posts`, { params: { id } })
      if (response.status !== 200) {
        throw new Error("Failed to delete post")
      }
      console.log("Post deleted:", response.data)
      fetchPosts()
      addToast({
        title: "Post deleted",
        description: "The post has been deleted successfully.",
        color: "success",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      addToast({
        title: "Error deleting post",
        description: "There was an error deleting the post.",
        color: "danger",
      })
    } finally {
      setDeletingLoading(false)
    }
  }


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
    return posts.find((pub) => pub.id === id)
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
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<PublicationType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<PublicationStatus | "all">("all")

  // Filtrar publicaciones
  const filteredPublications = posts.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || pub.type === typeFilter
    const matchesStatus = statusFilter === "all" || pub.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Publicaciones</h1>
        <Link
          href="/dashboard/posts/new"
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nueva publicación</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className=" text-black pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as PublicationType | "all")}
              >
                <option value="all">Todos los tipos</option>
                <option value="review">Reseñas</option>
                <option value="article">Artículos</option>
                <option value="news">Noticias</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className=" text-black pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PublicationStatus | "all")}
              >
                <option value="all">Todos los estados</option>
                <option value="published">Publicados</option>
                <option value="draft">Borradores</option>
                <option value="archived">Archivados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Publicación
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPublications.map((publication: any) => (
                <tr key={publication._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={publication.coverImage || "/placeholder.svg"}
                          alt={publication.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{publication.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{publication.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${publication.type === "review"
                          ? "bg-blue-100 text-blue-800"
                          : publication.type === "article"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {publication.type === "review"
                        ? "Reseña"
                        : publication.type === "article"
                          ? "Artículo"
                          : "Noticia"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${publication.status === "published"
                          ? "bg-green-100 text-green-800"
                          : publication.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {publication.status === "published"
                        ? "Publicado"
                        : publication.status === "draft"
                          ? "Borrador"
                          : "Archivado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(publication.updatedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/posts/${publication._id}`}
                        className="text-pink-500 hover:text-pink-700"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/reviews/${publication.slug}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="Ver"
                        target="_blank"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      {publication.status == 'archived' ? 
                      <button className="text-gray-500 hover:text-gray-700" title="Publicar"
                        onClick={() => postPost(publication._id)}
                        disabled={archivingLoading}
                      >
                        {archivingLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <BookCheck className="w-5 h-5" />
                        )}
                      </button> 
                      : 
                      <button className="text-gray-500 hover:text-gray-700" title="Archivar"
                        onClick={() => archivePost(publication._id)}
                        disabled={archivingLoading}
                      >
                        {archivingLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Archive className="w-5 h-5" />
                        )}
                      </button>}
                      <button className="text-red-500 hover:text-red-700" title="Eliminar"
                        onClick={() => deletePost(publication._id)}
                        disabled={deletingLoading}
                      >
                        {deletingLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPublications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron publicaciones con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
