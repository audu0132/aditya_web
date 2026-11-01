"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/products";

type SortKey = "featured" | "new" | "price_asc" | "price_desc";

const SIZES  = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const FITS   = ["Oversized", "Regular", "Slim"] as const;
const CATS   = ["oversized", "graphic", "printed", "minimal"] as const;

export default function ShopClient() {
  const searchParams = useSearchParams();

  const [sort, setSort]       = useState<SortKey>((searchParams.get("sort") as SortKey) || "featured");
  const [category, setCat]    = useState<string>(searchParams.get("category") || "");
  const [sizes, setSizes]     = useState<string[]>([]);
  const [fits, setFits]       = useState<string[]>([]);
  const [maxPrice, setMax]    = useState<number>(3000);
  const [filtersOpen, setFO]  = useState(false);

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let p = [...PRODUCTS];
    if (category) p = p.filter((x) => x.category === category);
    if (sizes.length) p = p.filter((x) => x.sizes.some((s) => sizes.includes(s)));
    if (fits.length)  p = p.filter((x) => fits.includes(x.fit));
    p = p.filter((x) => x.price <= maxPrice);
    if (searchParams.get("badge")) p = p.filter((x) => x.badge === searchParams.get("badge"));
    switch (sort) {
      case "new":        return p.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
      case "price_asc":  return p.sort((a, b) => a.price - b.price);
      case "price_desc": return p.sort((a, b) => b.price - a.price);
      default:           return p;
    }
  }, [category, sizes, fits, maxPrice, sort, searchParams]);

  const clearFilters = () => { setCat(""); setSizes([]); setFits([]); setMax(3000); };
  const activeFilters = [category, ...sizes, ...fits, maxPrice < 3000 ? `≤₹${maxPrice}` : ""].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
      {/* Page title */}
      <div className="py-12 border-b border-zinc-100 mb-6">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">ALL PRODUCTS</h1>
        <p className="text-zinc-400 text-sm mt-1">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <button
          onClick={() => setFO(!filtersOpen)}
          className="flex items-center gap-2 text-sm font-semibold tracking-wide border border-zinc-200 px-4 py-2 hover:bg-zinc-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          FILTER {activeFilters.length > 0 && `(${activeFilters.length})`}
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="text-sm border border-zinc-200 px-3 py-2 focus:outline-none focus:border-zinc-950 cursor-pointer"
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="new">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((f) => (
            <span key={f} className="text-xs bg-zinc-950 text-white px-3 py-1 rounded-full font-medium">
              {f}
            </span>
          ))}
          <button onClick={clearFilters} className="text-xs text-zinc-500 underline hover:text-zinc-950 transition-colors">
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`flex-shrink-0 w-56 ${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="space-y-8 sticky top-24">
            {/* Category */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-3 text-zinc-500">CATEGORY</h3>
              <div className="space-y-2">
                {CATS.map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio" name="category" value={c}
                      checked={category === c}
                      onChange={() => setCat(c)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 border-2 flex items-center justify-center ${category === c ? "border-zinc-950 bg-zinc-950" : "border-zinc-300 group-hover:border-zinc-500"}`}>
                      {category === c && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </span>
                    <span className="text-sm capitalize">{c}</span>
                  </label>
                ))}
                {category && (
                  <button onClick={() => setCat("")} className="text-xs text-zinc-400 underline mt-1">Clear</button>
                )}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-3 text-zinc-500">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleArr(sizes, s, setSizes)}
                    className={`px-2.5 py-1 text-xs border font-medium transition-colors ${
                      sizes.includes(s) ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-3 text-zinc-500">FIT</h3>
              <div className="space-y-2">
                {FITS.map((f) => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fits.includes(f)}
                      onChange={() => toggleArr(fits, f, setFits)}
                      className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                    />
                    <span className="text-sm">{f}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-3 text-zinc-500">PRICE</h3>
              <input
                type="range" min={500} max={3000} step={100} value={maxPrice}
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-full accent-zinc-950"
                aria-label="Max price"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>₹500</span>
                <span className="font-semibold text-zinc-900">≤₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>₹3,000</span>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="text-xs font-semibold tracking-wide underline hover:opacity-60 transition-opacity"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-zinc-400">
              <p className="text-5xl mb-4">🫙</p>
              <p className="font-semibold text-lg">No products match your filters.</p>
              <button onClick={clearFilters} className="mt-4 text-sm underline hover:opacity-60 transition-opacity">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="animate-fade-up opacity-0"
                  style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s`, animationFillMode: "forwards" }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
