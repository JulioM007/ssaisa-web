import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { db } from "@/lib/db"
import { DevelopmentForm } from "@/components/admin/DevelopmentForm"
import { updateDesarrollo } from "@/server/actions/admin.actions"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const dev = await db.development.findUnique({ where: { id }, select: { name: true } })
  return { title: dev ? `Editar: ${dev.name} | Admin` : "Desarrollo no encontrado" }
}

export default async function EditarDesarrolloPage({ params }: Props) {
  const { id } = await params
  const dev = await db.development.findUnique({ where: { id } })
  if (!dev) notFound()

  const boundAction = updateDesarrollo.bind(null, id)

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
        <h1 className="text-2xl font-bold text-gray-800">Editar desarrollo</h1>
        <p className="text-sm text-gray-500 mt-1">{dev.name}</p>
      </div>
      <DevelopmentForm
        development={{
          id: dev.id,
          name: dev.name,
          slug: dev.slug,
          description: dev.description,
          developer: dev.developer,
          developerLogo: dev.developerLogo,
          location: dev.location,
          municipality: dev.municipality,
          masterplanImage: dev.masterplanImage,
          phases: dev.phases,
          priceFrom: dev.priceFrom ? Number(dev.priceFrom) : null,
          status: dev.status,
          website: dev.website,
          featured: dev.featured,
          gallery: dev.gallery,
          metaTitle: dev.metaTitle,
          metaDescription: dev.metaDescription,
        }}
        action={boundAction}
        submitLabel="Guardar cambios"
      />
    </div>
  )
}
