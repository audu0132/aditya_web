"use client";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "clickable" | "view";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position refs for smooth 60fps lerp loop without React state jitter
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced-motion
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant update for the tiny inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const viewTarget = target.closest('[data-cursor="view"], .product-card');
        if (viewTarget) {
          setCursorState("view");
          return;
        }

        const clickableTarget = target.closest(
          'a, button, input, select, textarea, [role="button"], label, summary'
        );
        if (clickableTarget) {
          setCursorState("clickable");
          return;
        }
      }

      setCursorState("default");
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth lerp animation loop for the outer follower ring
    const render = () => {
      const lerpFactor = 0.16;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerpFactor;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerpFactor;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* ── Outer Follower Circle / View Pill ── */}
      <div
        ref={followerRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`flex items-center justify-center transition-all duration-300 ease-out select-none ${
            cursorState === "view"
              ? "w-16 h-16 rounded-full bg-zinc-950 text-white shadow-2xl scale-100 border border-white/20"
              : cursorState === "clickable"
              ? "w-12 h-12 rounded-full border border-zinc-950/80 bg-zinc-950/10 backdrop-blur-[1px] scale-100"
              : "w-8 h-8 rounded-full border border-zinc-900/40 bg-transparent scale-100"
          } ${isClicking ? "scale-90" : ""}`}
        >
          {cursorState === "view" && (
            <span className="text-[10px] font-black tracking-widest uppercase text-white animate-fade-in">
              VIEW
            </span>
          )}
        </div>
      </div>

      {/* ── Inner Center Dot ── */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full bg-zinc-950 transition-all duration-150 ease-out ${
            cursorState === "view"
              ? "opacity-0 scale-0"
              : cursorState === "clickable"
              ? "w-2 h-2 bg-zinc-950 scale-125"
              : "w-1.5 h-1.5 bg-zinc-950 scale-100"
          } ${isClicking ? "scale-75" : ""}`}
        />
      </div>
    </div>
  );
}

