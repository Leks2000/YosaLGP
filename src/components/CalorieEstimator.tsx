import React from "react";
import { Language } from "../types";
import mealTrackerImg from "../assets/images/yosa_meal_tracker.webp";
import catAvatar from "../assets/images/yosya_stretch.png";
import FadeInItem from "./FadeInItem";

interface CalorieEstimatorProps {
  lang: Language;
}

const LOCALIZATION = {
  ru: {
    badge: "Интеллектуальный ИИ-ассистент",
    title: "Как Йося считает КБЖУ",
    subtitle:
      "Просто напиши или наговори голосом то, что съел. Наш ИИ возьмёт всю математику на себя.",
    col1Title: "Распознавание речи без рутины",
    col1P1:
      "Больше не нужно гуглить вес каждого ингредиента или сканировать бесконечные штрихкоды в супермаркетах. С Йосей вы общаетесь как с настоящим другом.",
    col1P2:
      "Вы можете свободно напечатать или сказать голосом что-то простое: «два сырника со сгущенкой» или «тарелка борща с куском ржаного хлеба». Наша нейросеть за одну секунду вычисляет точную массу, белки, жиры и углеводы, основываясь на миллионах гастрономических данных.",
    tryItems: [
      {
        text: "«Борщ со сметаной и кусок чёрного хлеба»",
        b: "14г",
        j: "11г",
        u: "42г",
        c: "318 ккал",
      },
      {
        text: "«Две чашки капучино на кокосовом и круассан»",
        b: "8г",
        j: "24г",
        u: "48г",
        c: "440 ккал",
      },
      {
        text: "«Кусок пиццы Маргарита и стакан колы»",
        b: "16г",
        j: "15г",
        u: "56г",
        c: "410 ккал",
      },
    ],
    catAdviceTitle: "Кошачий вердикт:",
    catAdviceText:
      "«О, отличный борщ, хозяин! Тёплая сметанка дарит силы для игр, а углеводы из хлебушка помогут нам бегать быстрее! Мур.»",
    imageAlt: "Интерфейс мобильного приложения Йося при занесении блюда",
  },
  en: {
    badge: "Intelligent AI Assistant",
    title: "How Yosa Counts Calories & Macros",
    subtitle:
      "Just type or speak what you ate on the go. Our state-of-the-art AI handles all nutritional mathematics.",
    col1Title: "Natural Speech Logging without Routine",
    col1P1:
      "No more searching through nested databases, selecting weight percentages manually, or scanning grocery barcodes. With Yosa, you simply talk like you do to a friend.",
    col1P2:
      "Feel free to speak or type colloquial descriptions: 'two pancakes with syrup and hot coffee' or 'bowl of noodle soup with rye bread'. Our customized models decode portions, calculate density, and map full KBJU macronutrients in milliseconds.",
    tryItems: [
      {
        text: "«Borsch with heavy cream and rye bread»",
        b: "14g",
        j: "11g",
        u: "42g",
        c: "318 kcal",
      },
      {
        text: "«Two cups of coconut milk cappuccino and a croissant»",
        b: "8g",
        j: "24g",
        u: "48g",
        c: "440 kcal",
      },
      {
        text: "«A slice of Margherita pizza and a glass of soda»",
        b: "16g",
        j: "15g",
        u: "56g",
        c: "410 kcal",
      },
    ],
    catAdviceTitle: "Feline Nutrition Tip:",
    catAdviceText:
      "«Spectacular dinner choice, human! The creamy warm proteins keep our muscles strong, and carbs from rye bread ensure we can sprint all night! Meow!»",
    imageAlt: "Yosa mobile app meal verification screen screenshot mockup",
  },
};

export default function CalorieEstimator({ lang }: CalorieEstimatorProps) {
  const t = LOCALIZATION[lang];

  return (
    <div className="w-full">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-purple-100 shadow-xl relative overflow-hidden">
        {/* Soft atmospheric radial gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Descriptive text and voice-examples */}
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

            <FadeInItem className="space-y-4 border-l-2 border-purple-150 pl-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">
                {t.col1Title}
              </h4>
              <p className="text-xs md:text-sm text-gray-400">{t.col1P1}</p>
              <p className="text-xs md:text-sm text-gray-500">{t.col1P2}</p>
            </FadeInItem>

            {/* Simulated AI recognition examples in stylish speech lines */}
            <div className="space-y-3.5 pt-2">
              {t.tryItems.map((item, idx) => (
                <FadeInItem
                  key={idx}
                  className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100/60 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-purple-100/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {/* Иконка микрофона без фона — просто контур */}
                    <svg
                      className="w-4 h-4 text-brand-primary shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="2" width="6" height="11" rx="3" />
                      <path d="M5 10a7 7 0 0 0 14 0" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                    <span className="font-display font-semibold text-xs md:text-sm text-brand-charcoal">
                      {item.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] self-end md:self-auto shrink-0 bg-white px-2.5 py-1 rounded-xl shadow-sm border border-purple-50">
                    <span className="font-medium text-gray-500">
                      Б: {item.b}
                    </span>
                    <span className="font-medium text-gray-500">
                      Ж: {item.j}
                    </span>
                    <span className="font-medium text-gray-500">
                      У: {item.u}
                    </span>
                    <span className="font-bold text-brand-primary">
                      {item.c}
                    </span>
                  </div>
                </FadeInItem>
              ))}
            </div>

            {/* Cat advice bubble */}
            <FadeInItem className="bg-white border border-purple-50/80 p-4 rounded-2xl shadow-sm relative flex gap-3 mt-4">
              <img
                src={catAvatar}
                alt={lang === "ru" ? "Кот Йося" : "Yosa cat"}
                width="44"
                height="44"
                loading="lazy"
                className="w-11 h-11 object-contain select-none animate-float shrink-0"
              />
              <div>
                <span className="text-xs font-bold text-brand-primary block mb-0.5">
                  {t.catAdviceTitle}
                </span>
                <p className="text-xs text-brand-charcoal italic">
                  {t.catAdviceText}
                </p>
              </div>
              <div className="absolute top-4 -left-2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
            </FadeInItem>
          </div>

          {/* Right Column: Premium screenshot presentation of the layout */}
          <FadeInItem className="lg:col-span-5 flex justify-center">
            <div className="bg-gradient-to-tr from-purple-100/30 to-pink-100/30 p-4 rounded-[42px] border border-purple-100 relative group overflow-hidden shadow-inner">
              <img
                src={mealTrackerImg}
                alt={t.imageAlt}
                referrerPolicy="no-referrer"
                className="rounded-[30px] shadow-2xl max-w-[280px] md:max-w-[310px] w-full transform group-hover:scale-105 duration-500 border border-white"
              />

            </div>
          </FadeInItem>
        </div>
      </div>
    </div>
  );
}
