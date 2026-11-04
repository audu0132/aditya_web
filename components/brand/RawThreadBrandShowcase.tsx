"use client";

import { useState } from "react";
import RawThreadLogo, {
  RawThreadConcept,
  RawThreadSize,
  RawThreadVariant,
} from "./RawThreadLogo";

export default function RawThreadBrandShowcase() {
  const [activeConcept, setActiveConcept] = useState<RawThreadConcept>("S");
  const [activeVariant, setActiveVariant] = useState<RawThreadVariant>("light");

  const sizes: RawThreadSize[] = ["sm", "md", "lg", "xl"];
  const concepts: { id: RawThreadConcept; label: string; desc: string }[] = [
    {
      id: "S",
      label: "Concept S (Sūtra Edition)",
      desc: "Sacred Indic thread geometry, Devanagari scripture, and Kesari saffron accent.",
    },
    {
      id: "minimal",
      label: "Concept Minimal",
      desc: "Clean circular monogram with horizontal fiber line.",
    },
    {
      id: "streetwear",
      label: "Concept Streetwear",
      desc: "Heavyweight boxy industrial stencil framing.",
    },
    {
      id: "monochrome",
      label: "Concept Monochrome",
      desc: "High-contrast pure black and white edition.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white border-t border-zinc-900 relative overflow-hidden">
      {/* Background Saffron Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Official Brand Identity
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
              RAW THREAD BRAND SHOWCASE
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Sanskriti Indic Sūtra Edition — Merging sacred traditional Indic fiber
              heritage with contemporary Gen-Z luxury streetwear.
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 uppercase font-mono mr-1">
              Variant:
            </span>
            {(["light", "dark", "monochrome"] as RawThreadVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeVariant === v
                    ? "bg-orange-500 text-zinc-950 font-bold"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Concept Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {concepts.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConcept(c.id)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                activeConcept === c.id
                  ? "bg-zinc-900/90 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                  : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-white">{c.label}</span>
                {c.id === "S" && (
                  <span className="text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
                    DEFAULT
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{c.desc}</p>
            </button>
          ))}
        </div>

        {/* Dynamic Display Canvas (Sizes sm, md, lg, xl across active variant) */}
        <div
          className={`rounded-2xl p-8 sm:p-12 border transition-all ${
            activeVariant === "dark"
              ? "bg-white text-zinc-950 border-zinc-200 shadow-xl"
              : "bg-zinc-900/80 text-white border-zinc-800 shadow-2xl"
          }`}
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-8 text-zinc-400 pb-4 border-b border-zinc-800/20">
            Previewing: {activeConcept === "S" ? "Concept S (Sūtra Edition)" : `Concept ${activeConcept}`} · Variant: {activeVariant}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Primary Hero Scale (Size XL / LG) */}
            <div className="flex flex-col gap-6 justify-center">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Size: XL (Editorial Showcase)
                </span>
                <RawThreadLogo
                  size="xl"
                  concept={activeConcept}
                  variant={activeVariant}
                />
              </div>

              <div className="pt-6 border-t border-zinc-800/20">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Size: LG (Brand Presentation)
                </span>
                <RawThreadLogo
                  size="lg"
                  concept={activeConcept}
                  variant={activeVariant}
                />
              </div>
            </div>

            {/* Secondary Scales (Size MD & SM) */}
            <div className="flex flex-col gap-6 justify-center lg:border-l lg:border-zinc-800/20 lg:pl-10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Size: MD (Standard Display)
                </span>
                <RawThreadLogo
                  size="md"
                  concept={activeConcept}
                  variant={activeVariant}
                />
              </div>

              <div className="pt-6 border-t border-zinc-800/20">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Size: SM (Navbar & Mobile Header)
                </span>
                <RawThreadLogo
                  size="sm"
                  concept={activeConcept}
                  variant={activeVariant}
                />
              </div>

              {/* Icon Only Preview */}
              <div className="pt-6 border-t border-zinc-800/20 flex items-center gap-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-2">
                    Icon Only (App / Avatar)
                  </span>
                  <div className="flex items-center gap-4">
                    <RawThreadLogo
                      size="sm"
                      concept={activeConcept}
                      variant={activeVariant}
                      iconOnly
                    />
                    <RawThreadLogo
                      size="md"
                      concept={activeConcept}
                      variant={activeVariant}
                      iconOnly
                    />
                    <RawThreadLogo
                      size="lg"
                      concept={activeConcept}
                      variant={activeVariant}
                      iconOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
