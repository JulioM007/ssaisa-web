"use client"

import { useActionState, useState, useEffect } from "react"
import { slugify } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Plus, X, Loader2 } from "lucide-react"

type FormState = { error: string | null }

interface ImageEntry {
  url: string
  alt: string
}

export interface PropertyFormData {
  id: string
  title: string
  slug: string
  description: string
  price: number | string
  priceNote: string | null
  type: string
  operation: string
  status: string
  featured: boolean
  address: string | null
  municipality: string
  state: string
  zipCode: string | null
  terrainM2: number | null
  buildingM2: number | null
  bedrooms: number | null
  bathrooms: number | null
  parkings: number | null
  floors: number | null
  amenities: string[]
  images: { url: string; alt: string | null; order: number }[]
  metaTitle: string | null
  metaDescription: string | null
}

interface PropertyFormProps {
  property?: PropertyFormData
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  submitLabel?: string
}

const PROPERTY_TYPES = [
  { value: "CASA", label: "Casa" },
  { value: "DEPARTAMENTO", label: "Departamento" },
  { value: "TERRENO", label: "Terreno / Lote" },
  { value: "LOCAL_COMERCIAL", label: "Local Comercial" },
  { value: "OFICINA", label: "Oficina" },
  { value: "BODEGA", label: "Bodega" },
  { value: "DESARROLLO", label: "Desarrollo" },
]

const OPERATIONS = [
  { value: "VENTA", label: "Venta" },
  { value: "RENTA", label: "Renta" },
  { value: "PREVENTA", label: "Preventa" },
]

const STATUSES = [
  { value: "ACTIVA", label: "Activa" },
  { value: "INACTIVA", label: "Inactiva" },
  { value: "VENDIDA", label: "Vendida" },
  { value: "RENTADA", label: "Rentada" },
  { value: "RESERVADA", label: "Reservada" },
]

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"

const labelClass = "block text-sm font-medium text-gray-700 mb-1"

