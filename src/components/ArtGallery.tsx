import React from "react";
import { motion } from "motion/react";
import { Sparkles, Palette } from "lucide-react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";

// Арт-вселенная Йоси
import artCan from "../assets/images/art_yosa_can.webp";
import artKiwi from "../assets/images/art_kiwi.webp";
import artMcd from "../assets/images/art_rem_mcd.webp";
import artAstronaut from "../assets/images/art_astronaut.webp";

interface ArtGalleryProps {
  lang: Language;
}

export default function ArtGallery({ lang }: ArtGalleryProps) {
  const t = {
    ru: {
      badge: "Арт-вселенная Йоси",
      title: "Йося — это не просто счётчик, это характер",
      subtitle:
        "Каждый кадр приложения и каждый арт мы рисуем с любовью. Немного котовселенной, в которой считать калории не скучно.",
      can: {
        title: "Что сегодня кушал?",
        text: "Нажми на экран и просто напиши блюдо — остальное Йося сделает сам.",
      },
      kiwi: {
        title: "Йося знает",
        text: "410 ккал · Б 2 · Ж 1 · У 10 — ИИ распознаёт даже сочный киви в стакане воды.",
      },
      mcd: {
        title: "Даже фастфуд — не проблема",
        text: "«Бургер, картошка и кола» — Йося посчитает КБЖУ прямо за столиком.",
      },
      astronaut: {
        title: "Калорий осталось… log meal?",
        text: "Не дай калориям улететь в открытый космос. Йося всегда напомнит записать приём пищи.",
      },
    },
    en: {
      badge: "The Yosa Art Universe",
      title: "Yosa is more than a counter — it's a character",
      subtitle:
        "Every screen and every illustration is drawn with love. A little cat universe where counting calories never feels boring.",
      can: {
        title: "What did you eat today?",
        text: "Tap the screen and just type your meal — Yosa handles the rest.",
      },
      kiwi: {
        title: "Yosa knows",
        text: "410 kcal · P 2 · F 1 · C 10 — the AI recognizes even a juicy kiwi in sparkling water.",
      },
      mcd: {
        title: "Even fast food is fine",
        text: "'Burger, fries and a soda' — Yosa calculates macros right at the table.",
      },
      astronaut: {
        title: "Calories left… log meal?",
        text: "Don't let your calories drift into deep space. Yosa always reminds you to log a meal.",
      },
    },
  }[lang];

  return (
    <section id="art-gallery" className="scroll-mt-24 space-y-10">
      <FadeIn direction="up" staggerChildren={0.12}>
        <FadeInItem className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-purple-100/70 py-1 px-3.5 rounded-full text-xs font-bold text-brand-primary">
            <Palette className="w-3.5 h-3.5" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </FadeInItem>
      </FadeIn>

      <FadeIn direction="up" staggerChildren={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Большой арт-баннер: банка Йося */}
          <FadeInItem className="md:row-span-2 relative rounded-3xl overflow-hidden shadow-lg group min-h-[320px]">
            <img
              src={artCan}
              alt={lang === "ru" ? "Арт банки Йося — черничная лаванда" : "Yosa can art — blueberry lavender"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-1">
                {t.can.title}
              </h3>
              <p className="text-sm text-white/85 font-normal max-w-xs">
                {t.can.text}
              </p>
            </div>
          </FadeInItem>

          {/* Киви */}
          <FadeInItem className="relative rounded-3xl overflow-hidden shadow-lg group min-h-[160px]">
            <img
              src={artKiwi}
              alt={lang === "ru" ? "Сочный киви в воде — Йося знает КБЖУ" : "Juicy kiwi in water — Yosa knows the macros"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <h3 className="text-lg font-display font-bold mb-0.5">{t.kiwi.title}</h3>
              <p className="text-xs text-white/85 font-normal max-w-xs">{t.kiwi.text}</p>
            </div>
          </FadeInItem>

          {/* Фастфуд */}
          <FadeInItem className="relative rounded-3xl overflow-hidden shadow-lg group min-h-[160px]">
            <img
              src={artMcd}
              alt={lang === "ru" ? "Запись фастфуда в приложении Йося" : "Logging fast food in the Yosa app"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <h3 className="text-lg font-display font-bold mb-0.5">{t.mcd.title}</h3>
              <p className="text-xs text-white/85 font-normal max-w-xs">{t.mcd.text}</p>
            </div>
          </FadeInItem>
        </div>
      </FadeIn>

      {/* Космонавт — отдельный кинематографичный баннер-призыв */}
      <FadeIn direction="up">
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="relative rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 items-center bg-[#0b1018]"
        >
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={artAstronaut}
              alt={lang === "ru" ? "Космонавт Йося — калорий осталось, log meal?" : "Astronaut Yosa — calories left, log meal?"}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1018] md:to-[#0b1018]"></div>
          </div>
          <div className="p-8 md:p-12 text-white space-y-4">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-bold text-purple-200">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === "ru" ? "Не теряй контроль" : "Stay in control"}
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-bold leading-tight">
              {t.astronaut.title}
            </h3>
            <p className="text-sm md:text-base text-white/75 font-normal max-w-md">
              {t.astronaut.text}
            </p>
            <a
              href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-sm py-3 px-6 rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              {lang === "ru" ? "Записать первый приём" : "Log your first meal"}
            </a>
          </div>
        </motion.div>
      </FadeIn>
    </section>
  );
}
