import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowRight } from "lucide-react"
import { db } from "@/lib/db"
import { formatPrice } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Desarrollos Inmobiliarios en Nuevo León — SSAISA",
  description: "Fraccionamientos y desarrollos nuevos en Monterrey, García, Apodaca, Santiago y más municipios de Nuevo León.",
}

export const revalidate = 3600

export default async function DesarrollosPage() {
  const developments = await db.development.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-navy-800 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Desarrollos Inmobiliarios</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Los mejores fraccionamientos y desarrollos nuevos en Nuevo León. Acceso a preventas y precios
            exclusivos de desarrolladoras aliadas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {developments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developments.map((dev) => (
              <Link
                key={dev.id}
                href={`/desarrollos/${dev.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-navy-50 overflow-hidden">
                  {dev.gallery[0] ? (
                    <Image
                      src={dev.gallery[0]}
                      alt={dev.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-navy-200 text-5xl">🏗️</div>
                  )}
                  {dev.featured && (
                    <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Destacado
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    dev.status === "EN_VENTA" ? "bg-emerald-600 text-white" :
                    dev.status === "PROXIMAMENTE" ? "bg-gold-500 text-white" :
                    "bg-gray-500 text-white"
                  }`}>
                    {dev.status === "EN_VENTA" ? "En venta" : dev.status === "PROXIMAMENTE" ? "Próximamente" : "Agotado"}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gold-600 font-semibold uppercase tracking-wider mb-1">
                    {dev.developer}
                  </p>
                  <h2 className="font-bold text-navy-800 text-lg mb-2 group-hover:text-navy-600 transition-colors">
                    {dev.name}
                  </h2>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <MapPin size={12} className="text-gold-500" />
                    {dev.municipality}, Nuevo León
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{dev.description}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    {dev.priceFrom ? (
                      <div>
                        <span className="text-xs text-gray-400">Desde</span>
                        <p className="font-bold text-navy-800">{formatPrice(Number(dev.priceFrom))}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Precio a consultar</span>
                    )}
                    <span className="flex items-center gap-1 text-sm text-navy-700 font-medium group-hover:gap-2 transition-all">
                      Ver más <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏗️</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Desarrollos próximamente</h2>
            <p className="text-gray-500 mb-6">
              Estamos integrando nuestro portafolio de desarrollos. Contáctanos para información exclusiva.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-navy-800 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-navy-700 transition-colors"
            >
              Solicitar información
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
