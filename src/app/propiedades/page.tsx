import type { Metadata } from "next"
import { PropertyCard } from "@/components/property/PropertyCard"
import { PropertyFiltersPanel } from "@/components/property/PropertyFiltersPanel"
import { SortSelect } from "@/components/property/SortSelect"
import { getProperties } from "@/server/services/property.service"
import { propertyFilterSchema } from "@/lib/validations"

export const metadata: Metadata = {
  title: "Propiedades en Monterrey y Nuevo León",
  description:
    "Catálogo de casas, departamentos, terrenos y locales en venta y renta en Monterrey y Área Metropolitana.",
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[]>>
}

export default async function PropiedadesPage({ searchParams }: PageProps) {
  const rawParams = await searchParams
  // Aplanar arrays a string único
  const flat: Record<string, string> = {}
  for (const [k, v] of Object.entries(rawParams)) {
    flat[k] = Array.isArray(v) ? v[0] : v
  }

  const filters = propertyFilterSchema.parse(flat)
  const { data: properties, total, totalPages, page } = await getProperties(filters)

  const activeFiltersCount = [
    filters.type,
    filters.operation,
    filters.municipality,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
    filters.search,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de página */}
      <div className="bg-navy-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Catálogo de propiedades</h1>
          <p className="text-gray-300 text-sm">
            {total > 0
              ? `${total} propiedad${total !== 1 ? "es" : ""} encontrada${total !== 1 ? "s" : ""}`
              : "Sin resultados para los filtros seleccionados"}
            {activeFiltersCount > 0 && ` · ${activeFiltersCount} filtro${activeFiltersCount !== 1 ? "s" : ""} activo${activeFiltersCount !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Panel de filtros */}
          <aside className="lg:w-72 flex-shrink-0">
            <PropertyFiltersPanel currentFilters={filters} />
          </aside>

          {/* Listado */}
          <div className="flex-1">
            {/* Barra de ordenamiento */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{total} resultado{total !== 1 ? "s" : ""}</p>
              <SortSelect currentSort={filters.sort} />
            </div>

            {properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      slug={property.slug}
                      title={property.title}
                      price={Number(property.price)}
                      priceNote={property.priceNote}
                      type={property.type}
                      operation={property.operation}
                      municipality={property.municipality}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      parkings={property.parkings}
                      buildingM2={property.buildingM2}
                      terrainM2={property.terrainM2}
                      imageUrl={property.images[0]?.url}
                      imageAlt={property.images[0]?.alt}
                      featured={property.featured}
                    />
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <Pagination currentPage={page} totalPages={totalPages} filters={flat} />
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No encontramos propiedades
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Intenta ajustar los filtros o ampliar tu búsqueda.
                </p>
                <a
                  href="/propiedades"
                  className="inline-block bg-navy-800 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-navy-700 transition-colors"
                >
                  Ver todas las propiedades
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  filters,
}: {
  currentPage: number
  totalPages: number
  filters: Record<string, string>
}) {
  function buildPageUrl(page: number) {
    const params = new URLSearchParams(filters)
    params.set("page", String(page))
    return `/propiedades?${params.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-center gap-2 mt-10">
      {currentPage > 1 && (
        <a
          href={buildPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Anterior
        </a>
      )}
      {pages.map((p) => (
        <a
          key={p}
          href={buildPageUrl(p)}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            p === currentPage
              ? "bg-navy-800 text-white"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {p}
        </a>
      ))}
      {currentPage < totalPages && (
        <a
          href={buildPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Siguiente →
        </a>
      )}
    </nav>
  )
}
