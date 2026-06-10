import React from "react";
import { motion } from "motion/react";

interface FadeInItemProps {
  key?: React.Key;
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Уникальный вариант появления плашки */
  variant?: "slide" | "zoom" | "rotate" | "blur";
}

export default function FadeInItem({
  children,
  className = "",
  direction = "up",
  variant = "slide",
}: FadeInItemProps) {
  const directionOffsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const hiddenByVariant: Record<string, Record<string, unknown>> = {
    slide: { ...directionOffsets[direction], opacity: 0 },
    zoom: { scale: 0.8, opacity: 0 },
    rotate: { rotate: direction === "left" ? -8 : 8, y: 30, opacity: 0 },
    blur: { y: 30, opacity: 0, filter: "blur(8px)" },
  };

  const itemVariants = {
    hidden:
      variant === "blur"
        ? { opacity: 0, y: 30, filter: "blur(8px)" }
        : hiddenByVariant[variant],
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.38,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
    "exit-up": {
      opacity: 0,
      y: -35,
      transition: {
        duration: 0.24,
        ease: [0.32, 0, 0.67, 0],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
