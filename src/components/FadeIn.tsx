import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface FadeInProps {
  key?: React.Key;
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * ID для запоминания проигрывания анимации в sessionStorage.
   * Если указан — анимация не будет повторно играть при повторном скролле в одной сессии.
   */
  persistId?: string;
  staggerChildren?: number;
}

/**
 * Bidirectional scroll-reveal с СИСТЕМОЙ ЗАПОМИНАНИЯ:
 * - Вход: появляется при попадании в viewport
 * - Выход: уходит вверх при скролле вверх мимо блока
 * - Запоминание: если persistId задан — анимация входа играет один раз за сессию,
 *   при повторном попадании блок просто показывается мгновенно.
 * - Exit-анимация: все плашки плавно уходят при скролле вверх
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  persistId,
  staggerChildren,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const lastScrollY = useRef(0);

  // Check if animation was already played (sessionStorage)
  const wasPlayed = useCallback(() => {
    if (!persistId) return false;
    try {
      return sessionStorage.getItem(`fadein-${persistId}`) === "1";
    } catch {
      return false;
    }
  }, [persistId]);

  const markPlayed = useCallback(() => {
    if (!persistId) return;
    try {
      sessionStorage.setItem(`fadein-${persistId}`, "1");
    } catch {}
  }, [persistId]);

  const [state, setState] = useState<"hidden" | "visible" | "exit-up">(() => {
    // Если анимация уже была проиграна в этой сессии — сразу visible
    if (wasPlayed()) return "visible";
    return "hidden";
  });

  const directionOffsets = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 },
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already played in session, mark as played
    if (wasPlayed()) {
      hasPlayedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasPlayedRef.current = true;
            setState("visible");
            markPlayed();
          } else {
            if (hasPlayedRef.current) {
              const rect = el.getBoundingClientRect();
              if (rect.top < 0) {
                // Ушёл выше viewport — exit-up
                setState("exit-up");
              } else {
                // Ушёл ниже viewport
                if (!persistId) {
                  setState("hidden");
                  hasPlayedRef.current = false;
                }
                // Если persistId — не убираем, оставляем visible
              }
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [wasPlayed, markPlayed, persistId]);

  // Re-enter: если элемент был в exit-up и вернулся в viewport
  useEffect(() => {
    if (state !== "exit-up") return;
    const el = ref.current;
    if (!el) return;

    const reEnterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && state === "exit-up") {
            setState("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    reEnterObserver.observe(el);
    return () => reEnterObserver.disconnect();
  }, [state]);

  const variants = {
    hidden: {
      opacity: 0,
      ...directionOffsets[direction],
      transition: { duration: 0.01 },
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.65,
        delay: wasPlayed() ? 0 : delay, // No delay if already played
        ease: [0.21, 0.47, 0.32, 0.98],
        staggerChildren: staggerChildren,
      },
    },
    "exit-up": {
      opacity: 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      transition: {
        duration: 0.45,
        ease: [0.32, 0, 0.67, 0],
        staggerChildren: staggerChildren ? staggerChildren * 0.5 : undefined,
        staggerDirection: -1, // Reverse stagger on exit
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      animate={state}
      initial={wasPlayed() ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
