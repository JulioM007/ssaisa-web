import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { db } from "@/lib/db"
import { PropertyForm } from "@/components/admin/PropertyForm"
import { updateProperty } from "@/server/actions/admin.actions"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const property = await db.property.findUnique({ where: { id }, select: { title: true } })
  return { title: property ? `Editar: ${property.title} | Admin` : "Propiedad no encontrada" }
}

export default async function EditarPropiedadPage({ params }: Props) {
  const { id } = await params

  const property = await db.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
    },
  })

  if (!property) notFound()

  const boundAction = updateProperty.bind(null, id)

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
        <h1 className="text-2xl font-bold text-gray-800">Editar propiedad</h1>
        <p className="text-sm text-gray-500 mt-1">{property.title}</p>
      </div>

      <PropertyForm
        property={{
          id: property.id,
          title: property.title,
          slug: property.slug,
          description: property.description,
          price: Number(property.price),
          priceNote: property.priceNote,
          type: property.type,
          operation: property.operation,
          status: property.status,
          featured: property.featured,
          address: property.address,
          municipality: property.municipality,
          state: property.state,
          zipCode: property.zipCode,
          terrainM2: property.terrainM2,
          buildingM2: property.buildingM2,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          parkings: property.parkings,
          floors: property.floors,
          amenities: property.amenities,
          images: property.images.map((img) => ({
            url: img.url,
            alt: img.alt,
            order: img.order,
          })),
          metaTitle: property.metaTitle,
          metaDescription: property.metaDescription,
        }}
        action={boundAction}
        submitLabel="Guardar cambios"
      />
    </div>
  )
}
