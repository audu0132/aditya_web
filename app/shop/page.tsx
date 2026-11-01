import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop All T-Shirts",
  description: "Browse our full collection of premium streetwear T-shirts. Filter by size, fit, price, and category.",
};

export default function ShopPage() {
  return (
    <div className="pt-24">
      <Suspense fallback={<div className="py-24 text-center text-zinc-400 text-sm">Loading products…</div>}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
