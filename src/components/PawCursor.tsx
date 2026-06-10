import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

interface PawCursorProps {
  enabled: boolean;
}

interface ClickTrail {
  id: number;
  x: number;
  y: number;
  isLeft: boolean;
}

export default function PawCursor({ enabled }: PawCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 520, damping: 38, mass: 0.35 });
  const smoothY = useSpring(cursorY, { stiffness: 520, damping: 38, mass: 0.35 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [trails, setTrails] = useState<ClickTrail[]>([]);
  const trailIdRef = useRef(0);
  const isLeftStep = useRef(true);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    const updateMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 14);
      cursorY.set(e.clientY - 14);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleClick = (e: MouseEvent) => {
      const newTrail = {
        id: trailIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        isLeft: isLeftStep.current,
      };
      isLeftStep.current = !isLeftStep.current;
      setTrails((prev) => [...prev, newTrail].slice(-8)); // Limit to max 8 trails

      // Auto cleanup trail after 1 sec
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 1000);
    };

    // Watch hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "A" ||
        target?.tagName === "BUTTON" ||
        target?.closest("button") ||
        target?.closest("a") ||
        target?.getAttribute("role") === "button" ||
        target?.tagName === "INPUT" ||
        target?.tagName === "SELECT"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Click Trails (Fading Prints) */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: trail.isLeft ? -25 : 25,
            }}
            animate={{
              opacity: 0.7,
              scale: 1.2,
              y: -5,
              rotate: trail.isLeft ? -15 : 15,
            }}
            exit={{ opacity: 0, scale: 1.5, y: -15 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: trail.x - (trail.isLeft ? 24 : 8), // offset so left/right step makes sense
              top: trail.y - 12,
              transformOrigin: "center center",
            }}
            className="text-lg select-none filter drop-shadow-md z-[9998]"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-brand-primary"
              xmlns="http://www.w3.org/2000/svg"
              opacity="0.5"
            >
              <path d="M12,12 C9.79,12 8,13.79 8,16 C8,18.21 9.79,20 12,20 C14.21,20 16,18.21 16,16 C16,13.79 14.21,12 12,12 Z" />
              <circle cx="8" cy="8" r="2" />
              <circle cx="12" cy="6" r="2" />
              <circle cx="16" cy="8" r="2" />
              <circle cx="6" cy="11" r="1.5" />
              <circle cx="18" cy="11" r="1.5" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cat Paw Cursor — premium smooth follow via Motion spring values. */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
        }}
        className="w-8 h-8"
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.15 : isClicked ? 0.85 : 1,
            rotate: isHovering ? -15 : 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ transformOrigin: "center center" }}
          className="w-8 h-8 flex items-center justify-center filter drop-shadow-md"
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-full h-full drop-shadow-sm transition-colors duration-300 ${
              isHovering ? "fill-brand-secondary" : "fill-brand-primary"
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12,12 C9.79,12 8,13.79 8,16 C8,18.21 9.79,20 12,20 C14.21,20 16,18.21 16,16 C16,13.79 14.21,12 12,12 Z" />
            <circle cx="8" cy="8" r="2" />
            <circle cx="12" cy="6" r="2" />
            <circle cx="16" cy="8" r="2" />
            <circle cx="6" cy="11" r="1.5" />
            <circle cx="18" cy="11" r="1.5" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
