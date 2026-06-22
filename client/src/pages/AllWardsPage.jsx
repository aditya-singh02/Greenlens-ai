// AllWardsPage.jsx — poori file replace karo
import { useState, useEffect, useMemo } from "react";
import { fetchAllWards } from "../utils/api";
import WardCard from "../components/WardCard";
import { Search, X, TreePine } from "lucide-react";

export default function AllWardsPage() {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllWards()
      .then(setWards)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return wards
      .filter(
        (w) =>
          !search ||
          w.wardName?.toLowerCase().includes(search.toLowerCase()) ||
          String(w.wardId).includes(search),
      )
      .sort((a, b) => (b.stressScore || 0) - (a.stressScore || 0));
  }, [wards, search]);

  return (
    <div className="min-h-screen bg-mist pt-16">
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-semibold text-forest-500 uppercase tracking-widest mb-1">
            Indore City
          </p>
          <h1 className="font-display text-3xl font-bold text-forest-900">
            All 85 Wards
          </h1>
          <p className="text-forest-500 mt-1 text-sm">
            {loading
              ? "Loading..."
              : `${filtered.length} of ${wards.length} wards`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400"
          />
          <input
            type="text"
            placeholder="Search ward name or number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 focus:ring-forest-300 text-sm text-forest-800 placeholder-forest-300"
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

        {/* Grid — sare 85 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="glass-card p-5 animate-pulse">
                <div className="h-3 bg-green-100 rounded mb-3 w-1/3" />
                <div className="h-5 bg-green-100 rounded mb-4 w-2/3" />
                <div className="h-1.5 bg-green-100 rounded mb-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((ward) => (
              <WardCard key={ward.wardId} ward={ward} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
