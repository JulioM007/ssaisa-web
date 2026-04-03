import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  interestType: z.enum(["COMPRAR", "RENTAR", "INVERTIR", "VENDER", "ASESOR_EXTERNO", "OTRO"]),
  preferredChannel: z.enum(["WHATSAPP", "LLAMADA", "EMAIL"]),
  message: z.string().optional(),
  propertySlug: z.string().optional(),
})

export const quickQuoteSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(10, "Ingresa un número válido"),
  interestType: z.enum(["COMPRAR", "RENTAR", "INVERTIR", "VENDER", "ASESOR_EXTERNO", "OTRO"]),
  preferredChannel: z.enum(["WHATSAPP", "LLAMADA", "EMAIL"]),
})

export const propertyFilterSchema = z.object({
  type: z.string().optional(),
  operation: z.string().optional(),
  municipality: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minM2: z.coerce.number().optional(),
  maxM2: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  parkings: z.coerce.number().optional(),
  search: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  sort: z.enum(["price_asc", "price_desc", "newest", "oldest"]).default("newest"),
})

export type ContactInput = z.infer<typeof contactSchema>
export type QuickQuoteInput = z.infer<typeof quickQuoteSchema>
export type PropertyFilterInput = z.infer<typeof propertyFilterSchema>
