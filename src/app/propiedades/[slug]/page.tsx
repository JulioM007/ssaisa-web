import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Car, Maximize, Calendar, Home, MessageCircle, Phone, ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { getPropertyBySlug, getSimilarProperties } from "@/server/services/property.service"
import { PropertyCard } from "@/components/property/PropertyCard"
import { ContactPropertyForm } from "@/components/property/ContactPropertyForm"
import { formatPrice } from "@/lib/utils"
import { siteConfig } from "@/config/site"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return { title: "Propiedad no encontrada" }

  return {
    title: property.metaTitle ?? property.title,
    description:
      property.metaDescription ??
      `${property.type === "CASA" ? "Casa" : property.type === "DEPARTAMENTO" ? "Departamento" : "Propiedad"} en ${property.municipality}, Nuevo León. ${formatPrice(Number(property.price))}`,
    openGraph: {
      title: property.title,
      images: property.images[0] ? [{ url: property.images[0].url }] : [],
    },
  }
}

const typeLabels: Record<string, string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Departamento",
  TERRENO: "Terreno",
  LOCAL_COMERCIAL: "Local comercial",
  OFICINA: "Oficina",
  BODEGA: "Bodega",
  DESARROLLO: "Desarrollo",
}

const operationLabels: Record<string, string> = {
  VENTA: "En venta",
  RENTA: "En renta",
  PREVENTA: "Preventa",
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) notFound()

  const similar = await getSimilarProperties(property.id, property.type, property.municipality)

  const whatsappMsg = `Hola, me interesa la propiedad: ${property.title} (${siteConfig.url}/propiedades/${slug})`

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy-800 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/propiedades" className="hover:text-navy-800 transition-colors">Propiedades</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              {property.images.length > 0 ? (
                <div className="space-y-2 p-2">
                  {/* Imagen principal */}
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={property.images[0].url}
                      alt={property.images[0].alt ?? property.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                  {/* Thumbnails */}
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {property.images.slice(1, 5).map((img, i) => (
                        <div
                          key={img.id}
                          className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={img.url}
                            alt={img.alt ?? `Imagen ${i + 2}`}
                            fill
                            className="object-cover"
                            sizes="25vw"
                          />
                          {i === 3 && property.images.length > 5 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm">
                              +{property.images.length - 5} más
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-navy-50 flex items-center justify-center">
                  <Home className="text-navy-200" size={64} />
                </div>
              )}
            </div>

            {/* Info principal */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-navy-100 text-navy-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {typeLabels[property.type] ?? property.type}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {operationLabels[property.operation] ?? property.operation}
                </span>
                {property.featured && (
                  <span className="bg-gold-100 text-gold-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Destacada
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-navy-800 mb-3">{property.title}</h1>

              <p className="flex items-center gap-2 text-gray-500 text-sm mb-5">
                <MapPin size={16} className="text-gold-500 flex-shrink-0" />
                {property.address ? `${property.address}, ` : ""}
                {property.municipality}, {property.state}
                {property.zipCode ? `, C.P. ${property.zipCode}` : ""}
              </p>

              {/* Precio */}
              <div className="flex items-baseline gap-2 mb-6">
                {property.priceNote && (
                  <span className="text-gray-400 text-sm">{property.priceNote}</span>
                )}
                <span className="text-3xl font-bold text-navy-800">
                  {formatPrice(Number(property.price))}
                </span>
                {property.operation === "RENTA" && (
                  <span className="text-gray-400 text-sm">/mes</span>
                )}
              </div>

              {/* Características */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-gray-100">
                {property.bedrooms != null && (
                  <div className="text-center">
                    <BedDouble className="mx-auto text-navy-600 mb-1" size={22} />
                    <p className="text-lg font-bold text-gray-800">{property.bedrooms}</p>
                    <p className="text-xs text-gray-400">Recámaras</p>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="text-center">
                    <Bath className="mx-auto text-navy-600 mb-1" size={22} />
                    <p className="text-lg font-bold text-gray-800">{property.bathrooms}</p>
                    <p className="text-xs text-gray-400">Baños</p>
                  </div>
                )}
                {property.parkings != null && (
                  <div className="text-center">
                    <Car className="mx-auto text-navy-600 mb-1" size={22} />
                    <p className="text-lg font-bold text-gray-800">{property.parkings}</p>
                    <p className="text-xs text-gray-400">Estacionamientos</p>
                  </div>
                )}
                {(property.buildingM2 ?? property.terrainM2) != null && (
                  <div className="text-center">
                    <Maximize className="mx-auto text-navy-600 mb-1" size={22} />
                    <p className="text-lg font-bold text-gray-800">
                      {property.buildingM2 ?? property.terrainM2} m²
                    </p>
                    <p className="text-xs text-gray-400">
                      {property.buildingM2 ? "Construcción" : "Terreno"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-navy-800 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Detalles adicionales */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-navy-800 mb-4">Detalles del inmueble</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                {property.terrainM2 != null && (
                  <DetailRow label="Terreno" value={`${property.terrainM2} m²`} />
                )}
                {property.buildingM2 != null && (
                  <DetailRow label="Construcción" value={`${property.buildingM2} m²`} />
                )}
                {property.floors != null && (
                  <DetailRow label="Plantas" value={String(property.floors)} />
                )}
                {property.antiquity != null && (
                  <DetailRow label="Antigüedad" value={`${property.antiquity} años`} />
                )}
                {property.constructionYear != null && (
                  <DetailRow label="Año construcción" value={String(property.constructionYear)} />
                )}
                <DetailRow label="Municipio" value={property.municipality} />
                <DetailRow label="Estado" value={property.state} />
                {property.zipCode && <DetailRow label="C.P." value={property.zipCode} />}
              </div>
            </div>

            {/* Amenidades */}
            {property.amenities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-4">Amenidades</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-gray-700 bg-navy-50 rounded-lg px-3 py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Mapa */}
            {property.mapEmbed && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-gold-500" />
                  Ubicación
                </h2>
                <div
                  className="rounded-lg overflow-hidden aspect-video"
                  dangerouslySetInnerHTML={{ __html: property.mapEmbed }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Botones de contacto rápido */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center gap-2 w-full border border-navy-200 text-navy-800 font-semibold py-3.5 rounded-xl hover:bg-navy-50 transition-colors"
              >
                <Phone size={20} />
                Llamar
              </a>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy-800 mb-4">Solicitar información</h3>
              <ContactPropertyForm propertySlug={slug} />
            </div>

            {/* Ficha rápida */}
            <div className="bg-navy-50 rounded-xl border border-navy-100 p-5">
              <h3 className="font-semibold text-navy-800 mb-3 text-sm">Ficha rápida</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo</span>
                  <span className="font-medium text-gray-700">{typeLabels[property.type]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Operación</span>
                  <span className="font-medium text-gray-700">{operationLabels[property.operation]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Municipio</span>
                  <span className="font-medium text-gray-700">{property.municipality}</span>
                </div>
                {property.development && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Desarrollo</span>
                    <Link href={`/desarrollos/${property.development.slug}`} className="font-medium text-navy-700 hover:underline">
                      {property.development.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Back */}
            <Link
              href="/propiedades"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy-800 transition-colors"
            >
              <ChevronLeft size={16} />
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* Propiedades similares */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Propiedades similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard
                  key={p.id}
                  slug={p.slug}
                  title={p.title}
                  price={Number(p.price)}
                  priceNote={p.priceNote}
                  type={p.type}
                  operation={p.operation}
                  municipality={p.municipality}
                  bedrooms={p.bedrooms}
                  bathrooms={p.bathrooms}
                  parkings={p.parkings}
                  buildingM2={p.buildingM2}
                  terrainM2={p.terrainM2}
                  imageUrl={p.images[0]?.url}
                  imageAlt={p.images[0]?.alt}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
  )
}
