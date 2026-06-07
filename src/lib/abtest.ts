/**
 * Лёгкий клиентский A/B-тест без сторонних сервисов (VWO/Optimize не нужны).
 *
 * Почему свой, а не VWO/Google Optimize:
 *  - Google Optimize закрыт Google ещё в сентябре 2023 — использовать нельзя.
 *  - VWO — платный SaaS + лишний внешний скрипт (бьёт по скорости и приватности).
 *  - Для лендинга с одним главным CTA достаточно 50/50 split с сохранением
 *    варианта в localStorage и отправкой в Метрику/GA как параметра события.
 *
 * Как работает:
 *  1. При первом визите пользователю случайно назначается вариант (A или B).
 *  2. Вариант сохраняется в localStorage — один и тот же юзер всегда видит
 *     один и тот же вариант (стабильность эксперимента).
 *  3. Вариант прокидывается в каждое событие аналитики (cta_variant),
 *     поэтому в Метрике/GA можно сравнить конверсию A vs B.
 */

import { trackEvent } from "./analytics";

export type Variant = "A" | "B";

const STORAGE_KEY = "yosa_cta_variant";

/** Возвращает (и при необходимости назначает) вариант текущего пользователя. */
export function getVariant(): Variant {
  if (typeof window === "undefined") return "A";

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Variant | null;
    if (saved === "A" || saved === "B") return saved;

    const assigned: Variant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(STORAGE_KEY, assigned);
    // Фиксируем показ эксперимента (важно для расчёта конверсии = цели/показы)
    trackEvent("cta_experiment_view", { cta_variant: assigned });
    return assigned;
  } catch {
    // localStorage может быть недоступен (приватный режим) — отдаём дефолт
    return "A";
  }
}

/**
 * Тексты CTA для каждого варианта. Сравниваем «нейтральный» vs «выгодный».
 * Сюда легко добавить новые варианты/копии.
 */
export const CTA_COPY: Record<
  Variant,
  { ru: string; en: string; sub_ru: string; sub_en: string }
> = {
  A: {
    ru: "Установить через RuStore",
    en: "Install via RuStore",
    sub_ru: "Официальный магазин РФ",
    sub_en: "Official RU App Market",
  },
  B: {
    ru: "Скачать бесплатно — это займёт 10 секунд",
    en: "Get it free — takes 10 seconds",
    sub_ru: "Бесплатно · без рекламы · RuStore",
    sub_en: "Free · no ads · RuStore",
  },
};
