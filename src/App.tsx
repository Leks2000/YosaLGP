import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  Smartphone,
  Scale,
  Sparkles,
  Mic,
  Heart,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Download,
  ChevronUp,
  Cpu,
  Award,
  MousePointer,
  Sparkle,
  Settings,
} from "lucide-react";

import FadeIn from "./components/FadeIn";
import FadeInItem from "./components/FadeInItem";
import TextReveal from "./components/TextReveal";
import { Language, FAQItem, FeatureItem } from "./types";
import PawCursor from "./components/PawCursor";
import CalorieEstimator from "./components/CalorieEstimator";
import GoalsCalculator from "./components/GoalsCalculator";
import WidgetSandbox from "./components/WidgetSandbox";
import BadgesGallery from "./components/BadgesGallery";

// Interactive FAQ Content derived from the user request
const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    questionRu: "Что такое стрик (серия дней)?",
    questionEn: "What is a streak count?",
    answerRu:
      "Стрик — это серия дней подряд, в которые вы заносите съеденную еду в приложение. Чем длиннее ваш стрик активности, тем больше памятных кошачьих наград вы разблокируете! Это помогает поддерживать железную мотивацию в игровой форме.",
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
      "Йося Pro — это расширенная версия приложения с безлимитными AI-запросами к умному КБЖУ парсеру, полной безлимитной историей дневников и удобной глубокой аналитикой. Оформить подписку можно прямо внутри мобильного приложения.",
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
      "Да! Вместо ручного набора вы можете зажать кнопку микрофона в строке ввода и сказать, например: «овсянка с бананом на молоке» или «две чашки капучино и синнабон», — и ИИ моментально рассчитает точный КБЖУ за секунды.",
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

const FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    emoji: "robot",
    titleRu: "Умное распознавание",
    titleEn: "Smart AI Engine",
    descRu:
      "Скажите «пюре с котлетой» — система мгновенно рассчитает точный КБЖУ.",
    descEn:
      "Say 'mashed potatoes' — and the AI computes the exact nutrient split.",
  },
  {
    id: "feat-2",
    emoji: "mic",
    titleRu: "Голосовой ввод",
    titleEn: "Instant Voice Logging",
    descRu:
      "Диктуйте еду на ходу. Йося поймет контекст и внесет всё в дневник.",
    descEn: "State your meal on the run. Yosa maps the context instantly.",
  },
  {
    id: "feat-3",
    emoji: "smartphone",
    titleRu: "Удобный виджет",
    titleEn: "Convenient Widget",
    descRu:
      "Отслеживайте норму калорий и БЖУ прямо на главном экране телефона.",
    descEn:
      "Display calorie balance meters and macro grids on your home screen.",
  },
  {
    id: "feat-4",
    emoji: "trophy",
    titleRu: "Игровой стрик",
    titleEn: "Streak Habits",
    descRu:
      "Заносите еду каждый день и открывайте эксклюзивные пушистые бейджи.",
    descEn:
      "Log meals daily to keep the fire glowing and unlock reward badges.",
  },
  {
    id: "feat-5",
    emoji: "shield",
    titleRu: "Локальные данные",
    titleEn: "Privacy-First Storage",
    descRu:
      "Ваш журнал и вес хранятся только локально на смартфоне. 100% приватно.",
    descEn:
      "Your target constraints and logs live purely on your device memory.",
  },
  {
    id: "feat-6",
    emoji: "settings",
    titleRu: "Личные нормы БЖУ",
    titleEn: "Adjustable Targets",
    descRu: "Индивидуальный расчет идеальных пропорций для ваших целей и веса.",
    descEn:
      "Compute healthy, customized target splits for optimal body metrics.",
  },
];

