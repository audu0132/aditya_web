"use client";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ productId }: { productId: string }) {
  const { toggle, isWishlisted } = useWishlist();
  const active = isWishlisted(productId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); toggle(productId); }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
    >
      <svg
        width="16" height="16"
        viewBox="0 0 24 24"
        fill={active ? "#ef4444" : "none"}
        stroke={active ? "#ef4444" : "currentColor"}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

