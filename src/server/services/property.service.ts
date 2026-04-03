import { db } from "@/lib/db"
import type { PropertyFilters } from "@/types"
import type { Prisma } from "@prisma/client"

export async function getProperties(filters: PropertyFilters = {}) {
  const {
    type,
    operation,
    municipality,
    minPrice,
    maxPrice,
    minM2,
    maxM2,
    bedrooms,
    parkings,
    search,
    featured,
    page = 1,
    limit = 12,
    sort = "newest",
  } = filters

  const where: Prisma.PropertyWhereInput = {
    status: "ACTIVA",
  }

  if (type) where.type = type as Prisma.EnumPropertyTypeFilter
  if (operation) where.operation = operation as Prisma.EnumOperationTypeFilter
  if (municipality) where.municipality = { contains: municipality, mode: "insensitive" }
  if (featured !== undefined) where.featured = featured
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price = { ...where.price as object, gte: minPrice }
    if (maxPrice) where.price = { ...where.price as object, lte: maxPrice }
  }
  if (minM2 || maxM2) {
    where.buildingM2 = {}
    if (minM2) where.buildingM2 = { gte: minM2 }
    if (maxM2) where.buildingM2 = { ...where.buildingM2 as object, lte: maxM2 }
  }
  if (bedrooms) where.bedrooms = { gte: bedrooms }
  if (parkings) where.parkings = { gte: parkings }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { municipality: { contains: search, mode: "insensitive" } },
      { address: { contains: search, mode: "insensitive" } },
    ]
  }

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : sort === "oldest"
          ? { createdAt: "asc" }
          : { createdAt: "desc" }

  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    db.property.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        categories: true,
      },
    }),
    db.property.count({ where }),
  ])

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getPropertyBySlug(slug: string) {
  return db.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      categories: true,
      development: true,
    },
  })
}

export async function getFeaturedProperties(limit = 6) {
  return db.property.findMany({
    where: { status: "ACTIVA", featured: true },
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      categories: true,
    },
  })
}

export async function getSimilarProperties(propertyId: string, type: string, municipality: string, limit = 3) {
  return db.property.findMany({
    where: {
      status: "ACTIVA",
      id: { not: propertyId },
      OR: [{ type: type as Prisma.EnumPropertyTypeFilter }, { municipality: { contains: municipality, mode: "insensitive" } }],
    },
    take: limit,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      categories: true,
    },
  })
}
