export default function StatCard({ icon: Icon, label, value, unit, sub, color = 'forest', accent }) {
  const colors = {
    forest: 'bg-forest-50 text-forest-600 border-forest-100',
    red: 'bg-red-50 text-red-500 border-red-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
  }

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className={`inline-flex p-2.5 rounded-xl border mb-3 ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-forest-400 font-medium mb-0.5">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-forest-900">{value}</span>
          {unit && <span className="text-sm text-forest-500">{unit}</span>}
        </div>
        {sub && <p className="text-xs text-forest-400 mt-0.5">{sub}</p>}
      </div>
      {accent && (
        <div className={`mt-3 h-1 rounded-full ${accent}`} />
      )}
    </div>
  )
}
