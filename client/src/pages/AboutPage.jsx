import { TreePine, Droplets, Brain, Database, BarChart3, Leaf, Users, Shield } from 'lucide-react'

const TEAM_VALUES = [
  { icon: Database, title: 'Real Data Only', desc: 'Every metric is grounded in actual GIS measurements, census data, and published standards — no synthetic estimates.' },
  { icon: Brain, title: 'AI That Explains', desc: 'Gemini AI surfaces patterns humans miss, and explains its reasoning in plain language accessible to city planners.' },
  { icon: Shield, title: 'Standards-First', desc: 'All green space analysis references URDPFI (12 m²/person) and WHO (9 m²/person) international standards.' },
  { icon: Users, title: 'Built for Decision-Makers', desc: 'Designed for Indore Municipal Corporation officers, urban planners, and sustainability NGOs — not just data scientists.' },
]

const TECH = [
  { label: 'Frontend', value: 'React + Tailwind CSS + Recharts' },
  { label: 'Backend', value: 'Node.js + Express + MongoDB' },
  { label: 'AI', value: 'Google Gemini 2.0 Flash' },
  { label: 'Air Quality', value: 'OpenAQ API' },
  { label: 'Green Data', value: 'Real GIS / IMC ward data' },
  { label: 'Population', value: 'Census 2011 + 2021 projections' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-mist pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Leaf key={i} size={60 + (i % 3) * 30}
              className="absolute"
              style={{ top: `${10 + (i * 12)}%`, left: `${5 + (i * 13)}%`, transform: `rotate(${i * 45}deg)` }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-forest-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TreePine size={28} className="text-white" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">About GreenLens AI</h1>
          <p className="text-forest-200 text-lg max-w-2xl mx-auto leading-relaxed">
            A Green Tech Hackathon project building AI-powered ecological intelligence for Indore's urban planners — helping the city allocate its sustainability investments where they matter most.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Problem */}
        <section>
          <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">The Problem</span>
          <h2 className="font-display text-3xl font-bold text-forest-900 mt-2 mb-5">
            Indore is growing fast. Green space is not.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <p className="text-forest-600 leading-relaxed">
                Indore's population grew from <strong className="text-forest-800">1.99 million in 2011 to 3.06 million in 2021</strong> — a 53% increase in a decade. By 2029, wards in the high-density core are projected to face severe water deficits and per-capita green space as low as 1–2 m² per person, against the WHO minimum of 9 m².
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-forest-600 leading-relaxed">
                City planners currently lack a unified, ward-level dashboard to prioritize interventions. Resource allocation is ad hoc. GreenLens AI provides <strong className="text-forest-800">a single source of truth</strong> — synthesizing population data, GIS green space measurements, and water supply projections into actionable stress scores.
              </p>
            </div>
          </div>
        </section>

        {/* How stress score works */}
        <section>
          <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">Methodology</span>
          <h2 className="font-display text-3xl font-bold text-forest-900 mt-2 mb-5">How the Stress Score Works</h2>
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users size={20} className="text-forest-600" />
                </div>
                <h4 className="font-semibold text-forest-800 mb-1">Population Pressure</h4>
                <p className="text-sm text-forest-500">Density per km², growth rate, and 2029 projected headcount weighted against ward area.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TreePine size={20} className="text-forest-600" />
                </div>
                <h4 className="font-semibold text-forest-800 mb-1">Green Risk Score</h4>
                <p className="text-sm text-forest-500">Per-capita open space compared to URDPFI and WHO standards using real GIS-measured ward data.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Droplets size={20} className="text-forest-600" />
                </div>
                <h4 className="font-semibold text-forest-800 mb-1">Water Deficit</h4>
                <p className="text-sm text-forest-500">Projected 2029 water supply gap (MLD) and current piped coverage percentage.</p>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-green-100 text-center">
              <p className="text-sm text-forest-500">
                Combined into a <strong className="text-forest-700">composite stress score (0–100)</strong> and classified as Low / Moderate / High / Critical.
                Scores are recomputed from raw data on every API call — no hard-coded rankings.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">Principles</span>
          <h2 className="font-display text-3xl font-bold text-forest-900 mt-2 mb-6">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM_VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-5 flex gap-4">
                <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-forest-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-forest-800 mb-1">{title}</h4>
                  <p className="text-sm text-forest-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section>
          <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">Tech Stack</span>
          <h2 className="font-display text-3xl font-bold text-forest-900 mt-2 mb-6">Built With</h2>
          <div className="glass-card divide-y divide-green-50">
            {TECH.map(({ label, value }) => (
              <div key={label} className="flex justify-between py-3.5 px-6">
                <span className="text-sm text-forest-500 font-medium">{label}</span>
                <span className="text-sm font-semibold text-forest-800">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Data sources */}
        <section>
          <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">Data Sources</span>
          <h2 className="font-display text-3xl font-bold text-forest-900 mt-2 mb-5">Where the Numbers Come From</h2>
          <div className="glass-card p-6 space-y-3">
            {[
              { name: 'Population Density', source: 'Kaur, P. (2024). Population Growth and Changing Land-use Patterns in Indore City. IJNRD 9(8).' },
              { name: 'Green Space (GIS)', source: 'Real satellite-derived open space measurements per ward boundary, cross-referenced with IMC data.' },
              { name: 'Water Supply', source: 'Indore Municipal Corporation projected supply and demand figures, ward-wise piped coverage surveys.' },
              { name: 'Air Quality', source: 'OpenAQ open-source air quality platform — PM2.5, PM10, and NO₂ sensor readings.' },
              { name: 'Green Standards', source: 'URDPFI Guidelines (12 m²/person) and WHO Urban Green Space recommendations (9 m²/person minimum).' },
            ].map(({ name, source }) => (
              <div key={name} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-400 flex-shrink-0 mt-2" />
                <div>
                  <span className="font-semibold text-sm text-forest-800">{name}: </span>
                  <span className="text-sm text-forest-500">{source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
