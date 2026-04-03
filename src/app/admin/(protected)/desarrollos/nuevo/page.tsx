import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { DevelopmentForm } from "@/components/admin/DevelopmentForm"
import { createDesarrollo } from "@/server/actions/admin.actions"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Nuevo desarrollo | Admin" }

export default function NuevoDesarrolloPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/desarrollos"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <ChevronLeft size={16} />
          Volver a desarrollos
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Nuevo desarrollo</h1>
      </div>
      <DevelopmentForm action={createDesarrollo} submitLabel="Crear desarrollo" />
    </div>
  )
}
