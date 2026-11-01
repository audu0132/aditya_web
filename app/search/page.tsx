"use client";
import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q)
    );
  }, [query]);

  const suggestions = ["oversized", "graphic", "black", "white", "minimal", "printed"];

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Search input */}
        <div className="max-w-2xl mx-auto py-12">
          <h1 className="text-4xl font-black tracking-tight mb-8 text-center">SEARCH</h1>
          <div className="relative">
            <svg
              width="18" height="18"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for tees, styles, categories…"
              autoFocus
              className="w-full border-b-2 border-zinc-950 pl-12 pr-4 py-4 text-lg focus:outline-none bg-transparent placeholder:text-zinc-300"
              aria-label="Search products"
            />
          </div>

          {/* Suggestions */}
          {!query && (
            <div className="mt-6">
              <p className="text-xs tracking-widest text-zinc-400 mb-3">POPULAR SEARCHES</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 border border-zinc-200 text-sm hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {query && (
          <div>
            <p className="text-sm text-zinc-400 mb-8">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;<strong className="text-zinc-950">{query}</strong>&rdquo;
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-semibold text-lg mb-2">No results found</p>
                <p className="text-zinc-400 text-sm">Try a different keyword or browse our collections.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
                {results.map((p, i) => (
                  <div key={p.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "forwards" }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
