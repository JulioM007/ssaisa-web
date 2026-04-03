import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { BlogPostForm } from "@/components/admin/BlogPostForm"
import { createBlogPost } from "@/server/actions/admin.actions"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Nuevo artículo | Admin" }

export default function NuevoArticuloPage() {
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
        <h1 className="text-2xl font-bold text-gray-800">Nuevo artículo</h1>
      </div>
      <BlogPostForm action={createBlogPost} submitLabel="Crear artículo" />
    </div>
  )
}
