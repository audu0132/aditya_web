"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import RawThreadLogo from "./RawThreadLogo";

type AnimationPhase = "init" | "running-in" | "welcome" | "fade-out" | "finished";

const RUNNING_CYCLE_SRC = "/images/character/running_cycle.webp";
const WELCOME_POSE_SRC = "/images/character/welcome_pose.webp";

// Sequence Timing Constants (Total duration: ~3.4s)
const RUN_IN_MS = 1350;      // Mascot runs from left to center
const WELCOME_HOLD_MS = 1450; // Welcome pose and board presentation hold
const FADE_OUT_MS = 550;     // Intro overlay fades out to reveal hero

export default function RawThreadWelcomeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("init");
  const timelineRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: Immediately end intro, unlock scroll, clean up, and mark session as seen
  const finishIntro = useCallback(() => {
    if (timelineRef.current) {
      clearTimeout(timelineRef.current);
      timelineRef.current = null;
    }

    try {
      sessionStorage.setItem("rawthread_intro_seen", "true");
    } catch {
      // Ignore sessionStorage restrictions (e.g. private browsing)
    }

    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.classList.add("rt-intro-seen");
    }

    setPhase("finished");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Session check: show only once per session
    try {
      const seen = sessionStorage.getItem("rawthread_intro_seen");
      if (seen === "true") {
        setPhase("finished");
        return;
      }
    } catch {
      // sessionStorage unavailable
    }

    // 2. Accessibility: Skip intro immediately if reduced motion is requested
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      finishIntro();
      return;
    }

    // 3. Preload both mascot assets into browser cache to eliminate swap flicker
    [RUNNING_CYCLE_SRC, WELCOME_POSE_SRC].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // 4. Lock page scroll during the 3-second intro
    document.body.style.overflow = "hidden";

    // 5. Start single master timeline
    setPhase("running-in");

    // Phase 1 -> Phase 2 (Stop at center, show welcome board & smiling pose)
    timelineRef.current = setTimeout(() => {
      setPhase("welcome");

      // Phase 2 -> Phase 3 (Fade out intro overlay, reveal hero)
      timelineRef.current = setTimeout(() => {
        setPhase("fade-out");

        // Unlock page scroll as soon as fade begins so user can interact immediately
        document.body.style.overflow = "";

        // Phase 3 -> Phase 4 (Unmount component completely)
        timelineRef.current = setTimeout(() => {
          finishIntro();
        }, FADE_OUT_MS);
      }, WELCOME_HOLD_MS);
    }, RUN_IN_MS);

    // 6. Keyboard listener for ESC key to instantly skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timelineRef.current) {
        clearTimeout(timelineRef.current);
      }
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [finishIntro]);

  if (phase === "finished") {
    return null;
  }

  const isFadingOut = phase === "fade-out";
  const isWelcome = phase === "welcome";

  return (
    <>
      {/* Inline script to prevent flash of intro on subsequent page views within same session */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('rawthread_intro_seen')==='true'){document.documentElement.classList.add('rt-intro-seen');}}catch(e){}`,
        }}
      />

      <div
        id="rawthread-intro-overlay"
        role="region"
        aria-label="RAW THREAD Welcome Intro"
        className={`fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center bg-zinc-950 transition-opacity duration-500 ease-out ${
          isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        {/* Subtle Ambient Radial Saffron Glow in background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(249,115,22,0.12)_0%,rgba(9,9,11,0.95)_70%)] pointer-events-none" />

        {/* ── Top-Right Skip Button ── */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30">
          <button
            onClick={finishIntro}
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono tracking-wider backdrop-blur-md transition-all shadow-xl cursor-pointer"
            aria-label="Skip welcome intro"
          >
            <span>SKIP INTRO</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[9px] border border-zinc-700">
              ESC
            </kbd>
          </button>
        </div>

        {/* ── Main Actor Stage (Centered horizontally & vertically) ── */}
        <div className="relative w-full max-w-4xl px-4 flex flex-col items-center justify-center">
          <div
            className={`relative flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-8 ${
              phase === "running-in"
                ? "animate-mascot-run-in"
                : "animate-mascot-center"
            }`}
          >
            {/* ══════════════════════════════════════════════════════════════════
                3D WELCOME BOARD (APPEARS NATURALLY DURING WELCOME PHASE)
                ══════════════════════════════════════════════════════════════════ */}
            <div
              role="dialog"
              aria-label="Welcome Board"
              className={`w-[290px] sm:w-[360px] bg-zinc-900/95 backdrop-blur-2xl border-2 border-orange-500/80 rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(249,115,22,0.28)] text-white transition-all duration-400 ease-out mb-2 sm:mb-6 ${
                isWelcome
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-4 pointer-events-none"
              }`}
            >
              {/* Sūtra Edition Tag */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span className="text-[10px] sm:text-xs font-black tracking-widest text-orange-400 uppercase font-mono">
                    संस्कृति • SŪTRA ED.
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60">
                  SS26 DROP
                </span>
              </div>

              {/* RAW THREAD Logo Header */}
              <div className="mb-3">
                <RawThreadLogo
                  size="sm"
                  concept="S"
                  variant="light"
                  showTagline={false}
                />
              </div>

              {/* Exact Requested Headline */}
              <div className="space-y-1 mb-3">
                <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans leading-tight">
                  WELCOME TO<br />RAW THREAD
                </h2>
                <p className="text-xs sm:text-sm font-black tracking-[0.2em] text-orange-400 uppercase">
                  WEAR YOUR IDENTITY.
                </p>
              </div>

              {/* Manifesto Subtitle */}
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Raw, uninhibited streetwear crafted with 240 GSM heavy combed cotton.
              </p>

              {/* Action Button */}
              <div className="pt-2 border-t border-zinc-800 flex items-center gap-2">
                <button
                  onClick={finishIntro}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-black text-xs tracking-widest uppercase py-2.5 px-4 rounded-lg shadow-md transition-all cursor-pointer text-center font-sans"
                >
                  EXPLORE DROP →
                </button>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                3D CHARACTER CONTAINER (RUNNING CYCLE -> WELCOME POSE SWAP)
                ══════════════════════════════════════════════════════════════════ */}
            <div className="relative flex flex-col items-center">
              {/* Ground Shadow underneath character */}
              <div
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/70 rounded-full blur-[4px] transition-all duration-300 pointer-events-none ${
                  isWelcome
                    ? "w-36 h-4 opacity-80"
                    : "w-28 h-3 opacity-50 animate-shadow-pulse"
                }`}
              />

              {/* Mascot Frame Container */}
              <div
                className={`relative select-none filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] ${
                  isWelcome ? "" : "animate-character-bob"
                }`}
                style={{
                  width: isWelcome ? "210px" : "200px",
                  height: isWelcome ? "290px" : "300px",
                }}
              >
                <div className="w-full h-full relative">
                  {/* 1. Animated Running 3D WebP (Active during run-in) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={RUNNING_CYCLE_SRC}
                    alt="RAW THREAD Mascot Running"
                    className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 ${
                      isWelcome
                        ? "opacity-0 pointer-events-none invisible"
                        : "opacity-100 visible"
                    }`}
                  />

                  {/* 2. Welcome Smiling 3D Pose WebP (Active during welcome hold) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={WELCOME_POSE_SRC}
                    alt="RAW THREAD Mascot Welcome"
                    className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 ${
                      isWelcome
                        ? "opacity-100 visible"
                        : "opacity-0 pointer-events-none invisible"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CSS Keyframes: GPU-accelerated transform & opacity only ── */}
      <style jsx global>{`
        /* Avoid flash of intro when already seen in current session */
        html.rt-intro-seen #rawthread-intro-overlay {
          display: none !important;
        }

        /* Running in from offscreen left with natural deceleration curve */
        @keyframes mascotRunIn {
          0% {
            transform: translate3d(calc(-50vw - 100%), 0, 0);
          }
          75% {
            transform: translate3d(15px, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* Subtle idle breathing while holding at center */
        @keyframes mascotCenterIdle {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -3px, 0);
          }
        }

        /* Running Stride Vertical Displacement */
        @keyframes characterBobbing {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -6px, 0);
          }
        }

        /* Running Ground Contact Shadow Pulse */
        @keyframes shadowPulsing {
          0%, 100% {
            transform: translate3d(-50%, 0, 0) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate3d(-50%, 0, 0) scale(0.72);
            opacity: 0.25;
          }
        }

        .animate-mascot-run-in {
          animation: mascotRunIn 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-mascot-center {
          animation: mascotCenterIdle 2.5s ease-in-out infinite;
        }

        .animate-character-bob {
          animation: characterBobbing 0.34s ease-in-out infinite;
        }

        .animate-shadow-pulse {
          animation: shadowPulsing 0.34s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
