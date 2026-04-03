"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import type { PropertyType, OperationType, PropertyStatus } from "@/generated/prisma/enums"

async function requireAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("No autorizado")
  return session
}

export async function markContactAsRead(id: string) {
  await requireAuth()
  await db.contact.update({ where: { id }, data: { read: true } })
  revalidatePath("/admin/contactos")
}

export async function deleteProperty(id: string) {
  await requireAuth()
  await db.property.delete({ where: { id } })
  revalidatePath("/admin/propiedades")
}

export async function togglePropertyFeatured(id: string, featured: boolean) {
  await requireAuth()
  await db.property.update({ where: { id }, data: { featured } })
  revalidatePath("/admin/propiedades")
  revalidatePath("/")
}

export async function updatePropertyStatus(id: string, status: string) {
  await requireAuth()
  await db.property.update({ where: { id }, data: { status: status as PropertyStatus } })
  revalidatePath("/admin/propiedades")
}

// ── Helpers ─────────────────────────────────────────────────────────────────

type FormState = { error: string | null }

function parsePropertyFormData(formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const slug = (formData.get("slug") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const price = formData.get("price") as string
  const priceNote = (formData.get("priceNote") as string)?.trim() || null
  const type = formData.get("type") as PropertyType
  const operation = formData.get("operation") as OperationType
  const status = ((formData.get("status") as string) || "ACTIVA") as PropertyStatus
  const featured = formData.get("featured") === "on"

  const address = (formData.get("address") as string)?.trim() || null
  const municipality = (formData.get("municipality") as string)?.trim()
  const state = (formData.get("state") as string)?.trim() || "Nuevo León"
  const zipCode = (formData.get("zipCode") as string)?.trim() || null

  const num = (key: string) => {
    const v = formData.get(key) as string
    return v ? parseFloat(v) : null
  }
  const int = (key: string) => {
    const v = formData.get(key) as string
    return v ? parseInt(v) : null
  }

  const amenitiesRaw = (formData.get("amenities") as string) || ""
  const amenities = amenitiesRaw.split("|").map((s) => s.trim()).filter(Boolean)

  const imageUrls = formData.getAll("imageUrl") as string[]
  const imageAlts = formData.getAll("imageAlt") as string[]
  const images = imageUrls
    .map((url, i) => ({ url: url.trim(), alt: imageAlts[i]?.trim() ?? "", order: i, isPrimary: i === 0 }))
    .filter((img) => img.url)

  const metaTitle = (formData.get("metaTitle") as string)?.trim() || null
  const metaDescription = (formData.get("metaDescription") as string)?.trim() || null

  return {
    title, slug, description, price, priceNote, type, operation, status, featured,
    address, municipality, state, zipCode,
    terrainM2: num("terrainM2"), buildingM2: num("buildingM2"),
    bedrooms: int("bedrooms"), bathrooms: num("bathrooms"),
    parkings: int("parkings"), floors: int("floors"),
    amenities, images, metaTitle, metaDescription,
  }
}

function validateRequired(data: ReturnType<typeof parsePropertyFormData>): string | null {
  if (!data.title) return "El título es obligatorio."
  if (!data.slug) return "El slug es obligatorio."
  if (!data.description) return "La descripción es obligatoria."
  if (!data.price || isNaN(parseFloat(data.price))) return "El precio es obligatorio."
  if (!data.type) return "El tipo de propiedad es obligatorio."
  if (!data.operation) return "La operación es obligatoria."
  if (!data.municipality) return "El municipio es obligatorio."
  return null
}

// ── Create ───────────────────────────────────────────────────────────────────

export async function createProperty(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const data = parsePropertyFormData(formData)
  const validationError = validateRequired(data)
  if (validationError) return { error: validationError }

  try {
    await db.property.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: parseFloat(data.price),
        priceNote: data.priceNote,
        type: data.type,
        operation: data.operation,
        status: data.status,
        featured: data.featured,
        address: data.address,
        municipality: data.municipality,
        state: data.state,
        zipCode: data.zipCode,
        terrainM2: data.terrainM2,
        buildingM2: data.buildingM2,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        parkings: data.parkings,
        floors: data.floors,
        amenities: data.amenities,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        images: { create: data.images },
      },
    })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === "P2002") return { error: "Ya existe una propiedad con ese slug. Cambia el título o edita el slug." }
    return { error: "Error al crear la propiedad. Intenta de nuevo." }
  }

  revalidatePath("/admin/propiedades")
  revalidatePath("/propiedades")
  revalidatePath("/")
  redirect("/admin/propiedades")
}

