"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useCallback } from "react"
import { X, SlidersHorizontal } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { PropertyFilterInput } from "@/lib/validations"

const propertyTypes = [
  { value: "CASA", label: "Casa" },
  { value: "DEPARTAMENTO", label: "Departamento" },
  { value: "TERRENO", label: "Terreno / Lote" },
  { value: "LOCAL_COMERCIAL", label: "Local comercial" },
  { value: "OFICINA", label: "Oficina" },
  { value: "BODEGA", label: "Bodega" },
]

const operations = [
  { value: "VENTA", label: "Venta" },
  { value: "RENTA", label: "Renta" },
  { value: "PREVENTA", label: "Preventa" },
]

const priceRanges = [
  { label: "Hasta $1M", min: 0, max: 1_000_000 },
  { label: "$1M – $2M", min: 1_000_000, max: 2_000_000 },
  { label: "$2M – $4M", min: 2_000_000, max: 4_000_000 },
  { label: "$4M – $8M", min: 4_000_000, max: 8_000_000 },
  { label: "Más de $8M", min: 8_000_000, max: undefined },
]

interface PropertyFiltersPanelProps {
  currentFilters: PropertyFilterInput
}

export function PropertyFiltersPanel({ currentFilters }: PropertyFiltersPanelProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams()
      const current = currentFilters as Record<string, unknown>

      for (const [k, v] of Object.entries(current)) {
        if (v !== undefined && v !== null && v !== "" && k !== "page") {
          params.set(k, String(v))
        }
      }

      if (value !== undefined && value !== "") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")

      router.push(`${pathname}?${params.toString()}`)
    },
    [currentFilters, pathname, router]
  )

  function clearAll() {
    router.push(pathname)
  }

  const hasFilters = Object.entries(currentFilters).some(
    ([k, v]) => !["page", "limit", "sort"].includes(k) && v !== undefined && v !== ""
  )

  const FilterContent = (
    <div className="space-y-6">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          <X size={14} />
          Limpiar filtros
        </button>
      )}

      {/* Operación */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Operación
        </h3>
        <div className="space-y-2">
          {operations.map((op) => (
            <label key={op.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="operation"
                value={op.value}
                checked={currentFilters.operation === op.value}
                onChange={(e) => updateFilter("operation", e.target.value)}
                className="accent-navy-800"
              />
              <span className="text-sm text-gray-700 group-hover:text-navy-800 transition-colors">
                {op.label}
              </span>
            </label>
          ))}
          {currentFilters.operation && (
            <button
              onClick={() => updateFilter("operation", undefined)}
              className="text-xs text-gray-400 hover:text-red-500 mt-1"
            >
              Quitar filtro
            </button>
          )}
        </div>
      </div>

      {/* Tipo de propiedad */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Tipo de propiedad
        </h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type.value}
                checked={currentFilters.type === type.value}
                onChange={(e) => updateFilter("type", e.target.value)}
                className="accent-navy-800"
              />
              <span className="text-sm text-gray-700 group-hover:text-navy-800 transition-colors">
                {type.label}
              </span>
            </label>
          ))}
          {currentFilters.type && (
            <button
              onClick={() => updateFilter("type", undefined)}
              className="text-xs text-gray-400 hover:text-red-500 mt-1"
            >
              Quitar filtro
            </button>
          )}
        </div>
      </div>

      {/* Municipio */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Municipio
        </h3>
        <select
          value={currentFilters.municipality ?? ""}
          onChange={(e) => updateFilter("municipality", e.target.value || undefined)}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
        >
          <option value="">Todos los municipios</option>
          {siteConfig.municipalities.map((mun) => (
            <option key={mun} value={mun}>
              {mun}
            </option>
          ))}
        </select>
      </div>

      {/* Rango de precio */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Rango de precio
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isActive =
              currentFilters.minPrice === range.min &&
              currentFilters.maxPrice === (range.max ?? undefined)
            return (
              <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="priceRange"
                  checked={isActive}
                  onChange={() => {
                    updateFilter("minPrice", String(range.min))
                    if (range.max) updateFilter("maxPrice", String(range.max))
                    else updateFilter("maxPrice", undefined)
                  }}
                  className="accent-navy-800"
                />
                <span className="text-sm text-gray-700 group-hover:text-navy-800 transition-colors">
                  {range.label}
                </span>
              </label>
            )
          })}
          {(currentFilters.minPrice || currentFilters.maxPrice) && (
            <button
              onClick={() => {
                updateFilter("minPrice", undefined)
                updateFilter("maxPrice", undefined)
              }}
              className="text-xs text-gray-400 hover:text-red-500 mt-1"
            >
              Quitar filtro
            </button>
          )}
        </div>
      </div>

      {/* Recámaras */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Recámaras mínimas
        </h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() =>
                updateFilter("bedrooms", currentFilters.bedrooms === n ? undefined : String(n))
              }
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentFilters.bedrooms === n
                  ? "bg-navy-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-navy-100 hover:text-navy-800"
              }`}
            >
              {n}+
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 mb-4 bg-white border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal size={16} />
        Filtros
        {hasFilters && (
          <span className="bg-navy-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        )}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-navy-800">Filtros</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            {FilterContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
        <h2 className="font-bold text-navy-800 mb-6 flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filtros
        </h2>
        {FilterContent}
      </div>
    </>
  )
}
