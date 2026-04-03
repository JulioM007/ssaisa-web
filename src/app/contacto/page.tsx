import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/shared/ContactForm"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contacto — Asesores Inmobiliarios en Monterrey",
  description: "Contáctanos para recibir asesoría inmobiliaria personalizada en Monterrey y Área Metropolitana de Nuevo León.",
}

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: `https://wa.me/${siteConfig.whatsapp}` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Ubicación", value: siteConfig.address, href: undefined },
  { icon: Clock, label: "Horario", value: "Lun–Vie 9:00–18:00 · Sáb 9:00–14:00", href: undefined },
]

export default function ContactoPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-navy-800 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Contáctanos</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Nuestro equipo de asesores está listo para ayudarte a encontrar la propiedad ideal o gestionar tu
            inmueble.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info de contacto */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-bold text-navy-800 text-lg mb-5">Información de contacto</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-navy-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm text-gray-700 hover:text-navy-800 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-700">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold py-4 rounded-xl transition-colors"
            >
              <MessageCircle size={22} />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="font-bold text-navy-800 text-xl mb-6">Envíanos un mensaje</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
