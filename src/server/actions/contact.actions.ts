"use server"

import { contactSchema, quickQuoteSchema } from "@/lib/validations"
import { createContact } from "@/server/services/contact.service"
import type { ApiResponse } from "@/types"

export async function submitContactForm(formData: unknown): Promise<ApiResponse> {
  const parsed = contactSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: "Datos del formulario inválidos." }
  }

  try {
    await createContact(parsed.data)
    return { success: true, message: "Tu solicitud fue enviada. Te contactaremos pronto." }
  } catch {
    return { success: false, error: "Ocurrió un error. Por favor intenta de nuevo." }
  }
}

export async function submitQuickQuote(formData: unknown): Promise<ApiResponse> {
  const parsed = quickQuoteSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: "Datos inválidos." }
  }

  try {
    await createContact({ ...parsed.data, message: undefined })
    return { success: true, message: "Recibimos tu solicitud. Te contactaremos pronto." }
  } catch {
    return { success: false, error: "Ocurrió un error. Por favor intenta de nuevo." }
  }
}
