import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";

const CELL = 40;

const GridPattern = ({ offsetX, offsetY }: { offsetX: any; offsetY: any }) => (
  <svg width="100%" height="100%" style={{ display: "block" }}>
    <defs>
      <motion.pattern
        id="wg-grid"
        width={CELL}
        height={CELL}
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" stroke="currentColor" strokeWidth="1" />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wg-grid)" />
  </svg>
);

export const InfiniteGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // Follow the cursor anywhere over the parent section (this layer is
  // pointer-events:none so it never blocks the hero's buttons).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Listen on the window so the reveal tracks the cursor everywhere over the
    // hero. The grid layer itself is pointer-events:none (so it never blocks the
    // buttons), which is why we can't listen on it or its astro-island parent.
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useAnimationFrame(() => {
    if (reduced) return;
    offsetX.set((offsetX.get() + 0.25) % CELL);
    offsetY.set((offsetY.get() + 0.25) % CELL);
  });

  const maskImage = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", color: "var(--site-fg)" }}
    >
      {/* Faint always-on grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
        <GridPattern offsetX={offsetX} offsetY={offsetY} />
      </div>

      {/* Brighter grid revealed under the cursor */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          color: "var(--primary)",
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridPattern offsetX={offsetX} offsetY={offsetY} />
      </motion.div>

      {/* Ambient glows (on-brand blues) */}
      <div
        style={{
          position: "absolute",
          right: "-15%",
          top: "-25%",
          width: "45%",
          height: "55%",
          borderRadius: "9999px",
          background: "var(--primary)",
          opacity: 0.16,
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "-30%",
          width: "40%",
          height: "55%",
          borderRadius: "9999px",
          background: "var(--primary)",
          opacity: 0.12,
          filter: "blur(120px)",
        }}
      />
    </div>
  );
};
