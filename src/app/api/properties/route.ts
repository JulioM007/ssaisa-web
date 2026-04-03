import { NextRequest, NextResponse } from "next/server"
import { getProperties } from "@/server/services/property.service"
import { propertyFilterSchema } from "@/lib/validations"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const flat: Record<string, string> = {}
  searchParams.forEach((value, key) => { flat[key] = value })

  const parsed = propertyFilterSchema.safeParse(flat)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Parámetros inválidos" }, { status: 400 })
  }

  try {
    const result = await getProperties(parsed.data)
    return NextResponse.json({ success: true, ...result })
  } catch {
    return NextResponse.json({ success: false, error: "Error al obtener propiedades" }, { status: 500 })
  }
}