export default function App() {
  const [lang, setLang] = useState<Language>("ru");
  const [customCursor, setCustomCursor] = useState(true);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Localization structure for main layout titles & sections
  const staticText = {
    ru: {
      tag: "🐱 Йося — Умный счётчик калорий с ИИ-котом",
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
      navCalc: "Режим целей",
      navWidget: "Красивый виджет",
      navFaq: "Частые вопросы",
      badgesSec: "Стрики и трофеи",
      developersSec: "Создатели проекта",
      creatorHeading:
        "Привет, я Александр! 🐾 Меня вдохновила идея упростить скучные подсчёты калорий и сделать приложение, в которое хочется заходить каждый день ради пушистого друга.",
      creatorDesc:
        "Я создал Йосю, чтобы помочь тысячам людей вести дневник питания без рутины. Я потратил кучу времени на полировку дизайна, динамические виджеты и разработку персонального кота-нутрициолога. С Йосей вам не нужно быть экспертом по балансу — просто пишите еду как есть, а пушистик поможет вам оставаться в форме!",
      widgetsText: "Виджет",
      faqHeading: "Вопросы и ответы",
      faqSub:
        "Полезная информация о работе ИИ-нутрициолога прямо у вас под лапой",
      allRights:
        "Все права защищены. Разработано в духе Amy Food Journal с любовью к пушистым котикам.",
    },
    en: {
      tag: "🐱 Yosa — AI Calorie Counter with Cat Companion",
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
      navCalc: "Nutrition Setup",
      navWidget: "Desktop Widget",
      navFaq: "FAQ",
      badgesSec: "Streaks & Trophies",
      developersSec: "Meet Yosa's Creator",
      creatorHeading:
        "Hi, I'm Alexander! 🐾 I wanted to turn boring diet planning into an exciting, gamified experience with a friendly virtual pet always by your side.",
      creatorDesc:
        "I wanted to create a calorie tracking experience that felt incredible to use — like writing in a notes app. Elegant graphics and natural interaction was something I devoted hundreds of hours to. Hopefully Yosa helps you manage your nutrition habits as much as it helped me! Keep your streak flowing, human!",
      widgetsText: "Widget View",
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
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream/40 bg-grid text-brand-charcoal font-sans text-sm md:text-base leading-relaxed antialiased selection:bg-brand-primary/10 select-none pb-12 custom-scrollbar relative">
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

      {/* Header element conforming to standard nav setup */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-50/70 py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo with stretched cat icon details matching Image 15 */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-display shadow-md group-hover:scale-105 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1.1-3.48 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
                <path d="M8 14v.5" />
                <path d="M16 14v.5" />
                <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-lg leading-tight tracking-tight text-brand-charcoal">
                {lang === "ru" ? "Йося" : "Yosa"}
              </span>
            </div>
          </div>

          {/* Desktop Anchor Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-gray-500">
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
              onClick={() => handleScrollTo("streaks-section")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.badgesSec}
            </button>
            <button
              onClick={() => handleScrollTo("norm-calculator")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.navCalc}
            </button>
            <button
              onClick={() => handleScrollTo("widget-preview-section")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.navWidget}
            </button>
            <button
              onClick={() => handleScrollTo("faq-container")}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              {currentText.navFaq}
            </button>
          </nav>

          {/* Language Switcher and Option panels */}
          <div className="flex items-center gap-3">
            {/* Custom Mouse Paw trail toggle */}
            <button
              onClick={() => setCustomCursor(!customCursor)}
              className={`p-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer text-xs font-medium hidden md:flex ${
                customCursor
                  ? "bg-purple-100/90 text-brand-primary hover:bg-purple-200"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
              title="Toggle Custom Paw Cursor"
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === "ru"
                  ? customCursor
                    ? "Курсор: Вкл"
                    : "Курсор: Выкл"
                  : customCursor
                    ? "Cursor: ON"
                    : "Cursor: OFF"}
              </span>
            </button>

            {/* Fluent Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="bg-brand-primary text-white font-semibold text-xs py-2 px-4 shadow rounded-xl hover:bg-brand-primary/95 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              {lang === "ru" ? "ENGLISH" : "RUSSIAN"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-16 space-y-24 md:space-y-36">
        {/* HERO SECTION CONTAINER */}
        <FadeIn direction="up" delay={0.1}>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text / Download buttons layout */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-6xl font-display font-semibold text-brand-charcoal tracking-tight leading-[1.1] mb-4">
                <TextReveal text={currentText.heroTitle} delay={0.1} />
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-bold">
                  <TextReveal text={currentText.heroTitleAccent} delay={0.3} />
                </span>
              </h1>

              <p className="text-gray-500 text-base md:text-xl max-w-xl leading-relaxed">
                <TextReveal text={currentText.heroDesc} delay={0.5} />
              </p>

              {/* Multi-store badges layout inspired by Image 1 and RuStore mockup link */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md pt-4">
                {/* RuStore Badge */}
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-[20px] flex items-center gap-3.5 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer border border-blue-500/30"
                >
                  <div className="bg-white text-blue-600 rounded-xl w-10 h-10 flex items-center justify-center font-bold text-lg shadow-sm shrink-0 uppercase select-none relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                    <span className="relative z-10">ru</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-100/80 block uppercase tracking-wider font-bold leading-none">
                      {currentText.rustoreSub}
                    </span>
                    <span className="text-sm font-semibold leading-relaxed tracking-tight block">
                      {currentText.downloadRuStore}
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
                    <Smartphone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{currentText.downloadPlay}</span>
                  </motion.div>
                  {/* App Store */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-150 border border-gray-200 text-gray-400 p-2.5 rounded-[16px] flex items-center gap-3 text-xs opacity-75 select-none font-medium cursor-not-allowed"
                  >
                    <Flame className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{currentText.downloadAppStore}</span>
                  </motion.div>
                </div>
              </div>

              {/* Small safe tag badge */}
              <div className="flex items-center gap-8 text-xs text-gray-400 font-semibold select-none pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  Локальные данные
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-brand-accent fill-brand-accent" />
                  ИИ-счетчик будущего
                </span>
              </div>
            </div>

            {/* Right Display: Video Placeholder Rather Than Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Ambient visual glowing dots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

              {/* Video Placeholder Container */}
              <div className="bg-white border-4 border-white/50 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(124,58,237,0.3)] relative w-full sm:w-[320px] aspect-[9/16] overflow-hidden group transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(124,58,237,0.4)] cursor-pointer">
                {/* Fake UI header */}
                <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/20 to-transparent z-10"></div>

                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-50 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Decorative background elements inside the placeholder */}
                  <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/40 blur-3xl rounded-full"></div>
                  <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-brand-primary/10 blur-2xl rounded-full"></div>

                  {/* Play Button - Glassmorphism */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full border border-brand-primary/30 animate-ping opacity-75"></div>
                    <div className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-inner">
                      <svg
                        className="w-6 h-6 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  <span className="mt-6 text-sm font-display font-bold text-brand-charcoal z-10 relative bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {lang === "ru" ? "Заглушка для видео" : "Video Placeholder"}
                  </span>
                  <span className="text-[11px] text-gray-500 mt-2 px-6 text-center z-10 relative font-medium">
                    {lang === "ru"
                      ? "Тут будет красиво крутиться ваше демо-видео"
                      : "Your beautiful promo video will loop right here"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* INTERACTIVE CALORIE PLAYGROUND SANDBOX */}
        <FadeIn direction="up" staggerChildren={0.15}>
          <section id="estimator-playground" className="scroll-mt-24">
            <CalorieEstimator lang={lang} />
          </section>
        </FadeIn>

        {/* CORE FEATURES GRID SECTION */}
        <FadeIn direction="up" delay={0.1} staggerChildren={0.15}>
          <section id="feat-grid" className="scroll-mt-24 space-y-10">
            <FadeInItem direction="up" className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight">
                {lang === "ru" ? "Что умеет Йося" : "What Yosa Can Do"}
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                {lang === "ru"
                  ? "Умный карманный нутрициолог, адаптированный под современный ритм жизни"
                  : "A fun, intelligent calorie tracker engineered for effortless daily habits"}
              </p>
            </FadeInItem>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((item) => {
                const IconObj = {
                  robot: <Cpu className="w-8 h-8 text-brand-primary" />,
                  mic: <Mic className="w-8 h-8 text-brand-secondary" />,
                  smartphone: (
                    <Smartphone className="w-8 h-8 text-brand-accent" />
                  ),
                  trophy: <Award className="w-8 h-8 text-brand-primary" />,
                  shield: (
                    <ShieldCheck className="w-8 h-8 text-brand-secondary" />
                  ),
                  settings: <Settings className="w-8 h-8 text-brand-accent" />,
                }[item.emoji] || (
                  <Sparkles className="w-8 h-8 text-brand-primary" />
                );

                return (
                  <FadeInItem
                    key={item.id}
                    direction="up"
                    className="bg-white/70 backdrop-blur-md border border-purple-100 hover:border-brand-primary p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 transform group hover:-translate-y-1"
                  >
                    <div className="mb-4 bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-100 transition-all select-none">
                      {IconObj}
                    </div>
                    <h3 className="text-lg font-display font-bold text-brand-charcoal mb-2 leading-tight">
                      {lang === "ru" ? item.titleRu : item.titleEn}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                      {lang === "ru" ? item.descRu : item.descEn}
                    </p>
                  </FadeInItem>
                );
              })}
            </div>
          </section>
        </FadeIn>

        {/* STREAK & ACHIEVEMENTS SECTION */}
        <FadeIn direction="up" staggerChildren={0.1}>
          <section id="streaks-section" className="scroll-mt-24">
            <BadgesGallery lang={lang} />
          </section>
        </FadeIn>

        {/* BMR TDEE GOALS CALCULATOR */}
        <FadeIn direction="up">
          <section id="norm-calculator" className="scroll-mt-24">
            <GoalsCalculator lang={lang} />
          </section>
        </FadeIn>

        {/* INTERACTIVE WIDGET CUSTOMIZATION SANDBOX */}
        <FadeIn direction="up" staggerChildren={0.15}>
          <section id="widget-preview-section" className="scroll-mt-24">
            <WidgetSandbox lang={lang} />
          </section>
        </FadeIn>

        {/* MEET THE CREATOR STORY SECTION inspired by Chris & cat Amy references on images 10 & 17 */}
        <FadeIn direction="up" staggerChildren={0.15}>
          <section
            id="creator-story"
            className="bg-purple-50/40 rounded-[40px] p-8 md:p-14 border border-purple-100/80 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden relative shadow-lg"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-primary/5 to-pink-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

            <div className="lg:col-span-6 space-y-6">
              <FadeInItem className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm text-xs uppercase tracking-wider font-bold text-brand-primary">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === "ru" ? "История Йоси" : "Behind the Paw"}
              </FadeInItem>
              <FadeInItem>
                <h3 className="text-3xl md:text-5xl font-display font-medium text-brand-charcoal leading-tight tracking-tight">
                  {currentText.creatorHeading}
                </h3>
              </FadeInItem>
              <FadeInItem>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                  {currentText.creatorDesc}
                </p>
              </FadeInItem>
              <FadeInItem className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-4 border-white bg-gradient-to-tr from-brand-primary to-brand-secondary text-white flex items-center justify-center select-none shadow-md">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-display font-semibold block leading-none text-brand-charcoal">
                      {lang === "ru" ? "Александр" : "Alexander"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block font-medium">
                      {lang === "ru" ? "Создатель проекта" : "Project Creator"}
                    </span>
                  </div>
                </div>

                <div className="h-10 w-px bg-purple-200 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.youtube.com/@xedanter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white shadow-sm hover:shadow hover:bg-gray-50 rounded-xl text-[#FF0000] hover:scale-105 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/xedanter17151"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white shadow-sm hover:shadow hover:bg-gray-50 rounded-xl text-black hover:scale-105 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alexander-halle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white shadow-sm hover:shadow hover:bg-gray-50 rounded-xl text-[#0077B5] hover:scale-105 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.605 0 4.267 2.372 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </FadeInItem>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[350px]">
                {/* 1st Photo (Black cat portrait) */}
                <div className="col-span-7 row-span-2 rounded-3xl overflow-hidden shadow-md group relative">
                  <img
                    src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80"
                    alt="Yosa the black cat portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* 2nd Photo (Cat in bags/playful) */}
                <div className="col-span-5 row-span-1 rounded-3xl overflow-hidden shadow-md group relative">
                  <img
                    src="https://images.unsplash.com/photo-1615332579037-3c44b3660b53?auto=format&fit=crop&w=400&q=80"
                    alt="Playful black cat"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* 3rd Photo (Resting black cat) */}
                <div className="col-span-5 row-span-1 rounded-3xl overflow-hidden shadow-md group relative">
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
                    alt="Resting black cat"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Note for the creator to replace the images above easily */}
              <div className="absolute -bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow border border-gray-100 text-[10px] text-gray-400 font-medium">
                {lang === "ru"
                  ? "Замените ссылки на ваши реальные фото кота"
                  : "Replace src links with raw paths to your real cat pictures"}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* INDIVIDUAL FAQ ACCORDIONS */}
        <FadeIn direction="up" staggerChildren={0.1}>
          <section
            id="faq-container"
            className="scroll-mt-24 space-y-8 max-w-3xl mx-auto"
          >
            <FadeInItem direction="up" className="text-center space-y-2">
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-brand-charcoal tracking-tight">
                {currentText.faqHeading}
              </h2>
              <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto">
                {currentText.faqSub}
              </p>
            </FadeInItem>

            <div className="space-y-5">
              {FAQ_ITEMS.map((item) => {
                const isOpen = activeFaq === item.id;
                return (
                  <FadeInItem
                    key={item.id}
                    direction="up"
                    className={`relative ${isOpen ? "z-50" : "z-10"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white border transition-all rounded-2xl shadow-sm ${
                        isOpen
                          ? "border-brand-primary shadow-md"
                          : "border-purple-50 hover:shadow-md hover:border-purple-200"
                      }`}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : item.id)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-xs md:text-sm text-brand-charcoal cursor-pointer outline-none"
                      >
                        <span>
                          {lang === "ru" ? item.questionRu : item.questionEn}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="p-1 bg-purple-50 rounded-md text-brand-primary shrink-0"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-brand-primary/30 rounded-2xl shadow-xl overflow-hidden origin-top"
                          >
                            <div className="p-5 text-xs md:text-sm text-gray-600 leading-relaxed bg-gradient-to-b from-purple-50/30 to-transparent">
                              {lang === "ru" ? item.answerRu : item.answerEn}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </FadeInItem>
                );
              })}
            </div>
          </section>
        </FadeIn>
      </main>

      {/* HIGHER PURPLE COLORED FOOTER MATCHING IMAGE 11 */}
      <footer className="mt-28 md:mt-40 bg-[#7C3AED] text-white rounded-t-[40px] md:rounded-t-[60px] py-12 md:py-16 px-4 md:px-8 relative overflow-hidden">
        {/* Soft background decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-purple-600/60">
          {/* Logo element */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-white text-brand-primary w-11 h-11 rounded-2xl flex items-center justify-center font-display shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1.1-3.48 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
                  <path d="M8 14v.5" />
                  <path d="M16 14v.5" />
                  <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                </svg>
              </div>
              <span className="font-display font-semibold text-2xl tracking-tight">
                {lang === "ru" ? "Йося" : "Yosa"}
              </span>
            </div>

            <p className="text-purple-100/80 text-xs md:text-sm max-w-sm leading-relaxed">
              {lang === "ru"
                ? "Умный счётчик калорий с котом-помощником. Никаких штрихкодов, никакой базы данных, только мгновенная оценка КБЖУ."
                : "The advanced, feline-assisted calorie counter powered by local storage and speech recognition. Feed your cat, stay in shape."}
            </p>
          </div>

          {/* Product links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-purple-200 mb-4 select-none">
              {lang === "ru" ? "Приложение" : "Product"}
            </h4>
            <div className="flex flex-col gap-2 text-xs md:text-sm text-purple-100">
              <a
                href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                RuStore Android
              </a>
              <span className="opacity-60 select-none">Google Play (Soon)</span>
              <span className="opacity-60 select-none">
                App Store iOS (Soon)
              </span>
            </div>
          </div>

          {/* Guides & Resources */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-purple-200 mb-4 select-none">
              {lang === "ru" ? "Конфиденциальность" : "Privacy & Terms"}
            </h4>
            <div className="flex flex-col gap-2 text-xs md:text-sm text-purple-100">
              <span className="cursor-default">
                🔒{" "}
                {lang === "ru"
                  ? "100% Локальное хранение данных"
                  : "100% On-device storage"}
              </span>
              <span className="cursor-default">
                🐾{" "}
                {lang === "ru"
                  ? "Мы никогда не продаём ваши данные"
                  : "We never sell your personal data"}
              </span>
            </div>
          </div>
        </div>

        {/* copyright and design credits links matching Image 11 */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-purple-200/90 font-medium">
          <p>
            © {new Date().getFullYear()} Yosa (Йося). {currentText.allRights}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.rustore.ru/catalog/app/ru.puhlyash.yosa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RuStore Catalog</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
