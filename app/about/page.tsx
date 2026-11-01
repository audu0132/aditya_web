import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About STREETKRAFT",
  description: "Our story — why we started STREETKRAFT and what we stand for.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="bg-zinc-950 text-white py-24 px-4 text-center mb-16">
        <p className="text-xs tracking-[0.5em] text-zinc-400 mb-4">OUR STORY</p>
        <h1
          className="text-5xl sm:text-7xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-display, 'Impact')" }}
        >
          MADE FOR THE<br />
          <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>STREETS.</span>
        </h1>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
        <div>
          <h2 className="text-2xl font-black mb-4">Why STREETKRAFT?</h2>
          <p className="text-zinc-600 leading-relaxed">
            STREETKRAFT was born out of a simple frustration: finding high-quality streetwear in India that didn't compromise on fit, fabric, or attitude. We set out to build a brand that Gen-Z and young adults could genuinely call their own — no watered-down designs, no fast-fashion compromises.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-4">What We Stand For</h2>
          <ul className="space-y-3 text-zinc-600">
            {[
              "Premium 200–240 GSM cotton on every piece",
              "Designs that spark conversations",
              "Fits built for real bodies, not mannequins",
              "Ethical, transparent manufacturing",
              "Priced fairly — quality streetwear shouldn't cost a fortune",
            ].map((p) => (
              <li key={p} className="flex gap-3">
                <span className="text-zinc-950 font-bold mt-0.5">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-zinc-950 pl-6 py-2">
          <p className="text-xl font-black italic">
            "Basics are boring. We make the everyday extraordinary."
          </p>
        </div>

        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-block bg-zinc-950 text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors"
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>
    </div>
  );
}

