"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StreetwearMascot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Entrance delay for a natural entrance after initial page load
    const timer = setTimeout(() => {
      setMounted(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <aside
      aria-label="Brand Assistant"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 flex flex-col items-end select-none"
    >
      {/* ── Welcome Speech Card / Dialog ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Welcome message"
          className="mb-3 w-[290px] sm:w-[320px] bg-zinc-950 text-white rounded-xl shadow-2xl p-4 border border-zinc-800 animate-scale-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-black tracking-widest text-zinc-300 uppercase">
                STREETKRAFT BOT
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close message"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="space-y-2 text-xs leading-relaxed text-zinc-300">
            <p className="font-black text-sm text-white tracking-wide">
              HEY! WELCOME TO THE DROP 🔥
            </p>
            <p>
              Check out our new SS26 lineup featuring <strong>240 GSM heavy combed cotton</strong> and signature boxy cuts.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded text-[11px] flex items-center justify-between">
              <span className="text-zinc-400">Promo Code:</span>
              <span className="font-mono font-black text-amber-400 tracking-wider">
                STREET10
              </span>
            </div>
          </div>

          {/* Action links */}
          <div className="mt-3.5 pt-2.5 border-t border-zinc-800 flex items-center justify-between gap-2">
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-white text-zinc-950 text-center py-2 text-[11px] font-black tracking-widest hover:bg-zinc-200 transition-colors rounded"
            >
              SHOP TEES →
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[11px] text-zinc-400 hover:text-white px-3 py-2 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ── Mascot Character Avatar Button ── */}
      <div className="relative group">
        {/* Floating tooltip hint (shows before first interaction) */}
        {!isOpen && !hasInteracted && (
          <div className="absolute -top-8 right-0 bg-zinc-900 text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full shadow-lg border border-zinc-700 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            DROP ALERT 👋
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          aria-label="Open Streetwear Mascot assistant"
          className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 cursor-pointer"
        >
          {/* Animated floating character container */}
          <div className="animate-mascot-float transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
            <svg
              width="60"
              height="60"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
            >
              {/* Outer Glow / Halo */}
              <circle cx="40" cy="40" r="38" fill="#09090b" stroke="#27272a" strokeWidth="2" />

              {/* Ears (Streetwear vinyl character) */}
              <circle cx="24" cy="22" r="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
              <circle cx="24" cy="22" r="5" fill="#e11d48" opacity="0.8" />
              <circle cx="56" cy="22" r="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
              <circle cx="56" cy="22" r="5" fill="#e11d48" opacity="0.8" />

              {/* Bucket Hat Crown */}
              <path
                d="M20 28 C20 18, 60 18, 60 28 L64 34 L16 34 Z"
                fill="#000000"
                stroke="#52525b"
                strokeWidth="1.5"
              />
              {/* Hat Monogram / Badge */}
              <rect x="33" y="22" width="14" height="8" rx="2" fill="#ffffff" />
              <text
                x="40"
                y="28"
                textAnchor="middle"
                fontSize="6"
                fontWeight="900"
                fontFamily="Impact, sans-serif"
                fill="#09090b"
                letterSpacing="0.5"
              >
                SK
              </text>

              {/* Hat Brim */}
              <ellipse cx="40" cy="34" rx="26" ry="5" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />

              {/* Face Base */}
              <circle cx="40" cy="45" r="18" fill="#27272a" />

              {/* Cyber Sunglasses / Visor */}
              <g className="animate-mascot-blink">
                <rect x="24" y="38" width="32" height="13" rx="4" fill="#09090b" stroke="#71717a" strokeWidth="1.5" />
                {/* Iridescent / Cyber visor reflection lines */}
                <line x1="28" y1="41" x2="42" y2="41" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="46" y1="41" x2="52" y2="41" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="30" y1="44" x2="38" y2="44" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
              </g>

              {/* Cute Streetwear Snout & Smirk */}
              <ellipse cx="40" cy="54" rx="3.5" ry="2" fill="#52525b" />
              <path d="M37 57 Q40 59 43 57" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Streetwear Hoodie Collar */}
              <path
                d="M24 62 Q40 58 56 62 L60 74 Q40 76 20 74 Z"
                fill="#09090b"
                stroke="#3f3f46"
                strokeWidth="1.5"
              />
              {/* Hoodie drawstrings */}
              <line x1="34" y1="64" x2="33" y2="72" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="46" y1="64" x2="47" y2="72" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Floating ground shadow */}
          <div className="w-10 h-1.5 bg-zinc-950/40 rounded-full mx-auto mt-1 animate-mascot-shadow blur-[1px]" />
        </button>
      </div>
    </aside>
  );
}
