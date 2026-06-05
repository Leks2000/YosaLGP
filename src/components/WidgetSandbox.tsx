import React from "react";
import { Smartphone, Sparkles, CheckSquare, Sparkle } from "lucide-react";
import { Language } from "../types";
import desktopWidgetImg from "../assets/images/yosa_desktop_widget.webp";
import FadeInItem from "./FadeInItem";

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
      "«Я сижу в виждете и жду твой сытный обед, хозяин! Добавь вкусную котлетку прямо с экрана — и я замурчу!»",
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
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-purple-100 shadow-xl overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column: descriptions */}
        <div className="lg:col-span-7 space-y-6">
          <FadeInItem className="inline-flex items-center gap-2 bg-purple-100/70 py-1 px-3.5 rounded-full text-xs font-bold text-brand-primary">
            <Smartphone className="w-3.5 h-3.5" />
            {t.badge}
          </FadeInItem>

          <FadeInItem>
            <h3 className="text-2xl md:text-4xl font-display font-semibold text-brand-charcoal tracking-tight leading-tight">
              {t.title}
            </h3>
          </FadeInItem>

          <FadeInItem>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {t.subtitle}
            </p>
          </FadeInItem>

          <FadeInItem>
            <p className="text-xs md:text-sm text-gray-400">{t.descText}</p>
          </FadeInItem>

          <div className="space-y-3.5 pt-2">
            <FadeInItem>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-brand-charcoal">
                {t.featureTitle}
              </h4>
            </FadeInItem>
            <div className="space-y-3">
              {t.features.map((feat, idx) => (
                <FadeInItem
                  key={idx}
                  className="flex gap-2.5 items-start text-xs md:text-sm text-gray-500"
                >
                  <span className="p-0.5 bg-purple-100 text-brand-primary rounded-lg shrink-0 mt-0.5">
                    <Sparkle className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
                  </span>
                  <span>{feat}</span>
                </FadeInItem>
              ))}
            </div>
          </div>

          {/* Cute quote */}
          <FadeInItem className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 flex gap-3 text-xs md:text-sm text-purple-700 italic">
            <span className="text-2xl shrink-0 select-none animate-bounce">
              📱🐾
            </span>
            <p className="font-display font-medium leading-relaxed">
              {t.catRemark}
            </p>
          </FadeInItem>
        </div>

        {/* Right column: widget illustration screenshot */}
        <FadeInItem className="lg:col-span-5 flex justify-center">
          <div className="bg-gradient-to-tr from-pink-50/40 via-purple-100/20 to-indigo-50/40 p-4 rounded-[42px] border border-purple-100 shadow-inner group overflow-hidden">
            <img
              src={desktopWidgetImg}
              alt={t.imageAlt}
              referrerPolicy="no-referrer"
              className="rounded-[30px] shadow-2xl max-w-[280px] md:max-w-[310px] w-full transform group-hover:scale-105 duration-500 border border-white"
            />
          </div>
        </FadeInItem>
      </div>
    </div>
  );
}
