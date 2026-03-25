interface CategoryFilterProps {
  categories: string[]
  value: string
  onChange: (category: string) => void
  loading: boolean
}

export default function CategoryFilter({ categories, value, onChange, loading }: CategoryFilterProps) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <label htmlFor="categoryFilter" className="form-label fw-semibold">
          Category
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={value}
          disabled={loading}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
