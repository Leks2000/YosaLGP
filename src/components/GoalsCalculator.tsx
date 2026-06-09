import React from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import adSettings from "../assets/images/ad_02_settings.webp";
import adGoals from "../assets/images/ad_06_goals.webp";
import FadeInItem from "./FadeInItem";
import LazyImage from "./LazyImage";

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
      "Приложение Йося вычисляет индивидуальные энергетические показатели на базе доказанной медицинской формулы Миффлина-Сан Жеора (BMR/TDEE), учитывающей параметры пола, возраста, веса, роста и тренировочной активности.",
    benefits: [
      {
        icon: "🏃",
        title: "Бережное похудение",
        desc: "Безопасный дефицит 15% без стресса для щитовидной железы.",
      },
      {
        icon: "💪",
        title: "Набор мышечной массы",
        desc: "Расчёт профицита 10% с акцентом на белковую группу.",
      },
      {
        icon: "⚖️",
        title: "Поддержание тонуса",
        desc: "Стабильное удержание веса с идеальным распределением БЖУ.",
      },
    ],
    catQuote:
      "«Мяу, твой вес – это не цифра для паники. Мы вместе подберём идеальный рацион!»",
  },
  en: {
    badge: "Personal Nutrition Goals",
    title: "Perfect Calorie & Macro Targets",
    subtitle:
      "Yosa auto-adjusts your daily budget using gold-standard scientific metabolic formulas.",
    introText:
      "Yosa computes your daily Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on physical attributes—weight, height, age, gender, and activity level.",
    benefits: [
      {
        icon: "🏃",
        title: "Healthy weight loss",
        desc: "Safe deficit of 15% to maintain energy and thyroid levels.",
      },
      {
        icon: "💪",
        title: "Lean muscle building",
        desc: "Structured surplus of 10% with optimized protein intake.",
      },
      {
        icon: "⚖️",
        title: "Weight maintenance",
        desc: "Balanced intake to secure health and vitality.",
      },
    ],
    catQuote:
      "«Meow, your body metrics are beautiful! I'll calculate the perfect ratios for endless energy!»",
  },
};

export default function GoalsCalculator({ lang }: GoalsCalculatorProps) {
  const t = LOCALIZATION[lang];

  return (
    <div className="relative overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-12 space-y-3">
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

      {/* Benefits cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {t.benefits.map((benefit, idx) => (
          <FadeInItem key={idx} direction="up">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <span className="text-3xl mb-3 block">{benefit.icon}</span>
              <h4 className="text-base font-display font-bold text-brand-charcoal mb-1.5">
                {benefit.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          </FadeInItem>
        ))}
      </div>

      {/* Bottom: Phone screenshots + text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Phone mockups — стиль Amy: 2 телефона с наклоном */}
        <FadeInItem variant="zoom" className="flex justify-center">
          <div className="relative">
            {/* Main phone */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              initial={{ rotate: -3 }}
              className="relative z-10"
            >
              <div className="bg-[#1a1a1a] rounded-[28px] p-[3px] shadow-2xl w-[200px]">
                <LazyImage
                  src={adSettings}
                  alt={lang === "ru" ? "Настройки целей" : "Goals settings"}
                  loading="lazy"
                  width="200"
                  height="360"
                  wrapperClassName="rounded-[24px] w-full aspect-[9/16] overflow-hidden"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Second phone — offset */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              initial={{ rotate: 5 }}
              className="absolute -right-16 top-10 z-0"
            >
              <div className="bg-[#1a1a1a] rounded-[28px] p-[3px] shadow-xl w-[180px] opacity-90">
                <LazyImage
                  src={adGoals}
                  alt={lang === "ru" ? "Цели по КБЖУ" : "KBJU goals"}
                  loading="lazy"
                  width="180"
                  height="320"
                  wrapperClassName="rounded-[24px] w-full aspect-[9/16] overflow-hidden"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </FadeInItem>

        {/* Right: Text + quote */}
        <FadeInItem direction="right" className="space-y-6">
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            {t.introText}
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100">
            <p className="text-sm text-purple-700 italic font-display font-medium leading-relaxed">
              {t.catQuote}
            </p>
          </div>
        </FadeInItem>
      </div>
    </div>
  );
}
