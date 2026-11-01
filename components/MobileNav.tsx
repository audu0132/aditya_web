"use client";
import Link from "next/link";
import { useEffect } from "react";

interface MobileNavProps {
  links: { href: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ links, isOpen, onClose }: MobileNavProps) {
  // lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div className="drawer-backdrop" onClick={onClose} aria-hidden />

      {/* panel */}
      <div
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white flex flex-col shadow-2xl"
        style={{ animation: "slideInLeft 0.3s cubic-bezier(0.32,0,0.67,0) forwards" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100">
          <span
            className="text-xl font-black tracking-widest"
            style={{ fontFamily: "var(--font-display, 'Impact')" }}
          >
            STREETKRAFT
          </span>
          <button onClick={onClose} aria-label="Close menu" className="p-2 hover:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="text-2xl font-bold tracking-tight text-zinc-950 hover:opacity-60 transition-opacity animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "forwards" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* footer */}
        <div className="px-6 py-6 border-t border-zinc-100 flex gap-4">
          <Link href="/search" onClick={onClose} className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors">Search</Link>
          <Link href="/wishlist" onClick={onClose} className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors">Wishlist</Link>
        </div>
      </div>
    </>
  );
}
