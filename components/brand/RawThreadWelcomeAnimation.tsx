"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import RawThreadLogo from "./RawThreadLogo";

type AnimationPhase = "entering" | "welcome" | "exiting" | "finished";

// ── 3D Character Frames Manifest ──────────────────────────────────────────
// High-resolution WebP frames (with PNG fallback)
const RUNNING_FRAMES = [
  "/images/character/frames/running_frame_1.webp",
  "/images/character/frames/running_frame_2.webp",
  "/images/character/frames/running_frame_3.webp",
  "/images/character/frames/running_frame_4.webp",
  "/images/character/frames/running_frame_5.webp",
  "/images/character/frames/running_frame_6.webp",
  "/images/character/frames/running_frame_7.webp",
  "/images/character/frames/running_frame_8.webp",
];
const WELCOME_FRAME = "/images/character/frames/welcome_pose.webp";

// Cadence: ~90ms per frame = ~11.1 fps (natural human running stride cadence)
const FRAME_CADENCE_MS = 90;

export default function RawThreadWelcomeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("entering");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Preload all 3D animation frames on mount to eliminate any flickers
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      const timer = setTimeout(() => setPhase("finished"), 2400);
      return () => clearTimeout(timer);
    }

    // Preload image assets into browser cache
    const allFrames = [...RUNNING_FRAMES, WELCOME_FRAME];
    allFrames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Main sequence orchestrator
    // Stage 1: Entering (0s -> 2.8s)
    const tWelcome = setTimeout(() => {
      setPhase("welcome");
    }, 2800);

    // Stage 2: Welcome Presentation (2.8s -> 5.8s, ~3 seconds presentation)
    const tExit = setTimeout(() => {
      setPhase("exiting");
    }, 5800);

    // Stage 3: Exiting (5.8s -> 8.0s)
    const tFinish = setTimeout(() => {
      setPhase("finished");
    }, 8000);

    // ESC key listener for instant skip
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

  // 2. 3D Character Running Frame Cycling Engine
  useEffect(() => {
    if (reducedMotion || phase === "finished") return;

    if (phase === "welcome") {
      // Pause frame cycling during welcome presentation
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
      return;
    }

    // Running phases ("entering" or "exiting") -> Cycle 8-frame loop continuously
    frameIntervalRef.current = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % RUNNING_FRAMES.length);
    }, FRAME_CADENCE_MS);

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
    };
  }, [phase, reducedMotion]);

  if (phase === "finished") {
    return null;
  }

  // Accessibility: Simplified non-motion banner for users with reduced motion
  if (reducedMotion) {
    return (
      <aside
        aria-label="Welcome announcement"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-zinc-950/95 text-white border border-orange-500/50 rounded-xl px-5 py-3 shadow-2xl flex items-center gap-4 animate-fade-in backdrop-blur-md"
      >
        <RawThreadLogo size="sm" variant="light" concept="S" />
        <div className="border-l border-zinc-800 pl-3">
          <p className="text-xs font-black tracking-widest text-white uppercase">
            WELCOME TO RAW THREAD
          </p>
          <p className="text-[10px] text-orange-400 font-bold tracking-wide">
            WEAR YOUR IDENTITY.
          </p>
        </div>
        <button
          onClick={() => setPhase("finished")}
          className="text-zinc-400 hover:text-white text-xs ml-2 underline cursor-pointer"
        >
          Dismiss
        </button>
      </aside>
    );
  }

  const activeImageSrc =
    phase === "welcome" ? WELCOME_FRAME : RUNNING_FRAMES[currentFrameIndex];

  return (
    <div
      ref={containerRef}
      aria-label="Welcome to RAW THREAD"
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
    >
      {/* ── Top-Right Skip Button ── */}
      <div className="absolute top-20 right-4 sm:right-8 pointer-events-auto">
        <button
          onClick={() => setPhase("finished")}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/85 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] sm:text-xs font-mono tracking-wider backdrop-blur-md transition-all shadow-xl cursor-pointer"
          aria-label="Skip welcome animation"
        >
          <span>SKIP INTRO</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[9px]">
            ESC
          </kbd>
        </button>
      </div>

      {/* ── 3D Character & Welcome Board Motion Track ── */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-0 transition-transform duration-500 ease-out ${
          phase === "entering"
            ? "animate-boy-enter-3d"
            : phase === "welcome"
            ? "animate-boy-stand-3d"
            : "animate-boy-exit-3d"
        }`}
        style={{
          willChange: "transform",
        }}
      >
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-6">
          {/* ══════════════════════════════════════════════════════════════════
              STAGE 2: 3D LUXURY STREETWEAR WELCOME PRESENTATION BOARD
              ══════════════════════════════════════════════════════════════════ */}
          {phase === "welcome" && (
            <div
              role="dialog"
              aria-label="Welcome to RAW THREAD"
              className="pointer-events-auto mb-2 sm:mb-6 w-[290px] sm:w-[380px] bg-zinc-950/95 backdrop-blur-2xl border-2 border-orange-500/80 rounded-2xl p-5 sm:p-6 shadow-[0_24px_70px_rgba(249,115,22,0.3)] text-white animate-board-pop-3d"
            >
              {/* Top Accent Bar with Indic Sūtra badge */}
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

              {/* RAW THREAD Concept S Logo Header */}
              <div className="mb-3">
                <RawThreadLogo
                  size="md"
                  concept="S"
                  variant="light"
                  showTagline={false}
                />
              </div>

              {/* Welcome Headline & Manifesto */}
              <div className="space-y-1 mb-3.5">
                <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans">
                  WELCOME TO RAW THREAD
                </h2>
                <p className="text-xs sm:text-sm font-black tracking-[0.2em] text-orange-400 uppercase">
                  WEAR YOUR IDENTITY.
                </p>
              </div>

              {/* Description & Specs */}
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Raw, uninhibited streetwear crafted with 240 GSM heavy combed
                cotton and sacred Indic thread aesthetics.
              </p>

              {/* Interactive CTAs */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                <button
                  onClick={() => setPhase("finished")}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 hover:from-orange-400 hover:to-amber-400 text-center py-2 px-3 text-xs font-black tracking-widest uppercase rounded-lg shadow-md transition-all cursor-pointer font-sans"
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
              STAGE 1 & 3: 3D ANIMATED STREETWEAR MALE MODEL
              High-Fidelity Pixar/Disney 3D Stylized Cute Young Male Character
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative flex flex-col items-center">
            {/* Dynamic Ground Shadow (Pulses with foot impact during running) */}
            <div
              className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-black/60 rounded-full blur-[4px] transition-all duration-300 pointer-events-none ${
                phase === "welcome"
                  ? "w-36 h-4 opacity-70"
                  : "w-28 h-3 animate-shadow-3d-pulse opacity-50"
              }`}
            />

            {/* 3D Character Model Frame Container */}
            <div
              className={`relative select-none filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.7)] ${
                phase === "welcome" ? "" : "animate-character-bounce-3d"
              }`}
              style={{
                width: phase === "welcome" ? "220px" : "210px",
                height: phase === "welcome" ? "295px" : "310px",
              }}
            >
              {/* Responsive sizing overrides for mobile screens */}
              <div className="w-full h-full relative">
                {/* 3D Character Image (Transparent PNG / WebP) */}
                <Image
                  src={activeImageSrc}
                  alt="3D RAW THREAD Male Streetwear Character"
                  fill
                  priority
                  unoptimized // Bypasses on-the-fly SSR resizing to guarantee zero frame-switch latency
                  className="object-contain object-bottom transition-opacity duration-75"
                  sizes="(max-width: 640px) 180px, 240px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe Animations for Smooth 3D Entrance, Idle, and Exit ── */}
      <style jsx global>{`
        /* 1. Enter from off-screen left to center with natural deceleration */
        @keyframes boyEnter3D {
          0% {
            transform: translate3d(-130vw, 0, 0);
          }
          65% {
            transform: translate3d(calc(50vw - 140px), 0, 0);
          }
          85% {
            transform: translate3d(calc(50vw - 110px), 0, 0);
          }
          100% {
            transform: translate3d(calc(50vw - 120px), 0, 0);
          }
        }

        /* 2. Stand in center during welcome presentation */
        @keyframes boyStand3D {
          0%, 100% {
            transform: translate3d(calc(50vw - 120px), 0, 0);
          }
          50% {
            transform: translate3d(calc(50vw - 120px), -4px, 0);
          }
        }

        /* 3. Exit from center to far right */
        @keyframes boyExit3D {
          0% {
            transform: translate3d(calc(50vw - 120px), 0, 0);
          }
          20% {
            transform: translate3d(calc(50vw - 90px), 0, 0);
          }
          100% {
            transform: translate3d(130vw, 0, 0);
          }
        }

        /* Micro vertical bounce to mimic running vertical displacement */
        @keyframes characterBounce3D {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -6px, 0);
          }
        }

        /* Ground Contact Shadow Pulse */
        @keyframes shadow3DPulse {
          0%, 100% {
            transform: translate3d(-50%, 0, 0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate3d(-50%, 0, 0) scale(0.75);
            opacity: 0.25;
          }
        }

        /* 3D Pop for Welcome Board */
        @keyframes boardPop3D {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(18px) rotate(-2deg);
          }
          70% {
            transform: scale(1.02) translateY(-3px) rotate(0.5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0);
          }
        }

        .animate-boy-enter-3d {
          animation: boyEnter3D 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-boy-stand-3d {
          animation: boyStand3D 3s ease-in-out infinite;
        }

        .animate-boy-exit-3d {
          animation: boyExit3D 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-character-bounce-3d {
          animation: characterBounce3D 0.36s ease-in-out infinite;
        }

        .animate-shadow-3d-pulse {
          animation: shadow3DPulse 0.36s ease-in-out infinite;
        }

        .animate-board-pop-3d {
          animation: boardPop3D 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
