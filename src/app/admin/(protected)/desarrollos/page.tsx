import Link from "next/link"
import { db } from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import { Plus, Pencil } from "lucide-react"

export default async function AdminDesarrollosPage() {
  const developments = await db.development.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })

  const statusColors: Record<string, string> = {
    EN_VENTA: "bg-emerald-100 text-emerald-700",
    PROXIMAMENTE: "bg-yellow-100 text-yellow-700",
    AGOTADO: "bg-gray-100 text-gray-600",
  }

  const statusLabels: Record<string, string> = {
    EN_VENTA: "En venta",
    PROXIMAMENTE: "Próximamente",
    AGOTADO: "Agotado",
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Desarrollos</h1>
        <Link
          href="/admin/desarrollos/nuevo"
          className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Nuevo desarrollo
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {developments.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Desarrollo</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Desarrolladora</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Municipio</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio desde</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {developments.map((dev) => (
                <tr key={dev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800 line-clamp-1">{dev.name}</p>
                    {dev.featured && <span className="text-xs text-gold-600 font-medium">★ Destacado</span>}
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{dev.developer}</td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{dev.municipality}</td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {dev.priceFrom ? formatPrice(Number(dev.priceFrom)) : <span className="text-gray-400 font-normal">A consultar</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[dev.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {statusLabels[dev.status] ?? dev.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/desarrollos/${dev.id}/editar`}
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
            <p className="text-gray-400 text-sm mb-4">No hay desarrollos registrados</p>
            <Link
              href="/admin/desarrollos/nuevo"
              className="inline-flex items-center gap-2 bg-navy-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-navy-700 transition-colors"
            >
              <Plus size={16} />
              Crear primer desarrollo
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
