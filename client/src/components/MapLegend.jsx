const LEGEND_ITEMS = [
  { label: 'Critical', color: '#ef4444' },
  { label: 'High', color: '#f97316' },
  { label: 'Moderate', color: '#f59e0b' },
  { label: 'Low', color: '#22c55e' },
  { label: 'No data', color: '#cbd5e1' },
]

export default function MapLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap text-xs text-forest-600">
      {LEGEND_ITEMS.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
          {label}
        </div>
      ))}
    </div>
  )
}
