import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";

// Реальные фото кота Йоси + фирменный арт «растяжка»
import catOnion from "../assets/images/cat_photo_3_onion.webp";
import catSleep from "../assets/images/cat_photo_4_sleep.webp";
import catBox from "../assets/images/cat_photo_5_box.webp";
import yosaStretch from "../assets/images/yosa_stretch.webp";

interface DownloadNudgeProps {
  lang: Language;
}

interface NudgeCard {
  id: string;
  img: string;
  ru: string;
  en: string;
  altRu: string;
  altEn: string;
  rotate: number;
  variant: "left" | "right" | "up" | "down";
  isArt?: boolean;
}

// Порядок: фото – арт-растяжка (поз. 2) – фото – фото – арт-растяжка (поз. 5)
const CARDS: NudgeCard[] = [
  {
    id: "n1",
    img: catBox,
    ru: "О, привет! Ты ещё не скачал приложку?",
    en: "Oh, hi! You still haven't downloaded the app?",
    altRu: "Чёрный кот Йося выглядывает из домика",
    altEn: "Black cat Yosa peeking out of a house",
    rotate: -3,
    variant: "left",
  },
  {
    id: "n2",
    img: yosaStretch,
    ru: "Йося уже потягивается в ожидании тебя",
    en: "Yosa is already stretching, waiting for you",
    altRu: "Арт кота Йоси, который потягивается",
    altEn: "Art of cat Yosa stretching",
    rotate: 2,
    variant: "up",
    isArt: true,
  },
  {
    id: "n3",
    img: catOnion,
    ru: "Скачай, и я помогу с каждым приёмом пищи",
    en: "Download it and I'll help with every meal",
    altRu: "Чёрный кот Йося сидит на кухне",
    altEn: "Black cat Yosa sitting in the kitchen",
    rotate: -2,
    variant: "down",
  },
  {
    id: "n4",
    img: catSleep,
    ru: "Давай знакомиться, я Йося, твой кото-нутрициолог",
    en: "Let's get acquainted, I'm Yosa, your cat nutritionist",
    altRu: "Чёрный кот Йося отдыхает",
    altEn: "Black cat Yosa resting",
    rotate: 3,
    variant: "right",
  },
  {
    id: "n5",
    img: yosaStretch,
    ru: "Скачай уже, и я буду очень-очень мурчать",
    en: "Come on, download it, and I'll purr so much",
    altRu: "Арт кота Йоси, который потягивается",
    altEn: "Art of cat Yosa stretching",
    rotate: -2,
    variant: "left",
    isArt: true,
  },
];

export default function DownloadNudge({ lang }: DownloadNudgeProps) {
  const t = {
    ru: {
      title: "Ты ещё не скачал Йосю?",
      cta: "Хорошо, скачать в RuStore",
    },
    en: {
      title: "Still haven't downloaded Yosa?",
      cta: "Fine, install via RuStore",
    },
  }[lang];

  return (
    <section id="download-nudge" className="scroll-mt-24 space-y-10">
      <FadeIn direction="up" staggerChildren={0.12}>
        <FadeInItem className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight">
            {t.title}
          </h2>
        </FadeInItem>
      </FadeIn>

      {/* Карточки – фото и арты раскиданы в разнобой */}
      <FadeIn direction="up" staggerChildren={0.12}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {CARDS.map((card) => (
            <FadeInItem
              key={card.id}
              direction={card.variant}
              variant="rotate"
              className="group"
            >
              <motion.div
                initial={{ rotate: card.rotate }}
                whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-white h-full"
              >
                <img
                  src={card.img}
                  alt={lang === "ru" ? card.altRu : card.altEn}
                  loading="lazy"
                  className={`w-full aspect-[3/4] ${
                    card.isArt
                      ? "object-contain p-4 bg-gradient-to-br from-purple-50 to-pink-50"
                      : "object-cover"
                  }`}
                />
                <div
                  className={`absolute inset-0 ${
                    card.isArt
                      ? "bg-gradient-to-t from-black/40 via-transparent to-transparent"
                      : "bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                  }`}
                />
                {/* Реплика-облачко кота */}
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <p
                    className={`text-[11px] md:text-xs font-display font-semibold leading-snug drop-shadow ${
                      card.isArt ? "text-brand-charcoal" : "text-white"
                    }`}
                  >
                    {lang === "ru" ? card.ru : card.en}
                  </p>
                </div>
              </motion.div>
            </FadeInItem>
          ))}
        </div>
      </FadeIn>

      <FadeIn direction="up">
        <div className="flex justify-center">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-sm py-3.5 px-7 rounded-2xl shadow-lg transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            {t.cta}
          </motion.a>
        </div>
      </FadeIn>
    </section>
  );
}
