import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowLeft, User } from "lucide-react"
import { db } from "@/lib/db"

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await db.blogPost.findUnique({ where: { slug, published: true } })
  if (!post) return { title: "Post no encontrado" }
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await db.blogPost.findUnique({ where: { slug, published: true } })
  if (!post) notFound()

  const related = await db.blogPost.findMany({
    where: { published: true, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  })

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-navy-800 py-14">
        <div className="max-w-3xl mx-auto px-4">
          {post.tags.length > 0 && (
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-3">
              {post.tags.join(" · ")}
            </p>
          )}
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Volver al blog
        </Link>

        {post.coverImage && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium">{post.excerpt}</p>

        <div className="prose prose-lg max-w-none prose-headings:text-navy-800 prose-a:text-gold-600">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-navy-50 rounded-xl p-6 border border-navy-100">
          <h3 className="font-bold text-navy-800 mb-2">¿Buscas una propiedad en Nuevo León?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Nuestros asesores te ayudan a encontrar la mejor opción según tu presupuesto y necesidades.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/propiedades"
              className="bg-navy-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy-700 transition-colors"
            >
              Ver propiedades
            </Link>
            <Link
              href="/contacto"
              className="border border-navy-300 text-navy-800 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy-100 transition-colors"
            >
              Contactar asesor
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-navy-800 mb-6">Artículos relacionados</h2>
            <div className="grid gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-navy-50 transition-colors border border-gray-100"
                >
                  <div className="flex-1 min-w-0">
                    {rel.tags.length > 0 && (
                      <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                        {rel.tags[0]}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-navy-800 mt-1 line-clamp-2 group-hover:text-navy-600 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
