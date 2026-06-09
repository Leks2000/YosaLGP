import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import appScreenshot from "../assets/images/yosa_app_screenshot.png";

interface HeroShowcaseProps {
  lang: Language;
}

/**
 * Hero-визуал в стиле Amy Food Journal:
 * Реалистичная рамка iPhone с реальным скриншотом приложения внутри.
 * Без видеозаглушки — чистый минималистичный стиль.
 */
export default function HeroShowcase({ lang }: HeroShowcaseProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Soft ambient glow — light pink/peach like Amy */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-gradient-to-br from-pink-200/40 to-orange-100/30 rounded-full blur-[80px] -z-10" />

      {/* iPhone Frame — clean white-screen style like Amy */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative"
      >
        {/* Phone shell — rounded corners, dark bezel */}
        <div
          className="relative bg-black rounded-[44px] shadow-2xl overflow-hidden"
          style={{
            width: 280,
            border: "10px solid #1a1a1a",
            boxShadow: "0 50px 100px -25px rgba(0,0,0,0.25), 0 25px 50px -15px rgba(0,0,0,0.15)",
          }}
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-40" />

          {/* Screenshot image fills the screen */}
          <img
            src={appScreenshot}
            alt={lang === "ru" ? "Скриншот приложения Йося" : "Yosa app screenshot"}
            className="w-full h-auto block rounded-[34px]"
            loading="eager"
          />

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-white/30 rounded-full z-30" />
        </div>

        {/* Floating streak badge — like Amy's */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-8 top-12 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-gray-100"
        >
          <span className="text-lg">🔥</span>
          <div>
            <div className="text-[10px] text-gray-400 font-medium">{lang === "ru" ? "Стрик" : "Streak"}</div>
            <div className="text-sm font-bold text-brand-charcoal">1 {lang === "ru" ? "день" : "day"}</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
