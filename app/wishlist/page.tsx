"use client";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-10 border-b border-zinc-100 mb-10">
          <h1 className="text-4xl font-black tracking-tight">WISHLIST</h1>
          <p className="text-zinc-400 text-sm mt-1">{products.length} saved item{products.length !== 1 ? "s" : ""}</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🤍</div>
            <p className="text-xl font-semibold mb-2">Your wishlist is empty</p>
            <p className="text-zinc-400 text-sm mb-8">Tap the heart on any product to save it here.</p>
            <Link href="/shop" className="inline-block bg-zinc-950 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors">
              BROWSE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((p, i) => (
              <div key={p.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
