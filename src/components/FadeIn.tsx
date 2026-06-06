import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * Если true – анимация проигрывается один раз и больше не повторяется.
   * По умолчанию true: блок появляется при прокрутке вниз и больше НЕ
   * переигрывается при прокрутке вверх (контент над текущим экраном остаётся
   * видимым). Нижние, ещё не показанные блоки появляются по мере прокрутки.
   */
  viewOnce?: boolean;
  staggerChildren?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  viewOnce = true,
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
      // once: блок появляется один раз и остаётся видимым (не переигрывается вверх)
      viewport={{ once: viewOnce, margin: "0px 0px -12% 0px", amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
