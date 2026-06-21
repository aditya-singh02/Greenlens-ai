import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, TreePine, Droplets, Users, BarChart3, Brain,
  Leaf, AlertTriangle, CheckCircle2, ChevronRight, Zap, MapPin, RefreshCw
} from 'lucide-react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts'
import StressBadge from '../components/Stressbadge'
import { fetchWardById, fetchRecommendation } from '../utils/api'

// Mock single ward
function mockWard(id) {
  const names = ['Sirpur', 'Tejaji Nagar', 'Sudama Nagar', 'Rajendra Nagar', 'Nehru Nagar']
  return {
    wardId: id,
    wardName: names[id % names.length],
    stressLevel: ['Critical', 'High', 'Moderate', 'Low'][id % 4],
    stressScore: 30 + (id * 7) % 65,
    densityClass: ['High', 'High-Medium', 'Low-Medium', 'Low'][id % 4],
    densityPerSqKm: 8000 + id * 500,
    population2011: 12000 + id * 800,
    population2021: 15000 + id * 900,
    population2024: 16000 + id * 950,
    population2029: 18000 + id * 1100,
    populationGrowthPercent: 15 + id % 20,
    perCapitaOpenSpace_m2: 2 + (id % 15),
    totalOpenSpace_m2: 25000 + id * 1000,
    greenSpaceCategory: ['Critical', 'Below Standard', 'Near Standard', 'Above Standard'][id % 4],
    greenRiskScore: 20 + (id * 6) % 70,
    waterGap2029: 0.5 + (id % 12),
    coveragePercent: 40 + (id % 45),
    vacantLand: 0.5 + (id % 5),
    recommendedTrees: 200 + id * 50,
  }
}

function DataRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-green-50 last:border-0">
      <span className="text-sm text-forest-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight || 'text-forest-800'}`}>{value}</span>
    </div>
  )
}

