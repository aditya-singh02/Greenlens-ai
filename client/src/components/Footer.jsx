import { Link } from 'react-router-dom'
import { TreePine, Github, Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center">
                <TreePine size={16} className="text-white" />
              </div>
              <span className="font-display font-semibold text-lg text-white">
                GreenLens <span className="text-forest-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-forest-300 leading-relaxed">
              AI-powered urban sustainability intelligence for Indore's 85 wards. Built for the Green Tech Hackathon.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-forest-300">
              <li><Link to="/" className="hover:text-forest-100 transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-forest-100 transition-colors">Ward Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-forest-100 transition-colors">About Project</Link></li>
            </ul>
          </div>

          {/* Data sources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Data Sources</h4>
            <ul className="space-y-2 text-sm text-forest-300">
              <li>Indore Municipal Corporation (IMC)</li>
              <li>OpenAQ Air Quality API</li>
              <li>URDPFI Green Space Standards</li>
              <li>GIS Ward Boundary Data</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-forest-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-forest-400">
            © 2026 GreenLens AI · Built for Green Tech Hackathon · Indore, India
          </p>
          <div className="flex items-center gap-1.5 text-xs text-forest-400">
            <Leaf size={12} className="text-leaf" />
            Powered by Gemini AI + Real GIS Data
          </div>
        </div>
      </div>
    </footer>
  )
}
