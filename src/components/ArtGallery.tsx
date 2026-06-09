import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";

// Арт-вселенная Йоси
import artKiwi from "../assets/images/art_kiwi.webp";
import artMcd from "../assets/images/art_rem_mcd.webp";
import artAstronaut from "../assets/images/art_astronaut.webp";

interface ArtGalleryProps {
  lang: Language;
}

export default function ArtGallery({ lang }: ArtGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Контраст-движение: разные слои двигаются с разной скоростью
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -3]);

  const t = {
    ru: {
      badge: "Арт-вселенная Йоси",
      title: "Йося – это не просто счётчик, это характер",
      subtitle:
        "Каждый кадр приложения и каждый арт мы рисуем с любовью. Немного котовселенной, в которой считать калории не скучно.",
      kiwi: {
        title: "Йося знает",
        text: "410 ккал · Б 2 · Ж 1 · У 10 – ИИ распознаёт даже сочный киви в стакане воды.",
      },
      mcd: {
        title: "Даже фастфуд не проблема",
        text: "«Бургер, картошка и кола» – Йося посчитает КБЖУ прямо за столиком.",
      },
      astronaut: {
        title: "Калорий осталось… log meal?",
        text: "Не дай калориям улететь в открытый космос. Йося всегда напомнит записать приём пищи.",
      },
    },
    en: {
      badge: "The Yosa Art Universe",
      title: "Yosa is more than a counter, it's a character",
      subtitle:
        "Every screen and every illustration is drawn with love. A little cat universe where counting calories never feels boring.",
      kiwi: {
        title: "Yosa knows",
        text: "410 kcal · P 2 · F 1 · C 10 – the AI recognizes even a juicy kiwi in sparkling water.",
      },
      mcd: {
        title: "Even fast food is fine",
        text: "'Burger, fries and a soda' – Yosa calculates macros right at the table.",
      },
      astronaut: {
        title: "Calories left… log meal?",
        text: "Don't let your calories drift into deep space. Yosa always reminds you to log a meal.",
      },
    },
  }[lang];

  return (
    <section ref={sectionRef} id="art-gallery" className="scroll-mt-24 space-y-12">
      <FadeIn direction="up" staggerChildren={0.12}>
        <FadeInItem className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-purple-100/70 py-1 px-3.5 rounded-full text-xs font-bold text-brand-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
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

      {/* Parallax grid with contrast movement */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Kiwi — large, parallax layer 1 */}
        <motion.div style={{ y: y1, rotate: rotate1 }} className="md:col-span-7 md:mt-2">
          <FadeInItem direction="left" variant="rotate">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-[28px] overflow-hidden shadow-xl group min-h-[260px] md:min-h-[340px]"
            >
              <img
                src={artKiwi}
                alt={lang === "ru" ? "Сочный киви в воде" : "Juicy kiwi in water"}
                loading="lazy"
                width="900"
                height="600"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-display font-bold mb-1">{t.kiwi.title}</h3>
                <p className="text-sm text-white/85 font-normal max-w-sm">{t.kiwi.text}</p>
              </div>
            </motion.div>
          </FadeInItem>
        </motion.div>

        {/* Fast food — parallax layer 2, opposite direction */}
        <motion.div style={{ y: y2, rotate: rotate2 }} className="md:col-span-5 md:mt-8">
          <FadeInItem direction="right" variant="rotate">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-[28px] overflow-hidden shadow-xl group"
            >
              <img
                src={artMcd}
                alt={lang === "ru" ? "Фастфуд в Йосе" : "Fast food in Yosa"}
                loading="lazy"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <h3 className="text-lg font-display font-bold mb-0.5">{t.mcd.title}</h3>
                <p className="text-xs text-white/85 font-normal max-w-xs">{t.mcd.text}</p>
              </div>
            </motion.div>
          </FadeInItem>
        </motion.div>
      </div>

      {/* Astronaut — cinematic banner with parallax layer 3 */}
      <motion.div style={{ y: y3 }}>
        <FadeIn direction="up">
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="relative rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 items-center bg-[#0b1018]"
          >
            <div className="relative h-80 md:h-[520px] overflow-hidden">
              <img
                src={artAstronaut}
                alt={lang === "ru" ? "Космонавт Йося" : "Astronaut Yosa"}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1018]" />
            </div>
            <div className="p-8 md:p-12 text-white space-y-4">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-bold text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-200" />
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
      </motion.div>
    </section>
  );
}
