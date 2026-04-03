import { db } from "@/lib/db"
import { MarkReadButton } from "@/components/admin/MarkReadButton"

export default async function AdminContactosPage() {
  const contacts = await db.contact.findMany({
    orderBy: { createdAt: "desc" },
  })

  const channelLabel: Record<string, string> = {
    WHATSAPP: "WhatsApp",
    LLAMADA: "Llamada",
    EMAIL: "Email",
  }

  const interestLabel: Record<string, string> = {
    COMPRAR: "Comprar",
    RENTAR: "Rentar",
    INVERTIR: "Invertir",
    VENDER: "Vender",
    ASESOR_EXTERNO: "Asesor externo",
    OTRO: "Otro",
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Solicitudes de contacto</h1>
        <span className="text-sm text-gray-500">{contacts.length} total</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {contacts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-start gap-4 ${
                  !contact.read ? "bg-navy-50/50" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-800">{contact.name}</p>
                    {!contact.read && (
                      <span className="text-xs bg-navy-700 text-white px-2 py-0.5 rounded-full">Nuevo</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                    <span>{contact.email}</span>
                    {contact.phone && <span>{contact.phone}</span>}
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {interestLabel[contact.interestType] ?? contact.interestType}
                    </span>
                    <span className="bg-navy-100 text-navy-700 px-2 py-0.5 rounded-full">
                      Vía {channelLabel[contact.preferredChannel] ?? contact.preferredChannel}
                    </span>
                  </div>
                  {contact.message && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mt-2">
                      {contact.message}
                    </p>
                  )}
                  {contact.propertySlug && (
                    <p className="text-xs text-navy-600 mt-2">
                      Propiedad:{" "}
                      <a href={`/propiedades/${contact.propertySlug}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        {contact.propertySlug}
                      </a>
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {!contact.read && <MarkReadButton id={contact.id} />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm py-16">No hay solicitudes de contacto</p>
        )}
      </div>
    </div>
  )
}