export default function WardDetailPage() {
  const { id } = useParams()
  const [ward, setWard] = useState(null)
  const [rec, setRec] = useState(null)
  const [loadingWard, setLoadingWard] = useState(true)
  const [loadingRec, setLoadingRec] = useState(false)
  const [recError, setRecError] = useState(null)

  useEffect(() => {
    setLoadingWard(true)
    fetchWardById(id)
      .then(setWard)
      .catch(() => setWard(mockWard(Number(id))))
      .finally(() => setLoadingWard(false))
  }, [id])

  const loadRec = () => {
    setLoadingRec(true)
    setRecError(null)
    fetchRecommendation(id)
      .then(data => setRec(data.recommendation))
      .catch(() => setRecError('Unable to fetch AI recommendation. Please ensure the API is running.'))
      .finally(() => setLoadingRec(false))
  }

  if (loadingWard) {
    return (
      <div className="min-h-screen bg-mist pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-forest-500 text-sm">Loading ward data…</p>
        </div>
      </div>
    )
  }

  if (!ward) return null

  const greenStandard = ward.perCapitaOpenSpace_m2 != null
    ? ward.perCapitaOpenSpace_m2 >= 12 ? 'Meets URDPFI'
      : ward.perCapitaOpenSpace_m2 >= 9 ? 'Meets WHO min'
      : 'Below WHO standard'
    : '—'

  const greenHighlight = ward.perCapitaOpenSpace_m2 != null
    ? ward.perCapitaOpenSpace_m2 >= 9 ? 'text-green-600' : 'text-red-600'
    : ''

  const radarData = [
    { metric: 'Population\nPressure', value: Math.min(100, (ward.stressScore || 50)) },
    { metric: 'Green Risk', value: Math.min(100, ward.greenRiskScore || 50) },
    { metric: 'Water Gap', value: Math.min(100, (ward.waterGap2029 || 5) * 8) },
    { metric: 'Density', value: Math.min(100, (ward.densityPerSqKm || 5000) / 200) },
    { metric: 'Growth Rate', value: Math.min(100, (ward.populationGrowthPercent || 15)) },
  ]

  const popData = [
    { year: '2011', pop: ward.population2011 },
    { year: '2021', pop: ward.population2021 },
    { year: '2024', pop: ward.population2024 },
    { year: '2029', pop: ward.population2029 },
  ]

  // Parse recommendation text into sections
  const parseRec = (text) => {
    if (!text) return []
    return text.split('\n').filter(l => l.trim()).map((line, i) => ({ id: i, text: line.trim() }))
  }

  return (
    <div className="min-h-screen bg-mist pt-16">
      {/* Header */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-forest-500 hover:text-forest-700 mb-4 transition-colors">
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={14} className="text-forest-400" />
                <span className="text-xs text-forest-400">Ward {ward.wardId} · Indore, India</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-forest-900">{ward.wardName}</h1>
            </div>
            <div className="flex items-center gap-3">
              <StressBadge level={ward.stressLevel} score={ward.stressScore} size="lg" />
              <span className="text-xs text-forest-400 capitalize bg-forest-50 border border-forest-100 px-3 py-1.5 rounded-full">
                {ward.densityClass} density
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Pop 2029', value: ward.population2029?.toLocaleString() || '—', color: 'forest' },
                { icon: TreePine, label: 'm²/person', value: ward.perCapitaOpenSpace_m2?.toFixed(1) || '—', color: ward.perCapitaOpenSpace_m2 >= 9 ? 'forest' : 'red' },
                { icon: Droplets, label: 'Water gap', value: `${ward.waterGap2029?.toFixed(1) || '—'} MLD`, color: 'blue' },
                { icon: Leaf, label: 'Vacant land', value: `${ward.vacantLand?.toFixed(1) || '—'} ha`, color: 'forest' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="glass-card p-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                    color === 'red' ? 'bg-red-50 text-red-500' :
                    color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    'bg-forest-50 text-forest-600'
                  }`}>
                    <Icon size={15} />
                  </div>
                  <p className="text-xs text-forest-400 mb-0.5">{label}</p>
                  <p className="font-display font-bold text-forest-900 text-lg leading-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* Population chart */}
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-forest-900 mb-4 flex items-center gap-2">
                <Users size={16} className="text-forest-500" />
                Population Projection
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={popData} barSize={40}>
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#4d7a4d' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: 'white', border: '1px solid #dcfce7', borderRadius: 8, fontSize: 12 }}
                    formatter={(v) => [v.toLocaleString(), 'Population']}
                  />
                  <Bar dataKey="pop" radius={[5, 5, 0, 0]}>
                    {popData.map(({ year }) => (
                      <Cell key={year} fill={year === '2029' ? '#2d9e2d' : '#86efac'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Data details */}
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-forest-900 mb-4">Ward Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <div>
                  <p className="text-xs font-semibold text-forest-400 uppercase tracking-wider mb-2">Green Space</p>
                  <DataRow label="Per capita open space" value={`${ward.perCapitaOpenSpace_m2?.toFixed(2) || '—'} m²`} highlight={greenHighlight} />
                  <DataRow label="Total open space" value={ward.totalOpenSpace_m2 ? `${(ward.totalOpenSpace_m2 / 10000).toFixed(2)} ha` : '—'} />
                  <DataRow label="Category" value={ward.greenSpaceCategory || '—'} />
                  <DataRow label="Standard" value={greenStandard} highlight={greenHighlight} />
                  <DataRow label="Green risk score" value={`${ward.greenRiskScore || '—'}/100`} />
                  <DataRow label="Recommended trees" value={ward.recommendedTrees?.toLocaleString() || '—'} />
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-xs font-semibold text-forest-400 uppercase tracking-wider mb-2">Population & Water</p>
                  <DataRow label="Population 2011" value={ward.population2011?.toLocaleString() || '—'} />
                  <DataRow label="Population 2021" value={ward.population2021?.toLocaleString() || '—'} />
                  <DataRow label="Growth rate" value={`+${ward.populationGrowthPercent?.toFixed(1) || '—'}%`} />
                  <DataRow label="Piped coverage" value={`${ward.coveragePercent?.toFixed(0) || '—'}%`} />
                  <DataRow label="Water gap 2029" value={`${ward.waterGap2029?.toFixed(2) || '—'} MLD`} />
                  <DataRow label="Density" value={`${ward.densityPerSqKm?.toLocaleString() || '—'}/km²`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: radar + stress */}
          <div className="space-y-6">
            {/* Stress score */}
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-forest-900 mb-3 text-sm">Overall Stress</h3>
              <div className="text-center py-3">
                <div className="relative inline-flex items-center justify-center w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#dcfce7" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none"
                      stroke={
                        ward.stressLevel === 'Critical' ? '#ef4444' :
                        ward.stressLevel === 'High' ? '#f97316' :
                        ward.stressLevel === 'Moderate' ? '#f59e0b' : '#22c55e'
                      }
                      strokeWidth="10"
                      strokeDasharray={`${2.51 * (ward.stressScore || 0)} ${251}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="font-display font-bold text-2xl text-forest-900">{Math.round(ward.stressScore || 0)}</p>
                    <p className="text-[10px] text-forest-400">/100</p>
                  </div>
                </div>
                <StressBadge level={ward.stressLevel} size="lg" />
              </div>
            </div>

            {/* Radar chart */}
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-forest-900 mb-3 text-sm">Risk Dimensions</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData} outerRadius={70}>
                  <PolarGrid stroke="#dcfce7" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#4d7a4d' }} />
                  <Radar dataKey="value" stroke="#2d9e2d" fill="#2d9e2d" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Green space vs standard */}
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-forest-900 mb-3 text-sm">Green Space vs Standards</h3>
              <div className="space-y-3">
                {[
                  { label: 'This Ward', value: ward.perCapitaOpenSpace_m2 || 0, max: 20, color: 'bg-forest-500' },
                  { label: 'WHO Min (9m²)', value: 9, max: 20, color: 'bg-amber-300' },
                  { label: 'URDPFI (12m²)', value: 12, max: 20, color: 'bg-green-400' },
                ].map(({ label, value, max, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-forest-500 mb-1">
                      <span>{label}</span>
                      <span className="font-semibold">{value.toFixed(1)} m²</span>
                    </div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain size={18} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-forest-900">AI Sustainability Recommendations</h3>
                <p className="text-xs text-forest-400">Powered by Gemini 2.0 Flash · Specific to {ward.wardName}</p>
              </div>
            </div>
            {!rec && !loadingRec && (
              <button onClick={loadRec} className="btn-primary flex items-center gap-2 text-sm">
                <Zap size={14} />
                Get AI Insights
              </button>
            )}
            {rec && (
              <button onClick={loadRec} className="btn-ghost flex items-center gap-2 text-sm">
                <RefreshCw size={14} />
                Refresh
              </button>
            )}
          </div>

          {!rec && !loadingRec && !recError && (
            <div className="text-center py-10 border-2 border-dashed border-green-100 rounded-xl">
              <Brain size={36} className="text-forest-200 mx-auto mb-3" />
              <p className="text-forest-400 font-medium text-sm">Click "Get AI Insights" to generate</p>
              <p className="text-forest-300 text-xs mt-1">Gemini AI will suggest trees, water actions, and IMC priorities</p>
            </div>
          )}

          {loadingRec && (
            <div className="text-center py-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-forest-400 text-sm">Gemini is analyzing {ward.wardName}…</p>
            </div>
          )}

          {recError && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">{recError}</p>
            </div>
          )}

          {rec && (
            <div className="space-y-2 animate-fade-in">
              {parseRec(rec).map(({ id, text }) => {
                const isHeader = text.startsWith('#') || text.match(/^\d+\./)
                const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(text)
                return (
                  <div key={id}
                    className={`text-sm leading-relaxed ${
                      isHeader || hasEmoji
                        ? 'font-semibold text-forest-800 mt-4 first:mt-0'
                        : 'text-forest-600 pl-4 border-l-2 border-green-100'
                    }`}
                  >
                    {text}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Navigation to adjacent wards */}
        <div className="flex justify-between items-center pt-2">
          {Number(id) > 1 && (
            <Link to={`/ward/${Number(id) - 1}`} className="btn-ghost flex items-center gap-1.5 text-sm">
              <ArrowLeft size={14} />
              Ward {Number(id) - 1}
            </Link>
          )}
          <div className="ml-auto">
            <Link to={`/ward/${Number(id) + 1}`} className="btn-ghost flex items-center gap-1.5 text-sm">
              Ward {Number(id) + 1}
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
