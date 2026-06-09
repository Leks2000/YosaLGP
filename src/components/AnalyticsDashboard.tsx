import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Language } from "../types";
import { getVariant } from "../lib/abtest";
import FadeInItem from "./FadeInItem";

interface AnalyticsDashboardProps {
  lang: Language;
}

/**
 * Analytics Dashboard — визуализация A/B теста и click-rate CTA.
 * Показывает разработчику (или пользователю) статистику прямо на сайте.
 */
export default function AnalyticsDashboard({ lang }: AnalyticsDashboardProps) {
  const [stats, setStats] = useState({
    totalVisits: 0,
    ctaClicks: 0,
    variant: getVariant(),
    clickRate: 0,
  });

  useEffect(() => {
    // Считываем аналитику из localStorage
    const visits = parseInt(localStorage.getItem("yosa_visits") || "0", 10) + 1;
    const clicks = parseInt(localStorage.getItem("yosa_cta_clicks") || "0", 10);
    localStorage.setItem("yosa_visits", String(visits));
    
    setStats({
      totalVisits: visits,
      ctaClicks: clicks,
      variant: getVariant(),
      clickRate: visits > 0 ? Math.round((clicks / visits) * 100) : 0,
    });
  }, []);

  const t = {
    ru: {
      badge: "Аналитика для разработчика",
      title: "A/B тест и Click-Rate CTA",
      subtitle: "Визуализация эффективности CTA-кнопок в реальном времени",
      visits: "Посещений",
      clicks: "Кликов CTA",
      rate: "Click Rate",
      variant: "Ваш вариант",
      variantA: "Вариант A",
      variantB: "Вариант B",
      desc: "Каждому пользователю случайно назначается вариант CTA-кнопки. Статистика хранится локально.",
    },
    en: {
      badge: "Developer Analytics",
      title: "A/B Test & CTA Click-Rate",
      subtitle: "Real-time CTA effectiveness visualization",
      visits: "Page Views",
      clicks: "CTA Clicks",
      rate: "Click Rate",
      variant: "Your Variant",
      variantA: "Variant A",
      variantB: "Variant B",
      desc: "Each user is randomly assigned a CTA button variant. Statistics are stored locally.",
    },
  }[lang];

  return (
    <section id="analytics-dashboard" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px]" />

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <FadeInItem>
              <span className="inline-flex items-center gap-2 bg-white/10 py-1.5 px-4 rounded-full text-xs font-bold text-green-300">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t.badge}
              </span>
            </FadeInItem>
            <FadeInItem>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                {t.title}
              </h3>
            </FadeInItem>
            <FadeInItem>
              <p className="text-gray-400 text-sm">{t.subtitle}</p>
            </FadeInItem>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: t.visits, value: stats.totalVisits, color: "from-blue-500 to-blue-600" },
              { label: t.clicks, value: stats.ctaClicks, color: "from-purple-500 to-purple-600" },
              { label: t.rate, value: `${stats.clickRate}%`, color: "from-green-500 to-green-600" },
              { label: t.variant, value: stats.variant === "A" ? t.variantA : t.variantB, color: "from-orange-500 to-orange-600" },
            ].map((stat, idx) => (
              <FadeInItem key={idx}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
                >
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              </FadeInItem>
            ))}
          </div>

          {/* Visual bar chart */}
          <FadeInItem>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-end justify-around h-32 gap-4">
                {/* Variant A bar */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: stats.variant === "A" ? "80%" : "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </motion.div>
                  <span className={`text-xs font-bold ${stats.variant === "A" ? "text-blue-400" : "text-gray-500"}`}>
                    {t.variantA}
                    {stats.variant === "A" && " ✓"}
                  </span>
                </div>
                {/* Variant B bar */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: stats.variant === "B" ? "80%" : "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </motion.div>
                  <span className={`text-xs font-bold ${stats.variant === "B" ? "text-purple-400" : "text-gray-500"}`}>
                    {t.variantB}
                    {stats.variant === "B" && " ✓"}
                  </span>
                </div>
              </div>
            </div>
          </FadeInItem>

          <FadeInItem>
            <p className="text-center text-xs text-gray-500">{t.desc}</p>
          </FadeInItem>
        </div>
      </div>
    </section>
  );
}
