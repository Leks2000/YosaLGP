import React from "react";
import { Language } from "../types";
import desktopWidgetImg from "../assets/images/yosa_desktop_widget.webp";
import adWidget from "../assets/images/ad_04_widget.webp";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

interface WidgetSandboxProps {
  lang: Language;
}

const LOCALIZATION = {
  ru: {
    badge: "Интерактивные виджеты",
    title: "Йося всегда на твоём экране",
    subtitle:
      "Следите за калориями, шкалой сытости и настроением пушистого друга прямо на рабочем столе телефона.",
    descText:
      "Специально разработанный для Android-устройств интерактивный виджет позволяет мгновенно вносить блюда и отслеживать калорийность без необходимости каждый раз запускать основное приложение.",
    featureTitle: "Уникальные возможности виджета:",
    features: [
      "Живая анимация кошачьего настроения: кот спит утром, радуется сытным приёмам пищи и впадает в панику при сильном переборе ваших лимитов калорий.",
      "Шкалы сытости БЖУ: интуитивные цветные линии показывают баланс белков, жиров и углеводов в реальном времени.",
      "Мини-виджеты: экономичные размеры 2х2 или полноценный информационный экран 4x2 со списком лога на день.",
    ],
    catRemark:
      "«Я сижу в виджете и жду твой сытный обед, хозяин! Добавь вкусную котлетку прямо с экрана, и я замурчу!»",
    imageAlt: "Йося интерактивный виджет на Android",
  },
  en: {
    badge: "Interactive Desktop Widgets",
    title: "Yosa right on your home screen",
    subtitle:
      "Keep an eye on remaining calorie targets, macro grids, and your kitten's mood directly on your phone's wallpaper.",
    descText:
      "Our Android desktop widgets stream nutritional logs in real-time. Log ingredients or record voice prompts directly from your home page widget shortcut.",
    featureTitle: "Key Widget Enhancements:",
    features: [
      "Dynamic state animations: Yosa sleeps in the mornings, flashes positive stars during balanced lunch logs, and warns you playfully if carbs go off the charts.",
      "Visual energy rings: high-contrast satiety progress circles let you view your status in a split-second flash.",
      "Multi-size support: fit beautiful tiny 2-unit cubes, or setup full width grid lists displaying everything you logged throughout active days.",
    ],
    catRemark:
      "«I'm sitting waiting on your beautiful screen, human! Tap to record that steak in one click, and watch my tummy fill with magic!»",
    imageAlt: "Yosa Android premium home screen widgets mockup",
  },
};

export default function WidgetSandbox({ lang }: WidgetSandboxProps) {
  const t = LOCALIZATION[lang];

  return (
    <div className="relative">
      {/* Глубокий тёмный фон для контраста */}
      <div className="bg-gradient-to-br from-[#1a1025] via-[#1E152A] to-[#0f0a18] rounded-[40px] p-8 md:p-14 overflow-hidden relative">
        {/* Декоративные элементы */}
        <div className="absolute top-10 right-10 w-60 h-60 bg-brand-primary/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-[60px]"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Левая колонка - текст */}
          <div className="space-y-6">
            <FadeInItem className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm py-1.5 px-4 rounded-full text-xs font-bold text-purple-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              {t.badge}
            </FadeInItem>

            <FadeInItem>
              <h3 className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
                {t.title}
              </h3>
            </FadeInItem>

            <FadeInItem>
              <p className="text-purple-100/70 text-sm md:text-base leading-relaxed">
                {t.subtitle}
              </p>
            </FadeInItem>

            {/* Фичи в виде мини-карточек */}
            <div className="space-y-3 pt-2">
              {t.features.map((feat, idx) => (
                <FadeInItem key={idx}>
                  <div className="flex gap-3 items-start bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-purple-400/30 transition-colors">
                    <span className="w-7 h-7 flex items-center justify-center bg-brand-primary/20 rounded-lg shrink-0 text-purple-200 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs md:text-sm text-purple-100/80 leading-relaxed">{feat}</span>
                  </div>
                </FadeInItem>
              ))}
            </div>

            {/* Цитата */}
            <FadeInItem className="bg-white/5 p-4 rounded-2xl border border-purple-400/20">
              <p className="text-xs md:text-sm text-purple-200/80 italic font-display font-medium leading-relaxed">
                {t.catRemark}
              </p>
            </FadeInItem>
          </div>

          {/* Правая колонка: виджет */}
          <FadeInItem variant="zoom" className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-pink-500/20 rounded-[36px] blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-[36px] border border-white/10">
                <LazyImage
                  src={desktopWidgetImg}
                  alt={t.imageAlt}
                  referrerPolicy="no-referrer"
                  width="900"
                  height="520"
                  wrapperClassName="rounded-[24px] w-full max-w-[440px] shadow-2xl overflow-hidden"
                  className="w-full h-auto object-contain transform group-hover:scale-[1.02] duration-500"
                />
                {/* Кадр виджета */}
                <div className="absolute -bottom-5 -right-5 w-28 md:w-36 bg-[#1E152A] p-1.5 rounded-[20px] shadow-2xl border border-white/15 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  <LazyImage
                    src={adWidget}
                    alt={lang === "ru" ? "Кадр виджета Йоси" : "Yosa widget screenshot"}
                    loading="lazy"
                    width="180"
                    height="320"
                    wrapperClassName="rounded-[14px] w-full aspect-[9/16]"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </div>
            </div>
          </FadeInItem>
        </div>
      </div>
    </div>
  );
}
