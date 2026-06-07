import React from "react";
import { motion } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
}: TextRevealProps) {
  // split text to words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "1000px 0px -10% 0px" }}
      style={{ display: "inline-block" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
