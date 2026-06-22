import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Leaf, Menu, X, TreePine } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 bg-forest-600 rounded-xl flex items-center justify-center group-hover:bg-forest-700 transition-colors">
                <TreePine size={20} className="text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-leaf rounded-full border-2 border-white" />
            </div>
            <span className="font-display font-700 text-xl text-forest-800">
              Green<span className="text-forest-500">Lens</span>
              <span className="text-xs font-sans font-medium text-forest-400 ml-1 align-super">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === to
                    ? "bg-forest-100 text-forest-700"
                    : "text-forest-600 hover:bg-forest-50 hover:text-forest-800"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link to="/wards" className="ml-3 btn-primary text-sm py-2 px-5">
              View Wards
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-forest-600 hover:bg-forest-50 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-green-100 px-4 py-4 space-y-1 shadow-lg">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === to
                  ? "bg-forest-100 text-forest-700"
                  : "text-forest-600 hover:bg-forest-50"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Link to="/wards" className="btn-primary block text-center text-sm">
              View Wards
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
