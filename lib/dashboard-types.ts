export type PublicationType = "review" | "article" | "news"
export type PublicationStatus = "draft" | "published" | "archived"

export interface Publication {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  type: PublicationType
  status: PublicationStatus
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface PublicationFormData {
  title: string
  excerpt: string
  content: string
  coverImage: string
  type: PublicationType
  status: PublicationStatus
}
