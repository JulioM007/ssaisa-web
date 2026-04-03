// Re-exporta los tipos generados por Prisma
export type {
  Property,
  PropertyImage,
  PropertyType,
  OperationType,
  PropertyStatus,
  Category,
  Development,
  BlogPost,
  Contact,
  User,
  UserRole,
  InterestType,
  PreferredChannel,
} from "@prisma/client"

// ─── Tipos de UI / filtros ─────────────────────────────────────────────────────

export interface PropertyFilters {
  type?: string
  operation?: string
  municipality?: string
  minPrice?: number
  maxPrice?: number
  minM2?: number
  maxM2?: number
  bedrooms?: number
  bathrooms?: number
  parkings?: number
  search?: string
  featured?: boolean
  page?: number
  limit?: number
  sort?: "price_asc" | "price_desc" | "newest" | "oldest"
}

export interface PropertyWithImages extends Omit<Property, "price" | "priceFrom"> {
  price: number
  images: PropertyImage[]
  categories: Category[]
}

// ─── Respuestas de API ────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ─── Formularios ─────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  interestType: string
  preferredChannel: string
  message?: string
  propertySlug?: string
}

export interface QuickQuoteFormData {
  name: string
  phone: string
  interestType: string
  preferredChannel: string
}

// ─── Navegación ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
