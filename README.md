# OPS CORPORATION - Portfolio (Next 15, Tailwind v4)

- Next.js (App Router) + TypeScript
- Tailwind v4 (`@import "tailwindcss";`), PostCSS plugin `@tailwindcss/postcss`
- next-intl (plugin + middleware + i18n request config)
- Framer Motion (Reveal, AnimatedText, TiltCard, MagneticButton, ParallaxGrid, ScrollProgress)
- SEO de base, API contact (demo)

## Demarrage
```bash
npm install
npm run dev
# http://localhost:3000/fr (ou /en)
```

## Personnalisation rapide
- Liens GitHub/LinkedIn dans `app/[locale]/page.tsx` (const `SOCIALS`).
- Projets & services dans `locales/fr.json` et `locales/en.json`.
- `public/ops-logo.png` (logo), `public/CV-Caringthon_Kossi_Maathey.pdf` (CV).

## Deploiement
- Vercel recommande, ou `npm run build && npm start` derriere NGINX.
