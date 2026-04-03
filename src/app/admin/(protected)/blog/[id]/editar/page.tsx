import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { db } from "@/lib/db"
import { BlogPostForm } from "@/components/admin/BlogPostForm"
import { updateBlogPost } from "@/server/actions/admin.actions"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await db.blogPost.findUnique({ where: { id }, select: { title: true } })
  return { title: post ? `Editar: ${post.title} | Admin` : "Artículo no encontrado" }
}

export default async function EditarArticuloPage({ params }: Props) {
  const { id } = await params
  const post = await db.blogPost.findUnique({ where: { id } })
  if (!post) notFound()

  const boundAction = updateBlogPost.bind(null, id)

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <ChevronLeft size={16} />
          Volver al blog
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Editar artículo</h1>
        <p className="text-sm text-gray-500 mt-1">{post.title}</p>
      </div>
      <BlogPostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          author: post.author,
          authorImage: post.authorImage,
          tags: post.tags,
          published: post.published,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
        }}
        action={boundAction}
        submitLabel="Guardar cambios"
      />
    </div>
  )
}
