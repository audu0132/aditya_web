// ─── Product catalog ──────────────────────────────────────────────────────────
// Streetwear collection featuring oversized, graphic, printed and minimal styles.
// All images feature streetwear models and clean mockups with front/hover views.
// All prices are sample demo prices in INR (₹).

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type Color = { name: string; hex: string };

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "oversized" | "graphic" | "printed" | "minimal";
  price: number;
  originalPrice?: number;
  images: string[]; // first = main model/front, second = back/hover view
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
    name: "Acid Wash Oversized Heavy Tee",
    slug: "acid-wash-oversized-heavy-tee",
    category: "oversized",
    price: 1299,
    originalPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Washed Black", hex: "#262626" },
      { name: "Washed Charcoal", hex: "#404040" },
      { name: "Ash Grey", hex: "#9ca3af" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Sale",
    description:
      "Street-ready vintage mineral acid wash tee with a signature boxy silhouette. Drop shoulders, reinforced raw neck collar, and heavy 240 GSM organic combed cotton.",
    material: "100% Combed Heavy Cotton, 240 GSM",
    care: "Machine wash cold inside out. Tumble dry low. Do not iron directly on wash texture.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-002",
    name: "Urban Phantom Cyber Graphic Tee",
    slug: "urban-phantom-cyber-graphic-tee",
    category: "graphic",
    price: 1499,
    originalPrice: 1999,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Jet Black", hex: "#0a0a0a" },
      { name: "Vintage White", hex: "#f5f5f0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Best Seller",
    description:
      "High-density screen print featuring cybernetic iconography and dystopian typography across chest and full spine back print.",
    material: "100% Ring-Spun Cotton, 220 GSM",
    care: "Machine wash gentle cycle cold. Do not tumble dry. Do not iron decoration.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-003",
    name: "Void Core Minimalist Tee",
    slug: "void-core-minimalist-tee",
    category: "minimal",
    price: 999,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Chalk White", hex: "#fafafa" },
      { name: "Jet Black", hex: "#121212" },
      { name: "Slate Grey", hex: "#64748b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    description:
      "Precision cut luxury minimal essential. Tonal micro silicone brand badge on lower hem. Built for effortless layering.",
    material: "100% Long-Staple Cotton, 210 GSM",
    care: "Machine wash cold with like colors. Hang dry in shade.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-004",
    name: "Tokyo Drift Kanji Graphic Tee",
    slug: "tokyo-drift-kanji-graphic-tee",
    category: "graphic",
    price: 1399,
    images: [
      "https://images.unsplash.com/photo-1622445268046-630d7aa44342?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Obsidian Black", hex: "#171717" },
      { name: "Cream White", hex: "#fef3c7" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    description:
      "Underground Tokyo car culture inspired graphic with stylized kanji and high-vis metallic accents.",
    material: "100% Cotton, 230 GSM",
    care: "Machine wash cold inside out. Flat dry.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-005",
    name: "Streetcode All-Over Monogram Tee",
    slug: "streetcode-all-over-monogram-tee",
    category: "printed",
    price: 1599,
    originalPrice: 2199,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Earth Rust", hex: "#c2410c" },
      { name: "Deep Navy", hex: "#1e3a5f" },
    ],
    sizes: ["S", "M", "L", "XL"],
    badge: "Sale",
    description:
      "Engineered all-over geometric monogram jacquard weave. Soft-touch breathable finish with ribbed crewneck.",
    material: "100% Breathable Jacquard Cotton, 220 GSM",
    care: "Hand wash or gentle cold cycle. Do not wring.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-006",
    name: "Drop Shoulder Boxy Raw Tee",
    slug: "drop-shoulder-boxy-raw-tee",
    category: "oversized",
    price: 1199,
    originalPrice: 1599,
    images: [
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Desert Sand", hex: "#d4c5a9" },
      { name: "Dark Charcoal", hex: "#3f3f46" },
      { name: "Olive Drab", hex: "#4d533c" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    description:
      "Wide boxy drape with extra wide sleeve openings and blind stitch hem. The ultimate streetwear foundation piece.",
    material: "100% Combed Cotton, 240 GSM",
    care: "Wash cold, line dry in shade.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-007",
    name: "Vintage Crimson Distressed Tee",
    slug: "vintage-crimson-distressed-tee",
    category: "graphic",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Washed Crimson", hex: "#991b1b" },
      { name: "Pitch Black", hex: "#09090b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description:
      "Sun-faded washed crimson tee with micro-frayed neck edges and weathered archival front print.",
    material: "100% Vintage Washed Cotton, 230 GSM",
    care: "Cold wash only. Hang dry.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-008",
    name: "Arch Gothic Heavyweight Crest Tee",
    slug: "arch-gothic-heavyweight-crest-tee",
    category: "graphic",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1618354691438-25bc04584c03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Forest Pine", hex: "#14532d" },
      { name: "Bone White", hex: "#f4f4f5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description:
      "Bold collegiate gothic arch lettering across upper chest with embroidered crest on left cuff.",
    material: "100% Cotton, 220 GSM",
    care: "Machine wash cold.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-009",
    name: "Brutalist Grid Pattern Tee",
    slug: "brutalist-grid-pattern-tee",
    category: "printed",
    price: 1349,
    originalPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Slate Monolith", hex: "#334155" },
      { name: "Off-White", hex: "#f8fafc" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Sale",
    description:
      "Architectural grid printing with isometric layout elements. Subtle tonal gradient on dark slate jersey.",
    material: "100% Cotton, 210 GSM",
    care: "Machine wash cold gentle cycle.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-010",
    name: "Dune Minimal Heavyweight Tee",
    slug: "dune-minimal-heavyweight-tee",
    category: "minimal",
    price: 1099,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Warm Dune", hex: "#d6c7b2" },
      { name: "Sage Green", hex: "#849378" },
      { name: "Jet Black", hex: "#18181b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Earth-pigment dyed minimal tee with relaxed drape, seamless sides, and heavy collar ribbing.",
    material: "100% Organic Cotton, 240 GSM",
    care: "Cold wash with neutral detergent.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-011",
    name: "Shadow Protocol Back-Print Tee",
    slug: "shadow-protocol-back-print-tee",
    category: "graphic",
    price: 1699,
    originalPrice: 2299,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Carbon Black", hex: "#1f2937" },
      { name: "Smoke Grey", hex: "#6b7280" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    description:
      "Understated front chest emblem combined with an oversized brutalist blueprint back artwork.",
    material: "100% Heavy Cotton, 240 GSM",
    care: "Wash inside out, cool iron on reverse.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-012",
    name: "Linear Horizon Striped Print Tee",
    slug: "linear-horizon-striped-print-tee",
    category: "printed",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Midnight Navy", hex: "#0f172a" },
      { name: "Olive Cream", hex: "#365314" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Yarn-dyed horizontal engineered micro-stripes with contrasting ribbed collar for high streetwear appeal.",
    material: "100% Combed Yarn-Dyed Cotton, 210 GSM",
    care: "Machine wash cold.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-013",
    name: "Raw Hem Washed Olive Tee",
    slug: "raw-hem-washed-olive-tee",
    category: "oversized",
    price: 1249,
    originalPrice: 1699,
    images: [
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Washed Olive", hex: "#3f4633" },
      { name: "Military Khaki", hex: "#786b59" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Sale",
    description:
      "Garment dyed olive tee featuring unhemmed roll edges on sleeves and waist. Relaxed boxy drape.",
    material: "100% Cotton, 230 GSM",
    care: "Wash cold, hang dry.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-014",
    name: "Echo Monogram Minimal Box Tee",
    slug: "echo-monogram-minimal-box-tee",
    category: "minimal",
    price: 1049,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Heather Grey", hex: "#9ca3af" },
      { name: "Pitch Black", hex: "#0a0a0a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    badge: "New",
    description:
      "Clean monochromatic essential with micro embroidered tonal box logo on center chest.",
    material: "100% Supima Cotton, 200 GSM",
    care: "Machine wash cold, delicate cycle.",
    fit: "Regular",
    inStock: true,
  },
  {
    id: "ts-015",
    name: "Acid Spill Neon Streetwear Tee",
    slug: "acid-spill-neon-streetwear-tee",
    category: "printed",
    price: 1549,
    originalPrice: 1999,
    images: [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622445268046-630d7aa44342?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Acid Lime & Black", hex: "#1e293b" },
      { name: "Ultraviolet", hex: "#312e81" },
    ],
    sizes: ["S", "M", "L", "XL"],
    badge: "New",
    description:
      "Expressive acid marbling dye with neon silk-screen graphic elements. No two garments are identical.",
    material: "100% Pre-Shrunk Cotton, 220 GSM",
    care: "Wash separately cold inside out.",
    fit: "Oversized",
    inStock: true,
  },
  {
    id: "ts-016",
    name: "Subversive Statement Heavyweight Tee",
    slug: "subversive-statement-heavyweight-tee",
    category: "graphic",
    price: 1399,
    images: [
      "https://images.unsplash.com/photo-1618354691438-25bc04584c03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Pitch Black", hex: "#09090b" },
      { name: "Off-White", hex: "#f4f4f5" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    description:
      "Heavyweight 250 GSM box-cut silhouette with distressed typography stating the brand ethos across the back shoulders.",
    material: "100% Ultra-Heavy Cotton, 250 GSM",
    care: "Machine wash cold. Do not tumble dry.",
    fit: "Oversized",
    inStock: true,
  },
];

export const CATEGORIES = [
  { id: "oversized", label: "Oversized", description: "Boxy & relaxed heavy fits" },
  { id: "graphic", label: "Graphic", description: "Bold streetwear prints & typographies" },
  { id: "printed", label: "Printed", description: "All-over patterns & engineered jacquards" },
  { id: "minimal", label: "Minimal", description: "Clean cuts, everyday essentials" },
] as const;
