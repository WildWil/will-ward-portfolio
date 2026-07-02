"use client";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
      );
    }
  }, [isInView]);

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center", className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                initial={{}}
                key={`char-${index}`}
                className={cn("text-foreground opacity-0 hidden", word.className)}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-primary", cursorClassName)}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
  const scopeRef = useRef<HTMLDivElement>(null);

  // Reveal character-by-character on mount (not whileInView): the headline is
  // above the fold, so an IntersectionObserver would race hydration and could
  // leave it unrevealed on reload. Each char flips from display:none to
  // inline-block as it reveals, so it takes layout and pushes the trailing
  // cursor along — a real typewriter, not a static wipe.
  //
  // Reveal is paced by elapsed time (one char every MS_PER_CHAR) rather than by
  // framer's stagger. framer's duration:0 + stagger landed the reveals on uneven
  // frame boundaries — some chars popping together, others a beat late — which
  // read as choppy typing. Timing each reveal off the clock keeps every character
  // an even step apart, and (unlike counting frames) runs at the SAME speed on
  // 60Hz and 120Hz/ProMotion displays. Reveal is instant (no opacity fade): a
  // fade promotes each transitioning span to its own GPU layer on mobile WebKit,
  // smearing a white box behind the cursor.
  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".tw-char"));
    const reveal = (el: HTMLElement) => {
      el.style.display = "inline-block";
      el.style.opacity = "1";
    };

    // Note: intentionally NOT gated on prefers-reduced-motion. The site owner
    // wants the headline to type on every device, including their own phone
    // which has Reduce Motion enabled (matching the announcement banner, which
    // also ignores that setting). To restore accessibility behaviour, early-
    // return chars.forEach(reveal) when the reduce-motion media query matches.
    const MS_PER_CHAR = 38; // ~26 chars/sec
    let i = 0;
    let startT = 0;
    let raf = 0;
    const tick = (now: number) => {
      if (!startT) startT = now;
      // How many chars *should* be visible by now — reveal up to that point.
      const target = Math.min(chars.length, Math.floor((now - startT) / MS_PER_CHAR) + 1);
      while (i < target) reveal(chars[i++]);
      if (i < chars.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // The cursor lives inside the last word's box (rather than as a trailing
  // sibling) so it stays glued to the final letter and can't orphan onto a line
  // by itself when the headline wraps on narrow screens.
  const cursor = (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      // Gap is set inline (not a Tailwind ml-* class) because the dev JIT
      // doesn't reliably generate newly-introduced margin utilities here,
      // which silently left the margin at 0.
      style={{ marginLeft: "3px", position: "relative", top: "1px" }}
      className={cn(
        "inline-block align-baseline rounded-sm w-[2px] h-3.5 sm:h-4 md:h-4 bg-primary",
        cursorClassName
      )}
    />
  );

  return (
    <div className={cn("my-2 text-base sm:text-lg md:text-xl font-semibold", className)}>
      {/* inline-block word boxes let the line wrap on narrow screens instead of
          overflowing the hero's overflow:hidden. Chars start hidden and are
          revealed in sequence, so the cursor trails the last visible letter. */}
      <div ref={scopeRef} className="inline">
        {wordsArray.map((word, idx) => {
          const isLast = idx === wordsArray.length - 1;
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn("tw-char text-foreground opacity-0 hidden", word.className)}
                >
                  {char}
                </span>
              ))}
              {isLast ? cursor : <>&nbsp;</>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
