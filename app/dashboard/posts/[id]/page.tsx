"use client"

import type React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Save, Trash, Eye, Loader2 } from "lucide-react"
import type { PublicationType, PublicationStatus } from "@/lib/dashboard-types"
import { addToast, Button } from "@heroui/react";

interface EditpostPageProps {
  params: {
    id: string
  }
}

export default function EditpostPage({ params }: EditpostPageProps) {
  const router = useRouter()
  const id = params.id

  interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    type: string;
    coverImage?: string;
    publishedAt?: string;
    updatedAt?: string;
    status?: string;
  }
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<any>([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`)
      setPost(response.data)
      console.log(response.data)
    } catch (error) {
      router.push("/dashboard/posts")
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
      console.log("Post fetched:", post)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    type: "article" as PublicationType,
    status: "draft" as PublicationStatus,
    category: "book",
    rating: 1,
    author: '',
    publishDate: '',
    tags: '',
  })

  const [deletingLoading, setDeletingLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        type: post.type,
        status: post.status,
        category: post.category,
        rating:  post.rating,
        author: post.author,
        publishDate: post.publishDate ? formatDate(post.publishDate) : '',
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
      })
    } else {
      // Si no se encuentra la publicación, redirigir al dashboard
      router.push("/dashboard")
    }
  }, [post, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    try {
      const response = await axios.put(`/api/posts/${id}`, formData)
      console.log(response.data)
      if (response.status === 200) {
        setSubmitSuccess(true)
        setTimeout(() => {
          router.push("/dashboard/posts")
        }, 2000)
      }
    } catch (error) {
      setSubmitError(true)
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  console.log(formData)
  if (loading || !post) {
    return <div className= 'text-black'>Cargando...</div>
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/posts" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Editar publicación</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/reviews/${post.slug}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
            target="_blank"
          >
            <Eye className="w-4 h-4" />
            <span>Vista previa</span>
          </Link>
          <button
            onClick={() => deletePost(post._id)}
            disabled={deletingLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
            type="button"
          >
            {deletingLoading ? (
                                     <Loader2 className="w-5 h-5 animate-spin" />
                                   ) : (
                                     <Trash className="w-5 h-5" />
                                   )}
            <span>Eliminar</span>
          </button>
        </div>
      </div>

      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>¡Publicación actualizada con éxito!</p>
        </div>
      )}

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Ha ocurrido un error al actualizar la publicación. Por favor, inténtalo de nuevo.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Extracto <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt || ""}
                  onChange={handleChange}
                  required
                  rows={3}
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content || ""}
                  onChange={handleChange}
                  required
                  rows={15}
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Etíquetas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Introduce las etiquetas, separadas por comas"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la imagen de portada
                </label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  required
                  value={formData.coverImage || ""}
                  onChange={handleChange}
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="mt-2 relative h-40 bg-gray-100 rounded-md overflow-hidden">
                  {formData.coverImage && (
                    <Image
                      src={formData.coverImage || "/placeholder.svg"}
                      alt="Vista previa"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Puntuación<span className="text-red-500">*</span>
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="review">Reseña</option>
                  <option value="article">Artículo</option>
                  <option value="news">Noticia</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
              <div>
                <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de publicación <span className="text-red-500">*</span>
                </label>
                <input
                  id="publishDate"
                  type='date'
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  required
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Información adicional</p>
                <div className="bg-gray-50 p-4 rounded-md text-sm">
                  <p className = 'text-black'>
                    <span className="text-black font-medium">Creado:</span>{" "}
                     {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className='text-black'>
                    <span className=" text-black font-medium">Última actualización:</span>{" "}
                    {new Date(post.updatedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {post.publishedAt && (
                    <p className = 'text-black'>
                      <span className=" text-black font-medium">Publicado:</span>{" "}
                      {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}