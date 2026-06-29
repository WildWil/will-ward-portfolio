"use client";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

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
  const [scope, animate] = useAnimate();

  // Reveal character-by-character on mount (not whileInView): the headline is
  // above the fold, so an IntersectionObserver would race hydration and could
  // leave it unrevealed on reload. Each char takes layout as it appears, so the
  // trailing cursor is pushed along — a real typewriter, not a static wipe.
  useEffect(() => {
    animate(
      "span",
      { display: "inline-block", opacity: 1, width: "fit-content" },
      { duration: 0.3, delay: stagger(0.035), ease: "easeOut" }
    );
  }, []);

  return (
    <div className={cn("my-2 text-base sm:text-lg md:text-xl font-semibold", className)}>
      {/* inline-block word boxes let the line wrap on narrow screens instead of
          overflowing the hero's overflow:hidden. Chars start hidden and are
          revealed in sequence, so the cursor trails the last visible letter. */}
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                key={`char-${index}`}
                className={cn("text-foreground opacity-0 hidden", word.className)}
              >
                {char}
              </motion.span>
            ))}
            {idx < wordsArray.length - 1 ? <>&nbsp;</> : null}
          </div>
        ))}
      </motion.div>
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
    </div>
  );
};
