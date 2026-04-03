import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { LayoutDashboard, Home, Building2, FileText, MessageSquare, LogOut } from "lucide-react"

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Propiedades", href: "/admin/propiedades", icon: Home },
  { label: "Desarrollos", href: "/admin/desarrollos", icon: Building2 },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Contactos", href: "/admin/contactos", icon: MessageSquare },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-navy-900 text-white flex flex-col">
        <div className="p-6 border-b border-navy-800">
          <p className="font-bold text-lg">SSAISA</p>
          <p className="text-xs text-gold-400">Panel de administración</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-800">
          <p className="text-xs text-gray-400 mb-3">{session.user.name}</p>
          <a
            href="/api/auth/signout"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </a>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
