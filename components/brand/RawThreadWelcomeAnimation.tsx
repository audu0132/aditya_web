"use client";

import { useState, useEffect, useRef } from "react";
import RawThreadLogo from "./RawThreadLogo";

type AnimationPhase = "entering" | "welcome" | "exiting" | "finished";

const RUNNING_CYCLE_SRC = "/images/character/running_cycle.webp";
const WELCOME_POSE_SRC = "/images/character/welcome_pose.webp";

export default function RawThreadWelcomeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("entering");
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Accessibility check & Preload assets
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Accessibility: check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      const timer = setTimeout(() => setPhase("finished"), 2500);
      return () => clearTimeout(timer);
    }

    // Preload both 3D character images so transitions are instant with zero flash
    [RUNNING_CYCLE_SRC, WELCOME_POSE_SRC].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Main 3-Phase Animation Sequence
    // Phase 1: Run In (0s -> 2.6s)
    const tWelcome = setTimeout(() => {
      setPhase("welcome");
    }, 2600);

    // Phase 2: Stop & Show Welcome Board (2.6s -> 5.6s, exactly 3s hold)
    const tExit = setTimeout(() => {
      setPhase("exiting");
    }, 5600);

    // Phase 3: Run Out & Exit (5.6s -> 7.8s)
    const tFinish = setTimeout(() => {
      setPhase("finished");
    }, 7800);

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

  if (phase === "finished") {
    return null;
  }

  // Simplified treatment for reduced-motion users
  if (reducedMotion) {
    return (
      <aside
        aria-label="Welcome to RAW THREAD"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-zinc-950/95 text-white border border-orange-500/60 rounded-xl px-5 py-3 shadow-2xl flex items-center gap-4 animate-fade-in backdrop-blur-md"
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

  return (
    <div
      ref={containerRef}
      aria-label="Welcome to RAW THREAD Animation"
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
    >
      {/* ── Top-Right Skip Button (Accessible & Clickable) ── */}
      <div className="absolute top-20 right-4 sm:right-8 pointer-events-auto">
        <button
          onClick={() => setPhase("finished")}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/85 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] sm:text-xs font-mono tracking-wider backdrop-blur-md transition-all shadow-xl cursor-pointer"
          aria-label="Skip welcome intro"
        >
          <span>SKIP INTRO</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[9px]">
            ESC
          </kbd>
        </button>
      </div>

      {/* ── 3D Character Actor Track (Horizontal Left → Center → Right) ── */}
      <div
        className={`absolute bottom-6 sm:bottom-10 md:bottom-14 left-1/2 will-change-transform ${
          phase === "entering"
            ? "animate-boy-run-in"
            : phase === "welcome"
            ? "animate-boy-center-hold"
            : "animate-boy-run-out"
        }`}
      >
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-6">
          {/* ══════════════════════════════════════════════════════════════════
              PHASE 2: 3D WELCOME BOARD (BLACK & SAFFRON STREETWEAR AESTHETIC)
              ══════════════════════════════════════════════════════════════════ */}
          {phase === "welcome" && (
            <div
              role="dialog"
              aria-label="Welcome to RAW THREAD"
              className="pointer-events-auto mb-2 sm:mb-6 w-[290px] sm:w-[380px] bg-zinc-950/95 backdrop-blur-2xl border-2 border-orange-500/80 rounded-2xl p-5 sm:p-6 shadow-[0_24px_70px_rgba(249,115,22,0.3)] text-white animate-board-pop-3d"
            >
              {/* Sūtra Edition Tag */}
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

              {/* Board Text: WELCOME TO RAW THREAD / WEAR YOUR IDENTITY */}
              <div className="space-y-1 mb-3.5">
                <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans">
                  WELCOME TO<br />RAW THREAD
                </h2>
                <p className="text-xs sm:text-sm font-black tracking-[0.2em] text-orange-400 uppercase">
                  WEAR YOUR IDENTITY.
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Raw, uninhibited streetwear crafted with 240 GSM heavy combed
                cotton and sacred Indic thread aesthetics.
              </p>

              {/* Actions */}
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
              3D ANIMATED CHARACTER CONTAINER (RUN CYCLE & WELCOME POSE)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative flex flex-col items-center">
            {/* Dynamic Ground Shadow */}
            <div
              className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-black/60 rounded-full blur-[4px] transition-all duration-300 pointer-events-none ${
                phase === "welcome"
                  ? "w-36 h-4 opacity-70"
                  : "w-28 h-3 animate-shadow-3d-pulse opacity-50"
              }`}
            />

            {/* 3D Character Graphic (Smooth dual-layer crossfade) */}
            <div
              className={`relative select-none filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.7)] ${
                phase === "welcome" ? "" : "animate-character-bounce-3d"
              }`}
              style={{
                width: phase === "welcome" ? "220px" : "210px",
                height: phase === "welcome" ? "300px" : "315px",
              }}
            >
              <div className="w-full h-full relative">
                {/* 1. Animated Running 3D Cycle (Arms, legs, body moving in full 3D) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={RUNNING_CYCLE_SRC}
                  alt="3D RAW THREAD Mascot Running"
                  className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 ${
                    phase === "welcome"
                      ? "opacity-0 pointer-events-none invisible"
                      : "opacity-100 visible"
                  }`}
                />

                {/* 2. Welcome Smiling 3D Pose (Front-facing, warm natural smile) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={WELCOME_POSE_SRC}
                  alt="3D RAW THREAD Mascot Welcome"
                  className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 ${
                    phase === "welcome"
                      ? "opacity-100 visible"
                      : "opacity-0 pointer-events-none invisible"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Smooth GPU-Accelerated Keyframes for Entry, Hold, and Exit ── */}
      <style jsx global>{`
        /* Phase 1: Run In from completely off-screen left to center */
        @keyframes boyRunIn {
          0% {
            transform: translate3d(calc(-50vw - 120%), 0, 0);
          }
          70% {
            transform: translate3d(calc(-50% - 20px), 0, 0);
          }
          90% {
            transform: translate3d(calc(-50% + 5px), 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* Phase 2: Idle breathing hold at exact center */
        @keyframes boyCenterHold {
          0%, 100% {
            transform: translate3d(-50%, 0, 0);
          }
          50% {
            transform: translate3d(-50%, -4px, 0);
          }
        }

        /* Phase 3: Run Out from center to completely off-screen right */
        @keyframes boyRunOut {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          15% {
            transform: translate3d(calc(-50% + 20px), 0, 0);
          }
          100% {
            transform: translate3d(calc(50vw + 120%), 0, 0);
          }
        }

        /* Running Stride Vertical Bounce */
        @keyframes characterBounce3D {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -6px, 0);
          }
        }

        /* Running Footprint Contact Shadow Pulse */
        @keyframes shadow3DPulse {
          0%, 100% {
            transform: translate3d(-50%, 0, 0) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate3d(-50%, 0, 0) scale(0.72);
            opacity: 0.25;
          }
        }

        /* Welcome Board 3D Pop In */
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

        .animate-boy-run-in {
          animation: boyRunIn 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-boy-center-hold {
          animation: boyCenterHold 3s ease-in-out infinite;
        }

        .animate-boy-run-out {
          animation: boyRunOut 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-character-bounce-3d {
          animation: characterBounce3D 0.34s ease-in-out infinite;
        }

        .animate-shadow-3d-pulse {
          animation: shadow3DPulse 0.34s ease-in-out infinite;
        }

        .animate-board-pop-3d {
          animation: boardPop3D 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
