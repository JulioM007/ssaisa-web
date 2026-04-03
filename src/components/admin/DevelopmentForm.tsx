"use client"

import { useActionState, useState, useEffect } from "react"
import { slugify } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Plus, X, Loader2 } from "lucide-react"

type FormState = { error: string | null }

export interface DevelopmentFormData {
  id: string
  name: string
  slug: string
  description: string
  developer: string
  developerLogo: string | null
  location: string
  municipality: string
  masterplanImage: string | null
  phases: string | null
  priceFrom: number | null
  status: string
  website: string | null
  featured: boolean
  gallery: string[]
  metaTitle: string | null
  metaDescription: string | null
}

interface DevelopmentFormProps {
  development?: DevelopmentFormData
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  submitLabel?: string
}

const STATUSES = [
  { value: "EN_VENTA", label: "En venta" },
  { value: "PROXIMAMENTE", label: "Próximamente" },
  { value: "AGOTADO", label: "Agotado" },
]

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"

export function DevelopmentForm({ development, action, submitLabel = "Guardar desarrollo" }: DevelopmentFormProps) {
  const [state, formAction, isPending] = useActionState(action, { error: null })

  const [name, setName] = useState(development?.name ?? "")
  const [slug, setSlug] = useState(development?.slug ?? "")
  const [slugManual, setSlugManual] = useState(!!development)
  const [gallery, setGallery] = useState<string[]>(development?.gallery.length ? development.gallery : [""])

  useEffect(() => {
    if (!slugManual) setSlug(slugify(name))
  }, [name, slugManual])

  function addGalleryUrl() {
    setGallery((prev) => [...prev, ""])
  }
  function removeGalleryUrl(i: number) {
    setGallery((prev) => prev.filter((_, idx) => idx !== i))
  }
  function updateGalleryUrl(i: number, value: string) {
    setGallery((prev) => prev.map((url, idx) => (idx === i ? value : url)))
  }

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {state.error}
        </div>
      )}

      {/* ── Información básica ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Información básica</h2>

        <div>
          <label className={labelClass}>Nombre del desarrollo <span className="text-red-500">*</span></label>
          <input
            type="text" name="name" value={name}
            onChange={(e) => setName(e.target.value)}
            required className={inputClass}
            placeholder="Residencial Valle Alto"
          />
        </div>

        <div>
          <label className={labelClass}>Slug (URL) <span className="text-red-500">*</span></label>
          <input
            type="text" name="slug" value={slug}
            onChange={(e) => { setSlugManual(true); setSlug(e.target.value) }}
            required className={`${inputClass} font-mono`}
            placeholder="residencial-valle-alto"
          />
          <p className="text-xs text-gray-400 mt-1">Se genera automáticamente del nombre.</p>
        </div>

        <div>
          <label className={labelClass}>Descripción <span className="text-red-500">*</span></label>
          <textarea
            name="description" required rows={4}
            defaultValue={development?.description}
            className={`${inputClass} resize-none`}
            placeholder="Describe el desarrollo, sus amenidades y propuesta de valor..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Precio desde (MXN)</label>
            <input
              type="number" name="priceFrom" min={0} step={1}
              defaultValue={development?.priceFrom ?? ""}
              className={inputClass} placeholder="1800000"
            />
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <select name="status" defaultValue={development?.status ?? "EN_VENTA"} className={inputClass}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Fases del desarrollo</label>
          <textarea
            name="phases" rows={2}
            defaultValue={development?.phases ?? ""}
            className={`${inputClass} resize-none`}
            placeholder="Fase 1: 60 unidades entregadas. Fase 2: en preventa..."
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox" name="featured"
            defaultChecked={development?.featured}
            className="w-4 h-4 rounded border-gray-300 text-navy-700 focus:ring-navy-500"
          />
          <span className="text-sm font-medium text-gray-700">Desarrollo destacado</span>
        </label>
      </section>

      {/* ── Desarrolladora ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Desarrolladora</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre de la desarrolladora <span className="text-red-500">*</span></label>
            <input
              type="text" name="developer" required
              defaultValue={development?.developer ?? ""}
              className={inputClass} placeholder="Grupo Inmobiliario XYZ"
            />
          </div>
          <div>
            <label className={labelClass}>URL del logo</label>
            <input
              type="url" name="developerLogo"
              defaultValue={development?.developerLogo ?? ""}
              className={inputClass} placeholder="https://..."
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Sitio web</label>
            <input
              type="url" name="website"
              defaultValue={development?.website ?? ""}
              className={inputClass} placeholder="https://desarrolloxyz.com.mx"
            />
          </div>
        </div>
      </section>

      {/* ── Ubicación ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Ubicación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Municipio <span className="text-red-500">*</span></label>
            <select name="municipality" required defaultValue={development?.municipality ?? ""} className={inputClass}>
              <option value="" disabled>Selecciona</option>
              {siteConfig.municipalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Ubicación / Zona <span className="text-red-500">*</span></label>
            <input
              type="text" name="location" required
              defaultValue={development?.location ?? ""}
              className={inputClass} placeholder="Carretera García-Monterrey km 12"
            />
          </div>
        </div>
      </section>

      {/* ── Imágenes ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Imágenes</h2>

        <div>
          <label className={labelClass}>Imagen del masterplan (URL)</label>
          <input
            type="url" name="masterplanImage"
            defaultValue={development?.masterplanImage ?? ""}
            className={inputClass} placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass}>Galería de imágenes</label>
          <input type="hidden" name="gallery" value={gallery.filter(Boolean).join("|")} />
          <div className="space-y-2">
            {gallery.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="url" value={url}
                  onChange={(e) => updateGalleryUrl(i, e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder={`URL imagen ${i + 1}`}
                />
                {gallery.length > 1 && (
                  <button
                    type="button" onClick={() => removeGalleryUrl(i)}
                    className="p-2.5 rounded-lg border border-gray-200 hover:border-red-300 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button" onClick={addGalleryUrl}
            className="mt-3 inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900 font-medium transition-colors"
          >
            <Plus size={16} /> Agregar imagen
          </button>
          <p className="text-xs text-gray-400 mt-1">La primera imagen se usará como portada.</p>
        </div>
      </section>

      {/* ── SEO ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">SEO (opcional)</h2>
        <div>
          <label className={labelClass}>Meta título</label>
          <input type="text" name="metaTitle" defaultValue={development?.metaTitle ?? ""} className={inputClass} placeholder="Título para motores de búsqueda" />
        </div>
        <div>
          <label className={labelClass}>Meta descripción</label>
          <textarea name="metaDescription" rows={3} defaultValue={development?.metaDescription ?? ""} className={`${inputClass} resize-none`} placeholder="Descripción para motores de búsqueda (máx. 160 caracteres)" />
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <a href="/admin/desarrollos" className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
          Cancelar
        </a>
        <button
          type="submit" disabled={isPending}
          className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
