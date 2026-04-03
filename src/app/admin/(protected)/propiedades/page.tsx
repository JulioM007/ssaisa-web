import Link from "next/link"
import { db } from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import { Plus, Pencil } from "lucide-react"

export default async function AdminPropiedadesPage() {
  const properties = await db.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { take: 1, orderBy: { order: "asc" } } },
  })

  const statusColors: Record<string, string> = {
    ACTIVA: "bg-emerald-100 text-emerald-700",
    INACTIVA: "bg-gray-100 text-gray-600",
    VENDIDA: "bg-blue-100 text-blue-700",
    RENTADA: "bg-purple-100 text-purple-700",
    RESERVADA: "bg-yellow-100 text-yellow-700",
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Propiedades</h1>
        <Link
          href="/admin/propiedades/nueva"
          className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Nueva propiedad
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {properties.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Propiedad
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Tipo / Operación
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Municipio
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800 line-clamp-1">{property.title}</p>
                    {property.featured && (
                      <span className="text-xs text-gold-600 font-medium">★ Destacada</span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-gray-600">{property.type}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-600">{property.operation}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{property.municipality}</td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {formatPrice(Number(property.price))}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[property.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/propiedades/${property.id}/editar`}
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
            <p className="text-gray-400 text-sm mb-4">No hay propiedades registradas</p>
            <Link
              href="/admin/propiedades/nueva"
              className="inline-flex items-center gap-2 bg-navy-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-navy-700 transition-colors"
            >
              <Plus size={16} />
              Crear primera propiedad
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
