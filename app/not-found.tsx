import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 text-center px-4">
      <p
        className="text-[8rem] font-black leading-none tracking-tighter text-zinc-100"
        style={{ fontFamily: "var(--font-display, 'Impact')" }}
        aria-hidden
      >
        404
      </p>
      <h1 className="text-3xl font-black tracking-tight -mt-4 mb-3">PAGE NOT FOUND</h1>
      <p className="text-zinc-500 text-sm mb-10 max-w-xs mx-auto">
        This page got lost in the streets. Let's get you back on track.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="bg-zinc-950 text-white px-8 py-3 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors">
          GO HOME
        </Link>
        <Link href="/shop" className="border border-zinc-200 px-8 py-3 text-sm font-bold tracking-widest hover:bg-zinc-50 transition-colors">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}