// ── Update ───────────────────────────────────────────────────────────────────

export async function updateProperty(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const data = parsePropertyFormData(formData)
  const validationError = validateRequired(data)
  if (validationError) return { error: validationError }

  try {
    await db.property.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: parseFloat(data.price),
        priceNote: data.priceNote,
        type: data.type,
        operation: data.operation,
        status: data.status,
        featured: data.featured,
        address: data.address,
        municipality: data.municipality,
        state: data.state,
        zipCode: data.zipCode,
        terrainM2: data.terrainM2,
        buildingM2: data.buildingM2,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        parkings: data.parkings,
        floors: data.floors,
        amenities: data.amenities,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        images: {
          deleteMany: {},
          create: data.images,
        },
      },
    })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === "P2002") return { error: "Ya existe una propiedad con ese slug." }
    return { error: "Error al actualizar la propiedad. Intenta de nuevo." }
  }

  revalidatePath("/admin/propiedades")
  revalidatePath(`/admin/propiedades/${id}/editar`)
  revalidatePath("/propiedades")
  revalidatePath("/")
  redirect("/admin/propiedades")
}

// ── Desarrollos ──────────────────────────────────────────────────────────────

export async function createDesarrollo(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const name = (formData.get("name") as string)?.trim()
  const slug = (formData.get("slug") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const developer = (formData.get("developer") as string)?.trim()
  const location = (formData.get("location") as string)?.trim()
  const municipality = (formData.get("municipality") as string)?.trim()

  if (!name || !slug || !description || !developer || !location || !municipality) {
    return { error: "Completa todos los campos obligatorios." }
  }

  const priceFromRaw = formData.get("priceFrom") as string
  const galleryRaw = (formData.get("gallery") as string) || ""

  try {
    await db.development.create({
      data: {
        name,
        slug,
        description,
        developer,
        developerLogo: (formData.get("developerLogo") as string)?.trim() || null,
        location,
        municipality,
        masterplanImage: (formData.get("masterplanImage") as string)?.trim() || null,
        phases: (formData.get("phases") as string)?.trim() || null,
        priceFrom: priceFromRaw ? parseFloat(priceFromRaw) : null,
        status: (formData.get("status") as string) || "EN_VENTA",
        website: (formData.get("website") as string)?.trim() || null,
        featured: formData.get("featured") === "on",
        gallery: galleryRaw.split("|").map((s) => s.trim()).filter(Boolean),
        metaTitle: (formData.get("metaTitle") as string)?.trim() || null,
        metaDescription: (formData.get("metaDescription") as string)?.trim() || null,
      },
    })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === "P2002") return { error: "Ya existe un desarrollo con ese slug." }
    return { error: "Error al crear el desarrollo. Intenta de nuevo." }
  }

  revalidatePath("/admin/desarrollos")
  revalidatePath("/desarrollos")
  redirect("/admin/desarrollos")
}

