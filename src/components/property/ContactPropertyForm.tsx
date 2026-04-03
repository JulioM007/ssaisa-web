"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle } from "lucide-react"
import { contactSchema, type ContactInput } from "@/lib/validations"
import { submitContactForm } from "@/server/actions/contact.actions"

interface ContactPropertyFormProps {
  propertySlug: string
}

export function ContactPropertyForm({ propertySlug }: ContactPropertyFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertySlug,
      interestType: "COMPRAR",
      preferredChannel: "WHATSAPP",
    },
  })

  async function onSubmit(data: ContactInput) {
    setIsLoading(true)
    const result = await submitContactForm(data)
    setIsLoading(false)
    if (result.success) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="text-emerald-500 mx-auto mb-3" size={40} />
        <p className="font-semibold text-gray-800 mb-1">¡Solicitud enviada!</p>
        <p className="text-gray-500 text-sm">Te contactaremos pronto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          placeholder="Tu nombre *"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register("email")}
          placeholder="Email *"
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register("phone")}
          placeholder="Teléfono"
          type="tel"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
        />
      </div>
      <div>
        <select
          {...register("preferredChannel")}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
        >
          <option value="WHATSAPP">Contactar por WhatsApp</option>
          <option value="LLAMADA">Prefiero llamada</option>
          <option value="EMAIL">Contactar por email</option>
        </select>
      </div>
      <div>
        <textarea
          {...register("message")}
          placeholder="Mensaje (opcional)"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none"
        />
      </div>

      <input type="hidden" {...register("interestType")} value="COMPRAR" />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          "Solicitar información"
        )}
      </button>
    </form>
  )
}
