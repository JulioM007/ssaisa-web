"use client"

import { useActionState, useState, useEffect } from "react"
import { slugify } from "@/lib/utils"
import { Plus, X, Loader2, Eye } from "lucide-react"

type FormState = { error: string | null }

export interface BlogPostFormData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  author: string
  authorImage: string | null
  tags: string[]
  published: boolean
  metaTitle: string | null
  metaDescription: string | null
}

interface BlogPostFormProps {
  post?: BlogPostFormData
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  submitLabel?: string
}

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"

export function BlogPostForm({ post, action, submitLabel = "Guardar artículo" }: BlogPostFormProps) {
  const [state, formAction, isPending] = useActionState(action, { error: null })

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugManual, setSlugManual] = useState(!!post)
  const [tags, setTags] = useState<string[]>(post?.tags ?? [])
  const [tagInput, setTagInput] = useState("")
  const [contentValue, setContentValue] = useState(post?.content ?? "")
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title))
  }, [title, slugManual])

  function addTag() {
    const val = tagInput.trim()
    if (val && !tags.includes(val)) setTags((prev) => [...prev, val])
    setTagInput("")
  }
  function removeTag(t: string) {
    setTags((prev) => prev.filter((x) => x !== t))
  }

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {state.error}
        </div>
      )}

      {/* ── Contenido ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contenido</h2>

        <div>
          <label className={labelClass}>Título <span className="text-red-500">*</span></label>
          <input
            type="text" name="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            required className={inputClass}
            placeholder="5 razones para invertir en García, Nuevo León"
          />
        </div>

        <div>
          <label className={labelClass}>Slug (URL) <span className="text-red-500">*</span></label>
          <input
            type="text" name="slug" value={slug}
            onChange={(e) => { setSlugManual(true); setSlug(e.target.value) }}
            required className={`${inputClass} font-mono`}
            placeholder="razones-invertir-garcia-nuevo-leon"
          />
          <p className="text-xs text-gray-400 mt-1">Se genera automáticamente del título.</p>
        </div>

        <div>
          <label className={labelClass}>Extracto <span className="text-red-500">*</span></label>
          <textarea
            name="excerpt" required rows={2}
            defaultValue={post?.excerpt}
            className={`${inputClass} resize-none`}
            placeholder="Breve descripción que aparece en la lista del blog (1-2 oraciones)..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={`${labelClass} mb-0`}>
              Contenido <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setPreview((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs text-navy-600 hover:text-navy-800 font-medium transition-colors"
            >
              <Eye size={13} />
              {preview ? "Editar" : "Vista previa"}
            </button>
          </div>

          {preview ? (
            <div className="min-h-[280px] border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 space-y-3 bg-gray-50">
              {contentValue.split("\n\n").map((p, i) => (
                <p key={i} className="leading-relaxed">{p}</p>
              ))}
              {!contentValue && <p className="text-gray-400 italic">Sin contenido aún...</p>}
            </div>
          ) : (
            <textarea
              name="content" required rows={14}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              className={`${inputClass} resize-y`}
              placeholder={"Escribe el contenido del artículo aquí.\n\nSepara los párrafos con una línea en blanco.\n\nPuedes usar texto simple o estructurar el contenido con encabezados y listas."}
            />
          )}
          {preview && <input type="hidden" name="content" value={contentValue} />}
          <p className="text-xs text-gray-400 mt-1">Separa párrafos con una línea en blanco. El texto se muestra tal como lo escribes.</p>
        </div>

        <div>
          <label className={labelClass}>Imagen de portada (URL)</label>
          <input
            type="url" name="coverImage"
            defaultValue={post?.coverImage ?? ""}
            className={inputClass} placeholder="https://..."
          />
        </div>
      </section>

      {/* ── Autor y etiquetas ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Autor y etiquetas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Autor</label>
            <input
              type="text" name="author"
              defaultValue={post?.author ?? "Equipo SSAISA"}
              className={inputClass} placeholder="Equipo SSAISA"
            />
          </div>
          <div>
            <label className={labelClass}>Foto del autor (URL)</label>
            <input
              type="url" name="authorImage"
              defaultValue={post?.authorImage ?? ""}
              className={inputClass} placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Etiquetas</label>
          <input type="hidden" name="tags" value={tags.join("|")} />
          <div className="flex flex-wrap gap-2 mb-2 min-h-[2rem]">
            {tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 bg-gold-100 text-gold-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {t}
                <button type="button" onClick={() => removeTag(t)} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text" value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
              className={`${inputClass} flex-1`}
              placeholder="Inversión, Mercado, Consejos..."
            />
            <button type="button" onClick={addTag} className="border border-gray-200 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">La primera etiqueta aparece destacada en la tarjeta del artículo.</p>
        </div>
      </section>

      {/* ── Publicación ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Publicación</h2>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox" name="published"
            defaultChecked={post?.published}
            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-navy-700 focus:ring-navy-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-700">Publicar artículo</span>
            <p className="text-xs text-gray-400 mt-0.5">
              Si está activo, el artículo será visible en el blog público. Si está inactivo, se guarda como borrador.
            </p>
          </div>
        </label>
      </section>

      {/* ── SEO ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">SEO (opcional)</h2>
        <div>
          <label className={labelClass}>Meta título</label>
          <input type="text" name="metaTitle" defaultValue={post?.metaTitle ?? ""} className={inputClass} placeholder="Título para motores de búsqueda" />
        </div>
        <div>
          <label className={labelClass}>Meta descripción</label>
          <textarea name="metaDescription" rows={3} defaultValue={post?.metaDescription ?? ""} className={`${inputClass} resize-none`} placeholder="Descripción para motores de búsqueda (máx. 160 caracteres)" />
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <a href="/admin/blog" className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
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
