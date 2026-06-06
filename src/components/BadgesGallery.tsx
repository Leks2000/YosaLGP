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
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-purple-100 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/30 rounded-full blur-2xl -z-10 animate-pulse"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column: descriptions and bullet lists */}
        <div className="lg:col-span-7 space-y-6">
          <FadeInItem className="inline-flex items-center gap-2 bg-purple-100/70 py-1 px-3.5 rounded-full text-xs font-bold text-brand-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            {t.badge}
          </FadeInItem>

          <FadeInItem>
            <h3 className="text-2xl md:text-4xl font-display font-semibold text-brand-charcoal tracking-tight leading-tight">
              {t.title}
            </h3>
          </FadeInItem>

          <FadeInItem>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {t.subtitle}
            </p>
          </FadeInItem>

          <FadeInItem>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              {t.intro}
            </p>
          </FadeInItem>

          <div className="space-y-3.5 pt-2">
            <FadeInItem>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-brand-charcoal">
                {t.streakTitle}
              </h4>
            </FadeInItem>
            <div className="space-y-3.5">
              {t.streaks.map((streak, idx) => (
                <FadeInItem
                  key={idx}
                  className="flex gap-2.5 items-start text-xs md:text-sm text-gray-500"
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-lg shrink-0 mt-0.5 text-[11px] font-display font-bold shadow-sm">
                    {idx + 1}
                  </span>
                  <span>{streak}</span>
                </FadeInItem>
              ))}
            </div>
          </div>

          {/* Golden quote comment from cat Yosa */}
          <FadeInItem className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 border-l-4 border-l-brand-primary text-xs md:text-sm text-purple-700 italic">
            <p className="font-display font-medium leading-relaxed">
              {t.motto}
            </p>
          </FadeInItem>
        </div>

        {/* Right column: badges image demonstration mockup */}
        <FadeInItem variant="zoom" className="lg:col-span-5 flex justify-center">
          <div className="bg-gradient-to-tr from-amber-50/30 to-purple-100/30 p-4 rounded-[42px] border border-purple-100 shadow-inner group overflow-hidden">
            <LazyImage
              src={rewardsBadgesImg}
              alt={t.imageAlt}
              referrerPolicy="no-referrer"
              width="620"
              height="1100"
              wrapperClassName="rounded-[30px] max-w-[300px] md:max-w-[340px] w-full border border-white shadow-2xl"
              className="w-full h-auto object-contain transform group-hover:scale-105 duration-500"
            />
          </div>
        </FadeInItem>
      </div>

      {/* Реальные кадры приложения раскиданы хаотично — разные размеры, наклоны и высоты */}
      <div className="relative z-10 mt-12 h-[420px] md:h-[520px] max-w-3xl mx-auto hidden sm:block">
        {[
          {
            img: adStreak,
            ru: "Серия дней",
            en: "Daily streak",
            v: "left" as const,
            rotate: -7,
            pos: "left-2 md:left-6 top-16 md:top-24 w-36 md:w-44",
          },
          {
            img: adBadges,
            ru: "Коллекция бейджей",
            en: "Badge collection",
            v: "up" as const,
            rotate: 5,
            pos: "left-[40%] -translate-x-1/2 top-0 w-44 md:w-56 z-20",
          },
          {
            img: adStreakCalendar,
            ru: "Календарь прогресса",
            en: "Progress calendar",
            v: "right" as const,
            rotate: 8,
            pos: "right-2 md:right-10 top-28 md:top-36 w-36 md:w-48",
          },
        ].map((shot, idx) => (
          <FadeInItem
            key={idx}
            direction={shot.v}
            variant="rotate"
            className={`absolute ${shot.pos} group`}
          >
            <motion.div
              initial={{ rotate: shot.rotate }}
              whileHover={{ rotate: 0, scale: 1.05, y: -8, zIndex: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="bg-[#1E152A] p-1.5 rounded-[22px] shadow-2xl border border-white/10"
            >
              <LazyImage
                src={shot.img}
                alt={lang === "ru" ? shot.ru : shot.en}
                loading="lazy"
                width="360"
                height="640"
                wrapperClassName="rounded-[16px] w-full aspect-[9/16]"
                className="w-full h-full object-contain bg-white"
              />
            </motion.div>
          </FadeInItem>
        ))}
      </div>

      {/* Мобильный fallback — компактный горизонтальный ряд */}
      <div className="relative z-10 mt-10 grid grid-cols-3 gap-3 max-w-md mx-auto sm:hidden">
        {[adStreak, adBadges, adStreakCalendar].map((img, idx) => (
          <div
            key={idx}
            className="bg-[#1E152A] p-1 rounded-[18px] shadow-lg border border-white/10"
          >
            <LazyImage
              src={img}
              alt={t.imageAlt}
              loading="lazy"
              width="180"
              height="320"
              wrapperClassName="rounded-[13px] w-full aspect-[9/16]"
              className="w-full h-full object-contain bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
