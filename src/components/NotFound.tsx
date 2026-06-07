import React from "react";
import { motion } from "motion/react";
import yosaStretch from "../assets/images/yosa_stretch.webp";

interface NotFoundProps {
  lang?: "ru" | "en";
}

export default function NotFound({ lang = "ru" }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-brand-cream/40 bg-grid flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-6 max-w-md"
      >
        {/* Floating cat animation */}
        <motion.img
          src={yosaStretch}
          alt="Yosa cat"
          className="w-24 h-24 mx-auto"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 404 number */}
        <h1 className="text-8xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-brand-secondary leading-none">
          404
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-display font-bold text-brand-charcoal">
            {lang === "ru" ? "Ой! Страница не найдена" : "Oops! Page not found"}
          </h2>
          <p className="text-gray-400 text-sm">
            {lang === "ru"
              ? "Кажется, Йося потерялся и не может найти эту страницу. Мяу..."
              : "Looks like Yosa got lost and can't find this page. Meow..."}
          </p>
        </div>

        {/* Back button */}
        <motion.a
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          href="/"
          className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold text-sm py-3 px-6 rounded-2xl shadow-lg hover:shadow-[0_16px_32px_-8px_rgba(124,58,237,0.5)] transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="relative z-10">
            {lang === "ru" ? "Вернуться на главную" : "Back to home"}
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
}
