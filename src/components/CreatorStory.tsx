import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Language } from "../types";
import FadeIn from "./FadeIn";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

// Реальные фото кота Йоси
import catBag from "../assets/images/cat_photo_1_bag.webp";
import catBag320 from "../assets/images/cat_photo_1_bag.webp?w=320&format=webp";
import catBag640 from "../assets/images/cat_photo_1_bag.webp?w=640&format=webp";
import catBag960 from "../assets/images/cat_photo_1_bag.webp?w=960&format=webp";
import catBag1280 from "../assets/images/cat_photo_1_bag.webp?w=1280&format=webp";
import catBox from "../assets/images/cat_photo_5_box.webp";
import catBox320 from "../assets/images/cat_photo_5_box.webp?w=320&format=webp";
import catBox640 from "../assets/images/cat_photo_5_box.webp?w=640&format=webp";
import catBox960 from "../assets/images/cat_photo_5_box.webp?w=960&format=webp";
import catBox1280 from "../assets/images/cat_photo_5_box.webp?w=1280&format=webp";
import catBed from "../assets/images/cat_photo_bed.webp";
import catBed320 from "../assets/images/cat_photo_bed.webp?w=320&format=webp";
import catBed640 from "../assets/images/cat_photo_bed.webp?w=640&format=webp";
import catBed960 from "../assets/images/cat_photo_bed.webp?w=960&format=webp";
import catBed1280 from "../assets/images/cat_photo_bed.webp?w=1280&format=webp";
import creatorPhoto from "../assets/images/creator_photo.webp";
import creatorPhoto320 from "../assets/images/creator_photo.webp?w=320&format=webp";
import creatorPhoto640 from "../assets/images/creator_photo.webp?w=640&format=webp";
import creatorPhoto960 from "../assets/images/creator_photo.webp?w=960&format=webp";
import creatorPhoto1280 from "../assets/images/creator_photo.webp?w=1280&format=webp";

interface CreatorStoryProps {
  lang: Language;
}

interface StoryBlock {
  id: string;
  img: string;
  srcSet: string;
  side: "left" | "right";
  titleRu: string;
  titleEn: string;
  textRu: React.ReactNode;
  textEn: React.ReactNode;
  altRu: string;
  altEn: string;
}


const responsiveSrcSet = (sources: Record<320 | 640 | 960 | 1280, string>) =>
  `${sources[320]} 320w, ${sources[640]} 640w, ${sources[960]} 960w, ${sources[1280]} 1280w`;

const STORY_IMAGE_SIZES = "(min-width: 768px) 360px, calc(100vw - 48px)";
const CREATOR_IMAGE_SIZES = "(min-width: 768px) 176px, 144px";
const CREATOR_PHOTO_SRC_SET = responsiveSrcSet({
  320: creatorPhoto320,
  640: creatorPhoto640,
  960: creatorPhoto960,
  1280: creatorPhoto1280,
});

const STORY: StoryBlock[] = [
  {
    id: "story-1",
    img: catBag,
    srcSet: responsiveSrcSet({ 320: catBag320, 640: catBag640, 960: catBag960, 1280: catBag1280 }),
    side: "right",
    titleRu: "Знакомьтесь, настоящий Йося",
    titleEn: "Meet the real Yosa",
    textRu: (
      <>
        Йося – это мой чёрный кот, который и стал лицом приложения. Он обожает{" "}
        <strong className="font-semibold text-brand-primary">
          спать в самых неожиданных местах
        </strong>{" "}
        и внимательно следит за каждым приёмом пищи в доме.
      </>
    ),
    textEn: (
      <>
        Yosa is my black cat who became the face of the app. He loves{" "}
        <strong className="font-semibold text-brand-primary">
          napping in the most unexpected places
        </strong>{" "}
        and keeps a close eye on every meal in the house.
      </>
    ),
    altRu: "Чёрный кот Йося с сумкой",
    altEn: "Black cat Yosa with a bag",
  },
  {
    id: "story-2",
    img: catBox,
    srcSet: responsiveSrcSet({ 320: catBox320, 640: catBox640, 960: catBox960, 1280: catBox1280 }),
    side: "left",
    titleRu: "Почему именно кот-нутрициолог?",
    titleEn: "Why a cat nutritionist?",
    textRu: (
      <>
        Коты умеют есть осознанно. Я хотел, чтобы приложение было{" "}
        <strong className="font-semibold text-brand-primary">
          таким же тёплым и ненавязчивым
        </strong>
        , как присутствие кота рядом. Никакого давления, только лёгкие подсказки.
      </>
    ),
    textEn: (
      <>
        Cats eat mindfully. I wanted the app to feel{" "}
        <strong className="font-semibold text-brand-primary">
          as warm and gentle
        </strong>{" "}
        as having a cat nearby. No pressure, just soft nudges.
      </>
    ),
    altRu: "Кот Йося с пакетом",
    altEn: "Cat Yosa with a bag",
  },
  {
    id: "story-3",
    img: catBed,
    srcSet: responsiveSrcSet({ 320: catBed320, 640: catBed640, 960: catBed960, 1280: catBed1280 }),
    side: "right",
    titleRu: "Каждый день, маленький шаг",
    titleEn: "Every day is a small step",
    textRu: (
      <>
        Главная идея – привычка, а не жёсткая диета. Записывай один приём пищи, и серия дней продолжится. Кот{" "}
        <strong className="font-semibold text-brand-primary">
          радуется вместе с тобой
        </strong>{" "}
        каждому новому дню стрика.
      </>
    ),
    textEn: (
      <>
        The core idea is habit, not strict diet. Log one meal and your streak keeps going. The cat{" "}
        <strong className="font-semibold text-brand-primary">
          celebrates with you
        </strong>{" "}
        on every new streak day.
      </>
    ),
    altRu: "Кот Йося на кровати",
    altEn: "Cat Yosa on bed",
  },
];

