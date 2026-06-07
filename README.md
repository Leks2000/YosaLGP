# Йося (Yosa) — лендинг умного счётчика калорий с ИИ-котом

## Обзор проекта
- **Название**: Йося (Yosa)
- **Цель**: Промо-лендинг мобильного приложения «Йося» — счётчика калорий с ИИ-котом, который считает КБЖУ по голосу/тексту.
- **Стек**: React 19 + Vite + TailwindCSS v4 + Motion (`motion/react`) + Express (SSR-статик + API `/api/estimate` через Gemini). Тесты — Vitest. CI — GitHub Actions.

## Реализованные фичи
- Hero с премиальной заглушкой видео, A/B-вариантом главного CTA.
- Интерактивный оценщик КБЖУ (CalorieEstimator) с понятным офлайн-фолбэком (`isFallback`).
- Сетка возможностей, калькулятор целей BMR/TDEE, виджет-песочница, галерея бейджей/стриков.
- Арт-вселенная Йоси (со **scroll-параллаксом**), секции с реальными фото кота, история создателя, FAQ-аккордеон.
- Двусторонние scroll-анимации, двуязычность RU/EN.
- **Аналитика**: Yandex.Metrika + Google Analytics 4 с целями на клик по RuStore.
- **A/B-тест CTA** (свой, без VWO/Optimize) — 50/50, стабильный по localStorage, с прокидыванием варианта в события аналитики.
- **SEO**: title/description/keywords, Open Graph, Twitter Card, JSON-LD `SoftwareApplication`, `robots.txt`, `sitemap.xml`.

## Функциональные точки (URI)
- `GET /` — основной лендинг (SPA).
- `GET /api/health` — health-check, возвращает `{ status, time }`.
- `POST /api/estimate` — оценка КБЖУ. Тело: `{ "food": string, "language": "ru"|"en" }`. Ответ содержит `isFallback: boolean` (true = офлайн-оценка без ИИ).

## Аналитика и A/B (что подключено)
- `src/lib/analytics.ts` — инициализация YM + GA4, хелперы `trackEvent`, `trackRuStoreClick`.
- `src/lib/abtest.ts` — клиентский A/B-тест, варианты CTA-копий.
- Событие-цель: `rustore_click` с параметром `placement` (`hero` / `footer_*`) и `cta_variant`.
- Событие показа эксперимента: `cta_experiment_view`.

### Переменные окружения (Vite, префикс VITE_)
```
VITE_YM_ID=""   # номер счётчика Яндекс.Метрики (только цифры)
VITE_GA_ID=""   # Measurement ID GA4 (G-XXXXXXXXXX)
```
Если ID не заданы — аналитика работает в no-op режиме (локальная разработка не засоряет статистику).

## Тесты и CI
```bash
npm test          # Vitest: A/B-логика + офлайн-фолбэк (9 тестов)
npm run lint      # tsc --noEmit (type-check)
npm run build     # прод-сборка
```
GitHub Actions (`.github/workflows/ci.yml`): на каждый push/PR в `main` прогоняет lint → tests → build.

## Производительность (после рефакторинга)
- LazyImage больше **не тянет lottie-react** → чанк `LazyImage` стал **0.73 KB (gzip 0.48 KB)** вместо ~346 KB (gzip ~86 KB).
- Унифицированы импорты анимаций: только `motion/react` (убран дубль `framer-motion`).
- Уважается `prefers-reduced-motion` для анимаций и спиннера.

## Запуск локально
```bash
npm install
# .env: GEMINI_API_KEY=... (опц. VITE_YM_ID, VITE_GA_ID)
npm run dev          # dev (Vite middleware)
npm run build        # прод-сборка (dist/ + dist/server.cjs)
pm2 start ecosystem.config.cjs   # прод через PM2 на :3000
```

## Деплой
- **Платформа**: Express SSR-статик (Node). Запуск: `node dist/server.cjs`.
- **Статус**: ✅ Активен (PM2, порт 3000).
- **Последнее обновление**: 2026-06-07.

## Дальнейшие шаги
- Заменить `yosa.app` в canonical/OG/JSON-LD/sitemap на боевой домен после покупки.
- Зарегистрировать сайт в Яндекс.Вебмастер и Google Search Console, отправить sitemap.
- Подключить реальное демо-видео в hero.
- Расширить покрытие тестами (компоненты через @testing-library/react).
- Рассмотреть миграцию хостинга на CDN-edge (Cloudflare/Vercel) для кеширования.