export function PropertyForm({ property, action, submitLabel = "Guardar propiedad" }: PropertyFormProps) {
  const [state, formAction, isPending] = useActionState(action, { error: null })

  const [title, setTitle] = useState(property?.title ?? "")
  const [slug, setSlug] = useState(property?.slug ?? "")
  const [slugManual, setSlugManual] = useState(!!property)

  const [images, setImages] = useState<ImageEntry[]>(
    property?.images.length
      ? [...property.images].sort((a, b) => a.order - b.order).map((img) => ({ url: img.url, alt: img.alt ?? "" }))
      : [{ url: "", alt: "" }]
  )

  const [amenities, setAmenities] = useState<string[]>(property?.amenities ?? [])
  const [amenityInput, setAmenityInput] = useState("")

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title))
  }, [title, slugManual])

  function addImage() {
    setImages((prev) => [...prev, { url: "", alt: "" }])
  }
  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i))
  }
  function updateImage(i: number, field: "url" | "alt", value: string) {
    setImages((prev) => prev.map((img, idx) => (idx === i ? { ...img, [field]: value } : img)))
  }

  function addAmenity() {
    const val = amenityInput.trim()
    if (val && !amenities.includes(val)) setAmenities((prev) => [...prev, val])
    setAmenityInput("")
  }
  function removeAmenity(a: string) {
    setAmenities((prev) => prev.filter((x) => x !== a))
  }

  const charFields: { name: keyof PropertyFormData; label: string; step: number; placeholder: string }[] = [
    { name: "bedrooms", label: "Recámaras", step: 1, placeholder: "3" },
    { name: "bathrooms", label: "Baños", step: 0.5, placeholder: "2.5" },
    { name: "parkings", label: "Cajones", step: 1, placeholder: "2" },
    { name: "floors", label: "Plantas", step: 1, placeholder: "2" },
    { name: "buildingM2", label: "Construcción m²", step: 1, placeholder: "180" },
    { name: "terrainM2", label: "Terreno m²", step: 1, placeholder: "250" },
  ]

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
          <label className={labelClass}>
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
            placeholder="Casa en venta en San Pedro Garza García"
          />
        </div>

        <div>
          <label className={labelClass}>
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => { setSlugManual(true); setSlug(e.target.value) }}
            required
            className={`${inputClass} font-mono`}
            placeholder="casa-venta-san-pedro"
          />
          <p className="text-xs text-gray-400 mt-1">
            Se genera automáticamente del título. Edítalo si es necesario.
          </p>
        </div>

        <div>
          <label className={labelClass}>
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={property?.description}
            className={`${inputClass} resize-none`}
            placeholder="Describe la propiedad con detalle..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Precio (MXN) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              min={0}
              step={1}
              defaultValue={property ? Number(property.price) : ""}
              className={inputClass}
              placeholder="3500000"
            />
          </div>
          <div>
            <label className={labelClass}>Nota de precio</label>
            <input
              type="text"
              name="priceNote"
              defaultValue={property?.priceNote ?? ""}
              className={inputClass}
              placeholder="+ IVA, negociable..."
            />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={property?.featured}
            className="w-4 h-4 rounded border-gray-300 text-navy-700 focus:ring-navy-500"
          />
          <span className="text-sm font-medium text-gray-700">Propiedad destacada (aparece en la página principal)</span>
        </label>
      </section>

      {/* ── Tipo y estado ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tipo y estado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Tipo de propiedad <span className="text-red-500">*</span>
            </label>
            <select name="type" required defaultValue={property?.type ?? ""} className={inputClass}>
              <option value="" disabled>Selecciona</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Operación <span className="text-red-500">*</span>
            </label>
            <select name="operation" required defaultValue={property?.operation ?? ""} className={inputClass}>
              <option value="" disabled>Selecciona</option>
              {OPERATIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <select name="status" defaultValue={property?.status ?? "ACTIVA"} className={inputClass}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── Ubicación ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Ubicación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Municipio <span className="text-red-500">*</span>
            </label>
            <select name="municipality" required defaultValue={property?.municipality ?? ""} className={inputClass}>
              <option value="" disabled>Selecciona</option>
              {siteConfig.municipalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Dirección</label>
            <input
              type="text"
              name="address"
              defaultValue={property?.address ?? ""}
              className={inputClass}
              placeholder="Av. Vasconcelos 123, Col. Del Valle"
            />
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <input
              type="text"
              name="state"
              defaultValue={property?.state ?? "Nuevo León"}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Código postal</label>
            <input
              type="text"
              name="zipCode"
              defaultValue={property?.zipCode ?? ""}
              className={inputClass}
              placeholder="66220"
            />
          </div>
        </div>
      </section>

      {/* ── Características ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Características</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {charFields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                type="number"
                name={f.name}
                min={0}
                step={f.step}
                defaultValue={
                  property && property[f.name] != null ? String(property[f.name]) : ""
                }
                className={inputClass}
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Amenidades ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Amenidades</h2>
        <input type="hidden" name="amenities" value={amenities.join("|")} />
        <div className="flex flex-wrap gap-2 mb-3 min-h-[2rem]">
          {amenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 bg-navy-100 text-navy-700 text-xs font-medium px-3 py-1.5 rounded-full"
            >
              {a}
              <button type="button" onClick={() => removeAmenity(a)} className="hover:text-red-500 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity() } }}
            className={`${inputClass} flex-1`}
            placeholder="Alberca, Gym, Seguridad 24/7..."
          />
          <button
            type="button"
            onClick={addAmenity}
            className="border border-gray-200 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Presiona Enter o + para agregar. Haz clic en la × para eliminar.</p>
      </section>

      {/* ── Imágenes ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Imágenes</h2>
        <div className="space-y-3">
          {images.map((img, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <input
                  type="url"
                  name="imageUrl"
                  value={img.url}
                  onChange={(e) => updateImage(i, "url", e.target.value)}
                  className={inputClass}
                  placeholder={`URL imagen ${i + 1}`}
                />
                <input
                  type="text"
                  name="imageAlt"
                  value={img.alt}
                  onChange={(e) => updateImage(i, "alt", e.target.value)}
                  className={inputClass}
                  placeholder="Texto alternativo"
                />
              </div>
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-2.5 rounded-lg border border-gray-200 hover:border-red-300 hover:text-red-500 transition-colors mt-0.5 flex-shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addImage}
          className="mt-4 inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900 font-medium transition-colors"
        >
          <Plus size={16} />
          Agregar imagen
        </button>
        <p className="text-xs text-gray-400 mt-2">La primera imagen será la principal.</p>
      </section>

      {/* ── SEO ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">SEO (opcional)</h2>
        <div>
          <label className={labelClass}>Meta título</label>
          <input
            type="text"
            name="metaTitle"
            defaultValue={property?.metaTitle ?? ""}
            className={inputClass}
            placeholder="Título para motores de búsqueda"
          />
        </div>
        <div>
          <label className={labelClass}>Meta descripción</label>
          <textarea
            name="metaDescription"
            rows={3}
            defaultValue={property?.metaDescription ?? ""}
            className={`${inputClass} resize-none`}
            placeholder="Descripción para motores de búsqueda (máx. 160 caracteres)"
          />
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <a
          href="/admin/propiedades"
          className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancelar
        </a>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
