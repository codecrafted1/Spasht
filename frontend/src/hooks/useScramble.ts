import { useEffect, useRef, useState, useCallback } from "react";

const DEFAULT_GLYPHS = "▒░#%&@01<>/\\_~§∆+*";

export interface UseScrambleOptions {
  text: string;
  speed?: number;       // ms between tick (default: 35)
  delay?: number;       // initial delay ms (default: 0)
  scrambleRounds?: number; // how many cycles per char (default: 3)
  glyphs?: string;
  autoStart?: boolean;
}

export function useScramble({
  text,
  speed = 35,
  delay = 0,
  scrambleRounds = 3,
  glyphs = DEFAULT_GLYPHS,
  autoStart = false
}: UseScrambleOptions) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const startScramble = useCallback((targetText?: string) => {
    const finalStr = targetText !== undefined ? targetText : text;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(finalStr);
      setIsScrambling(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setIsScrambling(true);
      const len = finalStr.length;
      let frame = 0;
      const totalFrames = len * scrambleRounds;

      const tick = () => {
        let output = "";
        const resolvedIdx = Math.floor(frame / scrambleRounds);

        for (let i = 0; i < len; i++) {
          const char = finalStr[i];
          if (char === " " || char === "\n") {
            output += char;
          } else if (i < resolvedIdx) {
            output += char;
          } else {
            const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
            output += randomGlyph;
          }
        }

        setDisplayText(output);
        frame++;

        if (frame <= totalFrames) {
          timeoutRef.current = window.setTimeout(tick, speed);
        } else {
          setDisplayText(finalStr);
          setIsScrambling(false);
        }
      };

      tick();
    }, delay);
  }, [text, speed, delay, scrambleRounds, glyphs]);

  useEffect(() => {
    if (autoStart) {
      startScramble();
    } else {
      setDisplayText(text);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, autoStart, startScramble]);

  return { displayText, isScrambling, startScramble };
}
