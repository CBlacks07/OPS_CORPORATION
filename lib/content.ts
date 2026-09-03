import { prisma } from '@/lib/prisma';

export type Locale = 'fr' | 'en';

function safeJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Toutes les fonctions ci-dessous lisent directement la base et projettent
 * les champs bilingues (_fr/_en) vers le champ attendu par le `locale` courant.
 * Utilisées uniquement dans des Server Components (app/[locale]/**). */

export async function getCompanyInfo(locale: Locale) {
  const c = await prisma.companyInfo.findUnique({ where: { id: 'main' } });
  if (!c) return null;
  return {
    name: c.name,
    tagline: locale === 'fr' ? c.taglineFr : c.taglineEn,
    mission: locale === 'fr' ? c.missionFr : c.missionEn,
    history: locale === 'fr' ? c.historyFr : c.historyEn,
    values: locale === 'fr' ? c.valuesFr : c.valuesEn,
    foundedYear: c.foundedYear,
    email: c.email,
    phone: c.phone,
    address: c.address,
    linkedin: c.linkedin,
    facebook: c.facebook,
    instagram: c.instagram
  };
}

export async function getStats(locale: Locale) {
  const rows = await prisma.stat.findMany({ orderBy: { order: 'asc' } });
  return rows.map((r) => ({ id: r.id, value: r.value, label: locale === 'fr' ? r.labelFr : r.labelEn }));
}

export async function getTeam(locale: Locale) {
  const rows = await prisma.teamMember.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  return rows.map((m) => ({
    id: m.id,
    name: m.name,
    role: locale === 'fr' ? m.roleFr : m.roleEn,
    bio: locale === 'fr' ? m.bioFr : m.bioEn,
    photoUrl: m.photoUrl,
    linkedin: m.linkedin
  }));
}

export async function getServices(locale: Locale) {
  const rows = await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  return rows.map((s) => ({
    id: s.id,
    slug: s.slug,
    icon: s.icon,
    title: locale === 'fr' ? s.titleFr : s.titleEn,
    desc: locale === 'fr' ? s.descFr : s.descEn,
    features: safeJson<{ fr: string; en: string }[]>(s.features, []).map((f) => (locale === 'fr' ? f.fr : f.en))
  }));
}

export async function getSectors(locale: Locale) {
  const rows = await prisma.sector.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  return rows.map((s) => ({
    id: s.id,
    icon: s.icon,
    title: locale === 'fr' ? s.titleFr : s.titleEn,
    desc: locale === 'fr' ? s.descFr : s.descEn
  }));
}

export async function getProjects(locale: Locale, opts: { onlyFeatured?: boolean; limit?: number } = {}) {
  const rows = await prisma.project.findMany({
    where: { active: true, ...(opts.onlyFeatured ? { featured: true } : {}) },
    orderBy: { order: 'asc' },
    ...(opts.limit ? { take: opts.limit } : {})
  });
  return rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    clientName: p.clientName,
    url: p.url,
    tag: locale === 'fr' ? p.tagFr : p.tagEn,
    title: locale === 'fr' ? p.titleFr : p.titleEn,
    desc: locale === 'fr' ? p.descFr : p.descEn,
    stack: safeJson<string[]>(p.stack, []),
    coverImageUrl: p.coverImageUrl
  }));
}
