"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircle, Phone, Mail, Loader2, CheckCircle } from "lucide-react"
import { quickQuoteSchema, type QuickQuoteInput } from "@/lib/validations"
import { submitQuickQuote } from "@/server/actions/contact.actions"
import { siteConfig } from "@/config/site"

export function QuickQuoteSection() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickQuoteInput>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: { preferredChannel: "WHATSAPP", interestType: "COMPRAR" },
  })

  async function onSubmit(data: QuickQuoteInput) {
    setIsLoading(true)
    const result = await submitQuickQuote(data)
    setIsLoading(false)
    if (result.success) setSubmitted(true)
  }

  return (
    <section className="py-16 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-wider">
              Cotización rápida
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">
              ¿Buscas comprar, rentar o invertir?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Déjanos tus datos y un asesor te contactará en menos de 24 horas con las mejores opciones
              según tu presupuesto y objetivos.
            </p>
            <div className="space-y-4">
              {[
                { icon: MessageCircle, label: "Vía WhatsApp", detail: "Respuesta inmediata" },
                { icon: Phone, label: "Llamada directa", detail: siteConfig.phone },
                { icon: Mail, label: "Por email", detail: siteConfig.email },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Solicitud enviada!</h3>
                <p className="text-gray-500">
                  Recibimos tu información. Un asesor te contactará pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="text-xl font-bold text-navy-800 mb-6">Solicita información</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="81 XXXX XXXX"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Me interesa
                    </label>
                    <select
                      {...register("interestType")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
                    >
                      <option value="COMPRAR">Comprar</option>
                      <option value="RENTAR">Rentar</option>
                      <option value="INVERTIR">Invertir</option>
                      <option value="VENDER">Vender</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Contactarme por
                    </label>
                    <select
                      {...register("preferredChannel")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
                    >
                      <option value="WHATSAPP">WhatsApp</option>
                      <option value="LLAMADA">Llamada</option>
                      <option value="EMAIL">Email</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Solicitar información"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Al enviar aceptas nuestro{" "}
                  <a href="/privacidad" className="underline hover:text-gray-600">
                    aviso de privacidad
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
