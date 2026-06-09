import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

import { trackRuStoreClick } from "./lib/analytics";
import { getVariant, CTA_COPY } from "./lib/abtest";
import FadeIn from "./components/FadeIn";
import Parallax from "./components/Parallax";
import FadeInItem from "./components/FadeInItem";
import TextReveal from "./components/TextReveal";
import { Language, FAQItem, FeatureItem } from "./types";
import PawCursor from "./components/PawCursor";
import HeroShowcase from "./components/HeroShowcase";
import HowItWorks from "./components/HowItWorks";

// Lazy-loaded sections below the fold (code splitting)
const GoalsCalculator = lazy(() => import("./components/GoalsCalculator"));
const WidgetSandbox = lazy(() => import("./components/WidgetSandbox"));
const BadgesGallery = lazy(() => import("./components/BadgesGallery"));
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
import appIconArt from "./assets/images/app_icon.webp";
import yosaStretch from "./assets/images/yosa_stretch.webp";
import catBedImg from "./assets/images/cat_photo_bed.webp";

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

const FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    emoji: "robot",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>`,
    titleRu: "Умное распознавание",
    titleEn: "Smart AI Engine",
    descRu:
      "Скажите «пюре с котлетой» – система мгновенно рассчитает точный КБЖУ.",
    descEn:
      "Say 'mashed potatoes' – and the AI computes the exact nutrient split.",
  },
  {
    id: "feat-2",
    emoji: "mic",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>`,
    titleRu: "Голосовой ввод",
    titleEn: "Instant Voice Logging",
    descRu:
      "Диктуйте еду на ходу. Йося поймет контекст и внесет всё в дневник.",
    descEn: "State your meal on the run. Yosa maps the context instantly.",
  },
  {
    id: "feat-3",
    emoji: "smartphone",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>`,
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
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>`,
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
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>`,
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
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M4.745 3A23.933 23.933 0 0112 3c2.517 0 4.942.388 7.255 1.107a48.26 48.26 0 00-.955 8.143 48.042 48.042 0 01-1.232 3.662 47.97 47.97 0 01-2.128 4.174A48.112 48.112 0 0112 21.933a48.03 48.03 0 01-2.94-1.847 47.97 47.97 0 01-2.128-4.174 48.042 48.042 0 01-1.232-3.662 48.26 48.26 0 00-.955-8.143zM12 13.5a3 3 0 100-6 3 3 0 000 6z" /></svg>`,
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
      navCalc: "Режим целей",
      navWidget: "Красивый виджет",
      navFaq: "Частые вопросы",
      badgesSec: "Стрики и трофеи",
      developersSec: "Создатели проекта",
      creatorHeading:
        "Привет, я Александр! Меня вдохновила идея упростить скучные подсчёты калорий и сделать приложение, в которое хочется заходить каждый день ради пушистого друга.",
      creatorDesc:
        "Я создал Йосю, чтобы помочь тысячам людей вести дневник питания без рутины. Я потратил кучу времени на полировку дизайна, динамические виджеты и разработку персонального кота-нутрициолога. С Йосей вам не нужно быть экспертом по балансу – просто пишите еду как есть, а пушистик поможет вам оставаться в форме!",
      widgetsText: "Виджет",
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
      navCalc: "Nutrition Setup",
      navWidget: "Desktop Widget",
      navFaq: "FAQ",
      badgesSec: "Streaks & Trophies",
      developersSec: "Meet Yosa's Creator",
      creatorHeading:
        "Hi, I'm Alexander! I wanted to turn boring diet planning into an exciting, gamified experience with a friendly virtual pet always by your side.",
      creatorDesc:
        "I wanted to create a calorie tracking experience that felt incredible to use – like writing in a notes app. Elegant graphics and natural interaction was something I devoted hundreds of hours to. Hopefully Yosa helps you manage your nutrition habits as much as it helped me! Keep your streak flowing, human!",
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
    <div className="min-h-screen bg-brand-cream/40 bg-grid text-brand-charcoal font-sans text-sm md:text-base leading-relaxed antialiased selection:bg-brand-primary/10 select-none custom-scrollbar relative scroll-smooth">
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
          {/* Logo — увеличено до 52px + текст крупнее */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={yosaStretch}
              alt={lang === "ru" ? "Кот Йося" : "Yosa cat"}
              width="52"
              height="52"
              className="w-[52px] h-[52px] object-contain group-hover:scale-110 transition-transform"
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-tight tracking-tight text-brand-charcoal">
                {lang === "ru" ? "Йося" : "Yosa"}
              </span>
              <span className="text-[10px] text-gray-400 font-medium leading-tight">
                {lang === "ru" ? "ИИ-счётчик калорий" : "AI calorie counter"}
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

          {/* Right side: language switcher + burger */}
          <div className="flex items-center gap-3">
            {/* Custom Mouse Paw trail toggle (desktop only) */}
            <button
              onClick={() => setCustomCursor(!customCursor)}
              className={`p-2 rounded-xl transition-all shadow-sm items-center gap-1.5 cursor-pointer text-xs font-medium hidden md:flex ${
                customCursor
                  ? "bg-purple-100/90 text-brand-primary hover:bg-purple-200"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
              title="Toggle Custom Paw Cursor"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
                  customCursor ? "bg-brand-primary" : "bg-gray-300"
                }`}
              />
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
              {lang === "ru" ? "EN" : "RU"}
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-purple-100 transition-colors cursor-pointer"
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

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-purple-50 mt-4"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
                {[
                  { id: "estimator-playground", label: currentText.navTry },
                  { id: "feat-grid", label: currentText.navFeatures },
                  { id: "streaks-section", label: currentText.badgesSec },
                  { id: "norm-calculator", label: currentText.navCalc },
                  { id: "widget-preview-section", label: currentText.navWidget },
                  { id: "faq-container", label: currentText.navFaq },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { handleScrollTo(item.id); setMobileMenuOpen(false); }}
                    className="text-left py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-600 hover:bg-purple-50 hover:text-brand-primary transition-all cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-16 space-y-32 md:space-y-44">
        {/* HERO SECTION — Amy style: крупный заголовок слева, телефон справа */}
        <FadeIn direction="up" delay={0.1}>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: huge bold title + short desc + CTAs */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-charcoal tracking-tighter leading-[1.05] mb-4">
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

            {/* Right Display: Live screenshot carousel of the real app */}
            <div className="lg:col-span-5 flex justify-center relative">
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

        {/* HOW IT WORKS — Amy-style phone + 01/02/03 steps (замена CalorieEstimator) */}
        <FadeIn direction="up">
          <HowItWorks lang={lang} />
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
              {FEATURES.map((item, idx) => (
                <FadeInItem
                  key={item.id}
                  direction="up"
                  className="bg-white/70 backdrop-blur-md border border-purple-100 hover:border-brand-primary p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 transform group hover:-translate-y-1"
                >
                  {/* SVG иконка вместо номера */}
                  <div className="mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary text-white w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all select-none shadow-md">
                    <span dangerouslySetInnerHTML={{ __html: item.icon || '' }} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-brand-charcoal mb-2 leading-tight">
                    {lang === "ru" ? item.titleRu : item.titleEn}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {lang === "ru" ? item.descRu : item.descEn}
                  </p>
                </FadeInItem>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Section divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-brand-secondary/30" />
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        </div>

        {/* STREAK & ACHIEVEMENTS SECTION */}
        <Suspense fallback={<SectionLoader />}>
          <FadeIn direction="up" staggerChildren={0.1}>
            <section id="streaks-section" className="scroll-mt-24">
              <BadgesGallery lang={lang} />
            </section>
          </FadeIn>
        </Suspense>

        {/* Section divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
          <span className="w-2 h-2 rounded-full bg-brand-primary/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
        </div>

        {/* BMR TDEE GOALS CALCULATOR */}
        <Suspense fallback={<SectionLoader />}>
          <FadeIn direction="up">
            <section id="norm-calculator" className="scroll-mt-24">
              <GoalsCalculator lang={lang} />
            </section>
          </FadeIn>
        </Suspense>

        {/* INTERACTIVE WIDGET CUSTOMIZATION SANDBOX */}
        <Suspense fallback={<SectionLoader />}>
          <FadeIn direction="up" staggerChildren={0.15}>
            <section id="widget-preview-section" className="scroll-mt-24">
              <WidgetSandbox lang={lang} />
            </section>
          </FadeIn>
        </Suspense>

        {/* Section divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-brand-secondary/30" />
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        </div>

        {/* ART UNIVERSE GALLERY – арты Йоси (банка, киви, фастфуд, космонавт) */}
        {/* Scroll-triggered parallax даёт контрастное движение vs соседние блоки */}
        <Suspense fallback={<SectionLoader />}>
          <Parallax offset={40}>
            <FadeIn direction="up">
              <ArtGallery lang={lang} />
            </FadeIn>
          </Parallax>
        </Suspense>

        {/* «ТЫ ЕЩЁ НЕ СКАЧАЛ?» – игривая секция с реальными фото кота */}
        <Suspense fallback={<SectionLoader />}>
          <FadeIn direction="up">
            <DownloadNudge lang={lang} />
          </FadeIn>
        </Suspense>

        {/* MEET THE CREATOR STORY SECTION – реальные фото кота, картинки в разнобой */}
        <Suspense fallback={<SectionLoader />}>
          <CreatorStory lang={lang} />
        </Suspense>

        {/* Section divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
          <span className="w-2 h-2 rounded-full bg-brand-primary/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />
        </div>

        {/* FAQ — одна колонка, плавное раскрытие, dim соседей, без сдвига layout */}
        <FadeIn direction="up">
          <section
            id="faq-container"
            className="scroll-mt-24 space-y-10 max-w-3xl mx-auto"
          >
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-brand-charcoal tracking-tight">
                {currentText.faqHeading}
              </h2>
              <p className="text-sm text-gray-400 max-w-lg mx-auto">
                {currentText.faqSub}
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = activeFaq === item.id;
                const isDimmed = activeFaq !== null && !isOpen;
                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      opacity: isDimmed ? 0.45 : 1,
                      scale: isDimmed ? 0.985 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className={`bg-white/85 backdrop-blur-sm border-2 rounded-3xl overflow-hidden transition-colors ${
                      isOpen
                        ? "border-brand-primary shadow-lg shadow-purple-100"
                        : "border-purple-100/60 hover:border-purple-200"
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : item.id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer outline-none group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-xl shrink-0 text-xs font-bold shadow-sm">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-sm md:text-base text-brand-charcoal leading-snug">
                          {lang === "ru" ? item.questionRu : item.questionEn}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                          isOpen ? "bg-brand-primary text-white" : "bg-purple-50 text-brand-primary"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </motion.span>
                    </button>

                    {/* Плавное раскрытие по высоте — соседи НЕ двигаются */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-6 pb-6 pt-0 text-sm md:text-base text-gray-500 leading-relaxed border-t border-purple-50 mt-0 pt-4">
                            <div className="pl-12">
                              {lang === "ru" ? item.answerRu : item.answerEn}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
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
              <div className="flex items-center gap-3">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg p-1.5 shrink-0">
                  <img
                    src={yosaStretch}
                    alt={lang === "ru" ? "Кот Йося" : "Yosa cat"}
                    width="36"
                    height="36"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-xl tracking-tight block leading-none">
                    {lang === "ru" ? "Йося" : "Yosa"}
                  </span>
                  <span className="text-purple-200/70 text-xs leading-tight block mt-0.5">
                    {lang === "ru" ? "ИИ-счётчик калорий" : "AI calorie counter"}
                  </span>
                </div>
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
                { id: "streaks-section", label: lang === "ru" ? "Достижения" : "Streaks" },
                { id: "faq-container", label: "FAQ" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { const el = document.getElementById(item.id); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
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
                {lang === "ru" ? "Версия: 1.0.3" : "Version: 1.0.3"}
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
