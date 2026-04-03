import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { PropertyForm } from "@/components/admin/PropertyForm"
import { createProperty } from "@/server/actions/admin.actions"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Nueva propiedad | Admin" }

export default function NuevaPropiedadPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/propiedades"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <ChevronLeft size={16} />
          Volver a propiedades
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Nueva propiedad</h1>
      </div>

      <PropertyForm action={createProperty} submitLabel="Crear propiedad" />
    </div>
  )
}
