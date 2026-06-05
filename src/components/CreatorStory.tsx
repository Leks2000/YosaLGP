import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, PawPrint } from "lucide-react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";

// Реальные фото кота Йоси (прислал создатель проекта)
import catBag from "../assets/images/cat_photo_1_bag.webp";
import catPillow from "../assets/images/cat_photo_2_pillow.webp";
import catOnion from "../assets/images/cat_photo_3_onion.webp";
import catSleep from "../assets/images/cat_photo_4_sleep.webp";
import catBox from "../assets/images/cat_photo_5_box.webp";

interface CreatorStoryProps {
  lang: Language;
}

interface StoryBlock {
  id: string;
  img: string;
  side: "left" | "right";
  // Заголовок маленький жирный, остальное обычным весом
  titleRu: string;
  titleEn: string;
  textRu: React.ReactNode;
  textEn: React.ReactNode;
  altRu: string;
  altEn: string;
}

const STORY: StoryBlock[] = [
  {
    id: "story-1",
    img: catBox,
    side: "right",
    titleRu: "Знакомьтесь — настоящий Йося",
    titleEn: "Meet the real Yosa",
    textRu: (
      <>
        Йося — это мой чёрный кот, который и стал лицом приложения. Он обожает{" "}
        <strong className="font-semibold text-brand-primary">
          спать в самых неожиданных местах
        </strong>{" "}
        и внимательно следит за каждым приёмом пищи в доме. Именно его характер
        лёг в основу нашего ИИ-помощника.
      </>
    ),
    textEn: (
      <>
        Yosa is my black cat who became the face of the app. He loves{" "}
        <strong className="font-semibold text-brand-primary">
          napping in the most unexpected places
        </strong>{" "}
        and keeps a close eye on every meal in the house. His personality shaped
        our AI companion.
      </>
    ),
    altRu: "Чёрный кот Йося спит на ковре рядом с пакетом",
    altEn: "Black cat Yosa sleeping on the rug next to a bag",
  },
  {
    id: "story-2",
    img: catOnion,
    side: "left",
    titleRu: "Почему именно кот-нутрициолог?",
    titleEn: "Why a cat nutritionist?",
    textRu: (
      <>
        Коты умеют есть осознанно и знают меру — ну, почти всегда. Я хотел, чтобы
        приложение было{" "}
        <strong className="font-semibold text-brand-primary">
          таким же тёплым и ненавязчивым
        </strong>
        , как присутствие кота рядом. Никакого давления, только лёгкие подсказки.
      </>
    ),
    textEn: (
      <>
        Cats eat mindfully and know their limits — well, almost always. I wanted
        the app to feel{" "}
        <strong className="font-semibold text-brand-primary">
          as warm and gentle
        </strong>{" "}
        as having a cat nearby. No pressure, just soft nudges.
      </>
    ),
    altRu: "Чёрный кот Йося сидит на кухне рядом с луком",
    altEn: "Black cat Yosa sitting in the kitchen near onions",
  },
  {
    id: "story-3",
    img: catBag,
    side: "right",
    titleRu: "Каждый день — маленький шаг",
    titleEn: "Every day is a small step",
    textRu: (
      <>
        Главная идея Йоси — это привычка, а не жёсткая диета. Достаточно записать
        один приём пищи, и серия дней продолжится. Кот будет{" "}
        <strong className="font-semibold text-brand-primary">
          радоваться вместе с тобой
        </strong>{" "}
        каждому новому дню стрика.
      </>
    ),
    textEn: (
      <>
        The core idea of Yosa is building a habit, not following a strict diet.
        Just log one meal and your streak keeps going. The cat will{" "}
        <strong className="font-semibold text-brand-primary">
          celebrate with you
        </strong>{" "}
        on every new streak day.
      </>
    ),
    altRu: "Любопытный чёрный кот Йося играет с пакетом на кровати",
    altEn: "Curious black cat Yosa playing with a bag on the bed",
  },
];

