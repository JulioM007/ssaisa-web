"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const propertyTypes = [
  { value: "", label: "Tipo de propiedad" },
  { value: "CASA", label: "Casa" },
  { value: "DEPARTAMENTO", label: "Departamento" },
  { value: "TERRENO", label: "Terreno / Lote" },
  { value: "LOCAL_COMERCIAL", label: "Local comercial" },
  { value: "OFICINA", label: "Oficina" },
  { value: "BODEGA", label: "Bodega" },
]

const operations = [
  { value: "", label: "Operación" },
  { value: "VENTA", label: "Venta" },
  { value: "RENTA", label: "Renta" },
  { value: "PREVENTA", label: "Preventa" },
]

interface SearchBarProps {
  variant?: "hero" | "compact"
  className?: string
}

export function SearchBar({ variant = "hero", className }: SearchBarProps) {
  const router = useRouter()
  const [type, setType] = useState("")
  const [operation, setOperation] = useState("")
  const [municipality, setMunicipality] = useState("")
  const [search, setSearch] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (type) params.set("type", type)
    if (operation) params.set("operation", operation)
    if (municipality) params.set("municipality", municipality)
    if (search) params.set("search", search)
    router.push(`/propiedades?${params.toString()}`)
  }

  if (variant === "compact") {
    return (
      <form
        onSubmit={handleSearch}
        className={cn("flex gap-2 items-center", className)}
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar propiedades..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-navy-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-navy-700 transition-colors flex-shrink-0"
        >
          Buscar
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "bg-white rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2",
        className
      )}
    >
      {/* Tipo de propiedad */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="flex-1 px-4 py-3 text-sm text-gray-600 border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white cursor-pointer"
      >
        {propertyTypes.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Operación */}
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="flex-1 px-4 py-3 text-sm text-gray-600 border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white cursor-pointer"
      >
        {operations.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Municipio */}
      <select
        value={municipality}
        onChange={(e) => setMunicipality(e.target.value)}
        className="flex-1 px-4 py-3 text-sm text-gray-600 border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white cursor-pointer"
      >
        <option value="">Municipio / Zona</option>
        {siteConfig.municipalities.map((mun) => (
          <option key={mun} value={mun}>
            {mun}
          </option>
        ))}
      </select>

      {/* Búsqueda libre */}
      <div className="relative flex-1 sm:flex-[1.5]">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Colonia, fraccionamiento, calle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm text-gray-600 border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="bg-navy-800 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors flex items-center gap-2 justify-center"
      >
        <Search size={16} />
        Buscar
      </button>
    </form>
  )
}
