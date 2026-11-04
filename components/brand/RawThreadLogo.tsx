"use client";

import React from "react";

export type RawThreadConcept = "S" | "minimal" | "streetwear" | "monochrome";
export type RawThreadSize = "sm" | "md" | "lg" | "xl";
export type RawThreadVariant = "light" | "dark" | "monochrome";

export interface RawThreadLogoProps {
  /**
   * Logo edition / concept:
   * "S" = Sanskriti Indic Sūtra Edition (Default)
   * "minimal" = Contemporary Minimalist Monogram
   * "streetwear" = Bold Industrial Urban Streetwear Edition
   * "monochrome" = High-contrast stark single-tone edition
   */
  concept?: RawThreadConcept;
  /**
   * Size scale:
   * "sm" = Compact (for navbar, badges, mobile headers)
   * "md" = Medium standard (default)
   * "lg" = Large (for hero, brand presentation, welcome board)
   * "xl" = Extra-large (editorial showcase)
   */
  size?: RawThreadSize;
  /**
   * Theme variant:
   * "light" = Crisp white & warm saffron accents (for dark backgrounds)
   * "dark" = Deep zinc-950 & rich saffron accents (for light backgrounds)
   * "monochrome" = Pure single tone (adapts to currentColor / parent)
   */
  variant?: RawThreadVariant;
  /** Show the Sanskrit Devanagari Sūtra inscription */
  showSanskrit?: boolean;
  /** Show the "WEAR YOUR IDENTITY" tagline */
  showTagline?: boolean;
  /** Display only the emblem mark */
  iconOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export default function RawThreadLogo({
  concept = "S",
  size = "md",
  variant = "light",
  showSanskrit = true,
  showTagline = true,
  iconOnly = false,
  className = "",
}: RawThreadLogoProps) {
  // Sizing definitions
  const sizeMap: Record<
    RawThreadSize,
    {
      icon: number;
      brandText: string;
      sanskritText: string;
      taglineText: string;
      gap: string;
    }
  > = {
    sm: {
      icon: 24,
      brandText: "text-sm tracking-[0.2em]",
      sanskritText: "text-[9px]",
      taglineText: "text-[8px] tracking-[0.22em]",
      gap: "gap-2",
    },
    md: {
      icon: 36,
      brandText: "text-lg tracking-[0.25em]",
      sanskritText: "text-[11px]",
      taglineText: "text-[9px] tracking-[0.26em]",
      gap: "gap-3",
    },
    lg: {
      icon: 48,
      brandText: "text-2xl tracking-[0.28em]",
      sanskritText: "text-xs",
      taglineText: "text-[10px] tracking-[0.3em]",
      gap: "gap-3.5",
    },
    xl: {
      icon: 64,
      brandText: "text-3xl sm:text-4xl tracking-[0.3em]",
      sanskritText: "text-sm",
      taglineText: "text-xs tracking-[0.35em]",
      gap: "gap-4",
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Variant color definitions
  const isLight = variant === "light";
  const isDark = variant === "dark";
  const isMono = variant === "monochrome";

  const textColor = isLight
    ? "text-white"
    : isDark
    ? "text-zinc-950"
    : "text-current";

  const mutedColor = isLight
    ? "text-zinc-400"
    : isDark
    ? "text-zinc-500"
    : "text-current opacity-70";

  const saffronColor = isMono
    ? isLight
      ? "#FFFFFF"
      : isDark
      ? "#09090B"
      : "currentColor"
    : "#F97316"; // Indian Saffron / Kesari

  const accentColor = isMono
    ? isLight
      ? "#E4E4E7"
      : isDark
      ? "#27272A"
      : "currentColor"
    : "#EA580C"; // Deep Saffron

  const baseStroke = isLight
    ? "#FAFAFA"
    : isDark
    ? "#09090B"
    : "currentColor";

  /**
   * Concept S: Sanskriti Indic Sūtra Edition Emblem
   * Intricate woven thread (sūtra) forming geometric 'R' and 'T' with an infinite knot
   * and traditional solar bindu accent.
   */
  const renderConceptSIcon = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 ease-out hover:scale-105"
      aria-hidden="true"
    >
      {/* Background Subtle Hexagonal / Diamond Weave Ring */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        stroke={saffronColor}
        strokeWidth="1.5"
        strokeOpacity={isMono ? "0.4" : "0.35"}
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Sūtra Infinite Knot: Interlaced R-T Thread Path */}
      {/* Thread 1 (Left loop - 'R' thread) */}
      <path
        d="M26 78 V24 H48 C60 24 68 32 68 44 C68 54 60 62 48 62 H26 M44 62 L66 78"
        stroke={baseStroke}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Thread 2 (Right crossbar & stem - 'T' interwoven thread with Saffron glow) */}
      <path
        d="M48 24 H76 M62 24 V78"
        stroke={saffronColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Continuous Sūtra Fiber (Weaving loop through R and T) */}
      <path
        d="M20 50 C20 30 80 30 80 50 C80 70 20 70 20 50"
        stroke={accentColor}
        strokeWidth="2"
        strokeOpacity="0.85"
        strokeLinecap="round"
      />

      {/* Central Bindu (Sacred Center Dot / Origin of Thread) */}
      <circle cx="50" cy="50" r="3.5" fill={saffronColor} />
      <circle
        cx="50"
        cy="50"
        r="7"
        stroke={saffronColor}
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.8"
      />

      {/* Upper Sūtra Solar Ray accents */}
      <line x1="50" y1="10" x2="50" y2="16" stroke={saffronColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="84" x2="50" y2="90" stroke={saffronColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  /**
   * Concept Minimalist Icon
   */
  const renderMinimalIcon = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="42" stroke={baseStroke} strokeWidth="4" />
      <path d="M34 28 V72 H46 V52 H58 L70 72 H82 L68 50 C74 46 76 40 76 34 C76 28 68 28 58 28 Z" fill={baseStroke} />
      <line x1="20" y1="50" x2="80" y2="50" stroke={saffronColor} strokeWidth="3" />
    </svg>
  );

  /**
   * Concept Streetwear Box Icon
   */
  const renderStreetwearIcon = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <rect x="10" y="10" width="80" height="80" rx="6" stroke={baseStroke} strokeWidth="6" />
      <path d="M28 30 H52 C60 30 64 36 64 42 C64 48 58 54 50 54 H28 V70" stroke={baseStroke} strokeWidth="7" strokeLinecap="square" />
      <path d="M50 54 L66 70" stroke={saffronColor} strokeWidth="7" strokeLinecap="square" />
      <line x1="56" y1="30" x2="78" y2="30" stroke={saffronColor} strokeWidth="5" />
    </svg>
  );

  const getEmblem = () => {
    switch (concept) {
      case "minimal":
        return renderMinimalIcon();
      case "streetwear":
        return renderStreetwearIcon();
      case "monochrome":
      case "S":
      default:
        return renderConceptSIcon();
    }
  };

  return (
    <div
      className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}
      role="img"
      aria-label="RAW THREAD — Sanskriti Indic Sūtra Edition"
    >
      {/* Logo Emblem Icon */}
      {getEmblem()}

      {/* Typography & Brand Details */}
      {!iconOnly && (
        <div className="flex flex-col justify-center leading-none">
          {/* Top Line: Sanskrit Devanagari Sūtra Inscription */}
          {showSanskrit && concept === "S" && (
            <div className="flex items-center gap-1.5 mb-1 font-serif">
              <span
                className={`${currentSize.sanskritText} font-semibold tracking-wider ${
                  isMono ? mutedColor : "text-amber-500/90 dark:text-amber-400"
                }`}
                style={{
                  fontFamily:
                    "'Noto Serif Devanagari', 'Martel', 'Tiro Devanagari Hindi', serif",
                }}
              >
                संस्कृति • सूत्रम्
              </span>
              <span
                className={`w-1 h-1 rounded-full ${
                  isMono ? "bg-current" : "bg-orange-500"
                }`}
              />
              <span
                className={`text-[8px] uppercase tracking-widest font-mono ${mutedColor}`}
              >
                SŪTRA ED.
              </span>
            </div>
          )}

          {/* Main Brand Wordmark */}
          <div className="flex items-center">
            <span
              className={`font-black uppercase ${currentSize.brandText} ${textColor}`}
              style={{
                fontFamily:
                  "var(--font-display, 'Impact', 'Syne', -apple-system, sans-serif)",
                letterSpacing: "0.22em",
              }}
            >
              RAW<span className={isMono ? "opacity-60" : "text-orange-500"}>//</span>THREAD
            </span>
          </div>

          {/* Bottom Tagline / Manifesto */}
          {showTagline && (
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`font-bold uppercase ${currentSize.taglineText} ${mutedColor}`}
              >
                WEAR YOUR IDENTITY.
              </span>
              <span
                className={`text-[8px] font-mono font-medium px-1.5 py-0.2 rounded border ${
                  isLight
                    ? "border-zinc-800 text-zinc-400 bg-zinc-900/60"
                    : isDark
                    ? "border-zinc-200 text-zinc-600 bg-zinc-100"
                    : "border-current opacity-60 text-current"
                }`}
              >
                INDIC '26
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
