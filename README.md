# OPS CORPORATION — Site vitrine + back-office

Site multi-pages (Accueil, Services, À propos, Réalisations, Contact) pour OPS CORPORATION, avec un back-office admin permettant de gérer tout le contenu business (équipe, services, secteurs, réalisations, infos entreprise, stats, messages reçus) sans toucher au code.

- Next.js 15 (App Router) + TypeScript
- Tailwind v4
- next-intl (FR/EN)
- Prisma (SQLite en local, Postgres recommandé en prod) — voir `prisma/schema.prisma`
- NextAuth v5 (Credentials) pour l'accès `/admin`
- Resend pour l'envoi d'email du formulaire de contact (les messages sont aussi enregistrés en base)

## Démarrage

```bash
npm install
npx prisma migrate dev   # crée la base locale (prisma/dev.db)
npm run db:seed          # peuple le contenu de départ (équipe, services, réalisations réelles...)
npm run dev
# http://localhost:3000/fr (ou /en)
# http://localhost:3000/admin/login
```

Les identifiants admin générés au premier `db:seed` s'affichent dans le terminal (mots de passe temporaires, à changer immédiatement via `/admin/account`).

## Gestion du contenu

- **Chrome d'interface** (libellés de nav, textes de boutons, intitulés de section) : `locales/fr.json` / `locales/en.json`.
- **Contenu business** (équipe, services, secteurs, réalisations, infos entreprise, stats, messages de contact) : base de données, éditable exclusivement via `/admin`. Rien de tout cela n'est en dur dans le code.

## Back-office `/admin`

- `/admin` — tableau de bord
- `/admin/company` — infos entreprise + statistiques (accueil / à propos)
- `/admin/team` — équipe
- `/admin/services` — services proposés
- `/admin/sectors` — secteurs d'activité
- `/admin/projects` — réalisations / clients
- `/admin/messages` — messages reçus via le formulaire de contact
- `/admin/account` — changement de mot de passe

## Déploiement

Voir `.vercel.audit.md` pour la checklist complète. Point important : en local la base est SQLite (fichier), **à basculer sur Postgres (ex: Neon) avant le déploiement Vercel** — un système de fichiers serverless ne persiste pas.

- `public/ops-logo.png` (logo OPS CORPORATION).
