import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import adStreak from "../assets/images/ad_01_streak.webp";
import adBadges from "../assets/images/ad_03_badges.webp";
import adStreakCalendar from "../assets/images/ad_07_streak_calendar.webp";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

interface BadgesGalleryProps {
  lang: Language;
}

const LOCALIZATION = {
  ru: {
    badge: "Геймификация и привычки",
    title: "Награды, стрики и кошачьи лиги",
    subtitle:
      "Превратите скучную рутину подсчёта калорий в захватывающую игру с коллекционными бейджами.",
    features: [
      {
        num: "01",
        title: "Огненная серия (стрик)",
        desc: "Ведите дневник без пропусков. Специальный индикатор «кошачьего пламени» будет расти деление за делением.",
      },
      {
        num: "02",
        title: "Разблокировка бейджей",
        desc: "За 3, 7, 14 и 30 дней подряд открываются уникальные коллекционные значки.",
      },
      {
        num: "03",
        title: "Делитесь в соцсетях",
        desc: "Реальные кошачьи награды: эстетически отрисованные стикеры для социальных сетей.",
      },
    ],
    catQuote:
      "«Твоя серия дней греет моё сердечко лучше самого вкусного паштета! Мяу!»",
    screenshots: [
      { img: adStreak, label: "Серия дней" },
      { img: adBadges, label: "Коллекция бейджей" },
      { img: adStreakCalendar, label: "Календарь прогресса" },
    ],
  },
  en: {
    badge: "Gamification & Healthy Habits",
    title: "Unlock Awards & Streak Milestones",
    subtitle:
      "Turn calorie-counting into an exciting game with collectible badges.",
    features: [
      {
        num: "01",
        title: "Fire streak system",
        desc: "Log your meals daily. The 'kitten warmth' indicator grows with every consecutive day.",
      },
      {
        num: "02",
        title: "Unlock rare badges",
        desc: "Reach 3, 7, 14, and 30-day targets to collect unique cat badges.",
      },
      {
        num: "03",
        title: "Share on social media",
        desc: "Export gorgeous custom stickers of unlocked kittens to share with friends.",
      },
    ],
    catQuote:
      "«Every active day fuels our fire streak warmer than salmon treats! Meow!»",
    screenshots: [
      { img: adStreak, label: "Day streaks" },
      { img: adBadges, label: "Badge collection" },
      { img: adStreakCalendar, label: "Progress calendar" },
    ],
  },
};

export default function BadgesGallery({ lang }: BadgesGalleryProps) {
  const t = LOCALIZATION[lang];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <FadeInItem className="inline-flex items-center gap-2 bg-purple-100/70 py-1.5 px-4 rounded-full text-xs font-bold text-brand-primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          </svg>
          {t.badge}
        </FadeInItem>
        <FadeInItem>
          <h3 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight leading-tight">
            {t.title}
          </h3>
        </FadeInItem>
        <FadeInItem>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </FadeInItem>
      </div>

      {/* Двухколонник: скриншоты слева, текст справа */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: 3 screenshots в стиле Amy — розоватый фон */}
        <FadeInItem direction="left">
          <div className="grid grid-cols-3 gap-3">
            {t.screenshots.map((shot, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group"
              >
                <div className="bg-[#FFF5F0] rounded-[20px] p-3 flex items-center justify-center border border-orange-100/40 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="bg-[#1a1a1a] rounded-[14px] p-[2px] overflow-hidden w-full">
                    <LazyImage
                      src={shot.img}
                      alt={shot.label}
                      loading="lazy"
                      width="200"
                      height="360"
                      wrapperClassName="rounded-[12px] w-full aspect-[9/16] overflow-hidden"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-gray-500 mt-2 text-center">
                  {shot.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeInItem>

        {/* RIGHT: Features list */}
        <div className="space-y-6">
          {t.features.map((feat, idx) => (
            <FadeInItem key={idx} direction="right">
              <div className="flex gap-4 items-start group">
                <span className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-xl shrink-0 text-sm font-bold shadow-sm group-hover:scale-110 transition-transform">
                  {idx + 1}
                </span>
                <div className="pt-0.5">
                  <h4 className="text-base md:text-lg font-display font-bold text-brand-charcoal mb-1 leading-tight">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </FadeInItem>
          ))}

          {/* Cat quote */}
          <FadeInItem>
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-200 relative mt-4">
              <div className="absolute -top-3 -left-2 text-2xl">🔥</div>
              <p className="text-sm text-purple-800 italic font-display font-medium leading-relaxed pl-4">
                {t.catQuote}
              </p>
            </div>
          </FadeInItem>
        </div>
      </div>
    </div>
  );
}