export default function CreatorStory({ lang }: CreatorStoryProps) {
  return (
    <section
      id="creator-story"
      className="relative rounded-[40px] p-6 md:p-12 border border-purple-100/80 bg-purple-50/30 overflow-hidden shadow-lg"
    >
      {/* Мягкий декоративный градиент */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-primary/5 to-pink-500/5 rounded-full blur-3xl -z-10"></div>

      {/* Заголовок секции */}
      <FadeIn direction="up" staggerChildren={0.12}>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 md:mb-16">
          <FadeInItem className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm text-xs uppercase tracking-wider font-bold text-brand-primary">
            <Sparkles className="w-3.5 h-3.5" />
            {lang === "ru" ? "История Йоси" : "Behind the Paw"}
          </FadeInItem>
          <FadeInItem>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight leading-tight">
              {lang === "ru" ? (
                <>
                  Как обычный кот стал{" "}
                  <span className="text-brand-primary">талисманом</span>{" "}
                  приложения
                </>
              ) : (
                <>
                  How an ordinary cat became the app's{" "}
                  <span className="text-brand-primary">mascot</span>
                </>
              )}
            </h2>
          </FadeInItem>
          <FadeInItem>
            {/* Обычный вес — не весь текст жирный */}
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
              {lang === "ru"
                ? "Привет, я Александр! Я создал Йосю, чтобы превратить скучный подсчёт калорий в тёплую ежедневную привычку. А вдохновил меня мой собственный кот — вот его реальные фотографии."
                : "Hi, I'm Alexander! I built Yosa to turn boring calorie counting into a warm daily ritual. My own cat inspired the whole thing — here are his real photos."}
            </p>
          </FadeInItem>
        </div>
      </FadeIn>

      {/* Блоки истории — фото в разнобой (право / лево / право) */}
      <div className="space-y-14 md:space-y-20 max-w-5xl mx-auto">
        {STORY.map((block) => (
          <FadeIn key={block.id} direction="up" staggerChildren={0.1}>
            <div
              className={`flex flex-col gap-6 md:gap-12 items-center ${
                block.side === "right"
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Фото */}
              <FadeInItem className="w-full md:w-1/2 flex justify-center">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  initial={{ rotate: block.side === "right" ? -3 : 3 }}
                  className="relative rounded-[28px] overflow-hidden shadow-xl border-4 border-white max-w-[360px] w-full group"
                >
                  <img
                    src={block.img}
                    alt={lang === "ru" ? block.altRu : block.altEn}
                    loading="lazy"
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Маленькая лапка-метка */}
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-primary p-1.5 rounded-full shadow">
                    <PawPrint className="w-4 h-4" />
                  </span>
                </motion.div>
              </FadeInItem>

              {/* Текст блока */}
              <FadeInItem className="w-full md:w-1/2 space-y-3">
                {/* Только заголовок жирный и заметный */}
                <h3 className="text-xl md:text-2xl font-display font-bold text-brand-charcoal leading-snug">
                  {lang === "ru" ? block.titleRu : block.titleEn}
                </h3>
                {/* Основной текст обычным весом */}
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-normal">
                  {lang === "ru" ? block.textRu : block.textEn}
                </p>
              </FadeInItem>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Подпись автора + соцсети */}
      <FadeIn direction="up" staggerChildren={0.1}>
        <div className="mt-14 md:mt-20 pt-8 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-center gap-6">
          <FadeInItem className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-white bg-gradient-to-tr from-brand-primary to-brand-secondary text-white flex items-center justify-center select-none shadow-md">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-sm font-display font-semibold block leading-none text-brand-charcoal">
                {lang === "ru" ? "Александр" : "Alexander"}
              </span>
              <span className="text-xs text-gray-400 mt-1 block font-medium">
                {lang === "ru" ? "Создатель Йоси" : "Creator of Yosa"}
              </span>
            </div>
          </FadeInItem>

          <div className="h-10 w-px bg-purple-200 hidden sm:block"></div>

          <FadeInItem className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@xedanter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2.5 bg-white shadow-sm hover:shadow hover:bg-gray-50 rounded-xl text-[#FF0000] hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://x.com/xedanter17151"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="p-2.5 bg-white shadow-sm hover:shadow hover:bg-gray-50 rounded-xl text-black hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-halle/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 bg-white shadow-sm hover:shadow hover:bg-gray-50 rounded-xl text-[#0077B5] hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.605 0 4.267 2.372 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </FadeInItem>
        </div>
      </FadeIn>
    </section>
  );
}
