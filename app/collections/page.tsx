import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections — STREETKRAFT",
  description: "Browse our T-shirt collections — oversized, graphic, printed and minimal streetwear.",
};

const collectionImages: Record<string, string> = {
  oversized: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85",
  graphic: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85",
  printed: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85",
  minimal: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
};

export default function CollectionsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 border-b border-zinc-100 mb-12 text-center">
          <p className="text-xs font-black tracking-[0.4em] text-zinc-400 mb-2 uppercase">
            STREETWEAR ARCHIVE
          </p>
          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Impact')" }}
          >
            ALL COLLECTIONS
          </h1>
          <p className="text-zinc-500 text-sm mt-3 max-w-md mx-auto">
            From 240 GSM heavy boxy cuts to subversive graphics and minimal luxury basics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              data-cursor="view"
              className="group relative aspect-[16/10] sm:aspect-square overflow-hidden bg-zinc-900 animate-fade-up opacity-0 shadow-lg"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <Image
                src={collectionImages[cat.id]}
                alt={cat.label}
                fill
                sizes="(max-width:640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <span className="text-[10px] font-black tracking-widest uppercase text-zinc-300 mb-2">
                  Line {i + 1}
                </span>
                <h2
                  className="text-4xl sm:text-6xl font-black tracking-widest group-hover:scale-105 transition-transform duration-300"
                  style={{ fontFamily: "var(--font-display, 'Impact')" }}
                >
                  {cat.label.toUpperCase()}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xs">{cat.description}</p>
                <span className="mt-6 text-xs font-black tracking-widest border border-white/60 px-6 py-2.5 group-hover:bg-white group-hover:text-zinc-950 transition-colors duration-300">
                  SHOP LINE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
