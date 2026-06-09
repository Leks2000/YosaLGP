import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface FadeInProps {
  key?: React.Key;
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * Если false – анимация проигрывается при каждом появлении в viewport.
   * true = viewOnce (стандартно). Теперь неважно — bidirectional всегда.
   */
  viewOnce?: boolean;
  staggerChildren?: number;
}

/**
 * Bidirectional scroll-reveal:
 * - Вход снизу (скролл вниз) → появляется снизу вверх.
 * - Выход сверху (скролл вверх мимо блока) → уходит вверх.
 * - Память: блок, который уже был показан, при скролле вверх
 *   убирается только если он находится ниже viewport (ещё не видели?
 *   нет, не убираем). Т.е. exit-анимация играет только когда
 *   элемент уходит ВНИЗ (из viewport вниз при scroll-up).
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  viewOnce = false,
  staggerChildren,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"hidden" | "visible" | "exit-up">("hidden");
  // hasPlayed: была ли анимация входа уже сыграна
  const hasPlayedRef = useRef(false);

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Элемент вошёл в viewport → показываем
            hasPlayedRef.current = true;
            setState("visible");
          } else {
            // Элемент вышел из viewport
            if (hasPlayedRef.current) {
              // Определяем: элемент ушёл ВНИЗ (мы скролим вверх)
              // или вверх (мы скролим вниз, ещё не дошли).
              // boundingClientRect.top < 0 → элемент выше viewport (ушёл вверх при scroll-up)
              const rect = el.getBoundingClientRect();
              if (rect.top < 0) {
                // Ушёл выше — exit-up анимация (уходит вверх)
                setState("exit-up");
              } else {
                // Ушёл ниже viewport — возвращаем в hidden для повторного входа
                setState("hidden");
                hasPlayedRef.current = false;
              }
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        staggerChildren: staggerChildren,
      },
    },
    // Уходит вверх — зеркало входа снизу
    "exit-up": {
      opacity: 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      transition: {
        duration: 0.45,
        ease: [0.32, 0, 0.67, 0],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      animate={state}
      initial="hidden"
      className={className}
    >
      {children}
    </motion.div>
  );
}
