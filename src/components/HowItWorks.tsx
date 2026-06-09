import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Language } from "../types";

interface HowItWorksProps {
  lang: Language;
}

/**
 * Секция «Как работает Йося» в стиле Amy:
 * Android-телефон слева + нумерованные шаги 01/02/03 справа с большими серыми цифрами.
 * Полностью заменяет раздутый CalorieEstimator.
 */
export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = {
    ru: {
      badge: "Как это работает",
      heading: "Считай калории как пишешь в заметках",
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
      screenLabel: "Йося · Дневник питания",
      mealItems: [
        { name: "Гречка с курицей", cal: "340 кКал", status: "done" },
        { name: "Латте на миндальном молоке", cal: "Думаю...", status: "thinking" },
        { name: "2/3 боула с авокадо\nи яйцом пашот", cal: "7 источников", status: "sources" },
        { name: "Шин рамен с двумя яйцами", cal: "620 кКал", status: "done" },
      ],
      macros: ["841 ккал", "61 б", "59 ж", "37 у"],
    },
    en: {
      badge: "How it works",
      heading: "Track calories like writing in Apple Notes",
      steps: [
        {
          num: "01",
          title: "Type what you ate",
          desc: "Just jot down your meal like you would in a notes app — no barcodes needed",
        },
        {
          num: "02",
          title: "Yosa will search",
          desc: "Yosa instantly finds the nutritional information from reliable sources",
        },
        {
          num: "03",
          title: "Your calories are calculated",
          desc: "See your totals and macros automatically updated in real time",
        },
      ],
      screenLabel: "Yosa · Food Diary",
      mealItems: [
        { name: "Buckwheat with chicken", cal: "340 cal", status: "done" },
        { name: "Oat protein shake", cal: "180 cal", status: "done" },
        { name: "2/3 chicken bowl with toppings\nfrom Chipotle", cal: "Thinking…", status: "thinking" },
        { name: "Shin ramen with two eggs", cal: "620 cal", status: "done" },
      ],
      macros: ["841 cal", "61p", "59f", "37c"],
    },
  }[lang];

  return (
    <section
      id="estimator-playground"
      className="scroll-mt-24"
    >
      {/* Badge */}
      <div className="flex justify-center mb-10">
        <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          {t.badge}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* LEFT: Android phone mockup */}
        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
          <PhoneMockup items={t.mealItems} macros={t.macros} label={t.screenLabel} />
        </div>

        {/* RIGHT: heading + steps */}
        <div className="space-y-10 order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal tracking-tight leading-[1.1]">
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
      <span className="text-5xl md:text-6xl font-display font-bold text-gray-200 leading-none select-none w-16 shrink-0 group-hover:text-gray-300 transition-colors">
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

/* ── Android phone mockup ── */
function PhoneMockup({
  items,
  macros,
  label,
}: {
  items: { name: string; cal: string; status: string }[];
  macros: string[];
  label: string;
}) {
  const macroDots = ["#7C3AED", "#EC4899", "#F59E0B", "#10B981"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-brand-primary/15 rounded-[48px] blur-[60px] scale-90 -z-10" />

      {/* Android phone shell */}
      <div
        className="relative bg-[#1a1a2e] rounded-[40px] shadow-2xl overflow-hidden"
        style={{
          width: 240,
          minHeight: 500,
          border: "6px solid #2d2d4e",
          boxShadow: "0 40px 100px -20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] font-bold text-white/70">9:41</span>
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <rect x="0" y="6" width="2" height="4" rx="1" fill="rgba(255,255,255,0.5)" />
              <rect x="3" y="4" width="2" height="6" rx="1" fill="rgba(255,255,255,0.6)" />
              <rect x="6" y="2" width="2" height="8" rx="1" fill="rgba(255,255,255,0.7)" />
              <rect x="9" y="0" width="2" height="10" rx="1" fill="rgba(255,255,255,0.85)" />
            </svg>
            {/* WiFi */}
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M6 8.5L6 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3.5 6.5C4.1 5.9 5 5.5 6 5.5C7 5.5 7.9 5.9 8.5 6.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M1.5 4.5C2.8 3.2 4.3 2.5 6 2.5C7.7 2.5 9.2 3.2 10.5 4.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-2.5 rounded-sm border border-white/60 flex items-center px-0.5">
                <div className="w-3 h-1.5 bg-white/80 rounded-[1px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="bg-[#f8f7ff] mx-1.5 rounded-[28px] overflow-hidden" style={{ minHeight: 420 }}>
          {/* App header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">Й</span>
            </div>
            <span className="text-[11px] font-bold text-brand-charcoal">Сегодня</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
                🔥 2
              </span>
              <div className="w-5 h-5 rounded-md bg-gray-200 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Meal items */}
          <div className="px-3 space-y-0.5">
            {items.map((item, i) => (
              <MealItem key={i} item={item} delay={i * 0.1} />
            ))}
          </div>

          {/* Bottom macro bar */}
          <div className="mx-3 mt-4 mb-3 bg-white rounded-2xl px-3 py-2.5 shadow-sm flex items-center justify-around">
            {macros.map((m, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: macroDots[i] }} />
                <span className="text-[9px] font-bold text-gray-600">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Android nav bar */}
        <div className="flex items-center justify-center gap-5 py-3">
          <div className="w-4 h-4 rounded-full border-2 border-white/30" />
          <div className="w-10 h-1 bg-white/30 rounded-full" />
          <div className="w-4 h-4 border-2 border-white/30 rounded-sm" />
        </div>
      </div>

      {/* Floating stat badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 top-20 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-purple-50"
      >
        <span className="text-lg">🔥</span>
        <div>
          <div className="text-[10px] text-gray-400 font-medium">Стрик</div>
          <div className="text-sm font-bold text-brand-charcoal">14 дней</div>
        </div>
      </motion.div>

      {/* Floating accuracy badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-8 bottom-24 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-purple-50"
      >
        <span className="text-lg">✨</span>
        <div>
          <div className="text-[10px] text-gray-400 font-medium">Точность</div>
          <div className="text-sm font-bold text-brand-charcoal">97%</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MealItem({
  item,
  delay,
}: {
  item: { name: string; cal: string; status: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-0"
    >
      <span className="text-[10px] text-gray-700 leading-tight whitespace-pre-line flex-1">
        {item.name}
      </span>
      <span
        className={`text-[9px] font-bold shrink-0 ${
          item.status === "done"
            ? "text-brand-primary"
            : item.status === "thinking"
              ? "text-amber-500 italic"
              : "text-orange-400"
        }`}
      >
        {item.status === "sources" ? (
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            {item.cal}
          </span>
        ) : (
          item.cal
        )}
      </span>
    </motion.div>
  );
}
