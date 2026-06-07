import React from "react";
import { motion } from "motion/react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
  target?: string;
  rel?: string;
}

export default function AnimatedButton({
  children,
  className = "",
  onClick,
  href,
  primary = true,
  target,
  rel,
}: AnimatedButtonProps) {
  const baseClasses = `relative overflow-hidden rounded-2xl font-semibold text-sm py-3.5 px-7 transition-all duration-300 cursor-pointer group ${
    primary
      ? "bg-brand-primary text-white shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(124,58,237,0.6)]"
      : "bg-white text-brand-primary border-2 border-purple-100 shadow-sm hover:border-brand-primary hover:shadow-md"
  } ${className}`;

  const content = (
    <>
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {/* Glow ring effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        primary ? "ring-2 ring-brand-secondary/50 ring-offset-2 ring-offset-transparent" : "ring-2 ring-brand-primary/20 ring-offset-2"
      }`} />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}
