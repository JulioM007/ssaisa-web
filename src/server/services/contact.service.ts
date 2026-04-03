import { db } from "@/lib/db"
import type { ContactInput } from "@/lib/validations"

export async function createContact(data: ContactInput) {
  return db.contact.create({ data })
}

export async function getContacts(page = 1, limit = 20, unreadOnly = false) {
  const where = unreadOnly ? { read: false } : {}
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    db.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.contact.count({ where }),
  ])

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
}

export async function markContactAsRead(id: string) {
  return db.contact.update({ where: { id }, data: { read: true } })
}
