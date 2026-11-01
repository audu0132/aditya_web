"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeFromCart, updateQty, subtotal, totalItems } = useCart();

  // lock scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={() => toggleCart(false)} aria-hidden />
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white flex flex-col shadow-2xl"
        style={{ animation: "slideInRight 0.35s cubic-bezier(0.32,0,0.67,0) forwards" }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <h2 className="text-lg font-bold tracking-wide">
            BAG{" "}
            <span className="text-zinc-400 font-normal text-sm">({totalItems})</span>
          </h2>
          <button onClick={() => toggleCart(false)} aria-label="Close bag" className="p-2 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-zinc-300">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="text-zinc-500 text-sm">Your bag is empty.</p>
              <button
                onClick={() => toggleCart(false)}
                className="mt-2 text-sm font-semibold underline underline-offset-2 hover:opacity-60 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color.name}`} className="flex gap-4 animate-fade-in">
                {/* image */}
                <div className="relative w-20 h-24 flex-shrink-0 bg-zinc-50 rounded overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                {/* details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate">{item.product.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {item.color.name} · {item.size}
                  </p>
                  <p className="text-sm font-bold mt-1">₹{(item.product.price * item.qty).toLocaleString("en-IN")}</p>

                  {/* qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.color.name, item.qty - 1)}
                      className="w-7 h-7 border border-zinc-200 rounded flex items-center justify-center text-lg leading-none hover:bg-zinc-50 transition-colors"
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.color.name, item.qty + 1)}
                      className="w-7 h-7 border border-zinc-200 rounded flex items-center justify-center text-lg leading-none hover:bg-zinc-50 transition-colors"
                      aria-label="Increase quantity"
                    >+</button>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size, item.color.name)}
                      className="ml-auto text-xs text-zinc-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-zinc-100 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-bold text-base">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {subtotal < 999 && (
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded">
                Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for free shipping.
              </p>
            )}
            <Link
              href="/checkout"
              onClick={() => toggleCart(false)}
              className="block w-full bg-zinc-950 text-white text-center py-4 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors"
            >
              CHECKOUT
            </Link>
            <button
              onClick={() => toggleCart(false)}
              className="block w-full text-center text-sm text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