export default function CreatorStory({ lang }: CreatorStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Контрастный parallax для фотоблоков
  const photoY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const photoY3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const photoYs = [photoY1, photoY2, photoY3];

  return (
    <section
      ref={sectionRef}
      id="creator-story"
      className="relative rounded-[40px] p-6 md:p-12 border border-purple-100/80 bg-purple-50/30 overflow-hidden shadow-lg"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-primary/5 to-pink-500/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <FadeIn direction="up" staggerChildren={0.12}>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 md:mb-16">
          <FadeInItem className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm text-xs uppercase tracking-wider font-bold text-brand-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            {lang === "ru" ? "История Йоси" : "Behind the Paw"}
          </FadeInItem>
          <FadeInItem>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight leading-tight">
              {lang === "ru" ? (
                <>Как обычный кот стал <span className="text-brand-primary">талисманом</span> приложения</>
              ) : (
                <>How an ordinary cat became the app's <span className="text-brand-primary">mascot</span></>
              )}
            </h2>
          </FadeInItem>
          <FadeInItem>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
              {lang === "ru"
                ? "Привет, я Александр! Я создал Йосю, чтобы превратить скучный подсчёт калорий в тёплую ежедневную привычку."
                : "Hi, I'm Alexander! I built Yosa to turn boring calorie counting into a warm daily ritual."}
            </p>
          </FadeInItem>
        </div>
      </FadeIn>

      {/* Story blocks with parallax photos */}
      <div className="space-y-14 md:space-y-20 max-w-5xl mx-auto">
        {STORY.map((block, idx) => (
          <FadeIn key={block.id} direction="up" staggerChildren={0.1}>
            <div
              className={`flex flex-col gap-6 md:gap-12 items-center ${
                block.side === "right" ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Photo with parallax */}
              <FadeInItem className="w-full md:w-1/2 flex justify-center">
                <motion.div
                  style={{ y: photoYs[idx] }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    initial={{ rotate: block.side === "right" ? -3 : 3 }}
                    className="rounded-[28px] overflow-hidden shadow-xl border-4 border-white max-w-[360px] w-full group"
                  >
                    <LazyImage
                      src={block.img}
                      alt={lang === "ru" ? block.altRu : block.altEn}
                      loading="lazy"
                      width="720"
                      height="540"
                      srcSet={block.srcSet}
                      sizes={STORY_IMAGE_SIZES}
                      wrapperClassName="w-full aspect-[4/3]"
                      className="w-full h-full object-cover object-[62%_center] transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                </motion.div>
              </FadeInItem>

              {/* Text */}
              <FadeInItem className="w-full md:w-1/2 space-y-3">
                <h3 className="text-xl md:text-2xl font-display font-bold text-brand-charcoal leading-snug">
                  {lang === "ru" ? block.titleRu : block.titleEn}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-normal">
                  {lang === "ru" ? block.textRu : block.textEn}
                </p>
              </FadeInItem>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Creator signature */}
      <FadeIn direction="up" staggerChildren={0.1}>
        <div className="mt-14 md:mt-20 pt-8 border-t border-purple-100">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <FadeInItem className="shrink-0">
              <LazyImage
                src={creatorPhoto}
                alt={lang === "ru" ? "Александр - создатель Йоси" : "Alexander - creator of Yosa"}
                width="180"
                height="180"
                loading="lazy"
                srcSet={CREATOR_PHOTO_SRC_SET}
                sizes={CREATOR_IMAGE_SIZES}
                wrapperClassName="w-36 h-36 md:w-44 md:h-44 rounded-3xl border-4 border-white shadow-xl overflow-hidden"
                className="w-full h-full object-cover"
              />
            </FadeInItem>

            <FadeInItem className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h4 className="text-xl md:text-2xl font-display font-bold text-brand-charcoal">
                  {lang === "ru" ? "Александр" : "Alexander"}
                </h4>
                <span className="text-sm text-brand-primary font-semibold">
                  {lang === "ru" ? "Создатель Йоси" : "Creator of Yosa"}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                {lang === "ru"
                  ? "Разработчик, дизайнер и котовладелец. Создал Йосю, чтобы сделать контроль питания таким же приятным, как общение с котом."
                  : "Developer, designer & cat owner. Built Yosa to make nutrition tracking as enjoyable as petting a cat."}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <a href="https://www.youtube.com/@xedanter" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-3 bg-white shadow-sm hover:shadow-md rounded-xl text-[#FF0000] hover:scale-110 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://x.com/xedanter17151" target="_blank" rel="noopener noreferrer" aria-label="X" className="p-3 bg-white shadow-sm hover:shadow-md rounded-xl text-black hover:scale-110 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/alexander-halle/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 bg-white shadow-sm hover:shadow-md rounded-xl text-[#0077B5] hover:scale-110 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.605 0 4.267 2.372 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </FadeInItem>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
