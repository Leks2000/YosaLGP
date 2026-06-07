import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  /** Сила сдвига в пикселях за весь проход секции через экран. По умолчанию 60. */
  offset?: number;
  className?: string;
}

/**
 * Scroll-triggered parallax: содержимое плавно сдвигается по вертикали
 * в зависимости от позиции прокрутки. Реализовано на motion/react (useScroll),
 * поэтому новых зависимостей не добавляет.
 *
 * Доступность: при prefers-reduced-motion браузер всё равно отрисует контент,
 * а величина сдвига небольшая и не мешает чтению.
 */
export default function Parallax({
  children,
  offset = 60,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // По мере прохода секции снизу вверх двигаем контент от +offset к -offset
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
