import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import LazyImage from "./LazyImage";
import yosaMealTracker from "../assets/images/yosa_meal_tracker.webp";

interface HowItWorksProps {
  lang: Language;
}

/**
 * Секция «Как работает Йося» в стиле Amy Food Journal:
 * iPhone-мокап слева с typing анимацией + нумерованные шаги 01/02/03 справа.
 */
export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = {
    ru: {
      badge: "★ Как это работает",
      heading: "Считай калории как\nпишешь в заметках",
      steps: [
        {
          num: "01",
          title: "Напиши что съел",
          desc: "Просто впиши еду как в заметки — «овсянка с бананом» или «бургер с картошкой из KFC»",
        },
        {
          num: "02",
          title: "Йося найдёт КБЖУ",
          desc: "ИИ мгновенно распознаёт блюдо и находит точную информацию о питательной ценности",
        },
        {
          num: "03",
          title: "Калории посчитаны",
          desc: "Видишь итоговые калории и БЖУ — автоматически обновляются в дневнике питания",
        },
      ],
      typingTexts: [
        "Гречка с курицей",
        "Латте на миндальном",
        "Шин рамен с яйцами",
      ],
    },
    en: {
      badge: "★ How it works",
      heading: "Calorie tracking\nas easy as Apple Notes",
      steps: [
        {
          num: "01",
          title: "Type what you ate",
          desc: "Just jot down your meal like you would in a notes app",
        },
        {
          num: "02",
          title: "Yosa will search",
          desc: "Yosa instantly finds the nutritional information",
        },
        {
          num: "03",
          title: "Your calories are magically calculated",
          desc: "See your totals and macros automatically updated",
        },
      ],
      typingTexts: [
        "Chicken with rice",
        "Oat milk latte",
        "Shin ramen with eggs",
      ],
    },
  }[lang];

  return (
    <section id="estimator-playground" className="scroll-mt-24">
      {/* Badge */}
      <div className="flex justify-center mb-10">
        <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          {t.badge}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* LEFT: iPhone mockup with typing animation */}
        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
          <PhoneMockupWithTyping lang={lang} typingTexts={t.typingTexts} />
        </div>

        {/* RIGHT: heading + steps */}
        <div className="space-y-10 order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal tracking-tight leading-[1.1] whitespace-pre-line">
            {t.heading}
          </h2>

          <div className="space-y-8">
            {t.steps.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Animated step row ── */
function StepRow({
  step,
  index,
}: {
  step: { num: string; title: string; desc: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex items-start gap-5 group"
    >
      {/* Big grey number */}
      <span className="text-5xl md:text-6xl font-display font-bold text-gray-200 leading-none select-none w-16 shrink-0 group-hover:text-brand-primary/30 transition-colors duration-300">
        {step.num}
      </span>
      <div className="pt-2 border-t-2 border-gray-100 group-hover:border-brand-primary/40 transition-colors flex-1">
        <h3 className="text-lg md:text-xl font-display font-bold text-brand-charcoal mb-1.5 leading-tight">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ── iPhone mockup with typing simulation ── */
function PhoneMockupWithTyping({
  lang,
  typingTexts,
}: {
  lang: Language;
  typingTexts: string[];
}) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = typingTexts[textIndex];
    
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setCharIndex(charIndex - 1);
          setCurrentText(currentFullText.slice(0, charIndex - 1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % typingTexts.length);
      }
    } else {
      if (charIndex < currentFullText.length) {
        const timeout = setTimeout(() => {
          setCharIndex(charIndex + 1);
          setCurrentText(currentFullText.slice(0, charIndex + 1));
        }, 80 + Math.random() * 60);
        return () => clearTimeout(timeout);
      } else {
        setIsPaused(true);
      }
    }
  }, [charIndex, isDeleting, isPaused, textIndex, typingTexts]);

  // Мини meal items для экрана
  const mealItems = lang === "ru" 
    ? [
        { name: "Гречка с курицей", cal: "340 ккал" },
        { name: "Латте на миндальном", cal: "Думаю..." },
        { name: "2/3 боула с авокадо", cal: "🔥 7 источн." },
        { name: "Шин рамен с яйцами", cal: "620 ккал" },
      ]
    : [
        { name: "Chicken with rice", cal: "340 cal" },
        { name: "Oat milk latte", cal: "Thinking…" },
        { name: "2/3 bowl from Chipotle", cal: "🔥 7 sources" },
        { name: "Shin ramen with eggs", cal: "620 cal" },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-pink-300/10 rounded-[48px] blur-[60px] scale-90 -z-10" />

      {/* iPhone shell — чистый стиль Amy */}
      <div
        className="relative bg-black rounded-[44px] shadow-2xl overflow-hidden"
        style={{
          width: 260,
          minHeight: 520,
          border: "8px solid #1a1a1a",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1">
          <span className="text-[10px] font-bold text-white/70">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-[26px] h-[10px] rounded-full bg-white/25 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-[80%] bg-white/80 rounded-full" />
            </div>
          </div>
        </div>

        {/* Screen content — светлый фон */}
        <div className="bg-[#FFF8F2] mx-1 rounded-[32px] overflow-hidden" style={{ minHeight: 460 }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">Й</span>
            </div>
            <span className="text-[12px] font-bold text-brand-charcoal bg-white px-3 py-1 rounded-full shadow-sm">
              {lang === "ru" ? "Сегодня" : "Today"}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-orange-500 text-[10px] font-bold">🔥 14</span>
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Meal items list */}
          <div className="px-3 space-y-0.5">
            {mealItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 py-2.5 border-b border-gray-100/80 last:border-0"
              >
                <span className="text-[10px] text-gray-700 leading-tight flex-1 font-medium">
                  {item.name}
                </span>
                <span className={`text-[9px] font-bold shrink-0 ${
                  item.cal.includes("Думаю") || item.cal.includes("Think")
                    ? "text-amber-500"
                    : item.cal.includes("🔥")
                      ? "text-orange-500"
                      : "text-brand-primary"
                }`}>
                  {item.cal}
                </span>
              </div>
            ))}
          </div>

          {/* Typing input area */}
          <div className="mx-3 mt-4 bg-white rounded-2xl px-3 py-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-700 font-medium min-h-[14px]">
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-[1px] h-3 bg-brand-primary ml-0.5 align-middle"
                />
              </span>
            </div>
          </div>

          {/* Bottom macro bar */}
          <div className="mx-3 mt-3 mb-4 bg-white rounded-full px-4 py-2.5 shadow-sm flex items-center justify-around">
            {[
              { label: "🔥 841", color: "#7C3AED" },
              { label: "У 51", color: "#EC4899" },
              { label: "Б 59", color: "#F59E0B" },
              { label: "Ж 37", color: "#10B981" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.color }} />
                <span className="text-[9px] font-bold text-gray-600">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex items-center justify-center py-2.5">
          <div className="w-[100px] h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* Floating stat badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-purple-50"
      >
        <span className="text-lg">🔥</span>
        <div>
          <div className="text-[10px] text-gray-400 font-medium">{lang === "ru" ? "Стрик" : "Streak"}</div>
          <div className="text-sm font-bold text-brand-charcoal">14 {lang === "ru" ? "дней" : "days"}</div>
        </div>
      </motion.div>

      {/* Floating accuracy badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-8 bottom-28 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-purple-50"
      >
        <span className="text-lg">✨</span>
        <div>
          <div className="text-[10px] text-gray-400 font-medium">{lang === "ru" ? "Точность" : "Accuracy"}</div>
          <div className="text-sm font-bold text-brand-charcoal">97%</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
