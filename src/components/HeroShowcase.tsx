import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";

// Первые 7 рекламных скриншотов приложения
import ad01 from "../assets/images/ad_01_streak.webp";
import ad02 from "../assets/images/ad_02_settings.webp";
import ad03 from "../assets/images/ad_03_badges.webp";
import ad04 from "../assets/images/ad_04_widget.webp";
import ad05 from "../assets/images/ad_05_streaks_badges.webp";
import ad06 from "../assets/images/ad_06_goals.webp";
import ad07 from "../assets/images/ad_07_streak_calendar.webp";

interface HeroShowcaseProps {
  lang: Language;
}

const SLIDES = [
  {
    img: ad01,
    altRu: "Экран серии (стрика) в приложении Йося",
    altEn: "Yosa app streak insights screen",
    captionRu: "Не теряй огонь",
    captionEn: "Keep your fire alive",
  },
  {
    img: ad02,
    altRu: "Настройка целей по калориям и БЖУ",
    altEn: "Calorie and macro goals setup",
    captionRu: "Настрой под себя",
    captionEn: "Tune it to your needs",
  },
  {
    img: ad03,
    altRu: "Коллекция кошачьих бейджей и наград",
    altEn: "Collection of cat reward badges",
    captionRu: "Собирай кошачьи награды",
    captionEn: "Collect cat rewards",
  },
  {
    img: ad04,
    altRu: "Виджет с остатком калорий на экране телефона",
    altEn: "Home screen widget with calories left",
    captionRu: "Виджет на главном экране",
    captionEn: "Home screen widget",
  },
  {
    img: ad05,
    altRu: "Стрики и бейджи в Йосе",
    altEn: "Streaks and badges in Yosa",
    captionRu: "Стрики и бейджи",
    captionEn: "Streaks & badges",
  },
  {
    img: ad06,
    altRu: "Персональные цели и метаболизм BMR/TDEE",
    altEn: "Personal goals and BMR/TDEE metabolism",
    captionRu: "Персональные цели",
    captionEn: "Personal goals",
  },
  {
    img: ad07,
    altRu: "Календарь стрика и дневной прогресс",
    altEn: "Streak calendar and daily progress",
    captionRu: "Календарь прогресса",
    captionEn: "Progress calendar",
  },
];

export default function HeroShowcase({ lang }: HeroShowcaseProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [paused]);

  const current = SLIDES[active];

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Мягкое свечение позади телефона */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-primary/15 rounded-full blur-3xl -z-10 animate-pulse"></div>

      {/* Рамка телефона со скриншотами */}
      <div className="bg-[#1E152A] p-2.5 rounded-[42px] shadow-[0_25px_60px_-15px_rgba(124,58,237,0.45)] relative w-[260px] sm:w-[300px] aspect-[9/19] overflow-hidden border border-white/10">
        {/* Вырез под камеру */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20"></div>

        <div className="w-full h-full rounded-[34px] overflow-hidden relative bg-[#FBF3E4]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={current.img}
              alt={lang === "ru" ? current.altRu : current.altEn}
              loading="eager"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Подпись текущего слайда */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`cap-${active}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="mt-5 text-sm font-display font-bold text-brand-charcoal bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-purple-100"
        >
          {lang === "ru" ? current.captionRu : current.captionEn}
        </motion.span>
      </AnimatePresence>

      {/* Точки-индикаторы / переключатели */}
      <div className="flex items-center gap-2 mt-4">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`Слайд ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === active
                ? "w-6 bg-brand-primary"
                : "w-2 bg-purple-200 hover:bg-purple-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
