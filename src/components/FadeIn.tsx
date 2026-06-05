import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * Если true — анимация проигрывается один раз и больше не повторяется.
   * По умолчанию false: плашки появляются при прокрутке вниз и плавно
   * исчезают вниз при прокрутке вверх (двусторонняя анимация).
   */
  viewOnce?: boolean;
  staggerChildren?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  viewOnce = false,
  staggerChildren,
}: FadeInProps) {
  const directionOffsets = {
    up: { y: 70, x: 0 },
    down: { y: -70, x: 0 },
    left: { x: 70, y: 0 },
    right: { x: -70, y: 0 },
    none: { x: 0, y: 0 },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      ...directionOffsets[direction],
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        staggerChildren: staggerChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // margin: запускаем анимацию когда блок входит в зону видимости,
      // и возвращаем в hidden когда он её покидает (вверх или вниз)
      viewport={{ once: viewOnce, margin: "-10% 0px -10% 0px", amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
