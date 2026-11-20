"use client";

import { useState, useEffect, useRef } from "react";
import RawThreadLogo from "./RawThreadLogo";

type AnimationPhase = "entering" | "welcome" | "exiting" | "finished";

export default function RawThreadWelcomeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("entering");
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation timing coordinator
  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setReducedMotion(true);
        // Automatically finish quickly for users preferring reduced motion
        const timer = setTimeout(() => setPhase("finished"), 2200);
        return () => clearTimeout(timer);
      }
    }

    // 2. Main Sequence Timers
    // Stage 1: Entering (0s -> 2.6s): Runs from left to center
    const tWelcome = setTimeout(() => {
      setPhase("welcome");
    }, 2600);

    // Stage 2: Welcome Presentation (2.6s -> 5.6s, ~3 seconds presentation)
    const tExit = setTimeout(() => {
      setPhase("exiting");
    }, 5600);

    // Stage 3: Exiting (5.6s -> 7.8s): Runs from center to far right and unmounts
    const tFinish = setTimeout(() => {
      setPhase("finished");
    }, 7800);

    // Keyboard listener for instant dismissal with Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhase("finished");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(tWelcome);
      clearTimeout(tExit);
      clearTimeout(tFinish);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (phase === "finished") {
    return null;
  }

  // Simplified mode for users with reduced motion
  if (reducedMotion) {
    return (
      <aside
        aria-label="Welcome announcement"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-zinc-950 text-white border border-orange-500/50 rounded-xl px-5 py-3 shadow-2xl flex items-center gap-4 animate-fade-in"
      >
        <RawThreadLogo size="sm" variant="light" concept="S" />
        <div className="border-l border-zinc-800 pl-3">
          <p className="text-xs font-black tracking-widest text-white uppercase">
            WELCOME TO RAW THREAD
          </p>
          <p className="text-[10px] text-orange-400 font-medium tracking-wide">
            WEAR YOUR IDENTITY.
          </p>
        </div>
        <button
          onClick={() => setPhase("finished")}
          className="text-zinc-400 hover:text-white text-xs ml-2 underline"
        >
          Dismiss
        </button>
      </aside>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Welcome to RAW THREAD"
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
    >
      {/* ── Optional Top-Right Skip Control (Clickable) ── */}
      <div className="absolute top-20 right-4 sm:right-8 pointer-events-auto">
        <button
          onClick={() => setPhase("finished")}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] sm:text-xs font-mono tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer"
          aria-label="Skip welcome animation"
        >
          <span>SKIP INTRO</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[9px]">
            ESC
          </kbd>
        </button>
      </div>

      {/* ── Running Boy and Welcome Board Actor Track ── */}
      <div
        className={`absolute bottom-6 sm:bottom-10 left-0 transition-transform duration-500 ease-out ${
          phase === "entering"
            ? "animate-boy-enter"
            : phase === "welcome"
            ? "animate-boy-stand"
            : "animate-boy-exit"
        }`}
        style={{
          willChange: "transform",
        }}
      >
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-6">
          {/* ══════════════════════════════════════════════════════════════════
              STAGE 2: POP-UP WELCOME BOARD
              ══════════════════════════════════════════════════════════════════ */}
          {phase === "welcome" && (
            <div
              role="dialog"
              aria-label="Welcome to RAW THREAD"
              className="pointer-events-auto mb-2 sm:mb-8 w-[300px] sm:w-[380px] bg-zinc-950/95 backdrop-blur-xl border-2 border-orange-500/80 rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(249,115,22,0.25)] text-white animate-board-pop"
            >
              {/* Top Accent Bar with Sanskrit badge */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span className="text-[10px] sm:text-xs font-black tracking-widest text-orange-400 uppercase font-mono">
                    संस्कृति • SŪTRA ED.
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  SS26 DROP
                </span>
              </div>

              {/* RAW THREAD Logo Header */}
              <div className="mb-3">
                <RawThreadLogo
                  size="md"
                  concept="S"
                  variant="light"
                  showTagline={false}
                />
              </div>

              {/* Main Headline & Identity Manifesto */}
              <div className="space-y-1 mb-4">
                <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans">
                  WELCOME TO RAW THREAD
                </h2>
                <p className="text-xs sm:text-sm font-black tracking-[0.2em] text-orange-400 uppercase">
                  WEAR YOUR IDENTITY.
                </p>
              </div>

              {/* Description & Badge */}
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Raw, uninhibited streetwear crafted with 240 GSM heavy combed
                cotton and sacred Indic thread aesthetics.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                <button
                  onClick={() => setPhase("finished")}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 hover:from-orange-400 hover:to-amber-400 text-center py-2 px-3 text-xs font-black tracking-widest uppercase rounded-lg shadow-md transition-all cursor-pointer"
                >
                  ENTER THE STORE →
                </button>
                <button
                  onClick={() => setPhase("exiting")}
                  className="text-zinc-400 hover:text-white px-3 py-2 text-xs transition-colors cursor-pointer"
                  aria-label="Dismiss banner"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STAGE 1 & 3: RUNNING STREETWEAR MODEL CHARACTER
              Vector Male Model with Animated Running Arms, Legs & Torso
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
            {/* Dynamic Running Shadow beneath feet */}
            <div
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/40 rounded-full blur-[3px] transition-all duration-300 ${
                phase === "welcome"
                  ? "w-28 h-3 opacity-60"
                  : "w-24 h-2.5 animate-shadow-pulse opacity-40"
              }`}
            />

            {/* SVG Character Model */}
            <svg
              width="180"
              height="260"
              viewBox="0 0 180 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-36 h-52 sm:w-44 sm:h-64 ${
                phase === "welcome" ? "" : "animate-character-bob"
              }`}
            >
              {/* ── BACK LEG (Right Leg) ── */}
              <g
                className={
                  phase === "welcome"
                    ? "origin-[80px_160px]"
                    : "origin-[80px_160px] animate-leg-back"
                }
              >
                {/* Thigh (Oversized Streetwear Jogger / Cargo) */}
                <path
                  d="M74 160 L62 205 L78 208 L88 160 Z"
                  fill="#18181B"
                  stroke="#27272A"
                  strokeWidth="1.5"
                />
                {/* Cargo Pocket on Back Leg */}
                <rect x="64" y="175" width="12" height="16" rx="2" fill="#27272A" />
                {/* Lower Leg / Calf */}
                <path
                  d="M62 205 L48 245 L62 247 L78 208 Z"
                  fill="#09090B"
                />
                {/* High-Top Streetwear Sneaker (Back foot) */}
                <path
                  d="M44 243 L32 254 C30 256 34 259 40 259 L66 259 L62 245 Z"
                  fill="#FAFAFA"
                  stroke="#F97316"
                  strokeWidth="1.5"
                />
                {/* Sneaker sole */}
                <rect x="30" y="256" width="36" height="4" rx="1.5" fill="#F97316" />
              </g>

              {/* ── BACK ARM (Right Arm) ── */}
              <g
                className={
                  phase === "welcome"
                    ? "origin-[95px_95px] -rotate-12"
                    : "origin-[95px_95px] animate-arm-back"
                }
              >
                {/* Upper arm */}
                <path
                  d="M95 95 L125 125 L115 133 L88 102 Z"
                  fill="#E5C5A8"
                />
                {/* Forearm & Fist */}
                <path
                  d="M125 125 L145 110 L140 100 L115 118 Z"
                  fill="#D4B090"
                />
                {/* Fist */}
                <circle cx="145" cy="106" r="6" fill="#D4B090" />
              </g>

              {/* ── TORSO & OVERSIZED T-SHIRT ── */}
              <g className="origin-[90px_120px]">
                {/* Boxy Heavyweight Streetwear Tee Body */}
                <path
                  d="M62 90 L118 90 L126 168 C126 172 120 174 116 174 L64 174 C60 174 54 172 54 168 Z"
                  fill="#09090B"
                  stroke="#27272A"
                  strokeWidth="2"
                />

                {/* T-Shirt Drop Shoulder Seams & Creases */}
                <line x1="62" y1="90" x2="52" y2="128" stroke="#27272A" strokeWidth="2" />
                <line x1="118" y1="90" x2="128" y2="128" stroke="#27272A" strokeWidth="2" />
                <path d="M68 152 Q90 156 112 152" stroke="#18181B" strokeWidth="2" />

                {/* ── RAW THREAD BRANDING ON CHEST ── */}
                <g transform="translate(68, 106)">
                  {/* Saffron Sūtra Emblem Mark */}
                  <polygon
                    points="22,2 34,9 34,23 22,30 10,23 10,9"
                    stroke="#F97316"
                    strokeWidth="1.2"
                    fill="#18181B"
                  />
                  {/* Miniature R-T Woven Thread Knot */}
                  <path
                    d="M16 22 V12 H22 C25 12 27 14 27 17 C27 20 25 22 22 22 H16 M21 22 L26 26"
                    stroke="#FAFAFA"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 12 H28 M25 12 V25"
                    stroke="#F97316"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="22" cy="18" r="1.5" fill="#F97316" />

                  {/* Brand Wordmark text printed on T-Shirt */}
                  <text
                    x="22"
                    y="37"
                    textAnchor="middle"
                    fill="#FAFAFA"
                    fontSize="6"
                    fontWeight="900"
                    letterSpacing="1.2"
                    fontFamily="Impact, sans-serif"
                  >
                    RAW THREAD
                  </text>
                  <text
                    x="22"
                    y="43"
                    textAnchor="middle"
                    fill="#F97316"
                    fontSize="3.8"
                    fontWeight="700"
                    letterSpacing="0.8"
                    fontFamily="sans-serif"
                  >
                    संस्कृति • SŪTRA
                  </text>
                </g>

                {/* Silver Streetwear Cuban Chain */}
                <path
                  d="M78 88 Q90 104 102 88"
                  stroke="#E4E4E7"
                  strokeWidth="2.5"
                  strokeDasharray="2.5 1.5"
                  fill="none"
                />
              </g>

              {/* ── HEAD & FACE ── */}
              <g className="origin-[90px_70px]">
                {/* Neck */}
                <rect x="83" y="76" width="14" height="15" fill="#D4B090" />
                {/* Jaw & Face (Confident Profile / Three-Quarter) */}
                <path
                  d="M78 52 C78 40 85 36 94 36 C104 36 109 42 109 54 C109 68 100 76 90 76 C82 76 78 66 78 52 Z"
                  fill="#E5C5A8"
                />
                {/* Ear */}
                <circle cx="78" cy="54" r="4.5" fill="#D4B090" />
                {/* Silver Huggie Earring */}
                <circle cx="78" cy="57" r="1.8" stroke="#E4E4E7" strokeWidth="1" fill="none" />

                {/* Stylish Gen-Z Streetwear Textured Crop / Fade Haircut */}
                <path
                  d="M74 46 C74 34 82 24 95 24 C107 24 114 31 114 42 C114 46 111 48 107 48 C102 38 92 36 84 41 C80 44 76 48 74 46 Z"
                  fill="#18181B"
                />
                <path
                  d="M90 23 C98 22 106 25 110 32 C104 29 96 28 90 23 Z"
                  fill="#27272A"
                />

                {/* Streetwear Tinted Shades / Sunglasses */}
                <path
                  d="M84 48 L104 46 C106 46 107 48 107 51 L103 58 C102 60 99 61 97 61 L85 61 C82 61 81 59 81 56 Z"
                  fill="#09090B"
                  stroke="#F97316"
                  strokeWidth="1.2"
                />
                {/* Sunglasses lens reflection */}
                <line x1="88" y1="50" x2="94" y2="58" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="98" y1="49" x2="102" y2="55" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
              </g>

              {/* ── FRONT LEG (Left Leg) ── */}
              <g
                className={
                  phase === "welcome"
                    ? "origin-[100px_160px]"
                    : "origin-[100px_160px] animate-leg-front"
                }
              >
                {/* Thigh (Cargo Pants with Streetwear Straps) */}
                <path
                  d="M92 160 L115 204 L101 208 L82 160 Z"
                  fill="#27272A"
                  stroke="#3F3F46"
                  strokeWidth="1.5"
                />
                {/* Neon Saffron utility strap */}
                <line x1="90" y1="180" x2="108" y2="184" stroke="#F97316" strokeWidth="2" />
                {/* Cargo Pocket */}
                <rect x="94" y="186" width="14" height="18" rx="2" fill="#18181B" />

                {/* Lower Leg / Shin */}
                <path
                  d="M115 204 L138 244 L125 247 L101 208 Z"
                  fill="#18181B"
                />
                {/* High-Top Streetwear Sneaker (Front foot) */}
                <path
                  d="M132 243 L152 254 C155 256 152 259 146 259 L120 259 L124 245 Z"
                  fill="#FAFAFA"
                  stroke="#F97316"
                  strokeWidth="1.5"
                />
                {/* Sneaker sole & Saffron accent */}
                <rect x="120" y="256" width="34" height="4" rx="1.5" fill="#F97316" />
                <path d="M130 250 L142 250" stroke="#09090B" strokeWidth="2" />
              </g>

              {/* ── FRONT ARM (Left Arm) ── */}
              <g
                className={
                  phase === "welcome"
                    ? "origin-[70px_95px] rotate-20"
                    : "origin-[70px_95px] animate-arm-front"
                }
              >
                {/* Oversized short sleeve */}
                <path
                  d="M56 90 L40 120 L62 126 L72 94 Z"
                  fill="#09090B"
                  stroke="#27272A"
                  strokeWidth="1.5"
                />
                {/* Arm forearm & hand */}
                <path
                  d="M44 120 L24 145 L32 153 L54 125 Z"
                  fill="#E5C5A8"
                />
                {/* Streetwear Smartwatch / Wristband */}
                <rect x="28" y="142" width="6" height="8" rx="1.5" fill="#09090B" stroke="#F97316" strokeWidth="1" />
                {/* Hand / Fist (or waving gesture when welcomed) */}
                {phase === "welcome" ? (
                  <g transform="translate(18, 142)">
                    {/* Welcoming Peace / Thumbs Up sign */}
                    <path
                      d="M6 10 C3 10 2 6 5 4 C6 2 9 3 10 5 L12 0 C13 -1 15 0 14 2 L12 6 L14 4 C15 3 17 4 16 6 L13 11 Z"
                      fill="#E5C5A8"
                    />
                  </g>
                ) : (
                  <circle cx="24" cy="150" r="7" fill="#D4B090" />
                )}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Embedded CSS Animation Keyframes for Smooth Natural Running Motion ── */}
      <style jsx global>{`
        /* Stage 1: Enter from off-screen left to center */
        @keyframes boyEnter {
          0% {
            transform: translate3d(-130vw, 0, 0);
          }
          65% {
            transform: translate3d(calc(50vw - 120px), 0, 0);
          }
          85% {
            transform: translate3d(calc(50vw - 90px), 0, 0);
          }
          100% {
            transform: translate3d(calc(50vw - 100px), 0, 0);
          }
        }

        /* Stage 2: Stop and stand in center with subtle idle breathing */
        @keyframes boyStand {
          0% {
            transform: translate3d(calc(50vw - 100px), 0, 0);
          }
          50% {
            transform: translate3d(calc(50vw - 100px), -4px, 0);
          }
          100% {
            transform: translate3d(calc(50vw - 100px), 0, 0);
          }
        }

        /* Stage 3: Exit from center to far right */
        @keyframes boyExit {
          0% {
            transform: translate3d(calc(50vw - 100px), 0, 0);
          }
          20% {
            transform: translate3d(calc(50vw - 70px), 0, 0);
          }
          100% {
            transform: translate3d(130vw, 0, 0);
          }
        }

        /* Natural Body Bobbing Rhythm while running */
        @keyframes characterBob {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(2deg);
          }
          50% {
            transform: translate3d(0, -10px, 0) rotate(4deg);
          }
        }

        /* Ground Contact Shadow Pulse */
        @keyframes shadowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(0.75);
            opacity: 0.2;
          }
        }

        /* Left Leg Stride Cycle */
        @keyframes legFront {
          0% {
            transform: rotate(-32deg);
          }
          50% {
            transform: rotate(38deg);
          }
          100% {
            transform: rotate(-32deg);
          }
        }

        /* Right Leg Opposing Stride Cycle */
        @keyframes legBack {
          0% {
            transform: rotate(36deg);
          }
          50% {
            transform: rotate(-30deg);
          }
          100% {
            transform: rotate(36deg);
          }
        }

        /* Left Arm Swing Cycle */
        @keyframes armFront {
          0% {
            transform: rotate(40deg);
          }
          50% {
            transform: rotate(-35deg);
          }
          100% {
            transform: rotate(40deg);
          }
        }

        /* Right Arm Opposing Swing Cycle */
        @keyframes armBack {
          0% {
            transform: rotate(-38deg);
          }
          50% {
            transform: rotate(36deg);
          }
          100% {
            transform: rotate(-38deg);
          }
        }

        /* Pop-in animation for the Welcome Board */
        @keyframes boardPop {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(20px) rotate(-2deg);
          }
          70% {
            transform: scale(1.02) translateY(-4px) rotate(0.5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0);
          }
        }

        .animate-boy-enter {
          animation: boyEnter 2.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .animate-boy-stand {
          animation: boyStand 3s ease-in-out infinite;
        }

        .animate-boy-exit {
          animation: boyExit 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-character-bob {
          animation: characterBob 0.42s ease-in-out infinite;
        }

        .animate-shadow-pulse {
          animation: shadowPulse 0.42s ease-in-out infinite;
        }

        .animate-leg-front {
          animation: legFront 0.42s ease-in-out infinite;
        }

        .animate-leg-back {
          animation: legBack 0.42s ease-in-out infinite;
        }

        .animate-arm-front {
          animation: armFront 0.42s ease-in-out infinite;
        }

        .animate-arm-back {
          animation: armBack 0.42s ease-in-out infinite;
        }

        .animate-board-pop {
          animation: boardPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
