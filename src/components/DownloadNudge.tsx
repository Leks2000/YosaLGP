import React from "react";
import { motion } from "motion/react";
import { Download, PawPrint, Heart } from "lucide-react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";

// Реальные фото кота Йоси с игривыми подписями «ты ещё не скачал?»
import catBag from "../assets/images/cat_photo_1_bag.webp";
import catPillow from "../assets/images/cat_photo_2_pillow.webp";
import catOnion from "../assets/images/cat_photo_3_onion.webp";
import catSleep from "../assets/images/cat_photo_4_sleep.webp";
import catBox from "../assets/images/cat_photo_5_box.webp";

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
}

const CARDS: NudgeCard[] = [
  {
    id: "n1",
    img: catBox,
    ru: "О, привет! Ты ещё не скачал приложку? 👀",
    en: "Oh, hi! You still haven't downloaded the app? 👀",
    altRu: "Чёрный кот Йося выглядывает из домика",
    altEn: "Black cat Yosa peeking out of a house",
    rotate: -3,
    variant: "left",
  },
  {
    id: "n2",
    img: catBag,
    ru: "Ну это просто позор полнейший… 😹",
    en: "Well, this is an absolute disgrace… 😹",
    altRu: "Чёрный кот Йося лежит у пакета",
    altEn: "Black cat Yosa lying next to a bag",
    rotate: 2,
    variant: "up",
  },
  {
    id: "n3",
    img: catOnion,
    ru: "Как так — не скачал? Беда, хозяин… 🫣",
    en: "How could you not download it? What a disaster… 🫣",
    altRu: "Чёрный кот Йося сидит на кухне",
    altEn: "Black cat Yosa sitting in the kitchen",
    rotate: -2,
    variant: "down",
  },
  {
    id: "n4",
    img: catSleep,
    ru: "Давай знакомиться — я Йося, твой кото-нутрициолог 🐾",
    en: "Let's get acquainted — I'm Yosa, your cat nutritionist 🐾",
    altRu: "Чёрный кот Йося играет с плёнкой",
    altEn: "Black cat Yosa playing with plastic",
    rotate: 3,
    variant: "right",
  },
  {
    id: "n5",
    img: catPillow,
    ru: "Ну скачай уже… я буду очень-очень мурчать ❤️",
    en: "Come on, download it already… I'll purr so much ❤️",
    altRu: "Чёрный кот Йося рядом с подушкой-котом",
    altEn: "Black cat Yosa next to a cat pillow",
    rotate: -2,
    variant: "left",
  },
];

export default function DownloadNudge({ lang }: DownloadNudgeProps) {
  const t = {
    ru: {
      badge: "Йося обиделся",
      title: "Ты ещё не скачал Йосю?",
      subtitle:
        "Кот всё видит. И немного обижается. Полистай и убедись сам — он точно ждёт именно тебя.",
      cta: "Хорошо, скачать в RuStore",
    },
    en: {
      badge: "Yosa is upset",
      title: "Still haven't downloaded Yosa?",
      subtitle:
        "The cat sees everything. And he's a little offended. Scroll and see — he's definitely waiting for you.",
      cta: "Fine, install via RuStore",
    },
  }[lang];

  return (
    <section id="download-nudge" className="scroll-mt-24 space-y-10">
      <FadeIn direction="up" staggerChildren={0.12}>
        <FadeInItem className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-purple-100/70 py-1 px-3.5 rounded-full text-xs font-bold text-brand-primary">
            <PawPrint className="w-3.5 h-3.5" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </FadeInItem>
      </FadeIn>

      {/* Карточки фото с игривыми репликами — раскиданы в разнобой */}
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
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                {/* Реплика-облачко кота */}
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <p className="text-white text-[11px] md:text-xs font-display font-semibold leading-snug drop-shadow">
                    {lang === "ru" ? card.ru : card.en}
                  </p>
                </div>
                <span className="absolute top-2.5 right-2.5 bg-white/90 text-brand-primary p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-3.5 h-3.5 fill-brand-primary" />
                </span>
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
            <Download className="w-4 h-4" />
            {t.cta}
          </motion.a>
        </div>
      </FadeIn>
    </section>
  );
}
