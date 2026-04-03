import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"
import { createContact } from "@/server/services/contact.service"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "Body inválido" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Datos inválidos", details: parsed.error.flatten() }, { status: 422 })
  }

  try {
    const contact = await createContact(parsed.data)
    return NextResponse.json({ success: true, data: { id: contact.id } }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Error al guardar la solicitud" }, { status: 500 })
  }
}
