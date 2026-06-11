import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

import { trackRuStoreClick } from "./lib/analytics";
import { getVariant, CTA_COPY } from "./lib/abtest";
import FadeIn from "./components/FadeIn";
import FadeInItem from "./components/FadeInItem";
import TextReveal from "./components/TextReveal";
import { Language, FAQItem } from "./types";
import PawCursor from "./components/PawCursor";
import HeroShowcase from "./components/HeroShowcase";
import HowItWorks from "./components/HowItWorks";
import yosaStretch from "./assets/images/yosa_stretch.webp";

// Lazy-loaded sections below the fold (code splitting)
const FeaturesGrid = lazy(() => import("./components/FeaturesGrid"));
const CreatorStory = lazy(() => import("./components/CreatorStory"));
const ArtGallery = lazy(() => import("./components/ArtGallery"));
const DownloadNudge = lazy(() => import("./components/DownloadNudge"));

// Lazy loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-3 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
      <span className="text-xs text-gray-400 font-medium">Загрузка...</span>
    </div>
  </div>
);

interface LazySectionProps {
  children: React.ReactNode;
  rootMargin?: string;
}

const LazySection = ({ children, rootMargin = "700px 0px" }: LazySectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (shouldRender || !currentSection) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return <div ref={sectionRef}>{shouldRender ? children : <SectionLoader />}</div>;
};

// Interactive FAQ Content derived from the user request
const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    questionRu: "Что такое стрик (серия дней)?",
    questionEn: "What is a streak count?",
    answerRu:
      "Стрик – это серия дней подряд, в которые вы заносите съеденную еду в приложение. Чем длиннее ваш стрик активности, тем больше памятных кошачьих наград вы разблокируете! Это помогает поддерживать железную мотивацию в игровой форме.",
    answerEn:
      "A streak represents consecutive days of logging your meals in the app. The longer your streak of activity, the more adorable cat trophies and badges you lock in! It's designed to keep you motivated and gamify your nutrition building.",
  },
  {
    id: "faq-2",
    questionRu: "Как настроить цели по калориям?",
    questionEn: "How do I set calorie targets?",
    answerRu:
      "Вы можете зайти в настройки и указать ваш текущий вес, целевой вес, рост, возраст и физическую активность. Йося мгновенно рассчитает вашу норму по точной научной формуле BMR/TDEE. Также вы можете воспользоваться калькулятором прямо выше на этой странице!",
    answerEn:
      "Go to settings in the app and input your current weight, target weight, height, age, and activity factor. Yosa calculates your exact daily energy norm using the proven BMR/TDEE formula. You can also calculate your goals directly using our calculator section above!",
  },
  {
    id: "faq-3",
    questionRu: "Что такое Йося Pro?",
    questionEn: "What is Yosa Pro?",
    answerRu:
      "Йося Pro – это расширенная версия приложения с безлимитными AI-запросами к умному КБЖУ парсеру, полной безлимитной историей дневников и удобной глубокой аналитикой. Оформить подписку можно прямо внутри мобильного приложения.",
    answerEn:
      "Yosa Pro is our advanced premium mode with unlimited AI queries to our calorie semantic parser, full lifetime diary logs history, and structured personal statistics. You can activate Pro safely right from within the mobile app.",
  },
  {
    id: "faq-4",
    questionRu: "Действительно ли мои данные в безопасности?",
    questionEn: "Is my personal data safe?",
    answerRu:
      "Абсолютно. Все данные о питании, весе и целях хранятся исключительно локально в памяти вашего Android/iOS устройства. Мы не собираем конфиденциальную личную информацию, не передаём её третьим лицам и не занимаемся рассылкой спама.",
    answerEn:
      "Absolutely. All nutritional log metrics, weight progress logs, and personal metrics parameters are stored strictly locally on your Android or iOS device memory database. We do not sell, stream, or share your data with advertisers or third parties.",
  },
  {
    id: "faq-5",
    questionRu: "Можно ли использовать голосовой ввод еды?",
    questionEn: "Can I use voice input for meals?",
    answerRu:
      "Да! Вместо ручного набора вы можете зажать кнопку микрофона в строке ввода и сказать, например: «овсянка с бананом на молоке» или «две чашки капучино и синнабон», – и ИИ моментально рассчитает точный КБЖУ за секунды.",
    answerEn:
      "Yes! Instead of tapping on keyboard keys, simply hold down the microphone button in the input strip and say: 'bowl of oatmeal with organic bananas and almond milk' or 'two cappuccinos and a glazed donut'. The AI evaluates and computes macro stats immediately.",
  },
  {
    id: "faq-6",
    questionRu: "Нужно ли вводить точный вес порций в граммах?",
    questionEn: "Do I need to type the exact portion weight in grams?",
    answerRu:
      "Нет, ручной ввод веса не обязателен. Наш ИИ глубоко обучен оценивать типичные размеры ресторанных и кулинарных блюд и средние домашние порции, основываясь на самом названии или контексте (например, 'одна тарелка', 'кусочек', 'баночка'). Но при желании вы всегда сможете скорректировать цифры.",
    answerEn:
      "No, typing weights manually in grams is entirely optional. Our localized AI systems estimate standard restaurant, commercial, and home recipe serving sizes by analyzing colloquial context and descriptions (e.g. 'one bowl', 'two slices', 'chocolate bar'). However, you can always easily refine portions on custom popups.",
  },
  {
    id: "faq-7",
    questionRu: "Работает ли Йося без интернета?",
    questionEn: "Does the app work without internet connection?",
    answerRu:
      "Главный AI-модуль распознавания натуральной речи требует подключения к интернету. Но дневник питания, история ваших калорий, замеры веса и просмотр прошлых достижений доступны полностью офлайн в любой момент.",
    answerEn:
      "Our semantic natural voice/text interpretation core models require active raw internet connectivity. But your food diary entries history, streak calendars, weight analytics, and past unlocked achievements are kept accessible completely offline.",
  },
];



