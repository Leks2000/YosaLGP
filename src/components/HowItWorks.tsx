import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import appScreenshot from "../assets/images/yosa_app_screenshot.png";

interface HowItWorksProps {
  lang: Language;
}

/**
 * Секция «Как работает Йося» в стиле Amy Food Journal:
 * iPhone-мокап слева с реальным скриншотом + нумерованные шаги 01/02/03 справа.
 * Цифры перенесены вправо от текста.
 * Без анимированных иконок.
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
        {/* LEFT: iPhone mockup with real screenshot */}
        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
          <PhoneMockupStatic lang={lang} />
        </div>

        {/* RIGHT: heading + steps with numbers on the right */}
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

/* ── Animated step row with NUMBER ON THE RIGHT ── */
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
      {/* Text content on the left */}
      <div className="pt-2 border-t-2 border-gray-100 group-hover:border-brand-primary/40 transition-colors flex-1">
        <h3 className="text-lg md:text-xl font-display font-bold text-brand-charcoal mb-1.5 leading-tight">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
          {step.desc}
        </p>
      </div>
      {/* Big number moved to the RIGHT */}
      <span className="text-5xl md:text-6xl font-display font-bold text-gray-200 leading-none select-none w-16 shrink-0 text-right group-hover:text-brand-primary/30 transition-colors duration-300">
        {step.num}
      </span>
    </motion.div>
  );
}

/* ── iPhone mockup with static real screenshot (no typing animation) ── */
function PhoneMockupStatic({ lang }: { lang: Language }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      {/* Ambient glow — soft peach like Amy */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-orange-100/20 rounded-[48px] blur-[60px] scale-95 -z-10" />

      {/* iPhone shell — clean style */}
      <div
        className="relative bg-black rounded-[44px] shadow-2xl overflow-hidden"
        style={{
          width: 270,
          border: "10px solid #1a1a1a",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-40" />

        {/* Real app screenshot */}
        <img
          src={appScreenshot}
          alt={lang === "ru" ? "Скриншот Йося" : "Yosa screenshot"}
          className="w-full h-auto block rounded-[34px]"
          loading="lazy"
        />

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-white/30 rounded-full z-30" />
      </div>
    </motion.div>
  );
}
