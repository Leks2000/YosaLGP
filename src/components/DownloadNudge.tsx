import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

// Реальные фото кота Йоси
import catBox from "../assets/images/cat_photo_5_box.webp";
import catOnion from "../assets/images/cat_photo_onion_new.jpg";
import catSleepNew from "../assets/images/cat_photo_sleep_new.jpg";

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
  objectPosition: string;
}

const CARDS: NudgeCard[] = [
  {
    id: "box",
    img: catBox,
    ru: "О, привет! Ты ещё не скачал приложку?",
    en: "Oh, hi! You still haven't downloaded the app?",
    altRu: "Чёрный кот Йося выглядывает из коробки",
    altEn: "Black cat Yosa peeking from a box",
    rotate: -4,
    variant: "left",
    objectPosition: "object-[68%_center]",
  },
  {
    id: "onion",
    img: catOnion,
    ru: "Как так ты ещё его не скачал?",
    en: "How have you still not downloaded it?",
    altRu: "Чёрный кот Йося с луком",
    altEn: "Black cat Yosa with onions",
    rotate: 3,
    variant: "up",
    objectPosition: "object-center",
  },
  {
    id: "sleep",
    img: catSleepNew,
    ru: "Ой, беда, надо исправлять ошибку эту",
    en: "Oops, that's a problem we need to fix",
    altRu: "Чёрный кот Йося спит на кровати",
    altEn: "Black cat Yosa sleeping on bed",
    rotate: -2,
    variant: "right",
    objectPosition: "object-center",
  },
];

export default function DownloadNudge({ lang }: DownloadNudgeProps) {
  const cta = lang === "ru" ? "Хорошо, скачать в RuStore" : "Fine, install via RuStore";

  return (
    <section id="download-nudge" className="scroll-mt-24 space-y-8">
      <FadeIn direction="up" staggerChildren={0.12}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7 max-w-5xl mx-auto items-stretch">
          {CARDS.map((card) => (
            <FadeInItem
              key={card.id}
              direction={card.variant}
              variant="rotate"
              className="group h-full"
            >
              <motion.div
                initial={{ rotate: card.rotate }}
                whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative h-full min-h-[360px] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-white"
              >
                <LazyImage
                  src={card.img}
                  alt={lang === "ru" ? card.altRu : card.altEn}
                  loading="lazy"
                  width="720"
                  height="960"
                  wrapperClassName="h-full min-h-[360px] w-full"
                  className={`w-full h-full object-cover ${card.objectPosition}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/15 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="text-sm md:text-base font-display font-extrabold leading-tight text-white drop-shadow">
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
            {cta}
          </motion.a>
        </div>
      </FadeIn>
    </section>
  );
}
