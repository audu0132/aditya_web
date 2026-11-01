"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import MobileNav from "./MobileNav";

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 40), []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const navLinks = [
    { href: "/shop",          label: "Shop" },
    { href: "/shop?sort=new", label: "New Arrivals" },
    { href: "/shop?badge=Best+Seller", label: "Best Sellers" },
    { href: "/collections",   label: "Collections" },
    { href: "/about",         label: "About" },
  ];

  return (
    <>
      <header
        className={`fixed top-8 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-widest text-zinc-950 hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-display, 'Impact')" }}
          >
            STREETKRAFT
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium tracking-wide text-zinc-700 hover:text-zinc-950 transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-zinc-950 group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Link href="/search" aria-label="Search" className="hidden sm:flex p-2 hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" aria-label={`Wishlist (${wishCount})`} className="hidden sm:flex relative p-2 hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishCount > 0 && (
                <span className="absolute top-1 right-1 bg-zinc-950 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => toggleCart(true)}
              aria-label={`Shopping bag (${totalItems} items)`}
              className="relative p-2 hover:opacity-60 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-zinc-950 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden p-2 hover:opacity-60 transition-opacity"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav links={navLinks} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

