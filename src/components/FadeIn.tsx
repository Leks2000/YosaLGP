import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
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
        duration: 0.8,
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
      viewport={{ once: viewOnce, margin: "1000px 0px -10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
