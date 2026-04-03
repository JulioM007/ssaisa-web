import type { Metadata } from "next"
import Link from "next/link"
import { Home, TrendingUp, Key, FileText, BarChart, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Servicios Inmobiliarios — SSAISA",
  description: "Venta, renta, asesoría de inversión, administración de propiedades y valuación inmobiliaria en Nuevo León.",
}

const services = [
  {
    icon: Home,
    title: "Venta y Preventa de Inmuebles",
    description:
      "Accede a un portafolio exclusivo de casas, departamentos, terrenos y locales en las mejores zonas de Nuevo León. Contamos con preventas de desarrollos aliados con precios y condiciones preferenciales.",
    features: [
      "Propiedades verificadas y documentadas",
      "Acceso a preventas exclusivas",
      "Análisis comparativo de precios",
      "Acompañamiento en proceso de escrituración",
    ],
    cta: { label: "Ver propiedades", href: "/propiedades" },
  },
  {
    icon: TrendingUp,
    title: "Asesoría de Inversión Inmobiliaria",
    description:
      "Analizamos el mercado de Nuevo León para identificar las zonas y propiedades con mayor potencial de plusvalía. Ideal para inversionistas que buscan hacer crecer su patrimonio de forma inteligente.",
    features: [
      "Análisis de plusvalía por zona",
      "Estrategia de portafolio inmobiliario",
      "Evaluación de retorno de inversión",
      "Identificación de oportunidades de mercado",
    ],
    cta: { label: "Solicitar asesoría", href: "/contacto" },
  },
  {
    icon: Key,
    title: "Renta Residencial y Comercial",
    description:
      "Si buscas rentar o tienes una propiedad para arrendar, gestionamos todo el proceso: desde la búsqueda del inquilino ideal hasta la firma del contrato y el seguimiento mensual.",
    features: [
      "Filtro y verificación de inquilinos",
      "Contratos de arrendamiento",
      "Gestión de pagos y depósitos",
      "Resolución de conflictos",
    ],
    cta: { label: "Ver rentas disponibles", href: "/propiedades?operation=RENTA" },
  },
  {
    icon: FileText,
    title: "Administración de Propiedades",
    description:
      "Nos encargamos de tu propiedad como si fuera nuestra. Desde la cobranza de rentas hasta el mantenimiento preventivo, para que tú solo te dediques a recibir resultados.",
    features: [
      "Cobranza y seguimiento de rentas",
      "Coordinación de mantenimiento",
      "Reportes mensuales al propietario",
      "Atención a inquilinos 24/7",
    ],
    cta: { label: "Administra tu propiedad", href: "/contacto" },
  },
  {
    icon: BarChart,
    title: "Valuación de Inmuebles",
    description:
      "Obten el valor real de mercado de tu propiedad con un dictamen profesional basado en comparables de la zona, condición física y tendencias del mercado local.",
    features: [
      "Avalúo comercial certificado",
      "Análisis de mercado local",
      "Informe detallado con respaldo fotográfico",
      "Válido para trámites notariales y bancarios",
    ],
    cta: { label: "Solicitar valuación", href: "/contacto" },
  },
]

export default function ServiciosPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-navy-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Nuestros Servicios</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Soluciones inmobiliarias integrales para compradores, vendedores, inquilinos e inversionistas en
            Monterrey y Nuevo León.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center mb-5">
                  <service.icon className="text-navy-700" size={26} />
                </div>
                <h2 className="text-2xl font-bold text-navy-800 mb-3">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 mt-1.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.cta.href}
                  className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {service.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className={`bg-navy-50 rounded-2xl h-64 flex items-center justify-center ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <service.icon className="text-navy-200" size={80} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-navy-800 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-gray-300 mb-8">
            Habla con uno de nuestros asesores y te orientamos sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Contactar asesor
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
