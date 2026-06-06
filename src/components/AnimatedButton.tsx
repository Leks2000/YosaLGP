import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
}

export default function AnimatedButton({
  children,
  className = "",
  onClick,
  primary = true,
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`relative overflow-hidden ${
        primary
          ? "bg-brand-primary text-white shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)]"
          : "bg-white text-brand-primary border border-purple-100 shadow-sm"
      } ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
