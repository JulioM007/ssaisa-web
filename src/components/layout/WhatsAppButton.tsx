import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

export function WhatsAppButton() {
  const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
    >
      {/* Texto expandido al hover */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-4 text-sm font-medium">
        ¿Te ayudamos?
      </span>
      <div className="p-3.5 rounded-full bg-[#25D366]">
        <MessageCircle size={24} fill="white" className="text-white" />
      </div>
    </a>
  )
}
