import Link from "next/link"
import Image from "next/image"
import { MapPin, BedDouble, Bath, Car, Maximize } from "lucide-react"
import { formatPrice, cn } from "@/lib/utils"

interface PropertyCardProps {
  slug: string
  title: string
  price: number | string
  priceNote?: string | null
  type: string
  operation: string
  municipality: string
  bedrooms?: number | null
  bathrooms?: number | null
  parkings?: number | null
  buildingM2?: number | null
  terrainM2?: number | null
  imageUrl?: string | null
  imageAlt?: string | null
  featured?: boolean
  className?: string
}

const typeLabels: Record<string, string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Depto.",
  TERRENO: "Terreno",
  LOCAL_COMERCIAL: "Local",
  OFICINA: "Oficina",
  BODEGA: "Bodega",
  DESARROLLO: "Desarrollo",
}

const operationColors: Record<string, string> = {
  VENTA: "bg-navy-800 text-white",
  RENTA: "bg-emerald-700 text-white",
  PREVENTA: "bg-gold-600 text-white",
}

export function PropertyCard({
  slug,
  title,
  price,
  priceNote,
  type,
  operation,
  municipality,
  bedrooms,
  bathrooms,
  parkings,
  buildingM2,
  terrainM2,
  imageUrl,
  imageAlt,
  featured,
  className,
}: PropertyCardProps) {
  const m2Display = buildingM2 ?? terrainM2

  return (
    <Link
      href={`/propiedades/${slug}`}
      className={cn(
        "group block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-50">
            <span className="text-navy-300 text-sm">Sin imagen</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-full",
              operationColors[operation] ?? "bg-gray-700 text-white"
            )}
          >
            {operation === "VENTA" ? "Venta" : operation === "RENTA" ? "Renta" : "Preventa"}
          </span>
          {typeLabels[type] && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-gray-700">
              {typeLabels[type]}
            </span>
          )}
        </div>

        {featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500 text-white">
            Destacada
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Precio */}
        <div className="mb-2">
          <p className="text-xl font-bold text-navy-800">
            {priceNote && <span className="text-sm font-normal text-gray-500 mr-1">{priceNote}</span>}
            {formatPrice(price)}
          </p>
        </div>

        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-navy-700 transition-colors">
          {title}
        </h3>

        {/* Ubicación */}
        <p className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <MapPin size={12} className="flex-shrink-0 text-gold-500" />
          {municipality}, Nuevo León
        </p>

        {/* Características */}
        <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
          {bedrooms != null && bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={13} className="text-navy-400" />
              {bedrooms} Rec.
            </span>
          )}
          {bathrooms != null && bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={13} className="text-navy-400" />
              {bathrooms} Baños
            </span>
          )}
          {parkings != null && parkings > 0 && (
            <span className="flex items-center gap-1">
              <Car size={13} className="text-navy-400" />
              {parkings} Est.
            </span>
          )}
          {m2Display != null && m2Display > 0 && (
            <span className="flex items-center gap-1 ml-auto">
              <Maximize size={13} className="text-navy-400" />
              {m2Display} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
