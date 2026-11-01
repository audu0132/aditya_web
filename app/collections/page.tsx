import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our T-shirt collections — oversized, graphic, printed and minimal streetwear.",
};

const bgColors = [
  "bg-zinc-200",
  "bg-stone-200",
  "bg-slate-200",
  "bg-neutral-200",
];

export default function CollectionsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-10 border-b border-zinc-100 mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-zinc-400 mb-2">EXPLORE</p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight">COLLECTIONS</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className={`group relative aspect-[16/9] sm:aspect-square overflow-hidden ${bgColors[i % bgColors.length]} animate-fade-up opacity-0`}
              style={{ animationDelay: `${i * 0.12}s`, animationFillMode: "forwards" }}
            >
              <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <h2
                  className="text-4xl sm:text-5xl font-black tracking-widest group-hover:scale-105 transition-transform duration-500"
                  style={{ fontFamily: "var(--font-display, 'Impact')" }}
                >
                  {cat.label.toUpperCase()}
                </h2>
                <p className="mt-2 text-sm text-white/80">{cat.description}</p>
                <span className="mt-6 text-xs tracking-widest border border-white/50 px-6 py-2 group-hover:bg-white group-hover:text-zinc-950 transition-colors duration-300">
                  SHOP NOW
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

