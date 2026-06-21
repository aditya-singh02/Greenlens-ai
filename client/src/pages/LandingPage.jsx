import { Link } from 'react-router-dom'
import {
  TreePine, Droplets, Wind, BarChart3, Brain, MapPin,
  ArrowRight, Leaf, ShieldCheck, Zap
} from 'lucide-react'

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Ward Stress Scoring',
    desc: 'AI-computed composite stress index across all 85 Indore wards using real population density, green space, and water data.',
    color: 'text-forest-600 bg-forest-50',
  },
  {
    icon: TreePine,
    title: 'Green Space Analysis',
    desc: 'Per-capita open space mapped against URDPFI (12 m²/person) and WHO (9 m²/person) standards using real GIS data.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Droplets,
    title: 'Water Risk Mapping',
    desc: 'Projected water supply gaps for 2029 with piped coverage analysis and conservation priority scoring.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Brain,
    title: 'Gemini AI Recommendations',
    desc: 'Ward-specific sustainability action plans powered by Gemini 2.0, tailored to local species, population, and vacant land.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: Wind,
    title: 'Air Quality Integration',
    desc: 'Real-time and historical AQI data via OpenAQ API correlated with green cover density per ward.',
    color: 'text-sky-600 bg-sky-50',
  },
  {
    icon: MapPin,
    title: '85-Ward Coverage',
    desc: 'Complete ward-level intelligence for all of Indore city — searchable, filterable, and instantly comparable.',
    color: 'text-rose-600 bg-rose-50',
  },
]

const STATS = [
  { val: '85', label: 'Wards Analyzed' },
  { val: '3M+', label: 'Population Covered' },
  { val: '12m²', label: 'URDPFI Standard' },
  { val: 'AI', label: 'Gemini Insights' },
]

function LeafDecor({ className, size = 24, delay = '0s' }) {
  return (
    <div className={`absolute opacity-20 text-forest-500 ${className}`} style={{ animationDelay: delay }}>
      <Leaf size={size} />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-mist via-white to-forest-50 pt-16">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-forest-100 opacity-40 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-sage opacity-20 blur-3xl" />
          <LeafDecor className="top-24 left-[8%] leaf-float" size={32} />
          <LeafDecor className="top-40 right-[12%] leaf-float-delay" size={20} delay="0.5s" />
          <LeafDecor className="bottom-32 left-[20%] leaf-float-slow" size={16} delay="1s" />
          <LeafDecor className="top-64 left-[55%] leaf-float" size={12} delay="2s" />
          <LeafDecor className="bottom-48 right-[25%] leaf-float-delay" size={28} delay="0.8s" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center animate-slide-up">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-forest-100 text-forest-700 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-forest-200">
            <span className="w-1.5 h-1.5 bg-leaf rounded-full animate-pulse" />
            Green Tech Hackathon 2025 · Indore, India
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-800 text-forest-900 leading-tight mb-6">
            Urban Sustainability
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-500 to-forest-700">
              Through a Greener Lens
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-forest-600 max-w-2xl mx-auto leading-relaxed mb-10">
            GreenLens AI maps ecological stress across Indore's 85 wards using real GIS data,
            population projections, and Gemini AI — pinpointing where the city needs trees, water, and action most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 text-base">
              Explore Ward Dashboard
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-ghost flex items-center justify-center gap-2 text-base">
              How It Works
            </Link>
          </div>

          {/* Stats ribbon */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map(({ val, label }) => (
              <div key={label} className="glass-card py-4 px-3">
                <div className="font-display font-bold text-2xl text-forest-700">{val}</div>
                <div className="text-xs text-forest-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">Capabilities</span>
            <h2 className="font-display text-4xl font-bold text-forest-900 mt-2 mb-4">
              Intelligence at Every Ward Level
            </h2>
            <p className="text-forest-500 max-w-xl mx-auto">
              Combining real GIS datasets, population projections, and AI to surface what matters most for Indore's green future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-forest-900 mb-2">{title}</h3>
                <p className="text-sm text-forest-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gradient-to-b from-forest-50 to-mist">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-forest-500 uppercase tracking-widest">Process</span>
            <h2 className="font-display text-4xl font-bold text-forest-900 mt-2">
              From Raw Data to Action
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                step: '01',
                title: 'Real Ward Data Ingested',
                desc: 'Population density (2011–2029), GIS green space, water supply gaps, and demographic projections loaded per ward.',
              },
              {
                icon: BarChart3,
                step: '02',
                title: 'Stress Score Computed',
                desc: 'A composite index (0–100) is calculated weighing population pressure, green risk, and water deficit for each of Indore\'s 85 wards.',
              },
              {
                icon: Brain,
                step: '03',
                title: 'Gemini AI Generates Actions',
                desc: 'Ward context is sent to Gemini 2.0 Flash, which returns 3 specific, data-driven sustainability actions — species-specific tree counts, water priorities, and IMC/NGO steps.',
              },
              {
                icon: ShieldCheck,
                step: '04',
                title: 'City Planners Act',
                desc: 'Decision-makers use the dashboard to allocate resources where ecological stress is highest, grounded in evidence.',
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex gap-5 glass-card p-6">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-forest-300">{step}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-forest-900 mb-1">{title}</h3>
                  <p className="text-sm text-forest-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <Leaf key={i} size={40 + (i % 3) * 20}
              className="absolute text-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${(i / 12) * 100}%`,
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <Zap size={36} className="text-leaf mx-auto mb-4" />
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to see Indore's green future?
          </h2>
          <p className="text-forest-300 text-lg mb-8">
            Explore stress levels, green space gaps, and AI recommendations for all 85 wards.
          </p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-leaf hover:bg-green-500 text-forest-900 font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5">
            Open Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
