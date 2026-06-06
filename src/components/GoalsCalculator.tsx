import React from "react";
import { Language } from "../types";
import goalsDashboardImg from "../assets/images/yosa_goals_dashboard.webp";
import adSettings from "../assets/images/ad_02_settings.webp";
import adGoals from "../assets/images/ad_06_goals.webp";
import FadeInItem from "./FadeInItem";

interface GoalsCalculatorProps {
  lang: Language;
}

const LOCALIZATION = {
  ru: {
    badge: "Персональные цели и КБЖУ",
    title: "Идеальный расчёт вашей нормы",
    subtitle:
      "Йося автоматически настраивает суточные калории и макронутриенты по точным научным формулам.",
    introText:
      "Приложение Йося вычисляет индивидуальные энергетические показатели на базе доказанной медицинской формулы Миффлина-Сан Жеора (BMR/TDEE), учитывающей малейшие параметры пола, возраста, веса, роста и тренировочной активности.",
    benefitTitle: "Умное управление дефицитом и профицитом калорий:",
    benefits: [
      "Бережное похудение: автоматическое заложение безопасного дефицита в 15% без стресса для щитовидной железы.",
      "Набор чистой мышечной массы: расчёт профицита в 10% с акцентом на повышенное потребление белковой группы.",
      "Поддержание тонуса: стабильное удержание веса с идеальным процентным распределением БЖУ.",
    ],
    highlightQuote:
      "«Мяу, твой вес – это не цифра для паники. Мы вместе подберём идеальный рацион, чтобы хватало и на весёлые прыжки, и на здоровый сон!»",
    imageAlt: "Йося персональная норма и цели",
  },
  en: {
    badge: "Personal Nutrition Goals & KBJU",
    title: "Perfect Calorie & Macronutrient targets",
    subtitle:
      "Yosa auto-adjusts your daily budget using gold-standard scientific metabolic formulas.",
    introText:
      "Yosa computes your daily Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on physical attributes. No blind guessing: we factor in your current weight, height, age, biological gender, and activity multiplier.",
    benefitTitle: "Smart deficit, maintenance, and gain schemes:",
    benefits: [
      "Healthy weight loss: automatic safe deficit of 15% to maintain energy reserves and high thyroid levels.",
      "Lean muscle building: structured calorie surplus of 10% coupled with target amino-protein allocations.",
      "Feline weight maintenance: balanced energetic intake to secure health, beauty, and vitality.",
    ],
    highlightQuote:
      "«Meow, your body metrics are beautiful, human! I'll calculate the perfect calories with fats and protein ratios so we have endless energy for play!»",
    imageAlt: "Yosa custom goal settings dashboard mockup screen",
  },
};

export default function GoalsCalculator({ lang }: GoalsCalculatorProps) {
  const t = LOCALIZATION[lang];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-7 md:p-14 border border-purple-100 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-100/30 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: увеличенный мокап + два реальных кадра экранов */}
        <FadeInItem variant="zoom" className="lg:col-span-5 flex justify-center order-last lg:order-first">
          <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 p-5 md:p-6 rounded-[46px] border border-purple-100/60 shadow-inner group">
            <img
              src={goalsDashboardImg}
              alt={t.imageAlt}
              referrerPolicy="no-referrer"
              className="rounded-[34px] shadow-2xl max-w-[330px] md:max-w-[380px] w-full transform group-hover:scale-105 duration-500 border border-white"
            />
            {/* Кадр «Настройки» — слева сверху, увеличен */}
            <div className="absolute -top-5 -left-3 md:-left-8 w-24 md:w-32 bg-[#1E152A] p-1 rounded-[18px] shadow-2xl border border-white/15 -rotate-6 transition-transform duration-500 group-hover:rotate-0">
              <img
                src={adSettings}
                alt={lang === "ru" ? "Экран настроек целей" : "Goals settings screen"}
                loading="lazy"
                className="rounded-[13px] w-full object-cover object-top aspect-[9/19]"
              />
            </div>
            {/* Кадр «Цели» — справа снизу, увеличен */}
            <div className="absolute -bottom-6 -right-3 md:-right-8 w-24 md:w-32 bg-[#1E152A] p-1 rounded-[18px] shadow-2xl border border-white/15 rotate-6 transition-transform duration-500 group-hover:rotate-0">
              <img
                src={adGoals}
                alt={lang === "ru" ? "Экран персональных целей" : "Personal goals screen"}
                loading="lazy"
                className="rounded-[13px] w-full object-cover object-top aspect-[9/19]"
              />
            </div>
          </div>
        </FadeInItem>

        {/* Right Column: Descriptions and formula highlights */}
        <div className="lg:col-span-7 space-y-6">
          <FadeInItem className="inline-flex items-center gap-2 bg-purple-100/70 py-1 px-3.5 rounded-full text-xs font-bold text-brand-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
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
            <p className="text-xs md:text-sm text-gray-400">{t.introText}</p>
          </FadeInItem>

          <div className="space-y-3.5 pt-2">
            <FadeInItem>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-brand-charcoal">
                {t.benefitTitle}
              </h4>
            </FadeInItem>
            <div className="space-y-3">
              {t.benefits.map((benefit, idx) => (
                <FadeInItem
                  key={idx}
                  className="flex gap-3 items-start text-xs md:text-sm text-gray-500"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-1.5" />
                  <span>{benefit}</span>
                </FadeInItem>
              ))}
            </div>
          </div>

          {/* Цитата кота без иконок */}
          <FadeInItem className="bg-purple-50/50 p-4 md:p-5 rounded-2xl border border-purple-100 border-l-4 border-l-brand-primary text-xs md:text-sm text-purple-700 italic">
            <p className="font-display font-medium leading-relaxed">
              {t.highlightQuote}
            </p>
          </FadeInItem>
        </div>
      </div>
    </div>
  );
}
