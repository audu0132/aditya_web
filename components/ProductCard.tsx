"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import WishlistButton from "./WishlistButton";

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);
  const { addToCart, toggleCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // default to first size & color
    addToCart({
      product,
      size: product.sizes[Math.floor(product.sizes.length / 2)],
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
      className="product-card group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-zinc-50 overflow-hidden">
        {/* main image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className={`product-img object-cover transition-opacity duration-500 ${hovered && product.images[1] ? "opacity-0" : "opacity-100"}`}
        />
        {/* hover image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={`product-img object-cover transition-opacity duration-500 absolute inset-0 ${hovered ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-2 py-1 ${
            product.badge === "Sale" ? "bg-red-500 text-white" :
            product.badge === "New" ? "bg-zinc-950 text-white" :
            "bg-amber-400 text-zinc-950"
          }`}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* Wishlist button */}
        <div className="absolute top-3 right-3">
          <WishlistButton productId={product.id} />
        </div>

        {/* Quick add */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
            hovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3 text-xs font-bold tracking-widest transition-colors ${
              quickAdded
                ? "bg-green-600 text-white"
                : "bg-zinc-950 text-white hover:bg-zinc-700"
            }`}
          >
            {quickAdded ? "✓ ADDED TO BAG" : "QUICK ADD"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 flex flex-col gap-1">
        {/* Color dots */}
        <div className="flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3 h-3 rounded-full border border-zinc-200"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <h3 className="text-sm font-semibold text-zinc-900 leading-tight group-hover:underline underline-offset-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-xs text-red-500 font-semibold">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
