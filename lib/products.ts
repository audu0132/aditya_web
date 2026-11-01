// ─── Product catalog ──────────────────────────────────────────────────────────
// Replace placeholder image URLs with your own real product photography.
// All prices are in INR (₹).

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type Color = { name: string; hex: string };

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "oversized" | "graphic" | "printed" | "minimal";
  price: number;
  originalPrice?: number;
  images: string[];         // first = main, second = hover
  colors: Color[];
  sizes: Size[];
  badge?: "New" | "Best Seller" | "Sale";
  description: string;
  material: string;
  care: string;
  fit: "Oversized" | "Regular" | "Slim";
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "ts-001",
    name: "Acid Wash Oversized Tee",
    slug: "acid-wash-oversized-tee",
    category: "oversized",
    price: 1299,
    originalPrice: 1799,
    images: [
      "https://placehold.co/800x1067/2a2a2a/ffffff?text=ACID+WASH",
      "https://placehold.co/800x1067/3f3f46/ffffff?text=ACID+WASH+2",
    ],
    colors: [
      { name: "Washed Black", hex: "#2a2a2a" },
      { name: "Washed Grey", hex: "#9ca3af" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Sale",
    description:
      "Street-ready acid wash tee with a boxy silhouette. Drop shoulders, raw hem finish, and heavy 240 GSM cotton for that premium feel.",
    material: "100% Cotton, 240 GSM",
    care: "Machine wash cold, inside out. Do not bleach. Tumble dry low.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-002",
    name: "Urban Phantom Graphic Tee",
    slug: "urban-phantom-graphic-tee",
    category: "graphic",
    price: 1499,
    images: [
      "https://placehold.co/800x1067/0a0a0a/ffffff?text=PHANTOM",
      "https://placehold.co/800x1067/f5f5f0/0a0a0a?text=PHANTOM+2",
    ],
    colors: [
      { name: "Jet Black", hex: "#0a0a0a" },
      { name: "Off White", hex: "#f5f5f0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description:
      "Bold front graphic print with a statement back design. Regular fit with a crew neck.",
    material: "100% Cotton, 220 GSM",
    care: "Machine wash cold. Do not tumble dry.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-003",
    name: "Void Minimal Tee",
    slug: "void-minimal-tee",
    category: "minimal",
    price: 999,
    images: [
      "https://placehold.co/800x1067/fafafa/0a0a0a?text=VOID",
      "https://placehold.co/800x1067/64748b/ffffff?text=VOID+2",
    ],
    colors: [
      { name: "Chalk White", hex: "#fafafa" },
      { name: "Slate", hex: "#64748b" },
      { name: "Obsidian", hex: "#1e1e1e" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    description:
      "Less is more. A clean chest logo, premium cotton, and the perfect everyday fit.",
    material: "100% Combed Cotton, 200 GSM",
    care: "Machine wash cold. Lay flat to dry.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-004",
    name: "Streetcode Printed Tee",
    slug: "streetcode-printed-tee",
    category: "printed",
    price: 1399,
    images: [
      "/images/products/streetcode-1.jpg",
      "/images/products/streetcode-2.jpg",
    ],
    colors: [
      { name: "Rust", hex: "#c2410c" },
      { name: "Midnight", hex: "#1e3a5f" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "All-over print with urban typography. A conversation starter.",
    material: "100% Cotton, 220 GSM",
    care: "Hand wash recommended. Wash inside out.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-005",
    name: "Drop Shoulder Boxy Tee",
    slug: "drop-shoulder-boxy-tee",
    category: "oversized",
    price: 1199,
    originalPrice: 1499,
    images: [
      "/images/products/boxy-1.jpg",
      "/images/products/boxy-2.jpg",
    ],
    colors: [
      { name: "Sand", hex: "#d4c5a9" },
      { name: "Charcoal", hex: "#3f3f46" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Sale",
    description:
      "A true wardrobe essential. Drop shoulders, boxy fit, and a relaxed hem.",
    material: "100% Cotton, 230 GSM",
    care: "Machine wash cold, inside out.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-006",
    name: "Arch Logo Tee",
    slug: "arch-logo-tee",
    category: "graphic",
    price: 1099,
    images: [
      "/images/products/arch-1.jpg",
      "/images/products/arch-2.jpg",
    ],
    colors: [
      { name: "Forest Green", hex: "#166534" },
      { name: "Cream", hex: "#fefce8" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description:
      "Arched text logo across the chest. Clean, bold, effortless.",
    material: "100% Cotton, 200 GSM",
    care: "Machine wash cold.",
    fit: "Regular",
    inStock: true,
  },
];

export const CATEGORIES = [
  { id: "oversized", label: "Oversized", description: "Boxy & relaxed fits" },
  { id: "graphic",   label: "Graphic",   description: "Bold print statements" },
  { id: "printed",   label: "Printed",   description: "All-over & custom prints" },
  { id: "minimal",   label: "Minimal",   description: "Clean, everyday essentials" },
] as const;
