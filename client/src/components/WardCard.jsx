import { Link } from 'react-router-dom'
import { ArrowRight, Droplets, TreePine, Users } from 'lucide-react'
import StressBadge from './Stressbadge'

export default function WardCard({ ward }) {
  const greenColor = ward.perCapitaOpenSpace_m2 >= 12
    ? 'text-green-600' : ward.perCapitaOpenSpace_m2 >= 6
    ? 'text-amber-600' : 'text-red-600'

  const stressBarColor = {
    Critical: 'bg-red-400',
    High: 'bg-orange-400',
    Moderate: 'bg-amber-400',
    Low: 'bg-green-400',
  }[ward.stressLevel] || 'bg-gray-300'

  return (
    <Link to={`/ward/${ward.wardId}`} className="block group">
      <div className="glass-card p-5 h-full hover:shadow-md hover:border-forest-200 transition-all duration-200 hover:-translate-y-0.5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-forest-400 font-medium mb-0.5">Ward {ward.wardId}</p>
            <h3 className="font-display font-semibold text-forest-900 text-base leading-tight line-clamp-1">
              {ward.wardName}
            </h3>
          </div>
          <StressBadge level={ward.stressLevel} />
        </div>

        {/* Stress score bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-forest-400 mb-1.5">
            <span>Stress Score</span>
            <span className="font-semibold text-forest-700">{Math.round(ward.stressScore)}/100</span>
          </div>
          <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${stressBarColor}`}
              style={{ width: `${Math.min(ward.stressScore, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Users size={11} className="text-forest-400" />
            </div>
            <p className="text-xs font-semibold text-forest-700">
              {ward.population2029 ? (ward.population2029 / 1000).toFixed(0) + 'k' : '—'}
            </p>
            <p className="text-[10px] text-forest-400">Pop 2029</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <TreePine size={11} className="text-forest-400" />
            </div>
            <p className={`text-xs font-semibold ${greenColor}`}>
              {ward.perCapitaOpenSpace_m2 != null ? ward.perCapitaOpenSpace_m2.toFixed(1) : '—'}
            </p>
            <p className="text-[10px] text-forest-400">m²/person</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Droplets size={11} className="text-forest-400" />
            </div>
            <p className="text-xs font-semibold text-forest-700">
              {ward.waterGap2029 != null ? ward.waterGap2029.toFixed(1) : '—'}
            </p>
            <p className="text-[10px] text-forest-400">MLD gap</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-green-50">
          <span className="text-xs text-forest-400 capitalize">{ward.densityClass} density</span>
          <span className="flex items-center gap-1 text-xs font-medium text-forest-600 group-hover:text-forest-800 transition-colors">
            View details <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
