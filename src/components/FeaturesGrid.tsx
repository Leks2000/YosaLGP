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
  frameClass: string;
  imageClass: string;
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
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[42%] max-w-[160px] aspect-[9/16]",
      },
      {
        img: adWidget,
        frameClass: "md:h-[260px] lg:h-[300px]",
        imageClass: "w-[50%] max-w-[190px] aspect-square",
      },
      {
        img: adSettings,
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[40%] max-w-[155px] aspect-[9/16]",
      },
      {
        img: adStreak,
        frameClass: "md:h-[280px] lg:h-[320px]",
        imageClass: "w-[44%] max-w-[170px] aspect-[9/16]",
      },
      {
        img: adBadges,
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[42%] max-w-[160px] aspect-[9/16]",
      },
      {
        img: adStreakCalendar,
        frameClass: "md:h-[280px] lg:h-[320px]",
        imageClass: "w-[40%] max-w-[155px] aspect-[9/16]",
      },
    ],
  },
  en: {
    title: "Powerful features to help you reach your goals",
    subtitle: "Every card shows a different Yosa scenario — no repeated placeholders.",
    features: [
      {
        img: adGoals,
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[42%] max-w-[160px] aspect-[9/16]",
      },
      {
        img: adWidget,
        frameClass: "md:h-[260px] lg:h-[300px]",
        imageClass: "w-[50%] max-w-[190px] aspect-square",
      },
      {
        img: adSettings,
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[40%] max-w-[155px] aspect-[9/16]",
      },
      {
        img: adStreak,
        frameClass: "md:h-[280px] lg:h-[320px]",
        imageClass: "w-[44%] max-w-[170px] aspect-[9/16]",
      },
      {
        img: adBadges,
        frameClass: "md:h-[300px] lg:h-[340px]",
        imageClass: "w-[42%] max-w-[160px] aspect-[9/16]",
      },
      {
        img: adStreakCalendar,
        frameClass: "md:h-[280px] lg:h-[320px]",
        imageClass: "w-[40%] max-w-[155px] aspect-[9/16]",
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
                <LazyImage
                  src={feat.img}
                  alt=""
                  loading="lazy"
                  width="300"
                  height="520"
                  wrapperClassName={`${feat.imageClass} rounded-[20px] overflow-hidden shadow-2xl border-[3px] border-gray-800 relative z-10 bg-white`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </article>
          </FadeInItem>
        ))}
      </div>
    </section>
  );
}
