import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { db } from "@/lib/db"

export const metadata: Metadata = {
  title: "Blog Inmobiliario — Consejos e Inversión en Nuevo León",
  description: "Artículos sobre el mercado inmobiliario de Monterrey, tips para compradores e inversionistas y noticias de SSAISA.",
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 12,
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-navy-800 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Blog Inmobiliario</h1>
          <p className="text-gray-300 text-lg">
            Tendencias, consejos e inversión en el mercado de Nuevo León
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-navy-50">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 50vw, 33vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-navy-200 text-4xl">📰</div>
                  )}
                </div>
                <div className="p-5">
                  {post.tags.length > 0 && (
                    <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                      {post.tags[0]}
                    </span>
                  )}
                  <h2 className="text-base font-bold text-navy-800 mt-2 mb-2 line-clamp-2 group-hover:text-navy-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                    <span className="flex items-center gap-1 text-navy-700 font-medium group-hover:gap-2 transition-all">
                      Leer más <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📝</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Blog próximamente</h2>
            <p className="text-gray-500">Estamos preparando contenido valioso para ti.</p>
          </div>
        )}
      </div>
    </div>
  )
}