export default function App() {
  const [lang, setLang] = useState<Language>("ru");
  const customCursor = true;
  const [activeFaq, setActiveFaq] = useState<string>(FAQ_ITEMS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // A/B-тест главного CTA. Вариант стабилен между визитами одного юзера.
  const [ctaVariant] = useState(() => getVariant());
  const ctaCopy = CTA_COPY[ctaVariant];

  // Localization structure for main layout titles & sections
  const staticText = {
    ru: {
      tag: "Йося – Умный счётчик калорий с ИИ-котом",
      heroTitle: "Следи за питанием просто,",
      heroTitleAccent: "на одном языке с ИИ",
      heroDesc:
        "Йося мгновенно считает калории, белки, жиры и углеводы по вашему голосу или тексту. Никаких штрихкодов, ручного взвешивания граммов и скучных меню.",
      downloadRuStore: "Установить через RuStore",
      downloadPlay: "Скачать в Google Play (Скоро)",
      downloadAppStore: "Доступно на iOS (Скоро)",
      rustoreSub: "Официальный магазин РФ",
      navTry: "Как устроен ИИ",
      navFeatures: "Что умеет Йося",
      navFaq: "Частые вопросы",
      developersSec: "Создатели проекта",
      creatorHeading:
        "Привет, я Александр! Меня вдохновила идея упростить скучные подсчёты калорий и сделать приложение, в которое хочется заходить каждый день ради пушистого друга.",
      creatorDesc:
        "Я создал Йосю, чтобы помочь тысячам людей вести дневник питания без рутины. Я потратил кучу времени на полировку дизайна, динамические виджеты и разработку персонального кота-нутрициолога. С Йосей вам не нужно быть экспертом по балансу – просто пишите еду как есть, а пушистик поможет вам оставаться в форме!",
      faqHeading: "Вопросы и ответы",
      faqSub:
        "Полезная информация о работе ИИ-нутрициолога прямо у вас под лапой",
      allRights:
        "Все права защищены. Разработано в духе Amy Food Journal с любовью к пушистым котикам.",
    },
    en: {
      tag: "Yosa – AI Calorie Counter with Cat Companion",
      heroTitle: "Track your calories cleanly,",
      heroTitleAccent: "with the speed of AI",
      heroDesc:
        "Yosa immediately parses calories, proteins, fats, and carbohydrates from natural text or speech inputs. No barcode scanning, manual portion weighing, or tedious catalog searching.",
      downloadRuStore: "Install via RuStore",
      downloadPlay: "Download on Google Play (Soon)",
      downloadAppStore: "Available on iOS (Soon)",
      rustoreSub: "Official RU App Market",
      navTry: "How AI works",
      navFeatures: "Core Features",
      navFaq: "FAQ",
      developersSec: "Meet Yosa's Creator",
      creatorHeading:
        "Hi, I'm Alexander! I wanted to turn boring diet planning into an exciting, gamified experience with a friendly virtual pet always by your side.",
      creatorDesc:
        "I wanted to create a calorie tracking experience that felt incredible to use – like writing in a notes app. Elegant graphics and natural interaction was something I devoted hundreds of hours to. Hopefully Yosa helps you manage your nutrition habits as much as it helped me! Keep your streak flowing, human!",
      faqHeading: "Frequently Asked Questions",
      faqSub:
        "Comprehensive insights about our intelligent cat assistant and nutrition evaluation formulas.",
      allRights:
        "All Rights Reserved. Modeled after Amy Food Journal with warm appreciation for adorable chubby cats.",
    },
  };

  const currentText = staticText[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ru" ? "en" : "ru"));
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 18;
      window.scrollTo({ top, behavior: "auto" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream/40 bg-grid text-brand-charcoal font-sans text-sm md:text-base leading-relaxed antialiased selection:bg-brand-primary/10 select-none custom-scrollbar relative">
      {/* Animated Background Blobs for kind magical vibe */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[150px]"
        />
      </div>

      {/* Playful Paw Mouse Trail overlay */}
      <PawCursor enabled={customCursor} />

      {/* Top info/nav bar — lightweight like the Amy reference, not a heavy app header */}
      <header className="relative z-50 py-5 md:py-7">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            className="flex items-center gap-4 md:gap-5 cursor-pointer group shrink-0"
            aria-label={lang === "ru" ? "Наверх" : "Back to top"}
          >
            <img
              src={yosaStretch}
              alt={lang === "ru" ? "Кот Йося" : "Yosa cat"}
              width="91"
              height="91"
              className="w-[72px] h-[72px] md:w-[91px] md:h-[91px] object-contain group-hover:scale-105 transition-transform duration-200"
              loading="eager"
            />
            <span className="flex flex-col items-start">
              <span className="font-display font-black text-3xl md:text-[2.2rem] leading-none tracking-tight text-brand-charcoal">
                {lang === "ru" ? "Йося" : "Yosa"}
              </span>
              <span className="text-xs md:text-sm text-gray-400 font-semibold leading-tight mt-1">
                {lang === "ru" ? "ИИ-счётчик калорий" : "AI calorie counter"}
              </span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-gray-500 ml-auto">
            <button
              onClick={() => handleScrollTo("estimator-playground")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.navTry}
            </button>
            <button
              onClick={() => handleScrollTo("feat-grid")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.navFeatures}
            </button>
            <button
              onClick={() => handleScrollTo("faq-container")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.navFaq}
            </button>
          </nav>

          <div className="ml-auto lg:ml-0 flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleLanguage}
              className="bg-white/80 text-brand-primary border border-purple-100 font-bold text-xs md:text-sm py-3 px-4 shadow-sm rounded-full hover:bg-purple-50 transition-all shrink-0 cursor-pointer"
            >
              {lang === "ru" ? "EN" : "RU"}
            </button>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRuStoreClick("top_install")}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-brand-primary px-5 md:px-7 py-3 text-sm md:text-base font-bold text-white shadow-lg shadow-purple-200/70 hover:bg-[#6D28D9] transition-colors cursor-pointer whitespace-nowrap"
            >
              {lang === "ru" ? "Установить Йосю" : "Install Yosa"}
            </motion.a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-full bg-white/80 border border-purple-100 hover:bg-purple-50 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <svg className="w-5 h-5 text-brand-charcoal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="lg:hidden mx-4 mt-4 rounded-[28px] bg-white/95 border border-purple-100 shadow-xl shadow-purple-100/60 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {[
                  { id: "estimator-playground", label: currentText.navTry },
                  { id: "feat-grid", label: currentText.navFeatures },
                  { id: "faq-container", label: currentText.navFaq },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { handleScrollTo(item.id); setMobileMenuOpen(false); }}
                    className="text-left py-3 px-4 rounded-2xl text-sm font-bold text-gray-600 hover:bg-purple-50 hover:text-brand-primary transition-all cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRuStoreClick("mobile_top_install")}
                  className="mt-2 text-center rounded-2xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200/70"
                >
                  {lang === "ru" ? "Установить Йосю" : "Install Yosa"}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-16 space-y-32 md:space-y-44">
        {/* HERO SECTION — Amy style: крупный заголовок слева, телефон справа */}
        <FadeIn direction="up" delay={0.1} persistId="hero">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           {/* Left: huge bold title + short desc + CTAs */}
            <div className="space-y-6 md:space-y-8 lg:pt-8">  {/* ← убрал lg:col-span-7 */}
              <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-charcoal tracking-tighter leading-[1.05] mb-4">
                <TextReveal text={currentText.heroTitle} delay={0.1} />
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  <TextReveal text={currentText.heroTitleAccent} delay={0.3} />
                </span>
              </h1>

              <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
                <TextReveal text={currentText.heroDesc} delay={0.5} />
              </p>

              {/* Multi-store badges layout inspired by Image 1 and RuStore mockup link */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md pt-4">
                {/* RuStore Badge */}
                <motion.a
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRuStoreClick("hero")}
                  data-cta-variant={ctaVariant}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-[20px] flex items-center gap-3.5 shadow-lg hover:shadow-[0_16px_40px_-8px_rgba(37,99,235,0.5)] transition-all duration-300 group cursor-pointer border border-blue-500/30 relative overflow-hidden"
                >
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="bg-white text-blue-600 rounded-xl w-10 h-10 flex items-center justify-center font-bold text-lg shadow-sm shrink-0 uppercase select-none relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                    <span className="relative z-10">ru</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-100/80 block uppercase tracking-wider font-bold leading-none">
                      {lang === "ru" ? ctaCopy.sub_ru : ctaCopy.sub_en}
                    </span>
                    <span className="text-sm font-semibold leading-relaxed tracking-tight block">
                      {lang === "ru" ? ctaCopy.ru : ctaCopy.en}
                    </span>
                  </div>
                </motion.a>

                {/* Mock Badges with Coming Soon labels */}
                <div className="flex flex-col gap-1.5 flex-1 justify-between">
                  {/* Google Play */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-150 border border-gray-200 text-gray-400 p-2.5 rounded-[16px] flex items-center gap-3 text-xs opacity-75 select-none font-medium cursor-not-allowed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    <span>{currentText.downloadPlay}</span>
                  </motion.div>
                  {/* App Store */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-150 border border-gray-200 text-gray-400 p-2.5 rounded-[16px] flex items-center gap-3 text-xs opacity-75 select-none font-medium cursor-not-allowed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    <span>{currentText.downloadAppStore}</span>
                  </motion.div>
                </div>
              </div>

              {/* Small safe tag badge */}
              <div className="flex items-center gap-8 text-xs text-gray-400 font-semibold select-none pt-2">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                  {lang === "ru" ? "Локальные данные" : "On-device data"}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                  {lang === "ru" ? "ИИ-счётчик будущего" : "AI counter of the future"}
                </span>
              </div>
            </div>

            {/* Right Display: Real app screenshot */}
            <div className="flex justify-end">
              <HeroShowcase lang={lang} />
            </div>
          </section>
        </FadeIn>

        {/* Section divider — breathing space */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
          <span className="w-2 h-2 rounded-full bg-brand-primary/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
        </div>

        {/* HOW IT WORKS — Amy-style phone + 01/02/03 steps */}
        <FadeIn direction="up" persistId="how-it-works">
          <HowItWorks lang={lang} />
        </FadeIn>

        {/* CORE FEATURES GRID SECTION — Amy Food Journal style */}
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <FadeIn direction="up" delay={0.1} staggerChildren={0.15} persistId="features-grid">
              <FeaturesGrid lang={lang} />
            </FadeIn>
          </Suspense>
        </LazySection>

        {/* Section divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-brand-secondary/30" />
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        </div>

        {/* ART UNIVERSE GALLERY – арты Йоси с встроенным scroll-parallax */}
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <ArtGallery lang={lang} />
          </Suspense>
        </LazySection>

        {/* «ТЫ ЕЩЁ НЕ СКАЧАЛ?» – игривая секция с реальными фото кота */}
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <FadeIn direction="up" persistId="download-nudge">
              <DownloadNudge lang={lang} />
            </FadeIn>
          </Suspense>
        </LazySection>

        {/* MEET THE CREATOR STORY SECTION – реальные фото кота, картинки в разнобой */}
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <CreatorStory lang={lang} />
          </Suspense>
        </LazySection>

        {/* Section divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
          <span className="w-2 h-2 rounded-full bg-brand-primary/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
        </div>

        {/* FAQ — wide animated panel with reserved answer area so the footer does not jump */}
        <FadeIn direction="up" persistId="faq">
          <section
            id="faq-container"
            className="scroll-mt-24 max-w-6xl mx-auto"
          >
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal tracking-tight">
                {currentText.faqHeading}
              </h2>
              <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
                {currentText.faqSub}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] gap-6 lg:gap-8 items-stretch min-h-[520px]">
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = activeFaq === item.id;
                  const isDimmed = !isOpen;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveFaq(item.id)}
                      animate={{
                        opacity: isDimmed ? 0.54 : 1,
                        x: isOpen ? 18 : 0,
                        scale: isOpen ? 1.035 : 1,
                      }}
                      whileHover={{ x: isOpen ? 18 : 8 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.55 }}
                      className={`w-full text-left rounded-[28px] border-2 bg-white/88 backdrop-blur-sm px-5 md:px-6 py-5 shadow-sm cursor-pointer overflow-hidden relative ${
                        isOpen
                          ? "border-brand-primary shadow-xl shadow-purple-100/60"
                          : "border-purple-100/70 hover:border-purple-200"
                      }`}
                    >
                      <motion.span
                        aria-hidden="true"
                        initial={false}
                        animate={{ width: isOpen ? "100%" : "0%" }}
                        transition={{ duration: 0.34, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-50 via-purple-50/70 to-transparent"
                      />
                      <span className="relative z-10 flex items-center justify-between gap-5">
                        <span className="flex items-center gap-4 min-w-0">
                          <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-2xl shrink-0 text-sm font-black shadow-sm">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-base md:text-lg text-brand-charcoal leading-snug">
                            {lang === "ru" ? item.questionRu : item.questionEn}
                          </span>
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.08 : 1 }}
                          transition={{ type: "spring", stiffness: 460, damping: 24 }}
                          className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center text-xl font-bold transition-colors ${
                            isOpen ? "bg-brand-primary text-white" : "bg-purple-50 text-brand-primary"
                          }`}
                        >
                          +
                        </motion.span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="relative min-h-[360px] lg:min-h-full rounded-[36px] border border-purple-100/70 bg-white/82 backdrop-blur-md shadow-xl shadow-purple-100/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white to-orange-50/60" />
                <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-brand-secondary/10 blur-3xl" />
                <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-brand-accent/10 blur-3xl" />
                <AnimatePresence mode="wait" initial={false}>
                  {(() => {
                    const selected = FAQ_ITEMS.find((item) => item.id === activeFaq) ?? FAQ_ITEMS[0];
                    const selectedIndex = FAQ_ITEMS.findIndex((item) => item.id === selected.id);
                    return (
                      <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, x: 42, clipPath: "inset(0 0 0 18% round 36px)", filter: "blur(6px)" }}
                        animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0% round 36px)", filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -34, clipPath: "inset(0 18% 0 0 round 36px)", filter: "blur(5px)" }}
                        transition={{ duration: 0.34, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="relative z-10 h-full p-7 md:p-9 flex flex-col justify-center"
                      >
                        <div className="text-sm font-black text-brand-primary uppercase tracking-[0.22em] mb-5">
                          FAQ {String(selectedIndex + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-2xl md:text-4xl font-display font-black text-brand-charcoal leading-tight mb-6">
                          {lang === "ru" ? selected.questionRu : selected.questionEn}
                        </h3>
                        <motion.p
                          initial={{ y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.08, duration: 0.28 }}
                          className="text-base md:text-lg text-gray-500 leading-relaxed"
                        >
                          {lang === "ru" ? selected.answerRu : selected.answerEn}
                        </motion.p>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>

      {/* Footer в стиле Amy: колонки ссылок + крупная типографика */}
      <footer className="mt-24 md:mt-32 bg-[#7C3AED] text-white rounded-t-[32px] md:rounded-t-[44px] pt-14 md:pt-16 pb-8 px-4 md:px-8 relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top row: logo + columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-purple-500/40">
            {/* Logo column */}
            <div className="md:col-span-1 flex flex-col gap-4">
              <div>
                <span className="font-display font-bold text-2xl tracking-tight block leading-none">
                  {lang === "ru" ? "Йося" : "Yosa"}
                </span>
                <span className="text-purple-200/70 text-xs leading-tight block mt-1">
                  {lang === "ru" ? "ИИ-счётчик калорий" : "AI calorie counter"}
                </span>
              </div>
              <p className="text-purple-200/70 text-sm leading-relaxed max-w-[200px]">
                {lang === "ru"
                  ? "Умное отслеживание питания. Данные хранятся только на вашем устройстве."
                  : "Smart nutrition tracking. Your data stays on your device only."}
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                <a
                  href="https://www.youtube.com/@xedanter"
                  target="_blank"
                  rel="noopener"
                  aria-label="YouTube"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/xedanter17151"
                  target="_blank"
                  rel="noopener"
                  aria-label="X / Twitter"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column: Приложение */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-base mb-1">
                {lang === "ru" ? "Приложение" : "App"}
              </h4>
              <a
                href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRuStoreClick("footer_product")}
                className="text-purple-200/80 hover:text-white text-sm transition-colors"
              >
                RuStore
              </a>
              <span className="text-purple-200/40 text-sm select-none">Google Play ({lang === "ru" ? "Скоро" : "Soon"})</span>
              <span className="text-purple-200/40 text-sm select-none">iOS ({lang === "ru" ? "Скоро" : "Soon"})</span>
            </div>

            {/* Column: Разделы */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-base mb-1">
                {lang === "ru" ? "Разделы" : "Sections"}
              </h4>
              {[
                { id: "estimator-playground", label: lang === "ru" ? "Как работает" : "How it works" },
                { id: "feat-grid", label: lang === "ru" ? "Функции" : "Features" },
                { id: "faq-container", label: "FAQ" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-purple-200/80 hover:text-white text-sm transition-colors text-left cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Column: О проекте */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-base mb-1">
                {lang === "ru" ? "О проекте" : "About"}
              </h4>
              <span className="text-purple-200/80 text-sm">
                {lang === "ru" ? "Разработчик: Александр" : "Developer: Alexander"}
              </span>
              <span className="text-purple-200/80 text-sm">
                {lang === "ru" ? "Версия: 1.2.0" : "Version: 1.2.0"}
              </span>
              <span className="text-purple-200/80 text-sm">
                {lang === "ru" ? "Платформа: Android" : "Platform: Android"}
              </span>
              <span className="text-purple-200/80 text-sm">
                {lang === "ru" ? "100% локальные данные" : "100% local data"}
              </span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-purple-200/70">
            <p>© {new Date().getFullYear()} Yosa (Йося). {lang === "ru" ? "Все права защищены." : "All rights reserved."}</p>
            <p className="opacity-80 text-xs">
              {lang === "ru" ? "Мы не продаём и не передаём ваши данные третьим лицам" : "We never sell or share your data with third parties"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
