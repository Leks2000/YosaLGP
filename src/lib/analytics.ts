/**
 * Единый модуль аналитики для лендинга Йоси.
 *
 * Подключает Yandex.Metrika и Google Analytics 4 (gtag), а также
 * предоставляет хелперы для отправки кастомных событий (целей).
 *
 * ВАЖНО: реальные ID берутся из переменных окружения сборки Vite:
 *   VITE_YM_ID  — номер счётчика Яндекс.Метрики (например, 99887766)
 *   VITE_GA_ID  — Measurement ID Google Analytics 4 (например, G-XXXXXXXXXX)
 *
 * Если ID не заданы — модуль работает в «тихом» режиме (no-op),
 * чтобы локальная разработка не засоряла статистику и не падала.
 */

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const YM_ID = import.meta.env.VITE_YM_ID as string | undefined;
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

let initialized = false;

/** Инициализация счётчиков. Вызывается один раз при старте приложения. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // --- Yandex.Metrika ---
  if (YM_ID) {
    (function (m: any, e: any, t: any, r: any, i: any, k?: any, a?: any) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * (new Date() as any);
      for (let j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym!(Number(YM_ID), "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      defer: true,
    });
  }

  // --- Google Analytics 4 ---
  if (GA_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }
}

/**
 * Универсальная отправка события (цели) во все подключённые системы.
 * @param name   имя события (snake_case), напр. "rustore_click"
 * @param params произвольные параметры события
 */
export function trackEvent(
  name: string,
  params: Record<string, any> = {}
): void {
  if (typeof window === "undefined") return;

  // Яндекс.Метрика — достижение цели (reachGoal)
  if (window.ym && YM_ID) {
    window.ym(Number(YM_ID), "reachGoal", name, params);
  }

  // Google Analytics 4 — событие
  if (window.gtag && GA_ID) {
    window.gtag("event", name, params);
  }

  // Локальный лог для отладки (виден в консоли при разработке)
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[analytics] event: ${name}`, params);
  }
}

/** Хелпер именно для главной конверсии — клика по RuStore. */
export function trackRuStoreClick(placement: string): void {
  trackEvent("rustore_click", { placement });
}
