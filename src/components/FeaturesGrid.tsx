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

interface FeaturesGridProps {
  lang: Language;
}

const LOCALIZATION = {
  ru: {
    badge: "Simple, but powerful 💪",
    title: "Мощные функции для твоих целей",
    subtitle: "Без лишней сложности",
    features: [
      { img: adGoals, label: "Отслеживание целей" },
      { img: adWidget, label: "Виджеты на экране" },
      { img: adSettings, label: "Простое редактирование" },
      { img: adStreak, label: "Стрики и серии" },
      { img: adBadges, label: "Коллекция бейджей" },
      { img: adStreakCalendar, label: "Стрики, награды и календарь" },
    ],
  },
  en: {
    badge: "Simple, but powerful 💪",
    title: "Powerful features to help you reach your goals",
    subtitle: "Without the complexity",
    features: [
      { img: adGoals, label: "Goals at a glance" },
      { img: adWidget, label: "Home screen widgets" },
      { img: adSettings, label: "Easy editing" },
      { img: adStreak, label: "Streaks and badges" },
      { img: adBadges, label: "Badge collection" },
      { img: adStreakCalendar, label: "Streaks, rewards & calendar" },
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

      {/* Grid — стиль Amy Food Journal с тёплым фоном как на референсе изображение 10 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {t.features.map((feat, idx) => (
          <FadeInItem key={idx} direction="up">
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group"
            >
              {/* Скриншот в рамке — увеличенный размер, тёплый градиентный фон */}
              <div className="bg-gradient-to-br from-[#FFF5EE] via-[#FFF0E8] to-[#FFE8D6] rounded-[24px] p-4 md:p-5 flex items-center justify-center aspect-[3/4] overflow-hidden border border-orange-100/60 shadow-sm group-hover:shadow-xl group-hover:shadow-orange-100/40 transition-all duration-300 relative">
                {/* Subtle decorative circles in background */}
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-orange-200/20 blur-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-pink-200/20 blur-lg" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <LazyImage
                    src={feat.img}
                    alt={feat.label}
                    loading="lazy"
                    width="300"
                    height="520"
                    wrapperClassName="w-[85%] max-w-[200px] aspect-[9/16] rounded-[18px] overflow-hidden shadow-2xl border-[3px] border-gray-800"
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
