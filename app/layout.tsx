import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import AnnouncementBar from "@/components/AnnouncementBar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "STREETKRAFT — Premium T-Shirts", template: "%s | STREETKRAFT" },
  description:
    "Premium streetwear T-shirts for Gen-Z and young adults. Oversized, graphic, printed and minimal tees. Free shipping above ₹999.",
  keywords: ["t-shirt", "streetwear", "oversized tee", "graphic tee", "fashion"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "STREETKRAFT",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-950">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
