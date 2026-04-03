import Link from "next/link"
import { db } from "@/lib/db"
import { Plus, Pencil } from "lucide-react"

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Blog</h1>
        <Link
          href="/admin/blog/nuevo"
          className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Nuevo artículo
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {posts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artículo</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Autor</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Etiquetas</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Publicado</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{post.author}</td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {post.published ? (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                        Publicado
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs hidden lg:table-cell">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/blog/${post.id}/editar`}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center text-gray-500 hover:text-navy-800"
                    >
                      <Pencil size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm mb-4">No hay artículos en el blog</p>
            <Link
              href="/admin/blog/nuevo"
              className="inline-flex items-center gap-2 bg-navy-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-navy-700 transition-colors"
            >
              <Plus size={16} />
              Crear primer artículo
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
