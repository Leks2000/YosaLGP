import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  key?: React.Key;
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * Если false – анимация проигрывается при каждом появлении в viewport.
   * Блоки появляются при скролле вниз и скрываются при скролле вверх.
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
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
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
        duration: 0.6,
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
      viewport={{ once: viewOnce, margin: "0px 0px -10% 0px", amount: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
