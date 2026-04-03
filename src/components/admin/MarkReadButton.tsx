"use client"

import { useTransition } from "react"
import { markContactAsRead } from "@/server/actions/admin.actions"

export function MarkReadButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => markContactAsRead(id))}
      disabled={isPending}
      className="text-xs text-navy-700 border border-navy-200 px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors disabled:opacity-50"
    >
      {isPending ? "..." : "Marcar leído"}
    </button>
  )
}
