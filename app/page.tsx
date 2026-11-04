import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import RawThreadLogo from "@/components/brand/RawThreadLogo";
import RawThreadWelcomeAnimation from "@/components/brand/RawThreadWelcomeAnimation";
import RawThreadBrandShowcase from "@/components/brand/RawThreadBrandShowcase";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STREETKRAFT — Premium Streetwear T-Shirts",
  description: "Oversized, graphic, printed and minimal tees. 240 GSM heavy cotton. Free shipping above ₹999.",
};

export default function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.badge === "Best Seller").slice(0, 4);
  const oversizedPicks = PRODUCTS.filter((p) => p.category === "oversized").slice(0, 4);

  const categoryImages: Record<string, string> = {
    oversized: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    graphic: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    printed: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    minimal: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[660px] flex items-center overflow-hidden bg-zinc-950 pt-20 pb-16">
        {/* Cinematic Male Streetwear Model Background (Stored locally in public/images) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-mens-streetwear.jpg"
            alt="Men's Streetwear Fashion Campaign - Young male model in oversized black graphic T-shirt against dark concrete wall"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] sm:object-[75%_center] lg:object-[82%_center] filter grayscale contrast-115 brightness-95 animate-fade-in"
          />
          {/* Multi-layered cinematic gradient overlays:
              1. Deep dark gradient on the left for maximum text contrast
              2. Right side fades to transparent to let the male model pop cleanly
              3. Top and bottom vignettes blend with sticky navbar and scroll indicator */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent sm:via-zinc-950/75 lg:from-zinc-950 lg:via-zinc-950/65 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/75" />
          <div className="absolute inset-0 bg-black/20 sm:bg-transparent" />
        </div>

        {/* Content Container positioned to left / center */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start text-left">
          <div className="max-w-2xl">
            {/* SS26 Badge */}
            <div
              className="inline-flex items-center gap-2 border border-white/20 bg-zinc-950/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] text-zinc-300 mb-6 animate-fade-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SS26 STREETWEAR DROP · 16 NEW STYLES
            </div>

            {/* Headline */}
            <h1
              className="text-[clamp(2.9rem,8.5vw,7.2rem)] font-black leading-[0.92] tracking-tighter text-white animate-fade-up opacity-0"
              style={{
                animationDelay: "0.2s",
                animationFillMode: "forwards",
                fontFamily: "var(--font-display, 'Impact')",
              }}
            >
              WEAR YOUR<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                ATTITUDE.
              </span>
            </h1>

            {/* Product description */}
            <p
              className="mt-6 text-zinc-300 text-base sm:text-lg max-w-lg leading-relaxed animate-fade-up opacity-0 font-medium drop-shadow-sm"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              240 GSM heavy combed cotton. Boxy drop-shoulder silhouettes. Unapologetic streetwear designed to turn heads.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <Link
                href="/shop"
                data-cursor="view"
                className="bg-white text-zinc-950 px-9 py-4 text-xs font-black tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl"
              >
                SHOP ALL TEES ({PRODUCTS.length})
              </Link>
              <Link
                href="/collections"
                className="border border-white/70 text-white px-9 py-4 text-xs font-black tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                EXPLORE COLLECTIONS
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-white"
              style={{ height: "40%", animation: "fadeUp 1.5s ease infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ═══ TRUST TICKER ═════════════════════════════════════════════════ */}
      <section className="border-y border-zinc-200 bg-zinc-100/60 py-3 overflow-hidden">
        <div className="flex items-center justify-around gap-8 text-[11px] font-black tracking-widest uppercase text-zinc-600 px-4 max-w-7xl mx-auto flex-wrap">
          <span className="flex items-center gap-2">🔥 240 GSM Heavy Cotton</span>
          <span className="hidden sm:inline text-zinc-300">/</span>
          <span className="flex items-center gap-2">⚡ Free Shipping Over ₹999</span>
          <span className="hidden sm:inline text-zinc-300">/</span>
          <span className="flex items-center gap-2">🔄 15-Day Hassle-Free Returns</span>
          <span className="hidden sm:inline text-zinc-300">/</span>
          <span className="flex items-center gap-2">📍 Designed & Made In India</span>
        </div>
      </section>

      {/* ═══ CATEGORIES ═════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-zinc-400 mb-1">CURATED LINES</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">SHOP BY COLLECTION</h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-black tracking-widest hover:opacity-60 transition-opacity border-b border-zinc-950 pb-0.5"
          >
            VIEW ALL COLLECTIONS →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              data-cursor="view"
              className="group relative overflow-hidden aspect-[3/4] bg-zinc-900 animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <Image
                src={categoryImages[cat.id] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"}
                alt={cat.label}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-white text-center">
                <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase mb-1">
                  Collection
                </span>
                <h3
                  className="text-xl sm:text-2xl font-black tracking-widest"
                  style={{ fontFamily: "var(--font-display, 'Impact')" }}
                >
                  {cat.label.toUpperCase()}
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-[180px] line-clamp-1">
                  {cat.description}
                </p>
                <span className="mt-3 text-[10px] font-black tracking-widest border border-white/40 px-3 py-1 group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                  EXPLORE DROP
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED / NEW ARRIVALS ════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-zinc-950 text-white text-[10px] font-black tracking-widest uppercase mb-2">
              Just Dropped
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">NEW ARRIVALS</h2>
          </div>
          <Link
            href="/shop?sort=new"
            className="text-xs font-black tracking-widest hover:opacity-60 transition-opacity border-b border-zinc-950 pb-0.5"
          >
            VIEW ALL NEW ({PRODUCTS.filter((p) => p.badge === "New").length}) →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {newArrivals.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CAMPAIGN BANNER ════════════════════════════════════════════ */}
      <section className="bg-zinc-950 text-white py-28 px-4 my-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1920&q=80"
            alt="Streetwear texture"
            fill
            className="object-cover filter grayscale"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-black tracking-[0.5em] text-zinc-400 mb-4 uppercase">
            STREETWEAR MANIFESTO
          </p>
          <h2
            className="text-[clamp(2.2rem,7vw,6.5rem)] font-black leading-tight tracking-tight uppercase"
            style={{ fontFamily: "var(--font-display, 'Impact')" }}
          >
            BASICS ARE BORING.<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px white" }}>
              STAND OUT EVERYWHERE.
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-6 max-w-md mx-auto">
            Heavyweight luxury streetwear tailored for everyday grit. Engineered with custom washes and pre-shrunk cotton.
          </p>
          <Link
            href="/shop"
            data-cursor="view"
            className="inline-block mt-8 bg-white text-zinc-950 px-10 py-4 text-xs font-black tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl"
          >
            SHOP THE FULL COLLECTION ({PRODUCTS.length} TEES)
          </Link>
        </div>
      </section>

      {/* ═══ BEST SELLERS ════════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-amber-400 text-zinc-950 text-[10px] font-black tracking-widest uppercase mb-2">
              Most Wanted
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">BEST SELLERS</h2>
          </div>
          <Link
            href="/shop?badge=Best+Seller"
            className="text-xs font-black tracking-widest hover:opacity-60 transition-opacity border-b border-zinc-950 pb-0.5"
          >
            SHOP BEST SELLERS →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {bestSellers.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE OVERSIZED EDIT ═════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-zinc-400 mb-1">HEAVYWEIGHT CUTS</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">THE OVERSIZED EDIT</h2>
          </div>
          <Link
            href="/shop?category=oversized"
            className="text-xs font-black tracking-widest hover:opacity-60 transition-opacity border-b border-zinc-950 pb-0.5"
          >
            ALL OVERSIZED TEES →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {oversizedPicks.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER ═════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-black tracking-[0.4em] text-zinc-400 mb-3 uppercase">
            STAY IN THE STREET LOOP
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            EARLY ACCESS. SECRET DROPS.
          </h2>
          <p className="text-zinc-500 text-sm mb-8">
            Get 10% off your first demo order. Drop alerts straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════ */}
      <footer className="bg-zinc-950 text-white pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Demo disclaimer banner */}
          <div className="mb-12 p-4 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>
                <strong>DEMO SHOWCASE:</strong> This is a conceptual streetwear e-commerce platform. All products, mockups, and prices (₹) are sample demo content.
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">
              STREETKRAFT STUDIO
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <div
                className="text-2xl font-black tracking-widest mb-4"
                style={{ fontFamily: "var(--font-display, 'Impact')" }}
              >
                STREETKRAFT
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Independent streetwear label crafted for the digital generation. 240 GSM heavy cotton silhouettes built for longevity.
              </p>
            </div>
            {[
              {
                title: "Collections",
                links: [
                  { label: "Oversized Tees", href: "/shop?category=oversized" },
                  { label: "Graphic Streetwear", href: "/shop?category=graphic" },
                  { label: "Pattern Printed", href: "/shop?category=printed" },
                  { label: "Minimalist Essentials", href: "/shop?category=minimal" },
                ],
              },
              {
                title: "Support",
                links: [
                  { label: "Size & Fit Guide", href: "/about" },
                  { label: "Shipping Policy (₹999 Free)", href: "/about" },
                  { label: "Easy 15-Day Returns", href: "/about" },
                  { label: "Track Package", href: "/shop" },
                ],
              },
              {
                title: "Brand",
                links: [
                  { label: "Our Story", href: "/about" },
                  { label: "Fabric & GSM Guide", href: "/about" },
                  { label: "Sustainability", href: "/about" },
                  { label: "Contact Us", href: "/about" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-black tracking-widest mb-4 text-zinc-300">
                  {col.title.toUpperCase()}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-xs">
              © 2026 STREETKRAFT APPAREL. All rights reserved.
            </p>
            <p className="text-zinc-500 text-xs">
              Crafted in India · All prices in Indian Rupee (₹ INR)
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
