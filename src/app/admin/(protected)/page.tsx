import { db } from "@/lib/db"
import { Home, Building2, MessageSquare, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const [propertiesCount, contactsCount, unreadContacts, developmentsCount] = await Promise.all([
    db.property.count({ where: { status: "ACTIVA" } }),
    db.contact.count(),
    db.contact.count({ where: { read: false } }),
    db.development.count(),
  ])

  const recentContacts = await db.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const stats = [
    { label: "Propiedades activas", value: propertiesCount, icon: Home, color: "bg-navy-100 text-navy-700" },
    { label: "Desarrollos", value: developmentsCount, icon: Building2, color: "bg-gold-100 text-gold-700" },
    { label: "Contactos totales", value: contactsCount, icon: MessageSquare, color: "bg-emerald-100 text-emerald-700" },
    { label: "Sin leer", value: unreadContacts, icon: TrendingUp, color: "bg-red-100 text-red-700" },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contactos recientes */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-800">Contactos recientes</h2>
          <a href="/admin/contactos" className="text-sm text-navy-700 hover:underline">
            Ver todos
          </a>
        </div>
        {recentContacts.length > 0 ? (
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  !contact.read ? "bg-navy-50 border border-navy-100" : "bg-gray-50"
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800 text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.email} · {contact.interestType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString("es-MX")}
                  </p>
                  {!contact.read && (
                    <span className="text-xs bg-navy-700 text-white px-2 py-0.5 rounded-full">Nuevo</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm text-center py-8">Sin contactos aún</p>
        )}
      </div>
    </div>
  )
}
