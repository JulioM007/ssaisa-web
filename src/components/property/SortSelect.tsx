"use client"

interface SortSelectProps {
  currentSort: string
}

export function SortSelect({ currentSort }: SortSelectProps) {
  const options = [
    { value: "newest", label: "Más recientes" },
    { value: "oldest", label: "Más antiguas" },
    { value: "price_asc", label: "Menor precio" },
    { value: "price_desc", label: "Mayor precio" },
  ]

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const url = new URL(window.location.href)
    url.searchParams.set("sort", e.target.value)
    window.location.href = url.toString()
  }

  return (
    <select
      name="sort"
      defaultValue={currentSort}
      onChange={handleChange}
      className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
