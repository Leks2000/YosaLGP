import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Wifi, BatteryFull, Signal } from "lucide-react";
import { Language } from "../types";

interface HeroShowcaseProps {
  lang: Language;
}

/**
 * Hero-визуал: реалистичная рамка iPhone с большой ЗАГЛУШКОЙ ВИДЕО внутри.
 * Никакой карусели скриншотов — только премиальная видео-заглушка
 * (Dynamic Island, статус-бар iOS, стеклянная кнопка play с пульсацией).
 */
export default function HeroShowcase({ lang }: HeroShowcaseProps) {
  const [hovered, setHovered] = useState(false);

  const t = {
    ru: {
      badge: "Демо приложения",
      title: "Заглушка для видео",
      subtitle: "Здесь будет красиво крутиться промо-ролик Йоси",
      now: "9:41",
      cta: "Смотреть демо",
    },
    en: {
      badge: "App demo",
      title: "Video placeholder",
      subtitle: "Your beautiful Yosa promo reel will loop right here",
      now: "9:41",
      cta: "Watch demo",
    },
  }[lang];

  return (
    <div className="relative flex flex-col items-center">
      {/* Амбиентное многослойное свечение позади телефона */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-primary/25 rounded-full blur-[90px] -z-10"
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-400/15 rounded-full blur-[80px] -z-10" />

      {/* Парящие декоративные эмодзи-частицы вокруг телефона */}
      <motion.span
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-2 text-3xl select-none drop-shadow-lg hidden sm:block"
      >
        🔥
      </motion.span>
      <motion.span
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-12 -right-3 text-3xl select-none drop-shadow-lg hidden sm:block"
      >
        🐾
      </motion.span>
      <motion.span
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 -left-4 text-2xl select-none drop-shadow-lg hidden sm:block"
      >
        ✨
      </motion.span>

      {/* Рамка телефона (титановый корпус iPhone) */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -8, rotate: 0 }}
        initial={{ rotate: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative w-[270px] sm:w-[310px] aspect-[9/19.5] rounded-[48px] bg-gradient-to-br from-[#2a2336] via-[#1E152A] to-[#0f0a17] p-[10px] shadow-[0_35px_70px_-20px_rgba(124,58,237,0.55)] border border-white/10 cursor-pointer group"
      >
        {/* Боковые кнопки громкости / питания */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-[#3a3147] rounded-l-md" />
        <div className="absolute -left-[3px] top-40 w-[3px] h-14 bg-[#3a3147] rounded-l-md" />
        <div className="absolute -right-[3px] top-36 w-[3px] h-20 bg-[#3a3147] rounded-r-md" />

        {/* Экран */}
        <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gradient-to-br from-[#1b1230] via-[#241640] to-[#120b22]">
          {/* iOS статус-бар */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 pt-3.5 text-white text-[11px] font-semibold">
            <span className="tracking-tight">{t.now}</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryFull className="w-4 h-4" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-40 flex items-center justify-end pr-2.5">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] ring-1 ring-white/10" />
          </div>

          {/* Контент заглушки */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            {/* Бегущие линии «загрузки кадров» как намёк на видео */}
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-[0.07] bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white to-transparent"
            />

            <span className="mb-5 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-purple-200">
              ● {t.badge}
            </span>

            {/* Большая стеклянная кнопка Play с пульсирующими кольцами */}
            <div className="relative flex items-center justify-center mb-6">
              <motion.span
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-24 h-24 rounded-full border border-brand-primary/50"
              />
              <motion.span
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="absolute w-24 h-24 rounded-full border border-brand-primary/50"
              />
              <motion.div
                animate={hovered ? { scale: 1.12 } : { scale: 1 }}
                className="relative w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-inner">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </motion.div>
            </div>

            <h3 className="text-white font-display font-bold text-lg leading-tight">
              {t.title}
            </h3>
            <p className="text-purple-200/70 text-[11px] mt-2 leading-relaxed max-w-[180px] font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Нижняя «таймлайн-полоска» как у видеоплеера */}
          <div className="absolute bottom-8 inset-x-6 z-20">
            <div className="h-1 rounded-full bg-white/15 overflow-hidden">
              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[9px] text-white/50 font-medium">
              <span>0:00</span>
              <span>{t.cta}</span>
            </div>
          </div>

          {/* iOS home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30" />
        </div>
      </motion.div>
    </div>
  );
}
