# Йося / Yosa — AI Calorie Counter Landing Page

## Project Overview
- **Name**: Йося (Yosa)
- **Goal**: Marketing landing page for the Yosa Android app — AI calorie tracker with a cat companion
- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion (motion/react)
- **Deployed on**: Cloudflare Pages (via Wrangler) / Node dev server (PM2)

---

## Production URLs
- **Live site**: https://yosa-landing.pages.dev *(Cloudflare Pages)*
- **RuStore app**: https://www.rustore.ru/catalog/app/ru.puhlyash.yosa

---

## ✅ Completed Features (v1.0.4)

### UI / UX
- **Hero section** — Amy-inspired layout: huge bold 3-line title left, phone showcase right with autoplay Android UI video
- **HowItWorks block** — phone mockup left + numbered steps 01/02/03 right with large grey numbers (replaces bloated CalorieEstimator demo)
- **Logo** — enlarged to 52px + subtitle "ИИ-счётчик калорий"
- **FAQ** — single full-width accordion, smooth height animation, dim neighbours on open, no layout shift
- **Footer** — 4-column Amy-style grid: logo+social, App links, Sections nav, About
- **Bidirectional scroll animation** — FadeIn blocks appear from bottom on scroll-down and animate-out upward on scroll-up (with state memory: only exit-up if already played)

### Analytics & A/B
- Yandex.Metrika integration with RuStore click goals
- Google Analytics 4 (gtag) + RuStore click event
- Client-side A/B test for hero CTA copy (no VWO, edge-friendly, stable per visitor)

### Performance
- Lazy-loaded below-fold sections (code splitting)
- WebP images with eager/lazy loading strategy
- Custom PawCursor (desktop only, toggle off)

### Features (app sections)
- **Features grid** — 6 key features with SVG icons
- **Streaks & Badges gallery** — gamification showcase
- **BMR/TDEE Goals Calculator** — interactive nutrition calculator
- **Widget Sandbox** — interactive widget customizer preview
- **Art Gallery** — parallax section with Yosa character art
- **Download Nudge** — playful "haven't downloaded yet?" section
- **Creator Story** — developer profile with real photos
- **Bilingual** — full RU/EN toggle

---

## Architecture

```
webapp/
├── src/
│   ├── App.tsx                  # Main layout, Hero, FAQ, Footer
│   ├── components/
│   │   ├── HowItWorks.tsx       # NEW: Amy-style phone + steps block
│   │   ├── FadeIn.tsx           # Bidirectional scroll-reveal (IntersectionObserver)
│   │   ├── FadeInItem.tsx       # Stagger child variants
│   │   ├── HeroShowcase.tsx     # Phone mockup for hero
│   │   ├── GoalsCalculator.tsx  # BMR/TDEE calculator
│   │   ├── BadgesGallery.tsx    # Streaks & achievements
│   │   ├── WidgetSandbox.tsx    # Widget customizer
│   │   ├── CreatorStory.tsx     # Developer section
│   │   ├── ArtGallery.tsx       # Art parallax gallery
│   │   ├── DownloadNudge.tsx    # CTA nudge section
│   │   ├── PawCursor.tsx        # Custom cat paw cursor
│   │   ├── Parallax.tsx         # Scroll parallax wrapper
│   │   ├── TextReveal.tsx       # Word-by-word text animation
│   │   └── AnimatedButton.tsx   # Reusable animated button
│   ├── lib/
│   │   ├── analytics.ts         # GA4 + Yandex.Metrika tracking
│   │   └── abtest.ts            # Edge-friendly A/B variant
│   ├── assets/images/           # WebP app screenshots & art
│   ├── index.css                # Tailwind + custom tokens
│   └── types.ts                 # Shared TypeScript types
├── public/                      # Static assets
├── server.ts                    # Express dev server
├── vite.config.ts
├── ecosystem.config.cjs         # PM2 config (port 3000)
└── .ci-templates/               # CI/CD template (activate manually)
```

