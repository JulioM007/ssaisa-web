"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Inicio", href: "/" },
  {
    label: "Propiedades",
    href: "/propiedades",
    children: [
      { label: "Casas en venta", href: "/propiedades?type=CASA&operation=VENTA" },
      { label: "Departamentos", href: "/propiedades?type=DEPARTAMENTO&operation=VENTA" },
      { label: "Terrenos", href: "/propiedades?type=TERRENO&operation=VENTA" },
      { label: "Renta residencial", href: "/propiedades?operation=RENTA" },
      { label: "Comercial / Oficinas", href: "/propiedades?type=LOCAL_COMERCIAL" },
    ],
  },
  { label: "Desarrollos", href: "/desarrollos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-900 border-b border-navy-800 shadow-lg">
      {/* Top bar */}
      <div className="border-b border-navy-800/60 text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-gray-400">
          <span>Asesoría inmobiliaria profesional en Monterrey, N.L.</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
          >
            <Phone size={12} />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo + Nav agrupados */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/ssaisa-logo.png"
                alt="SSAISA Inmobiliaria"
                width={260}
                height={130}
                className="h-[110px] w-auto drop-shadow-[0_0_10px_rgba(160,210,240,0.25)]"
                priority
              />
            </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 ml-8">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-white bg-navy-800"
                      : "text-gray-300 hover:text-white hover:bg-navy-800"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.href && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-navy-900 rounded-lg shadow-xl border border-navy-700 py-1 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-navy-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          </div>{/* fin logo + nav */}

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Solicitar asesoría
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-300 hover:bg-navy-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-800 bg-navy-900">
          <ul className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-white bg-navy-800"
                      : "text-gray-300 hover:text-white hover:bg-navy-800"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-4 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-navy-800 rounded-md transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gold-500 hover:bg-gold-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Solicitar asesoría
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
