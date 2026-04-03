import type { Metadata } from "next"
import { Shield, TrendingUp, Users, Award, Target, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Nosotros — SSAISA Inmobiliaria",
  description: "Conoce la historia, misión y equipo de SSAISA — promotora inmobiliaria en Monterrey, Nuevo León.",
}

const values = [
  { icon: Shield, title: "Transparencia", description: "Información honesta y clara en cada operación." },
  { icon: TrendingUp, title: "Visión financiera", description: "Cada propiedad analizada como inversión de valor." },
  { icon: Users, title: "Compromiso", description: "Acompañamos a nuestros clientes en cada paso del proceso." },
  { icon: Award, title: "Excelencia", description: "Estándares altos en servicio, documentación y resultados." },
]

const team = [
  { name: "Equipo de Ventas", role: "Asesores Inmobiliarios", description: "Especializados en el mercado de Nuevo León con amplio conocimiento de zonas, precios y tendencias." },
  { name: "Equipo Legal", role: "Gestión Documental", description: "Revisión de escrituras, contratos y trámites notariales para asegurar operaciones seguras." },
  { name: "Equipo Administrativo", role: "Administración de Propiedades", description: "Gestión de rentas, mantenimiento y relación con propietarios e inquilinos." },
]

export default function NosotrosPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-navy-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Sobre SSAISA</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Sistemas y Servicios de Administración Inmobiliaria — más de 10 años conectando personas con
            oportunidades inmobiliarias en Nuevo León.
          </p>
        </div>
      </div>

      {/* Historia */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold-600 text-sm font-semibold uppercase tracking-wider">Nuestra historia</span>
              <h2 className="text-3xl font-bold text-navy-800 mt-2 mb-4">
                Nacimos para simplificar el mercado inmobiliario
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SSAISA nació en Monterrey con una visión clara: hacer accesible y transparente el proceso de
                compra, venta y renta de propiedades en el Área Metropolitana de Nuevo León.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Durante más de una década hemos construido relaciones de confianza con desarrolladoras líderes
                de la región, lo que nos permite ofrecer a nuestros clientes acceso privilegiado a preventas y
                precios exclusivos.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nuestro enfoque diferenciador es la asesoría con perspectiva financiera: no solo te ayudamos a
                encontrar una propiedad, sino que analizamos el potencial de plusvalía para que tu inversión
                crezca con inteligencia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "+500", label: "Propiedades vendidas" },
                { value: "+10", label: "Años de experiencia" },
                { value: "+800", label: "Clientes satisfechos" },
                { value: "15+", label: "Municipios atendidos" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy-50 rounded-xl p-6 text-center border border-navy-100"
                >
                  <p className="text-4xl font-bold text-navy-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mb-5">
                <Target className="text-navy-700" size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Conectar a personas, familias e inversionistas con las mejores oportunidades inmobiliarias de
                Nuevo León, brindando asesoría transparente, profesional y con enfoque en el crecimiento
                patrimonial de nuestros clientes.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mb-5">
                <Eye className="text-gold-700" size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser la promotora inmobiliaria de referencia en el Área Metropolitana de Monterrey, reconocida
                por la transparencia de sus operaciones, la calidad de su portafolio y el impacto positivo en
                el patrimonio de sus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">Nuestros valores</h2>
            <p className="text-gray-500">Los principios que guían cada operación que realizamos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-navy-700" size={26} />
                </div>
                <h3 className="font-bold text-navy-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">Nuestro equipo</h2>
            <p className="text-gray-500">Profesionales comprometidos con tu tranquilidad y éxito</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <div className="w-20 h-20 bg-navy-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-navy-600" size={32} />
                </div>
                <h3 className="font-bold text-navy-800 mb-1">{member.name}</h3>
                <p className="text-gold-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
