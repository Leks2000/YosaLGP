import React from "react";
import { Language } from "../types";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

// Реальные скриншоты приложения
import adStreak from "../assets/images/ad_01_streak.webp";
import adSettings from "../assets/images/ad_02_settings.webp";
import adBadges from "../assets/images/ad_03_badges.webp";
import adWidget from "../assets/images/ad_04_widget.webp";
import adGoals from "../assets/images/ad_06_goals.webp";
import adStreakCalendar from "../assets/images/ad_07_streak_calendar.webp";

interface FeaturesGridProps {
  lang: Language;
}

type FeatureCard = {
  img: string;
  title: string;
  desc: string;
  frameClass: string;
  imageClass: string;
  accent: string;
};

const LOCALIZATION: Record<Language, {
  title: string;
  subtitle: string;
  features: FeatureCard[];
}> = {
  ru: {
    title: "Мощные функции для твоих целей",
    subtitle: "Каждая карточка показывает отдельный сценарий в Йосе — без одинаковых заглушек.",
    features: [
      {
        img: adGoals,
        title: "Персональные цели",
        desc: "Калории, белки, жиры и углеводы подстраиваются под твой план.",
        frameClass: "md:h-[360px] lg:h-[400px]",
        imageClass: "w-[58%] max-w-[220px] aspect-[9/16]",
        accent: "🔥 цели",
      },
      {
        img: adWidget,
        title: "Виджеты на экране",
        desc: "Прогресс видно сразу: стрик, остаток калорий и быстрый контроль дня.",
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[66%] max-w-[250px] aspect-square",
        accent: "⚡ виджет",
      },
      {
        img: adSettings,
        title: "Простое редактирование",
        desc: "Меняй цели и настройки без тяжёлых меню и лишних экранов.",
        frameClass: "md:h-[380px] lg:h-[430px]",
        imageClass: "w-[52%] max-w-[210px] aspect-[9/16]",
        accent: "⚙️ настройка",
      },
      {
        img: adStreak,
        title: "Не теряй огонь",
        desc: "Серия дней превращает питание в понятную ежедневную привычку.",
        frameClass: "md:h-[330px] lg:h-[370px]",
        imageClass: "w-[62%] max-w-[240px] aspect-[9/16]",
        accent: "🔥 стрик",
      },
      {
        img: adBadges,
        title: "Кошачьи награды",
        desc: "Открывай бейджи за прогресс и собирай милую коллекцию Йоси.",
        frameClass: "md:h-[350px] lg:h-[390px]",
        imageClass: "w-[56%] max-w-[220px] aspect-[9/16]",
        accent: "🐾 бейджи",
      },
      {
        img: adStreakCalendar,
        title: "Календарь прогресса",
        desc: "Смотри активные дни, лучший стрик и награды в одном месте.",
        frameClass: "md:h-[320px] lg:h-[360px]",
        imageClass: "w-[54%] max-w-[215px] aspect-[9/16]",
        accent: "📅 календарь",
      },
    ],
  },
  en: {
    title: "Powerful features to help you reach your goals",
    subtitle: "Every card shows a different Yosa scenario — no repeated placeholders.",
    features: [
      {
        img: adGoals,
        title: "Personal goals",
        desc: "Calories, protein, fats, and carbs adjust around your plan.",
        frameClass: "md:h-[360px] lg:h-[400px]",
        imageClass: "w-[58%] max-w-[220px] aspect-[9/16]",
        accent: "🔥 goals",
      },
      {
        img: adWidget,
        title: "Home widgets",
        desc: "See streaks, calories left, and day progress at a glance.",
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[66%] max-w-[250px] aspect-square",
        accent: "⚡ widget",
      },
      {
        img: adSettings,
        title: "Easy editing",
        desc: "Change targets and settings without heavy menus.",
        frameClass: "md:h-[380px] lg:h-[430px]",
        imageClass: "w-[52%] max-w-[210px] aspect-[9/16]",
        accent: "⚙️ tune",
      },
      {
        img: adStreak,
        title: "Keep the fire",
        desc: "Daily streaks turn nutrition into a simple habit loop.",
        frameClass: "md:h-[330px] lg:h-[370px]",
        imageClass: "w-[62%] max-w-[240px] aspect-[9/16]",
        accent: "🔥 streak",
      },
      {
        img: adBadges,
        title: "Cat rewards",
        desc: "Unlock badges for progress and build a cute Yosa collection.",
        frameClass: "md:h-[350px] lg:h-[390px]",
        imageClass: "w-[56%] max-w-[220px] aspect-[9/16]",
        accent: "🐾 badges",
      },
      {
        img: adStreakCalendar,
        title: "Progress calendar",
        desc: "Review active days, best streaks, and rewards in one place.",
        frameClass: "md:h-[320px] lg:h-[360px]",
        imageClass: "w-[54%] max-w-[215px] aspect-[9/16]",
        accent: "📅 calendar",
      },
    ],
  },
};

export default function FeaturesGrid({ lang }: FeaturesGridProps) {
  const t = LOCALIZATION[lang];

  return (
    <section id="feat-grid" className="scroll-mt-24 space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12 xl:gap-14">
        {t.features.map((feat, idx) => (
          <FadeInItem key={idx} direction="up">
            <article className="group h-full">
              <div
                className={`bg-gradient-to-br from-[#FFF7F1] via-[#FFF1E8] to-[#FFE9D7] rounded-[28px] p-5 md:p-6 flex items-center justify-center overflow-hidden border border-orange-100/70 shadow-sm relative ${feat.frameClass}`}
              >
                <div className="absolute inset-x-8 top-8 h-20 rounded-full bg-white/35 blur-2xl" />
                <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-orange-200/20 blur-xl" />
                <span className="absolute left-5 top-5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold text-brand-primary shadow-sm">
                  {feat.accent}
                </span>
                <LazyImage
                  src={feat.img}
                  alt={feat.title}
                  loading="lazy"
                  width="300"
                  height="520"
                  wrapperClassName={`${feat.imageClass} rounded-[20px] overflow-hidden shadow-2xl border-[3px] border-gray-800 relative z-10 bg-white`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-5 text-center max-w-xs mx-auto">
                <h3 className="text-lg md:text-xl font-display font-bold text-brand-charcoal leading-tight">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </article>
          </FadeInItem>
        ))}
      </div>
    </section>
  );
}
