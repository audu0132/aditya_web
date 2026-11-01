"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import WishlistButton from "./WishlistButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);
  const { addToCart, toggleCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      size: product.sizes[Math.floor(product.sizes.length / 2)] || "M",
      color: product.colors[0],
      qty: 1,
    });
    setQuickAdded(true);
    toggleCart(true);
    setTimeout(() => setQuickAdded(false), 1500);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      data-cursor="view"
      className="product-card group relative flex flex-col cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
        {/* Main image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className={`product-img object-cover transition-opacity duration-500 ease-out ${
            hovered && product.images[1] ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Hover / alternate view image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={`product-img object-cover transition-opacity duration-500 ease-out absolute inset-0 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Subtle hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-black tracking-widest px-2.5 py-1 z-10 ${
              product.badge === "Sale"
                ? "bg-red-600 text-white"
                : product.badge === "New"
                ? "bg-zinc-950 text-white border border-white/20"
                : "bg-amber-400 text-zinc-950"
            }`}
          >
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* Fit tag */}
        <span className="absolute bottom-3 left-3 text-[9px] font-bold tracking-widest px-2 py-0.5 bg-black/60 backdrop-blur-sm text-zinc-200 uppercase z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          {product.fit}
        </span>

        {/* Wishlist button */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton productId={product.id} />
        </div>

        {/* Quick add action banner */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 transition-transform duration-300 ease-out ${
            hovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3 text-xs font-black tracking-widest transition-colors ${
              quickAdded
                ? "bg-emerald-600 text-white"
                : "bg-zinc-950 text-white hover:bg-zinc-800 border-t border-white/10"
            }`}
          >
            {quickAdded ? "✓ ADDED TO BAG" : "+ QUICK ADD"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 flex flex-col gap-1.5">
        {/* Color dots */}
        <div className="flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-2.5 h-2.5 rounded-full border border-zinc-300"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider ml-1">
            {product.colors.length} {product.colors.length === 1 ? "color" : "colors"}
          </span>
        </div>

        <h3 className="text-sm font-bold text-zinc-900 leading-snug group-hover:underline underline-offset-4 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-black text-zinc-950">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[11px] text-red-600 font-bold">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
