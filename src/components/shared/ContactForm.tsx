"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle } from "lucide-react"
import { contactSchema, type ContactInput } from "@/lib/validations"
import { submitContactForm } from "@/server/actions/contact.actions"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interestType: "COMPRAR", preferredChannel: "WHATSAPP" },
  })

  async function onSubmit(data: ContactInput) {
    setIsLoading(true)
    setError("")
    const result = await submitContactForm(data)
    setIsLoading(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error ?? "Ocurrió un error. Intenta de nuevo.")
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="text-emerald-500 mx-auto mb-4" size={52} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-500">Recibimos tu solicitud. Te contactaremos en menos de 24 horas.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo *</label>
          <input
            {...register("name")}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="81 XXXX XXXX"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Me interesa *</label>
          <select
            {...register("interestType")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
          >
            <option value="COMPRAR">Comprar una propiedad</option>
            <option value="RENTAR">Rentar una propiedad</option>
            <option value="INVERTIR">Invertir en bienes raíces</option>
            <option value="VENDER">Vender mi propiedad</option>
            <option value="ASESOR_EXTERNO">Ser asesor externo</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Prefiero que me contacten por</label>
        <div className="flex gap-4">
          {[
            { value: "WHATSAPP", label: "WhatsApp" },
            { value: "LLAMADA", label: "Llamada" },
            { value: "EMAIL", label: "Email" },
          ].map((ch) => (
            <label key={ch.value} className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("preferredChannel")}
                type="radio"
                value={ch.value}
                className="accent-navy-800"
              />
              <span className="text-sm text-gray-600">{ch.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Cuéntanos más sobre lo que buscas..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </button>
    </form>
  )
}
