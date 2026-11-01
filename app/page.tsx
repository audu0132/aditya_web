import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STREETKRAFT — Premium T-Shirts for Gen-Z",
  description: "Oversized, graphic, printed and minimal tees. Free shipping above ₹999.",
};

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((p) => p.badge === "Best Seller" || p.badge === "New").slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-950">
        {/* Background placeholder — replace with real campaign image */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p
            className="text-xs sm:text-sm tracking-[0.4em] text-zinc-400 mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            STREETWEAR ESSENTIALS · SS 2025
          </p>
          <h1
            className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.9] tracking-tighter text-white animate-fade-up opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards", fontFamily: "var(--font-display, 'Impact')" }}
          >
            WEAR YOUR<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>ATTITUDE.</span>
          </h1>
          <p
            className="mt-6 text-zinc-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed animate-fade-up opacity-0"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            Everyday essentials. Unapologetic streetwear. Made to stand out.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <Link
              href="/shop"
              className="bg-white text-zinc-950 px-10 py-4 text-sm font-bold tracking-widest hover:bg-zinc-100 transition-colors"
            >
              SHOP NOW
            </Link>
            <Link
              href="/collections"
              className="border border-white text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-white/10 transition-colors"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <span className="text-[10px] tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-white/60" style={{ height: "40%", animation: "fadeUp 1.5s ease infinite" }} />
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight animate-fade-up opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            SHOP BY COLLECTION
          </h2>
          <p className="text-zinc-500 mt-2 text-sm tracking-wide">Find your fit, find your vibe</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className={`group relative overflow-hidden aspect-[3/4] bg-zinc-100 animate-fade-up opacity-0`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* placeholder bg color */}
              <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${
                i === 0 ? "bg-zinc-200" : i === 1 ? "bg-stone-200" : i === 2 ? "bg-slate-200" : "bg-neutral-200"
              }`} />
              <div className="absolute inset-0 bg-zinc-950/30 group-hover:bg-zinc-950/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-white">
                <h3 className="text-lg sm:text-xl font-black tracking-widest">{cat.label.toUpperCase()}</h3>
                <p className="text-xs text-white/70 mt-1">{cat.description}</p>
                <span className="mt-3 text-xs tracking-widest border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                  EXPLORE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED / NEW ARRIVALS ════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest text-zinc-400 mb-1">JUST DROPPED</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">NEW ARRIVALS</h2>
          </div>
          <Link href="/shop?sort=new" className="text-sm font-semibold tracking-wide hover:opacity-60 transition-opacity">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CAMPAIGN BANNER ════════════════════════════════════════════ */}
      <section className="bg-zinc-950 text-white py-24 px-4 my-4 text-center">
        <p className="text-xs tracking-[0.5em] text-zinc-400 mb-4">THE PHILOSOPHY</p>
        <h2
          className="text-[clamp(2rem,7vw,6rem)] font-black leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-display, 'Impact')" }}
        >
          BASICS ARE BORING.<br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>STAND OUT.</span>
        </h2>
        <Link
          href="/shop"
          className="inline-block mt-10 border border-white/50 text-white px-10 py-4 text-xs font-bold tracking-widest hover:bg-white hover:text-zinc-950 transition-colors"
        >
          SHOP THE COLLECTION
        </Link>
      </section>

      {/* ═══ BEST SELLERS ════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest text-zinc-400 mb-1">FAN FAVOURITES</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">BEST SELLERS</h2>
          </div>
          <Link href="/shop?badge=Best+Seller" className="text-sm font-semibold tracking-wide hover:opacity-60 transition-opacity">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {PRODUCTS.slice(2, 6).map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER ═════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-zinc-400 mb-3">STAY IN THE LOOP</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">EARLY ACCESS. DROPS. DEALS.</h2>
          <p className="text-zinc-500 text-sm mb-8">No spam, just the good stuff. Unsubscribe anytime.</p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! You're on the list."); }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-zinc-950 transition-colors"
            />
            <button
              type="submit"
              className="bg-zinc-950 text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════ */}
      <footer className="bg-zinc-950 text-white pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <div
                className="text-2xl font-black tracking-widest mb-4"
                style={{ fontFamily: "var(--font-display, 'Impact')" }}
              >
                STREETKRAFT
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Premium streetwear for those who refuse to blend in.
              </p>
            </div>
            {[
              { title: "Shop", links: ["All Products", "New Arrivals", "Best Sellers", "Collections"] },
              { title: "Help", links: ["Size Guide", "Shipping & Returns", "Track Order", "FAQs"] },
              { title: "About", links: ["Our Story", "Sustainability", "Careers", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold tracking-widest mb-4 text-zinc-300">{col.title.toUpperCase()}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="/shop" className="text-xs text-zinc-400 hover:text-white transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-xs">© 2025 STREETKRAFT. All rights reserved.</p>
            <p className="text-zinc-500 text-xs">Made with ❤️ in India · Prices in ₹ INR</p>
          </div>
        </div>
      </footer>
    </>
  );
}
