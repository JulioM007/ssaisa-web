// @ts-nocheck
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Iniciando seed...")

  // ── Categorías ─────────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "residencial" }, update: {}, create: { name: "Residencial", slug: "residencial", icon: "🏠" } }),
    prisma.category.upsert({ where: { slug: "inversion" }, update: {}, create: { name: "Inversión", slug: "inversion", icon: "📈" } }),
    prisma.category.upsert({ where: { slug: "lujo" }, update: {}, create: { name: "Lujo", slug: "lujo", icon: "⭐" } }),
    prisma.category.upsert({ where: { slug: "comercial" }, update: {}, create: { name: "Comercial", slug: "comercial", icon: "🏪" } }),
  ])
  console.log("✅ Categorías creadas")

  // ── Desarrollo ────────────────────────────────────────────────────────────
  const development = await prisma.development.upsert({
    where: { slug: "vista-real-garcia" },
    update: {},
    create: {
      name: "Vista Real García",
      slug: "vista-real-garcia",
      description: "Fraccionamiento residencial con amenidades de primer nivel en García, NL. Lotes desde 120 m² con acceso controlado, área de juegos, cancha de fútbol y parque central.",
      developer: "Desarrolladora del Norte",
      location: "Carr. García-Monterrey, García",
      municipality: "García",
      priceFrom: 950000,
      status: "EN_VENTA",
      featured: true,
      gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"],
    },
  })
  console.log("✅ Desarrollo creado")

  // ── Propiedades ────────────────────────────────────────────────────────────
  const propertiesData = [
    {
      title: "Casa residencial en San Pedro Garza García",
      slug: "casa-residencial-san-pedro-garza-garcia-001",
      description: "Hermosa casa en fraccionamiento privado con excelente ubicación en San Pedro. Cuenta con amplia sala, comedor, cocina integral, 3 recámaras y 2.5 baños. Jardín y estacionamiento para 2 autos.",
      price: 4_200_000,
      type: "CASA" as const,
      operation: "VENTA" as const,
      municipality: "San Pedro Garza García",
      address: "Calle Cedro 245, Frac. Los Pinos",
      bedrooms: 3,
      bathrooms: 2.5,
      parkings: 2,
      buildingM2: 180,
      terrainM2: 240,
      featured: true,
      amenities: ["Jardín", "Cuarto de servicio", "Cocina integral", "Cuarto de lavado", "Seguridad 24/7"],
      latitude: 25.6588,
      longitude: -100.4027,
    },
    {
      title: "Departamento moderno en Monterrey Centro",
      slug: "departamento-moderno-monterrey-centro-001",
      description: "Departamento de diseño moderno en edificio con amenidades premium: rooftop, gimnasio y área de co-working. Acabados de alta calidad, vista a la ciudad y excelente conectividad.",
      price: 2_850_000,
      type: "DEPARTAMENTO" as const,
      operation: "VENTA" as const,
      municipality: "Monterrey",
      address: "Av. Constitución 890, Col. Centro",
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1,
      buildingM2: 95,
      featured: true,
      amenities: ["Rooftop", "Gimnasio", "Co-working", "Concierge", "Seguridad 24/7"],
    },
    {
      title: "Terreno en García — Alta plusvalía",
      slug: "terreno-garcia-alta-plusvalia-001",
      description: "Terreno en la zona de mayor crecimiento del Área Metropolitana. Acceso pavimentado, todos los servicios disponibles. Ideal para casa habitación o desarrollo de condominios.",
      price: 680_000,
      priceNote: "desde",
      type: "TERRENO" as const,
      operation: "VENTA" as const,
      municipality: "García",
      address: "Fracc. Vista Real García",
      terrainM2: 160,
      featured: true,
      amenities: ["Escrituras al corriente", "Servicios disponibles", "Acceso pavimentado"],
      developmentId: development.id,
    },
    {
      title: "Casa en Apodaca — Colonia Residencial",
      slug: "casa-apodaca-colonia-residencial-001",
      description: "Excelente casa de 3 recámaras en zona residencial de Apodaca. Cerca de Parque Explanada y vías principales. Recién remodelada con acabados modernos.",
      price: 2_100_000,
      type: "CASA" as const,
      operation: "VENTA" as const,
      municipality: "Apodaca",
      address: "Calle Bugambilia 345",
      bedrooms: 3,
      bathrooms: 2,
      parkings: 2,
      buildingM2: 145,
      terrainM2: 180,
      amenities: ["Cocina remodelada", "Baños actualizados", "Jardín", "Patio trasero"],
    },
    {
      title: "Casa en renta — San Nicolás de los Garza",
      slug: "casa-renta-san-nicolas-garza-001",
      description: "Cómoda casa en renta en colonia tranquila de San Nicolás. Ideal para familia. 3 recámaras, sala-comedor, cocina equipada, 2 baños completos y patio.",
      price: 12_500,
      type: "CASA" as const,
      operation: "RENTA" as const,
      municipality: "San Nicolás de los Garza",
      address: "Calle Emilio Carranza 567",
      bedrooms: 3,
      bathrooms: 2,
      parkings: 1,
      buildingM2: 130,
      terrainM2: 150,
      amenities: ["Cocina equipada", "Patio", "Cuarto de lavado"],
    },
    {
      title: "Local comercial en Av. Constitución",
      slug: "local-comercial-av-constitucion-001",
      description: "Excelente local comercial en avenida principal de alto tráfico. Planta baja con vitrina a calle, bodega y baño. Ideal para restaurante, tienda o consultorio.",
      price: 28_000,
      type: "LOCAL_COMERCIAL" as const,
      operation: "RENTA" as const,
      municipality: "Monterrey",
      address: "Av. Constitución 1200",
      buildingM2: 85,
      amenities: ["Vitrina a calle", "Bodega", "Baño", "Acceso directo"],
    },
    {
      title: "Preventa — Departamento en Guadalupe",
      slug: "preventa-departamento-guadalupe-001",
      description: "Departamentos en preventa en desarrollo con amenidades. Entrega programada Q4 2025. Acabados premium, elevador, lobby y seguridad las 24 horas.",
      price: 1_980_000,
      priceNote: "desde",
      type: "DEPARTAMENTO" as const,
      operation: "PREVENTA" as const,
      municipality: "Guadalupe",
      address: "Av. Pablo González 800",
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1,
      buildingM2: 78,
      featured: true,
      amenities: ["Elevador", "Lobby", "Roof garden", "Gimnasio", "Seguridad 24/7"],
    },
    {
      title: "Casa premium en Santiago — Vista al cerro",
      slug: "casa-premium-santiago-vista-cerro-001",
      description: "Espectacular casa con vista panorámica al Cañón de la Huasteca en Santiago. 4 recámaras con baño, sala de cine, alberca, jardín amplio y área de BBQ.",
      price: 8_500_000,
      type: "CASA" as const,
      operation: "VENTA" as const,
      municipality: "Santiago",
      address: "Calle Sierra Madre 12, Lomas de Santiago",
      bedrooms: 4,
      bathrooms: 4,
      parkings: 3,
      buildingM2: 380,
      terrainM2: 800,
      featured: true,
      amenities: ["Alberca", "Jardín", "BBQ", "Sala de cine", "Cuarto de servicio", "Bodega"],
    },
    {
      title: "Terreno comercial en carretera — Escobedo",
      slug: "terreno-comercial-carretera-escobedo-001",
      description: "Terreno con frente carretero ideal para nave industrial, franquicia o desarrollo comercial. Excelente ubicación sobre la carretera Monterrey-Laredo.",
      price: 3_200_000,
      type: "TERRENO" as const,
      operation: "VENTA" as const,
      municipality: "Escobedo",
      address: "Carretera Nacional 1500",
      terrainM2: 1200,
      amenities: ["Frente carretero", "Todos los servicios", "Escrituras al corriente"],
    },
    {
      title: "Departamento en renta — Santa Catarina",
      slug: "departamento-renta-santa-catarina-001",
      description: "Departamento completamente amueblado en edificio con seguridad. Ideal para ejecutivos. Incluye WiFi, gas y agua.",
      price: 9_800,
      type: "DEPARTAMENTO" as const,
      operation: "RENTA" as const,
      municipality: "Santa Catarina",
      address: "Blvd. Los Reyes 450",
      bedrooms: 1,
      bathrooms: 1,
      parkings: 1,
      buildingM2: 55,
      amenities: ["Amueblado", "WiFi incluido", "Agua incluida", "Seguridad 24/7"],
    },
  ]

  for (const propData of propertiesData) {
    const { developmentId, ...rest } = propData
    await prisma.property.upsert({
      where: { slug: propData.slug },
      update: {},
      create: {
        ...rest,
        ...(developmentId ? { developmentId } : {}),
        categories: {
          connect: [{ slug: "residencial" }],
        },
      },
    })
  }
  console.log("✅ Propiedades creadas")

  // ── Imágenes de propiedades (Unsplash) ─────────────────────────────────────
  const propertyImages = [
    { slug: "casa-residencial-san-pedro-garza-garcia-001", url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", alt: "Fachada casa San Pedro" },
    { slug: "departamento-moderno-monterrey-centro-001", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", alt: "Departamento moderno" },
    { slug: "terreno-garcia-alta-plusvalia-001", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", alt: "Terreno García" },
    { slug: "casa-apodaca-colonia-residencial-001", url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800", alt: "Casa Apodaca" },
    { slug: "preventa-departamento-guadalupe-001", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", alt: "Departamento Guadalupe preventa" },
    { slug: "casa-premium-santiago-vista-cerro-001", url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800", alt: "Casa premium Santiago" },
  ]

  for (const img of propertyImages) {
    const property = await prisma.property.findUnique({ where: { slug: img.slug } })
    if (property) {
      const existing = await prisma.propertyImage.findFirst({ where: { propertyId: property.id } })
      if (!existing) {
        await prisma.propertyImage.create({
          data: { url: img.url, alt: img.alt, order: 0, isPrimary: true, propertyId: property.id },
        })
      }
    }
  }
  console.log("✅ Imágenes de propiedades creadas")

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      title: "Las 5 zonas con mayor plusvalía en el Área Metropolitana de Monterrey en 2025",
      slug: "zonas-mayor-plusvalia-monterrey-2025",
      excerpt: "Analizamos los municipios y colonias donde la inversión inmobiliaria ha mostrado el mayor crecimiento en valor durante los últimos años.",
      content: "El mercado inmobiliario del Área Metropolitana de Monterrey continúa siendo uno de los más dinámicos del país...",
      tags: ["Inversión", "Plusvalía", "Monterrey"],
      published: true,
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "¿Comprar o rentar en Monterrey? Guía para tomar la mejor decisión",
      slug: "comprar-o-rentar-monterrey-guia",
      excerpt: "Con precios al alza y tasas de interés cambiantes, analizamos cuál opción conviene más según tu situación financiera y planes de vida.",
      content: "Una de las preguntas más frecuentes que recibimos en SSAISA es: ¿me conviene más comprar o rentar?...",
      tags: ["Guía", "Comprar", "Rentar"],
      published: true,
      publishedAt: new Date("2025-02-10"),
    },
    {
      title: "García, Nuevo León: por qué es la apuesta inmobiliaria del momento",
      slug: "garcia-nuevo-leon-apuesta-inmobiliaria",
      excerpt: "El municipio de García ha experimentado un boom inmobiliario sin precedentes. Te explicamos por qué y cómo puedes aprovechar esta oportunidad.",
      content: "García se ha convertido en el municipio de mayor crecimiento en el Área Metropolitana de Monterrey...",
      tags: ["García", "Inversión", "Tendencias"],
      published: true,
      publishedAt: new Date("2025-03-05"),
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }
  console.log("✅ Blog posts creados")

  // ── Usuario admin ──────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("ssaisa2025!", 12)
  await prisma.user.upsert({
    where: { email: "admin@ssaisa.com.mx" },
    update: {},
    create: {
      name: "Administrador SSAISA",
      email: "admin@ssaisa.com.mx",
      password: hashedPassword,
      role: "ADMIN",
    },
  })
  console.log("✅ Usuario admin creado (email: admin@ssaisa.com.mx / pass: ssaisa2025!)")

  console.log("🎉 Seed completado exitosamente!")
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
