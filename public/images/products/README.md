# Product Image Placeholders

Place your product photography here following this naming convention:

## Required images

```
public/
└── images/
    └── products/
        ├── acid-wash-1.jpg        (main image — Acid Wash Oversized Tee)
        ├── acid-wash-2.jpg        (hover image)
        ├── phantom-1.jpg          (Urban Phantom Graphic Tee)
        ├── phantom-2.jpg
        ├── void-1.jpg             (Void Minimal Tee)
        ├── void-2.jpg
        ├── streetcode-1.jpg       (Streetcode Printed Tee)
        ├── streetcode-2.jpg
        ├── boxy-1.jpg             (Drop Shoulder Boxy Tee)
        ├── boxy-2.jpg
        ├── arch-1.jpg             (Arch Logo Tee)
        └── arch-2.jpg
```

## Recommended dimensions

- **Aspect ratio**: 3:4 (portrait)
- **Minimum**: 800 × 1067 px
- **Ideal**: 1200 × 1600 px
- **Format**: JPEG or WebP
- **File size**: < 200 KB per image (use Squoosh or TinyPNG to compress)

## While images are missing

The product cards will show a grey/zinc background (from `bg-zinc-50` on the image container).
Next.js will NOT crash — it will just show broken image icons until you add the files.

## Tip

Until you have real photography, you can temporarily use free placeholder services:

```
https://placehold.co/800x1067/e4e4e7/71717a?text=STREETKRAFT
```

To use: edit `lib/products.ts` and set the image URLs to the placeholder URL above.

