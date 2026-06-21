import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Indore city center — used as the default map view
const INDORE_CENTER = [22.7196, 75.8577]
const DEFAULT_ZOOM = 12

const STRESS_FILL = {
  Critical: '#ef4444',
  High: '#f97316',
  Moderate: '#f59e0b',
  Low: '#22c55e',
}
const NO_DATA_FILL = '#cbd5e1' // slate-300, neutral grey for wards we have no stats for

export default function WardMap({ wards = [], dimmedIds = new Set() }) {
  const navigate = useNavigate()
  const [geoData, setGeoData] = useState(null)
  const [error, setError] = useState(null)

  // Load the ward boundaries once. The file lives in /public so this is
  // just a normal fetch — no bundler import needed for a 400kb static asset.
  useEffect(() => {
    fetch('/wards_indore.geojson')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load ward boundaries')
        return res.json()
      })
      .then(setGeoData)
      .catch(() => setError('Could not load ward boundaries (wards_indore.geojson missing from /public).'))
  }, [])

  // Quick lookup: wardId -> ward stats, joined on the geojson's sourcewardcode
  const wardsById = useMemo(() => {
    const map = {}
    wards.forEach(w => { map[w.wardId] = w })
    return map
  }, [wards])

  const styleFeature = (feature) => {
    const wardId = Number(feature.properties.sourcewardcode)
    const ward = wardsById[wardId]
    const isDimmed = dimmedIds.has(wardId)
    const fill = ward ? (STRESS_FILL[ward.stressLevel] || NO_DATA_FILL) : NO_DATA_FILL

    return {
      color: '#166534',
      weight: isDimmed ? 0.5 : 1.2,
      opacity: isDimmed ? 0.35 : 0.8,
      fillColor: fill,
      fillOpacity: isDimmed ? 0.12 : ward ? 0.65 : 0.25,
    }
  }

  const onEachFeature = (feature, layer) => {
    const wardId = Number(feature.properties.sourcewardcode)
    const ward = wardsById[wardId]
    const name = ward?.wardName || feature.properties.ward_lgd_name
    const score = ward?.stressScore != null ? Math.round(ward.stressScore) : null

    layer.bindTooltip(
      `<div class="ward-tooltip-inner">
         <div class="ward-tooltip-title">Ward ${wardId} · ${name}</div>
         ${ward
           ? `<div class="ward-tooltip-row">Stress: <b>${ward.stressLevel}</b> (${score}/100)</div>
              <div class="ward-tooltip-row">Pop 2029: ${ward.population2029 ? (ward.population2029 / 1000).toFixed(0) + 'k' : '—'}</div>`
           : `<div class="ward-tooltip-row ward-tooltip-muted">No data loaded for this ward</div>`}
       </div>`,
      { sticky: true, direction: 'top', opacity: 1, className: 'ward-tooltip' }
    )

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ weight: 2.5, color: '#1f7e1f', fillOpacity: 0.85 })
        e.target.bringToFront()
      },
      mouseout: (e) => {
        e.target.setStyle(styleFeature(feature))
      },
      click: () => navigate(`/ward/${wardId}`),
    })
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-red-500 bg-red-50 rounded-2xl">
        {error}
      </div>
    )
  }

  if (!geoData) {
    return (
      <div className="flex items-center justify-center h-full text-forest-400 gap-2 text-sm">
        <Loader2 size={16} className="animate-spin" />
        Loading ward boundaries…
      </div>
    )
  }

  return (
    <MapContainer
      center={INDORE_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        // Re-mount when filters change so every polygon re-runs styleFeature/onEachFeature
        key={`${wards.length}-${dimmedIds.size}`}
        data={geoData}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  )
}
