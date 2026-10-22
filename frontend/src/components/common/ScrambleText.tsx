import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScramble } from "../../hooks/useScramble";

export interface ScrambleTextProps {
  text?: string;
  cyclingWords?: string[];
  cycleIntervalMs?: number;
  triggerOnView?: boolean;
  triggerOnHover?: boolean;
  speed?: number;
  delay?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text = "",
  cyclingWords,
  cycleIntervalMs = 3200,
  triggerOnView = true,
  triggerOnHover = false,
  speed = 30,
  delay = 0,
  className = "",
  as: Component = "span"
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const currentTargetText = cyclingWords ? cyclingWords[activeWordIndex] : text;

  const { displayText, startScramble } = useScramble({
    text: currentTargetText,
    speed,
    delay,
    autoStart: false
  });

  const containerRef = useRef<HTMLElement>(null);
  const hasTriggeredOnView = useRef(false);

  // Cycling words loop
  useEffect(() => {
    if (!cyclingWords || cyclingWords.length <= 1) return;

    const interval = setInterval(() => {
      setActiveWordIndex((prev) => {
        const next = (prev + 1) % cyclingWords.length;
        startScramble(cyclingWords[next]);
        return next;
      });
    }, cycleIntervalMs);

    return () => clearInterval(interval);
  }, [cyclingWords, cycleIntervalMs, startScramble]);

  // IntersectionObserver for view trigger
  useEffect(() => {
    if (!triggerOnView || hasTriggeredOnView.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredOnView.current) {
          hasTriggeredOnView.current = true;
          startScramble(currentTargetText);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [triggerOnView, currentTargetText, startScramble]);

  const handleMouseEnter = useCallback(() => {
    if (triggerOnHover) {
      startScramble(currentTargetText);
    }
  }, [triggerOnHover, currentTargetText, startScramble]);

  // Max width placeholder if cycling words to prevent layout shift
  const longestWord = cyclingWords
    ? cyclingWords.reduce((a, b) => (a.length > b.length ? a : b), "")
    : currentTargetText;

  return (
    <Component
      ref={containerRef as any}
      aria-label={currentTargetText}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block tabular-nums font-mono ${className}`}
    >
      {/* Invisible layout placeholder to guarantee rock-solid dimensional stability */}
      <span className="invisible select-none" aria-hidden="true">
        {longestWord}
      </span>

      {/* Visual layer with animated glyphs */}
      <span className="absolute left-0 top-0 w-full" aria-hidden="true">
        {displayText}
      </span>
    </Component>
  );
};