---

## Data Architecture
- **No backend database** — pure static landing page
- **Analytics**: GA4 + Yandex.Metrika (event-based, no PII)
- **A/B test**: `localStorage` variant assignment, 3 CTA variants
- **App data storage**: 100% on-device (in the Yosa Android app itself)

---

## User Guide

1. **Language toggle** — top-right "EN/RU" button switches all content
2. **Paw cursor** — toggle the custom cat cursor via "Курсор: Вкл/Выкл" button
3. **Nav links** — anchor-scroll to any section
4. **FAQ** — click any question to expand; others dim; click again to close
5. **Goals Calculator** — input weight/height/age/activity for personalized TDEE
6. **Download** — RuStore badge in hero is the primary CTA

---

## Local Development

```bash
# Install deps (already done)
npm install

# Build
npm run build

# Start dev server with PM2
pm2 start ecosystem.config.cjs

# Test
curl http://localhost:3000

# Check logs
pm2 logs yosa --nostream
```

---

## Hero Video Asset

Hero automatically looks for this video file:

```text
public/videos/yosa-android-demo.mp4
```

Put the Android screen recording at exactly that path and keep the same filename. Vite serves files from `public/` from the site root, so the page loads it as `/videos/yosa-android-demo.mp4`. Recommended format: vertical MP4, muted-friendly, about 9:19.5 aspect ratio.

---

## CI Template Activation

The repository keeps a ready GitHub Actions template in `.ci-templates/ci.workflow.yml`. It is intentionally not active until copied into GitHub's workflow folder.

To enable it:

```bash
mkdir -p .github/workflows
cp .ci-templates/ci.workflow.yml .github/workflows/ci.yml
git add .github/workflows/ci.yml
git commit -m "Enable CI workflow"
git push
```

After this, GitHub will run CI on every push to `main` and every pull request into `main`. The template installs dependencies with `npm ci`, runs TypeScript checks via `npm run lint`, runs Vitest via `npm test`, and verifies the production build via `npm run build`.

---

## Deployment (Cloudflare Pages)

```bash
# Build & deploy
npm run build
npx wrangler pages deploy dist --project-name yosa-landing
```

---

## ⏳ Not Yet Implemented / Roadmap

| Feature | Priority | Notes |
|---------|----------|-------|
| Vitest unit tests + CI/CD (GitHub Actions) | High | CI template in `.ci-templates/` — activate manually |
| LazyImage lottie-react removal (-86KB gzip) | High | Replace with CSS animation |
| Offline CalorieEstimator fallback | Medium | Show local estimate when AI API unavailable |
| Scroll-parallax / contrast layout improvements | Medium | Additional depth for mid-page sections |
| Hero video asset | Medium | Add/replace `public/videos/yosa-android-demo.mp4` when a new Android promo recording is ready |
| iOS landing page variant | Medium | Separate hero CTA when iOS released |
| Dark mode support | Low | CSS variables prepared, just needs toggle |
| PWA manifest | Low | For "Add to homescreen" on web |

---

## Recent Changes (v1.0.4 — 2026-06-09)

- ✅ **Hero**: Amy-style layout, bigger title (5xl→7xl), short subtitle, Android UI video slot
- ✅ **HowItWorks**: New component replacing CalorieEstimator (phone + 01/02/03 steps)
- ✅ **Logo**: Enlarged 40px→52px, added subtitle line
- ✅ **FAQ**: Single column, smooth height accordion, dim neighbours, no layout shift
- ✅ **Footer**: 4-column grid with proper links, larger typography, text-only brand block
- ✅ **FadeIn**: Bidirectional — exit-up animation on scroll-up, memory of played state
- ✅ **Cursor**: Smooth spring-follow custom paw cursor for premium feel

---

*Built with ❤️ by Alexander · Inspired by Amy Food Journal*
