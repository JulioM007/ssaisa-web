import Link from "next/link"
import { ArrowRight, Shield, TrendingUp, Users, Award, CheckCircle, Star } from "lucide-react"
import { SearchBar } from "@/components/search/SearchBar"
import { PropertyCard } from "@/components/property/PropertyCard"
import { QuickQuoteSection } from "@/components/shared/QuickQuoteSection"
import { getFeaturedProperties } from "@/server/services/property.service"
import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "SSAISA — Inmobiliaria en Monterrey, Nuevo León",
  description: siteConfig.description,
}

// Revalidar cada hora para ISR
export const revalidate = 3600

const categoryCards = [
  { label: "Casas", href: "/propiedades?type=CASA&operation=VENTA", icon: "🏠", count: "en venta" },
  { label: "Departamentos", href: "/propiedades?type=DEPARTAMENTO", icon: "🏢", count: "disponibles" },
  { label: "Terrenos", href: "/propiedades?type=TERRENO", icon: "📐", count: "y lotes" },
  { label: "Comercial", href: "/propiedades?type=LOCAL_COMERCIAL", icon: "🏪", count: "y oficinas" },
  { label: "Renta", href: "/propiedades?operation=RENTA", icon: "🔑", count: "residencial" },
  { label: "Desarrollos", href: "/desarrollos", icon: "🏗️", count: "nuevos" },
]

const differentiators = [
  {
    icon: Shield,
    title: "Transparencia total",
    description: "Información clara sobre cada propiedad: precios reales, documentación y proceso de compra sin sorpresas.",
  },
  {
    icon: TrendingUp,
    title: "Enfoque en inversión",
    description: "Analizamos el potencial de plusvalía de cada zona para que tu patrimonio crezca con inteligencia y te apoyamos con cualquier necesidad de financiamiento.",
  },
  {
    icon: Users,
    title: "Acompañamiento personalizado",
    description: "Nuestro asesor te guiara en todo el proceso de compra, desde la búsqueda hasta la entrega de tu propiedad.",
  },
  {
    icon: Award,
    title: "Alianzas con desarrolladoras",
    description: "Acceso directo a preventas y precios exclusivos de los mejores desarrollos del área metropolitana, especialemente en la zona de Carretera Nacional.",
  },
]

const stats = [
  { value: "+500", label: "Propiedades vendidas" },
  { value: "+10", label: "Años de experiencia" },
  { value: "+800", label: "Clientes satisfechos" },
  { value: "15+", label: "Municipios en NL" },
]

const testimonials = [
  {
    name: "Ricardo Garza",
    role: "Inversionista",
    text: "SSAISA me ayudó a encontrar el terreno perfecto en García con una plusvalía excelente. Su análisis de mercado fue determinante.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Compradora de casa",
    text: "El proceso fue muy transparente. Me explicaron cada paso y encontramos nuestra casa en San Nicolás en menos de un mes.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "Empresario",
    text: "Rentar mi local comercial fue sencillo gracias a su servicio de administración. Recomiendo a SSAISA sin dudar.",
    rating: 5,
  },
]

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties(6)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[600px] flex items-center bg-navy-900 overflow-hidden">
        {/* Fondo gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/images/hero-pattern.svg')", backgroundSize: "cover" }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-gold-600/20 text-gold-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-gold-600/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Monterrey, Nuevo León · Área Metropolitana
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Tu próxima propiedad
              <br />
              <span className="text-gold-400">te está esperando</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Terrenos residenciales, terrenos campestres, casas y departamentos en el Área Metropolitana
              de Monterrey.
              <br className="my-1" />
              Somos especialistas en la zona sur y carretera nacional.
              <br className="my-1" />
              Asesoría inmobiliaria, planes de financiamiento y proyectos de inversión.
            </p>

            {/* CTA secundarios */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/propiedades"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Ver propiedades
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors"
              >
                Solicitar asesoría
              </Link>
            </div>
          </div>

          {/* Buscador */}
          <SearchBar className="w-full max-w-5xl" />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={stat.label} data-animate data-delay={String(i * 100)} className="py-8 px-6 text-center">
                <p className="text-3xl font-bold text-navy-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categorías ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div data-animate className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">Explora por categoría</h2>
            <p className="text-gray-500">Encuentra exactamente lo que buscas</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat, i) => (
              <Link data-animate data-delay={String(i * 100)}
                key={cat.href}
                href={cat.href}
                className="group bg-white rounded-xl p-5 text-center border border-gray-100 hover:border-navy-200 hover:shadow-md transition-all duration-200"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <p className="font-semibold text-gray-800 text-sm group-hover:text-navy-800 transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Propiedades destacadas ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div data-animate className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-navy-800 mb-2">Propiedades destacadas</h2>
              <p className="text-gray-500">Selección especial de las mejores oportunidades</p>
            </div>
            <Link
              href="/propiedades"
              className="hidden sm:inline-flex items-center gap-2 text-navy-700 hover:text-navy-900 font-medium text-sm transition-colors"
            >
              Ver todas
              <ArrowRight size={16} />
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
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
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p>Las propiedades destacadas aparecerán aquí pronto.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/propiedades"
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Ver catálogo completo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Por qué SSAISA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4">
          <div data-animate className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">¿Por qué elegir SSAISA?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Somos la inmobiliaria que te atiende con caracter humano y que entiende tus necesidades de inversion, nos respaldan 30 Años
              de experiencia en el mercado y convenios con todos los fraccionamientos en la zona de Carretera Nacional.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <div
                key={d.title}
                data-animate
                data-delay={String(i * 100)}
                className="bg-white rounded-xl p-6 border border-navy-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mb-4">
                  <d.icon className="text-navy-700" size={22} />
                </div>
                <h3 className="font-semibold text-navy-800 mb-2">{d.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cotización rápida ────────────────────────────────────────────── */}
      <QuickQuoteSection />

      {/* ── Testimonios ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div data-animate className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-500">Más de 800 familias e inversionistas confían en nosotros</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                data-animate
                data-delay={String(i * 150)}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-200 flex items-center justify-center text-navy-700 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="bg-navy-800 py-16">
        <div data-animate className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para encontrar tu propiedad ideal?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Habla con uno de nuestros asesores hoy mismo. Sin compromiso, sin costos ocultos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/propiedades"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              Explorar propiedades
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-medium px-8 py-4 rounded-xl transition-colors text-base"
            >
              Contactar asesor
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {["Sin costos ocultos", "Respuesta en 24 horas", "Asesoría personalizada"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-gold-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