export async function updateDesarrollo(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const name = (formData.get("name") as string)?.trim()
  const slug = (formData.get("slug") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const developer = (formData.get("developer") as string)?.trim()
  const location = (formData.get("location") as string)?.trim()
  const municipality = (formData.get("municipality") as string)?.trim()

  if (!name || !slug || !description || !developer || !location || !municipality) {
    return { error: "Completa todos los campos obligatorios." }
  }

  const priceFromRaw = formData.get("priceFrom") as string
  const galleryRaw = (formData.get("gallery") as string) || ""

  try {
    await db.development.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        developer,
        developerLogo: (formData.get("developerLogo") as string)?.trim() || null,
        location,
        municipality,
        masterplanImage: (formData.get("masterplanImage") as string)?.trim() || null,
        phases: (formData.get("phases") as string)?.trim() || null,
        priceFrom: priceFromRaw ? parseFloat(priceFromRaw) : null,
        status: (formData.get("status") as string) || "EN_VENTA",
        website: (formData.get("website") as string)?.trim() || null,
        featured: formData.get("featured") === "on",
        gallery: galleryRaw.split("|").map((s) => s.trim()).filter(Boolean),
        metaTitle: (formData.get("metaTitle") as string)?.trim() || null,
        metaDescription: (formData.get("metaDescription") as string)?.trim() || null,
      },
    })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === "P2002") return { error: "Ya existe un desarrollo con ese slug." }
    return { error: "Error al actualizar el desarrollo. Intenta de nuevo." }
  }

  revalidatePath("/admin/desarrollos")
  revalidatePath(`/desarrollos/${slug}`)
  revalidatePath("/desarrollos")
  redirect("/admin/desarrollos")
}

export async function deleteDesarrollo(id: string) {
  await requireAuth()
  await db.development.delete({ where: { id } })
  revalidatePath("/admin/desarrollos")
  revalidatePath("/desarrollos")
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export async function createBlogPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const title = (formData.get("title") as string)?.trim()
  const slug = (formData.get("slug") as string)?.trim()
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()

  if (!title || !slug || !excerpt || !content) {
    return { error: "Completa todos los campos obligatorios." }
  }

  const published = formData.get("published") === "on"
  const tagsRaw = (formData.get("tags") as string) || ""

  try {
    await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: (formData.get("coverImage") as string)?.trim() || null,
        author: (formData.get("author") as string)?.trim() || "Equipo SSAISA",
        authorImage: (formData.get("authorImage") as string)?.trim() || null,
        tags: tagsRaw.split("|").map((s) => s.trim()).filter(Boolean),
        published,
        publishedAt: published ? new Date() : null,
        metaTitle: (formData.get("metaTitle") as string)?.trim() || null,
        metaDescription: (formData.get("metaDescription") as string)?.trim() || null,
      },
    })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === "P2002") return { error: "Ya existe un artículo con ese slug." }
    return { error: "Error al crear el artículo. Intenta de nuevo." }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  redirect("/admin/blog")
}

export async function updateBlogPost(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const title = (formData.get("title") as string)?.trim()
  const slug = (formData.get("slug") as string)?.trim()
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()

  if (!title || !slug || !excerpt || !content) {
    return { error: "Completa todos los campos obligatorios." }
  }

  const published = formData.get("published") === "on"
  const tagsRaw = (formData.get("tags") as string) || ""

  // Fetch existing to know current publishedAt
  const existing = await db.blogPost.findUnique({ where: { id }, select: { published: true, publishedAt: true } })
  const publishedAt = published
    ? existing?.publishedAt ?? new Date()
    : null

  try {
    await db.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: (formData.get("coverImage") as string)?.trim() || null,
        author: (formData.get("author") as string)?.trim() || "Equipo SSAISA",
        authorImage: (formData.get("authorImage") as string)?.trim() || null,
        tags: tagsRaw.split("|").map((s) => s.trim()).filter(Boolean),
        published,
        publishedAt,
        metaTitle: (formData.get("metaTitle") as string)?.trim() || null,
        metaDescription: (formData.get("metaDescription") as string)?.trim() || null,
      },
    })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === "P2002") return { error: "Ya existe un artículo con ese slug." }
    return { error: "Error al actualizar el artículo. Intenta de nuevo." }
  }

  revalidatePath("/admin/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/blog")
  redirect("/admin/blog")
}

export async function deleteBlogPost(id: string) {
  await requireAuth()
  await db.blogPost.delete({ where: { id } })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
