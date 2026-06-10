import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import appScreenshot from "../assets/images/yosa_app_screenshot.png";

const HERO_VIDEO_SRC = "/videos/yosa-android-demo.mp4";

interface HeroShowcaseProps {
  lang: Language;
}

/**
 * Hero-визуал в стиле Amy Food Journal:
 * Реалистичная телефонная рамка с автозапускаемым Android UI-видео внутри.
 * Если видео ещё не положили в public/videos, браузер покажет poster-скриншот.
 */
export default function HeroShowcase({ lang }: HeroShowcaseProps) {
  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-gradient-to-br from-pink-200/40 to-orange-100/30 rounded-full blur-[80px] -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative translate-x-8"
      >
        <video
          className="block object-cover"
          style={{
            width: 330,
            borderRadius: 44,
            aspectRatio: "9/16",
            boxShadow: "0 50px 100px -25px rgba(0,0,0,0.25)",
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={appScreenshot}
          aria-label={lang === "ru" ? "Видео интерфейса приложения Йося" : "Yosa app interface video"}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
          <img src={appScreenshot} alt={lang === "ru" ? "Скриншот приложения Йося" : "Yosa app screenshot"} />
        </video>
      </motion.div>
    </div>
  );
}
