import React, { useEffect, useRef, useState } from "react";

type CursorType = "default" | "link" | "drop" | "upload" | "text" | "source";

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Mouse coords
  const mousePos = useRef({ x: -100, y: -100 });
  // Ring lerp coords
  const ringPos = useRef({ x: -100, y: -100 });
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check fine pointer (@media (pointer: fine))
    const pointerQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(pointerQuery.matches);
    const pointerHandler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    pointerQuery.addEventListener("change", pointerHandler);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches) {
      return () => {
        pointerQuery.removeEventListener("change", pointerHandler);
      };
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the dot using transform
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered elements for cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        const val = cursorEl.getAttribute("data-cursor") as CursorType;
        setCursorType(val || "link");
      } else if (target.closest("button, a, [role='button']")) {
        setCursorType("link");
      } else if (target.closest("p, h1, h2, h3, h4, span.prose-text")) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Lerp loop for the smooth ring
    let animationFrameId: number;
    const lerpFactor = motionQuery.matches ? 1.0 : 0.18;

    const render = () => {
      // Lerp ring towards mouse
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      pointerQuery.removeEventListener("change", pointerHandler);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isFinePointer) return null;

  // Render cursor styling depending on state
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Small instant dot: 8px vermilion */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-vermilion transition-transform duration-75 will-change-transform ${
          cursorType === "link" || cursorType === "drop" || cursorType === "upload" || cursorType === "source"
            ? "scale-50 opacity-40"
            : cursorType === "text"
            ? "opacity-0"
            : "scale-100 opacity-100"
        }`}
      />

      {/* Larger smoothed ring with lerp easing */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        {cursorType === "default" && (
          <div
            className={`-ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-vermilion/80 transition-all duration-200 ease-out ${
              isMouseDown ? "scale-75 bg-vermilion/20" : "scale-100"
            }`}
          />
        )}

        {cursorType === "link" && (
          <div
            className={`-ml-8 -mt-8 h-16 w-16 rounded-full border border-vermilion bg-vermilion/15 transition-all duration-200 ease-out ${
              isMouseDown ? "scale-90 bg-vermilion/25" : "scale-100"
            }`}
          />
        )}

        {(cursorType === "drop" || cursorType === "upload") && (
          <div
            className={`-ml-10 -mt-5 flex h-10 w-20 items-center justify-center rounded-full border border-vermilion bg-vermilion px-2 text-[10px] font-mono font-bold tracking-widest text-paper shadow-sm transition-all duration-200 ease-out ${
              isMouseDown ? "scale-90" : "scale-100"
            }`}
          >
            {cursorType === "drop" ? "DROP" : "UPLOAD"}
          </div>
        )}

        {cursorType === "source" && (
          <div
            className={`-ml-11 -mt-4 flex h-8 w-22 items-center justify-center rounded-full border border-vermilion bg-paper px-2 text-[9px] font-mono font-bold tracking-widest text-vermilion shadow-paper transition-all duration-200 ease-out ${
              isMouseDown ? "scale-90" : "scale-100"
            }`}
          >
            ● SOURCE
          </div>
        )}

        {cursorType === "text" && (
          <div
            className={`-ml-[1px] -mt-3.5 h-7 w-[2px] bg-vermilion transition-all duration-150 ease-out ${
              isMouseDown ? "scale-y-75" : "scale-y-100"
            }`}
          />
        )}
      </div>
    </div>
  );
};
