import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { siteConfig } from "@/config/site"

const footerLinks = {
  propiedades: [
    { label: "Casas en venta", href: "/propiedades?type=CASA&operation=VENTA" },
    { label: "Departamentos", href: "/propiedades?type=DEPARTAMENTO&operation=VENTA" },
    { label: "Terrenos", href: "/propiedades?type=TERRENO&operation=VENTA" },
    { label: "Preventa", href: "/propiedades?operation=PREVENTA" },
    { label: "Renta", href: "/propiedades?operation=RENTA" },
    { label: "Comercial", href: "/propiedades?type=LOCAL_COMERCIAL" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Desarrollos", href: "/desarrollos" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Marca */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Link href="/">
              <Image
                src="/ssaisa-logo.png"
                alt="SSAISA Inmobiliaria"
                width={160}
                height={80}
                className="h-20 w-auto mb-2 drop-shadow-[0_0_12px_rgba(160,210,240,0.2)]"
              />
            </Link>
            <p className="text-xs text-gold-400 uppercase tracking-wider mt-1">
              Servicios y Sistemas de Administración Inmobiliaria
            </p>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Conectamos a personas, inversionistas y empresas con las mejores oportunidades inmobiliarias del
            área metropolitana de Monterrey.
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: siteConfig.socialLinks.facebook, label: "FB" },
              { href: siteConfig.socialLinks.instagram, label: "IG" },
              { href: siteConfig.socialLinks.linkedin, label: "in" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-gold-600 transition-colors flex items-center justify-center text-xs font-bold"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Propiedades */}
        <div>
          <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
            Propiedades
          </h3>
          <ul className="space-y-2">
            {footerLinks.propiedades.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
            Empresa
          </h3>
          <ul className="space-y-2">
            {footerLinks.empresa.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
            Contacto
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Phone size={16} className="mt-0.5 flex-shrink-0 group-hover:text-gold-400" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Mail size={16} className="mt-0.5 flex-shrink-0 group-hover:text-gold-400" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold-400" />
              {siteConfig.address}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SSAISA. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-gray-300 transition-colors">
              Aviso de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-gray-300 transition-colors">
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
