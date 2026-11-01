"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, Size, Color } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import WishlistButton from "@/components/WishlistButton";
import ProductCard from "@/components/ProductCard";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSize]   = useState<Size | null>(null);
  const [selectedColor, setColor] = useState<Color>(product.colors[0]);
  const [qty, setQty]             = useState(1);
  const [error, setError]         = useState("");
  const [added, setAdded]         = useState(false);

  const { addToCart, toggleCart } = useCart();

  const handleAdd = () => {
    if (!selectedSize) { setError("Please select a size"); return; }
    setError("");
    addToCart({ product, size: selectedSize, color: selectedColor, qty });
    setAdded(true);
    toggleCart(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-zinc-400">
        <Link href="/" className="hover:text-zinc-950 transition-colors">Home</Link>
        {" / "}
        <Link href="/shop" className="hover:text-zinc-950 transition-colors">Shop</Link>
        {" / "}
        <span className="text-zinc-950">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* ── LEFT: Gallery ── */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square bg-zinc-100 overflow-hidden border-2 transition-colors ${activeImg === i ? "border-zinc-950" : "border-transparent hover:border-zinc-300"}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="relative flex-1 aspect-[3/4] bg-zinc-50 overflow-hidden group">
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />

              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-bold tracking-widest px-2 py-1 ${
                  product.badge === "Sale" ? "bg-red-500 text-white" :
                  product.badge === "New" ? "bg-zinc-950 text-white" :
                  "bg-amber-400 text-zinc-950"
                }`}>
                  {product.badge.toUpperCase()}
                </span>
              )}

              {/* Wishlist */}
              <div className="absolute top-4 right-4">
                <WishlistButton productId={product.id} />
              </div>

              {/* Mobile thumbnails */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${activeImg === i ? "bg-zinc-950" : "bg-zinc-400"}`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="flex flex-col gap-5 lg:pt-4">
            <div>
              <p className="text-xs tracking-widest text-zinc-400 uppercase mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-zinc-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  <span className="text-sm font-bold text-red-500">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Color */}
            <div>
              <p className="text-xs font-bold tracking-widest mb-2">
                COLOR: <span className="font-normal">{selectedColor.name}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.name === c.name ? "border-zinc-950 scale-110" : "border-zinc-200 hover:border-zinc-400"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={`Select color ${c.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold tracking-widest">SIZE</p>
                <button className="text-xs underline text-zinc-500 hover:text-zinc-950 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setError(""); }}
                    className={`min-w-[44px] py-2 px-3 text-sm font-medium border transition-colors ${
                      selectedSize === s
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-200 hover:border-zinc-950"
                    }`}
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-red-500 mt-2" role="alert">{error}</p>}
            </div>

            {/* Qty */}
            <div>
              <p className="text-xs font-bold tracking-widest mb-2">QUANTITY</p>
              <div className="flex items-center border border-zinc-200 w-fit">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-zinc-50 transition-colors"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-zinc-50 transition-colors"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 text-sm font-bold tracking-widest transition-colors ${
                  added ? "bg-green-600 text-white" : "bg-zinc-950 text-white hover:bg-zinc-800"
                }`}
              >
                {added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
              </button>
              <Link
                href="/checkout"
                onClick={() => { if (selectedSize) addToCart({ product, size: selectedSize, color: selectedColor, qty }); }}
                className="flex-1 py-4 text-sm font-bold tracking-widest text-center border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors"
              >
                BUY NOW
              </Link>
            </div>

            {/* Info boxes */}
            <div className="border-t border-zinc-100 pt-5 space-y-3 text-sm text-zinc-600">
              <details className="group">
                <summary className="font-semibold text-zinc-900 cursor-pointer list-none flex justify-between items-center hover:opacity-70 transition-opacity">
                  Product Details
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-2 text-sm leading-relaxed text-zinc-600 space-y-1">
                  <p>{product.description}</p>
                  <p className="font-medium text-zinc-900 mt-2">Material:</p>
                  <p>{product.material}</p>
                  <p className="font-medium text-zinc-900 mt-2">Fit:</p>
                  <p>{product.fit}</p>
                </div>
              </details>

              <details className="group">
                <summary className="font-semibold text-zinc-900 cursor-pointer list-none flex justify-between items-center hover:opacity-70 transition-opacity">
                  Care Instructions
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed">{product.care}</p>
              </details>

              <details className="group">
                <summary className="font-semibold text-zinc-900 cursor-pointer list-none flex justify-between items-center hover:opacity-70 transition-opacity">
                  Shipping & Returns
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-2 text-sm leading-relaxed space-y-1">
                  <p>✓ Free shipping on orders above ₹999</p>
                  <p>✓ Delivered within 5–7 business days</p>
                  <p>✓ Easy 15-day returns on unworn, unwashed items</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-black tracking-tight mb-8">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

