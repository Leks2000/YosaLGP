import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import rewardsBadgesImg from "../assets/images/yosa_rewards_badges.webp";
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
    intro:
      "Главный секрет успеха в контроле веса – это регулярность. В приложении Йося каждая неделя вашей активности вознаграждается редкими кошачьими трофеями и праздничными медалями.",
    streakTitle: "Как работает система поощрений стрика активности:",
    streaks: [
      "Огненная серия (стрик): ведите дневник без пропусков. Специальный индикатор «кошачьего пламени» будет расти деление за делением, согревая кота.",
      "Разблокировка редких бейджей: за 3, 7, 14 и 30 дней подряд открываются уникальные коллекционные значки («Кошачий неофит», «Нутри-Самурай», «Великий Леопольд» и другие).",
      "Реальные кошачьи награды: делитесь своими триумфами в социальных сетях с помощью эстетически отрисованных стикеров.",
    ],
    motto:
      "«Твоя серия дней греет моё сердечко лучше самого вкусного паштета! Давай не угасать наше ИИ-пламя привычек, хозяин! Мяу!»",
    imageAlt: "Коллекция бейджей и наград в Йосе",
  },
  en: {
    badge: "Gamification & Healthy Habits",
    title: "Unlock Awards & Streak milestones",
    subtitle:
      "Turn calorie-counting into an exciting virtual pet RPG progression containing precious rare artifacts.",
    intro:
      "The fundamental engine of nutritional adaptation is daily, solid consistency. To encourage your weekly habit cycles, Yosa releases adorable cat medals, golden stickers, and limited-edition trophies.",
    streakTitle: "Feline streak system mechanics:",
    streaks: [
      "Sparkling fire streak: enter just one ingredient daily to fuel the interactive 'kitten warmth' burner indicator on your overlay views.",
      "Unlock ultra-rare cat cards: reach 3, 7, 14, and 30-day continuous targets to collect prestigious feline titles ('Kitten Explorer', 'Soup Scholar', 'Nutri Samurai', and 'Grand Leopold').",
      "Show off on social cards: export gorgeous, high-contrast custom stickers of unlocked kittens to share with friends and diet buddies.",
    ],
    motto:
      "«Every consecutive active day you document fuels our fire streak warmer than premium salmon treats! Let's keep the logging rhythm buzzing, human! Meow!»",
    imageAlt: "Yosa adorable kitten achievement badges mockup",
  },
};

export default function BadgesGallery({ lang }: BadgesGalleryProps) {
  const t = LOCALIZATION[lang];

  return (
    <div className="space-y-12">
      {/* Заголовок – центрирован */}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Скриншоты – горизонтальный скролл на мобиле, стопка на десктопе */}
        <FadeInItem direction="left" className="relative">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
            {[
              { img: adStreak, label: lang === "ru" ? "Серия дней" : "Daily streak", rotate: -3 },
              { img: adBadges, label: lang === "ru" ? "Коллекция бейджей" : "Badge collection", rotate: 2 },
              { img: adStreakCalendar, label: lang === "ru" ? "Календарь прогресса" : "Progress calendar", rotate: -1 },
            ].map((shot, idx) => (
              <motion.div
                key={idx}
                initial={{ rotate: shot.rotate }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="flex-shrink-0 snap-center w-40 lg:w-full bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-3 border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-[#1E152A] p-1 rounded-[14px] shadow-lg">
                  <LazyImage
                    src={shot.img}
                    alt={shot.label}
                    loading="lazy"
                    width="360"
                    height="640"
                    wrapperClassName="rounded-[10px] w-full aspect-[9/16]"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
                <p className="text-xs font-semibold text-brand-primary mt-2 text-center">{shot.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeInItem>

        {/* Правая колонка – текст и мотто */}
        <div className="space-y-6">
          <FadeInItem>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">{t.intro}</p>
          </FadeInItem>

          <div className="space-y-3">
            {t.streaks.map((streak, idx) => (
              <FadeInItem key={idx}>
                <div className="flex gap-3 items-start bg-gradient-to-r from-purple-50/60 to-transparent p-3 rounded-xl border-l-3 border-l-brand-primary">
                  <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-lg shrink-0 text-xs font-bold shadow-sm">
                    {idx + 1}
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 leading-relaxed">{streak}</span>
                </div>
              </FadeInItem>
            ))}
          </div>

          {/* Мотивационная цитата Йоси */}
          <FadeInItem>
            <div className="relative bg-gradient-to-r from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-200">
              <div className="absolute -top-3 -left-2 text-3xl">🔥</div>
              <p className="text-sm text-purple-800 italic font-display font-medium leading-relaxed pl-4">
                {t.motto}
              </p>
            </div>
          </FadeInItem>

          {/* Главное изображение наград */}
          <FadeInItem variant="zoom" className="flex justify-center lg:justify-start">
            <div className="bg-gradient-to-tr from-purple-50/50 to-violet-50/50 p-3 rounded-[30px] border border-purple-100 shadow-inner">
              <LazyImage
                src={rewardsBadgesImg}
                alt={t.imageAlt}
                referrerPolicy="no-referrer"
                width="620"
                height="1100"
                wrapperClassName="rounded-[22px] max-w-[240px] w-full border border-white shadow-xl"
                className="w-full h-auto object-contain"
              />
            </div>
          </FadeInItem>
        </div>
      </div>
    </div>
  );
}
