import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

// Реальные скриншоты приложения
import adStreak from "../assets/images/ad_01_streak.webp";
import adSettings from "../assets/images/ad_02_settings.webp";
import adBadges from "../assets/images/ad_03_badges.webp";
import adWidget from "../assets/images/ad_04_widget.webp";
import adStreakBadges from "../assets/images/ad_05_streaks_badges.webp";
import adGoals from "../assets/images/ad_06_goals.webp";
import adStreakCalendar from "../assets/images/ad_07_streak_calendar.webp";
import yosaMealTracker from "../assets/images/yosa_meal_tracker.webp";
import yosaDesktopWidget from "../assets/images/yosa_desktop_widget.webp";

interface FeaturesGridProps {
  lang: Language;
}

const LOCALIZATION = {
  ru: {
    badge: "Simple, but powerful 💪",
    title: "Мощные функции для твоих целей",
    subtitle: "Без лишней сложности",
    features: [
      { img: yosaMealTracker, label: "Процесс мышления ИИ" },
      { img: adGoals, label: "Отслеживание целей" },
      { img: adWidget, label: "Виджеты на экране" },
      { img: adSettings, label: "Простое редактирование" },
      { img: adStreak, label: "Стрики и серии" },
      { img: yosaDesktopWidget, label: "Виджет на lock-экране" },
      { img: adBadges, label: "Коллекция бейджей" },
      { img: adStreakBadges, label: "Стрики и награды" },
      { img: adStreakCalendar, label: "Календарь прогресса" },
    ],
  },
  en: {
    badge: "Simple, but powerful 💪",
    title: "Powerful features to help you reach your goals",
    subtitle: "Without the complexity",
    features: [
      { img: yosaMealTracker, label: "AI's thought process" },
      { img: adGoals, label: "Goals at a glance" },
      { img: adWidget, label: "Home & Lock screen widgets" },
      { img: adSettings, label: "Easy editing" },
      { img: adStreak, label: "Streaks and badges" },
      { img: yosaDesktopWidget, label: "Lock screen widget" },
      { img: adBadges, label: "Badge collection" },
      { img: adStreakBadges, label: "Streaks and badges" },
      { img: adStreakCalendar, label: "Progress calendar" },
    ],
  },
};

export default function FeaturesGrid({ lang }: FeaturesGridProps) {
  const t = LOCALIZATION[lang];

  return (
    <section id="feat-grid" className="scroll-mt-24 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <FadeInItem>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal tracking-tight">
            {t.title}
          </h2>
        </FadeInItem>
        <FadeInItem>
          <p className="text-gray-400 text-sm md:text-base">
            {t.subtitle}
          </p>
        </FadeInItem>
      </div>

      {/* Grid 3x3 — как у Amy Food Journal */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {t.features.map((feat, idx) => (
          <FadeInItem key={idx} direction="up">
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group"
            >
              {/* Скриншот в рамке телефона */}
              <div className="bg-[#FFF5F0] rounded-[24px] p-4 md:p-5 flex items-center justify-center aspect-square overflow-hidden border border-orange-100/60 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-full flex items-center justify-center">
                  <LazyImage
                    src={feat.img}
                    alt={feat.label}
                    loading="lazy"
                    width="300"
                    height="520"
                    wrapperClassName="w-[75%] max-w-[160px] aspect-[9/16] rounded-[16px] overflow-hidden shadow-xl border-[3px] border-gray-800"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Label */}
              <p className="text-center text-xs md:text-sm font-semibold text-brand-charcoal mt-3 leading-tight">
                {feat.label}
              </p>
            </motion.div>
          </FadeInItem>
        ))}
      </div>
    </section>
  );
}
