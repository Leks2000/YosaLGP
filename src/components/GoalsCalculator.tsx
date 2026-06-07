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
    <div className="relative overflow-hidden">
      {/* Фоновый gradient blob */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-orange-200/20 rounded-full blur-3xl -z-10"></div>

      {/* Заголовок секции - отдельным блоком */}
      <div className="text-center mb-10 space-y-3">
        <FadeInItem className="inline-flex items-center gap-2 bg-indigo-100/70 py-1.5 px-4 rounded-full text-xs font-bold text-indigo-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
          </svg>
          {t.badge}
        </FadeInItem>
        <FadeInItem>
          <h3 className="text-3xl md:text-5xl font-display font-semibold text-brand-charcoal tracking-tight leading-tight">
            {t.title}
          </h3>
        </FadeInItem>
        <FadeInItem>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </FadeInItem>
      </div>

      {/* Карточный layout - 3 карточки в ряд */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {t.benefits.map((benefit, idx) => {
          const colors = [
            "from-emerald-500 to-teal-600",
            "from-blue-500 to-indigo-600",
            "from-amber-500 to-orange-600"
          ];
          const icons = ["🏃", "💪", "⚖️"];
          return (
            <FadeInItem key={idx} direction="up">
              <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors[idx]} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
                <span className="text-3xl mb-3 block">{icons[idx]}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit}</p>
              </div>
            </FadeInItem>
          );
        })}
      </div>

      {/* Нижний блок с мокапами */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <FadeInItem variant="zoom" className="flex justify-center">
          <div className="relative group">
            <img
              src={goalsDashboardImg}
              alt={t.imageAlt}
              referrerPolicy="no-referrer"
              className="rounded-[28px] shadow-2xl max-w-[360px] w-full transform group-hover:scale-[1.02] duration-500 border-2 border-white"
            />
            <div className="absolute -top-4 -left-6 w-20 md:w-28 bg-[#1E152A] p-1 rounded-[16px] shadow-xl border border-white/15 -rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <img src={adSettings} alt="" loading="lazy" className="rounded-[12px] w-full object-cover object-top aspect-[9/19]" />
            </div>
            <div className="absolute -bottom-4 -right-6 w-20 md:w-28 bg-[#1E152A] p-1 rounded-[16px] shadow-xl border border-white/15 rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <img src={adGoals} alt="" loading="lazy" className="rounded-[12px] w-full object-cover object-top aspect-[9/19]" />
            </div>
          </div>
        </FadeInItem>

        <FadeInItem direction="right" className="space-y-5">
          <p className="text-sm text-gray-500 leading-relaxed">{t.introText}</p>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100">
            <p className="text-sm text-purple-700 italic font-display font-medium leading-relaxed">
              {t.highlightQuote}
            </p>
          </div>
        </FadeInItem>
      </div>
    </div>
  );
}
