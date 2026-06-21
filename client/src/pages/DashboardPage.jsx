import { useState, useEffect, useMemo } from 'react'
import { Search, SlidersHorizontal, TreePine, Users, AlertTriangle, Droplets, X, Map as MapIcon, LayoutGrid } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import WardCard from '../components/WardCard'
import StatCard from '../components/StatCard'
import WardMap from '../components/WardMap'
import MapLegend from '../components/MapLegend'
import { fetchAllWards, fetchCityAQI } from '../utils/api'

const STRESS_LEVELS = ['All', 'Critical', 'High', 'Moderate', 'Low']
const DENSITY_CLASSES = ['All', 'High', 'High-Medium', 'Low-Medium', 'Low']

const STRESS_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Moderate: '#f59e0b',
  Low: '#22c55e',
}


export default function DashboardPage() {
  const [aqi, setAqi] = useState(null);
  const [wards, setWards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [stressFilter, setStressFilter] = useState('All')
  const [densityFilter, setDensityFilter] = useState('All')
  const [sortBy, setSortBy] = useState('stressScore')
  const [showFilters, setShowFilters] = useState(false)
  const [view, setView] = useState('grid') // 'grid' | 'map'

useEffect(() => {
  fetchAllWards()
    .then(setWards)
    .catch(() =>
      setError(
        "Could not connect to the backend API. Make sure the server is running and seeded.",
      ),
    )
    .finally(() => setLoading(false));
}, []);

useEffect(() => {
  fetchCityAQI()
    .then(setAqi)
    .catch(() => setAqi(null));
}, []);

  const filtered = useMemo(() => {
    return wards
      .filter(w => {
        const matchSearch = !search ||
          w.wardName?.toLowerCase().includes(search.toLowerCase()) ||
          String(w.wardId).includes(search)
        const matchStress = stressFilter === 'All' || w.stressLevel === stressFilter
        const matchDensity = densityFilter === 'All' || w.densityClass === densityFilter
        return matchSearch && matchStress && matchDensity
      })
      .sort((a, b) => {
        if (sortBy === 'stressScore') return (b.stressScore || 0) - (a.stressScore || 0)
        if (sortBy === 'wardId') return a.wardId - b.wardId
        if (sortBy === 'name') return a.wardName?.localeCompare(b.wardName)
        if (sortBy === 'green') return (a.perCapitaOpenSpace_m2 || 0) - (b.perCapitaOpenSpace_m2 || 0)
        return 0
      })
  }, [wards, search, stressFilter, densityFilter, sortBy])


  const dimmedIds = useMemo(() => {
    const filteredIds = new Set(filtered.map(w => w.wardId))
    return new Set(wards.filter(w => !filteredIds.has(w.wardId)).map(w => w.wardId))
  }, [wards, filtered])

  const summary = useMemo(() => {
    if (!wards.length) return {}
    const counts = { Critical: 0, High: 0, Moderate: 0, Low: 0 }
    wards.forEach(w => { if (counts[w.stressLevel] !== undefined) counts[w.stressLevel]++ })
    const totalPop = wards.reduce((s, w) => s + (w.population2029 || 0), 0)
    const avgGreen = wards.filter(w => w.perCapitaOpenSpace_m2 != null)
      .reduce((s, w, _, a) => s + w.perCapitaOpenSpace_m2 / a.length, 0)
    return { counts, totalPop, avgGreen }
  }, [wards])

  const chartData = ['Critical', 'High', 'Moderate', 'Low'].map(level => ({
    level,
    count: summary.counts?.[level] || 0,
  }))

  const hasFilters = stressFilter !== 'All' || densityFilter !== 'All' || search

  return (
    <div className="min-h-screen bg-mist pt-16">
      {/* Page header */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-forest-500 uppercase tracking-widest mb-1">
                Indore City
              </p>
              <h1 className="font-display text-3xl font-bold text-forest-900">
                Ward Dashboard
              </h1>
              <p className="text-forest-500 mt-1 text-sm">
                {loading
                  ? "Loading..."
                  : `${wards.length} wards · Sorted by stress level`}
              </p>
            </div>
            {error && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-4 py-2 rounded-xl">
                <AlertTriangle size={14} />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary stats */}
        {!loading && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
              icon={AlertTriangle}
              label="Critical Wards"
              value={summary.counts?.Critical || 0}
              sub="Immediate action needed"
              color="red"
              accent="bg-red-300"
            />
            <StatCard
              icon={TreePine}
              label="Avg Green Space"
              value={(summary.avgGreen || 0).toFixed(1)}
              unit="m²/person"
              sub={`WHO min: 9 m²`}
              color="forest"
              accent="bg-forest-300"
            />
            <StatCard
              icon={Users}
              label="Pop Covered 2029"
              value={
                summary.totalPop
                  ? (summary.totalPop / 1000000).toFixed(1) + "M"
                  : "—"
              }
              sub="Projected population"
              color="forest"
              accent="bg-forest-200"
            />
            <StatCard
              icon={Droplets}
              label="High-Risk Wards"
              value={
                (summary.counts?.Critical || 0) + (summary.counts?.High || 0)
              }
              sub="Critical + High stress"
              color="amber"
              accent="bg-amber-300"
            />
            {aqi && (
              <StatCard
                icon={AlertTriangle}
                label="Indore AQI (live)"
                value={aqi.aqi}
                sub={`${aqi.category} · city-wide, ${aqi.stationsUsed} stations`}
                color="amber"
                accent="bg-amber-300"
              />
            )}
          </div>
        )}

        {/* Chart + Filters row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Stress distribution chart */}
          <div className="glass-card p-5 col-span-1">
            <h3 className="font-display font-semibold text-forest-900 text-sm mb-4">
              Stress Distribution
            </h3>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={chartData} barSize={28}>
                <XAxis
                  dataKey="level"
                  tick={{ fontSize: 11, fill: "#4d7a4d" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #dcfce7",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [v, "Wards"]}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map(({ level }) => (
                    <Cell key={level} fill={STRESS_COLORS[level]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Search + sort */}
          <div className="lg:col-span-2 flex flex-col gap-3 justify-center">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400"
              />
              <input
                type="text"
                placeholder="Search ward name or number…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-transparent text-sm text-forest-800 placeholder-forest-300"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-300 hover:text-forest-600"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Stress filter pills */}
              <div className="flex gap-1.5 flex-wrap">
                {STRESS_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setStressFilter(level)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                      stressFilter === level
                        ? "bg-forest-600 text-white border-forest-600"
                        : "border-green-200 text-forest-600 hover:border-forest-400 bg-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-full border border-green-200 bg-white text-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-300 ml-auto"
              >
                <option value="stressScore">Sort: Stress ↓</option>
                <option value="wardId">Sort: Ward #</option>
                <option value="name">Sort: Name</option>
                <option value="green">Sort: Green Space ↑</option>
              </select>
            </div>

            {/* Density filter */}
            <div className="flex gap-1.5 flex-wrap">
              {DENSITY_CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setDensityFilter(cls)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                    densityFilter === cls
                      ? "bg-forest-100 text-forest-700 border-forest-300"
                      : "border-green-100 text-forest-500 hover:border-forest-200 bg-white"
                  }`}
                >
                  {cls === "All" ? "All Densities" : cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count + view toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-forest-500">
            {loading
              ? "Loading wards…"
              : `Showing ${filtered.length} of ${wards.length} wards`}
            {hasFilters && (
              <span className="ml-2 text-forest-400">· filtered</span>
            )}
          </p>
          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setStressFilter("All");
                  setDensityFilter("All");
                }}
                className="text-xs text-forest-500 hover:text-forest-700 flex items-center gap-1"
              >
                <X size={12} /> Clear filters
              </button>
            )}
            <div className="flex items-center gap-1 bg-white border border-green-200 rounded-full p-1">
              <button
                onClick={() => setView("grid")}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                  view === "grid"
                    ? "bg-forest-600 text-white"
                    : "text-forest-500 hover:text-forest-700"
                }`}
              >
                <LayoutGrid size={13} /> Grid
              </button>
              <button
                onClick={() => setView("map")}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                  view === "map"
                    ? "bg-forest-600 text-white"
                    : "text-forest-500 hover:text-forest-700"
                }`}
              >
                <MapIcon size={13} /> Map
              </button>
            </div>
          </div>
        </div>

        {/* Map view */}
        {view === "map" && !loading && (
          <div className="glass-card p-5 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display font-semibold text-forest-900 text-sm">
                Indore Ward Map ·{" "}
                {hasFilters
                  ? `${filtered.length} matching wards highlighted`
                  : "All 85 wards"}
              </h3>
              <MapLegend />
            </div>
            <div className="h-[560px] rounded-2xl overflow-hidden border border-green-100">
              <WardMap wards={wards} dimmedIds={dimmedIds} />
            </div>
            <p className="text-xs text-forest-400 mt-3">
              Click any ward on the map to open its detail page. Hover for a
              quick stress summary.
            </p>
          </div>
        )}

        {/* Ward grid */}
        {view === "grid" &&
          (loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse">
                  <div className="h-3 bg-green-100 rounded mb-3 w-1/3" />
                  <div className="h-5 bg-green-100 rounded mb-4 w-2/3" />
                  <div className="h-1.5 bg-green-100 rounded mb-4" />
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-10 bg-green-100 rounded" />
                    ))}
                  </div>
                  <div className="h-3 bg-green-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <TreePine size={40} className="text-forest-200 mx-auto mb-4" />
              <p className="text-forest-400 font-medium">
                {wards.length === 0 ? "No ward data loaded" : "No wards found"}
              </p>
              <p className="text-sm text-forest-300 mt-1">
                {wards.length === 0
                  ? "Check that the backend is running on the configured VITE_API_URL and the database has been seeded."
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((ward) => (
                <WardCard key={ward.wardId} ward={ward} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
