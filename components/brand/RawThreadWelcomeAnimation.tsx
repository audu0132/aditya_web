"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import RawThreadLogo from "./RawThreadLogo";

type AnimationPhase = "entering" | "welcome" | "exiting" | "finished";

export default function RawThreadWelcomeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("entering");
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setReducedMotion(true);
        const timer = setTimeout(() => setPhase("finished"), 2400);
        return () => clearTimeout(timer);
      }
    }

    // 2. Stage Timing:
    // Stage 1 (0s -> 2.6s): 3D boy runs in from left to center
    const tWelcome = setTimeout(() => {
      setPhase("welcome");
    }, 2600);

    // Stage 2 (2.6s -> 5.8s, ~3.2 seconds): Boy stands, smiles, presents welcome board
    const tExit = setTimeout(() => {
      setPhase("exiting");
    }, 5800);

    // Stage 3 (5.8s -> 8.0s): Boy resumes running and exits right viewport
    const tFinish = setTimeout(() => {
      setPhase("finished");
    }, 8000);

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
      aria-label="Welcome to RAW THREAD"
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
    >
      {/* ── Top-Right Skip Intro Button ── */}
      <div className="absolute top-20 right-4 sm:right-8 pointer-events-auto">
        <button
          onClick={() => setPhase("finished")}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/85 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] sm:text-xs font-mono tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer"
          aria-label="Skip welcome intro"
        >
          <span>SKIP INTRO</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[9px]">
            ESC
          </kbd>
        </button>
      </div>

      {/* ── Actor Track: 3D Streetwear Boy & Presentation Board ── */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-0 transition-all ${
          phase === "entering"
            ? "animate-boy-3d-enter"
            : phase === "welcome"
            ? "animate-boy-3d-stand"
            : "animate-boy-3d-exit"
        }`}
        style={{
          willChange: "transform",
        }}
      >
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-6">
          {/* ══════════════════════════════════════════════════════════════════
              STAGE 2: POP-UP 3D WELCOME BOARD
              ══════════════════════════════════════════════════════════════════ */}
          {phase === "welcome" && (
            <div
              role="dialog"
              aria-label="Welcome to RAW THREAD"
              className="pointer-events-auto mb-2 sm:mb-8 w-[290px] sm:w-[370px] bg-zinc-950/95 backdrop-blur-2xl border-2 border-orange-500/80 rounded-2xl p-5 sm:p-6 shadow-[0_24px_70px_rgba(249,115,22,0.3)] text-white animate-board-3d-pop"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
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

              {/* RAW THREAD Logo */}
              <div className="mb-3">
                <RawThreadLogo
                  size="md"
                  concept="S"
                  variant="light"
                  showTagline={false}
                />
              </div>

              {/* Main Headline */}
              <div className="space-y-1 mb-3.5">
                <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans">
                  WELCOME TO RAW THREAD
                </h2>
                <p className="text-xs sm:text-sm font-black tracking-[0.2em] text-orange-400 uppercase">
                  WEAR YOUR IDENTITY.
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Raw, uninhibited streetwear crafted with 240 GSM heavy combed
                cotton and sacred Indic thread aesthetics.
              </p>

              {/* Action Buttons */}
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
              3D ANIMATED YOUNG MALE STREETWEAR MODEL
              Polished 3D character with realistic lighting, smooth skin shading,
              thick dark wavy hair, expressive eyes, and oversized RAW THREAD tee.
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] flex flex-col items-center">
            {/* Ground Contact Shadow (tracks running stride cycle) */}
            <div
              className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black/60 rounded-full blur-[4px] transition-all duration-300 ${
                phase === "welcome"
                  ? "w-36 h-4 opacity-75"
                  : "w-28 h-3 animate-shadow-3d-pulse opacity-50"
              }`}
            />

            {/* Character Container with Dynamic Running Bounce & Tilting */}
            <div
              className={`relative transition-transform duration-300 ${
                phase === "welcome"
                  ? "animate-idle-3d-breath"
                  : "animate-running-3d-stride"
              }`}
            >
              {/* Dynamic Kinetic Speed Streaks when running */}
              {phase !== "welcome" && (
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                  <div className="w-10 h-0.5 bg-orange-400/80 rounded-full mb-2 animate-pulse" />
                  <div className="w-6 h-0.5 bg-white/60 rounded-full ml-3 mb-2" />
                  <div className="w-8 h-0.5 bg-orange-400/60 rounded-full ml-1" />
                </div>
              )}

              {/* 3D Character Images: Preloaded for seamless 60fps frame switching */}
              {phase === "welcome" ? (
                /* Welcome Presentation Pose (Facing front, warm smile) */
                <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 animate-fade-in">
                  <Image
                    src="/images/character/character-welcome.png"
                    alt="Young Male 3D Streetwear Model welcoming visitors to RAW THREAD"
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 256px"
                    className="object-contain object-bottom select-none filter contrast-105"
                  />
                </div>
              ) : (
                /* Dynamic Running Pose (Stride cycle, running forward) */
                <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84">
                  <Image
                    src="/images/character/character-running.png"
                    alt="Young Male 3D Streetwear Model running in oversized RAW THREAD T-Shirt"
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 256px"
                    className="object-contain object-bottom select-none filter contrast-105"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe Animations for Natural 3D Running Dynamics ── */}
      <style jsx global>{`
        /* Stage 1: Enter from off-screen left to center */
        @keyframes boy3dEnter {
          0% {
            transform: translate3d(-130vw, 0, 0);
          }
          65% {
            transform: translate3d(calc(50vw - 140px), 0, 0);
          }
          85% {
            transform: translate3d(calc(50vw - 100px), 0, 0);
          }
          100% {
            transform: translate3d(calc(50vw - 110px), 0, 0);
          }
        }

        /* Stage 2: Stop and hold in center */
        @keyframes boy3dStand {
          0%, 100% {
            transform: translate3d(calc(50vw - 110px), 0, 0);
          }
          50% {
            transform: translate3d(calc(50vw - 110px), -3px, 0);
          }
        }

        /* Stage 3: Exit from center to far right off-screen */
        @keyframes boy3dExit {
          0% {
            transform: translate3d(calc(50vw - 110px), 0, 0);
          }
          20% {
            transform: translate3d(calc(50vw - 80px), 0, 0);
          }
          100% {
            transform: translate3d(130vw, 0, 0);
          }
        }

        /* Natural Running Stride Cycle (Bobbing, squash, stretch, and footfall bounce) */
        @keyframes running3dStride {
          0% {
            transform: translate3d(0, 0, 0) rotate(3deg) scale(1, 1);
          }
          25% {
            transform: translate3d(0, -14px, 0) rotate(1deg) scale(0.97, 1.03);
          }
          50% {
            transform: translate3d(0, -2px, 0) rotate(-2deg) scale(1.03, 0.97);
          }
          75% {
            transform: translate3d(0, -14px, 0) rotate(2deg) scale(0.97, 1.03);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(3deg) scale(1, 1);
          }
        }

        /* Gentle idle breathing when stopped presenting */
        @keyframes idle3dBreath {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1, 1);
          }
          50% {
            transform: translate3d(0, -5px, 0) scale(1.01, 1.01);
          }
        }

        /* Ground shadow pulse in rhythm with footfalls */
        @keyframes shadow3dPulse {
          0%, 50%, 100% {
            transform: scale(1.1);
            opacity: 0.6;
          }
          25%, 75% {
            transform: scale(0.75);
            opacity: 0.3;
          }
        }

        /* Welcome Board 3D Pop entrance */
        @keyframes board3dPop {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(24px) rotateX(15deg) rotateY(-5deg);
          }
          70% {
            transform: scale(1.02) translateY(-4px) rotateX(-2deg) rotateY(1deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotateX(0) rotateY(0);
          }
        }

        .animate-boy-3d-enter {
          animation: boy3dEnter 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-boy-3d-stand {
          animation: boy3dStand 3.2s ease-in-out infinite;
        }

        .animate-boy-3d-exit {
          animation: boy3dExit 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-running-3d-stride {
          animation: running3dStride 0.44s ease-in-out infinite;
        }

        .animate-idle-3d-breath {
          animation: idle3dBreath 2.8s ease-in-out infinite;
        }

        .animate-shadow-3d-pulse {
          animation: shadow3dPulse 0.44s ease-in-out infinite;
        }

        .animate-board-3d-pop {
          animation: board3dPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
