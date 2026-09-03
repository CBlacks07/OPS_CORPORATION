/**
 * Seed initial : contenu réel connu de OPS CORPORATION.
 * Tout ce qui est ici est ensuite éditable depuis /admin — ce script ne sert
 * qu'à démarrer avec des données sensées plutôt qu'une base vide.
 *
 * Lancer avec : npm run db:seed
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SECTION_COVERS } from '../lib/sections';

const prisma = new PrismaClient();

function randomTempPassword() {
  return Math.random().toString(36).slice(-6) + Math.random().toString(36).slice(-4).toUpperCase();
}

async function main() {
  // ── Comptes admin ────────────────────────────────────────────────────
  const accounts = [
    { name: 'Kossi Caringthon MAATHEY', email: 'cmaathey@gmail.com' },
    { name: 'Flora NOUDOUKOU', email: 'flora@opscorporation.tg' }
  ];

  const createdAccounts: { email: string; password: string }[] = [];

  for (const acc of accounts) {
    const existing = await prisma.user.findUnique({ where: { email: acc.email } });
    if (existing) continue;
    const password = randomTempPassword();
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name: acc.name, email: acc.email, passwordHash, role: 'ADMIN' }
    });
    createdAccounts.push({ email: acc.email, password });
  }

  // ── Informations entreprise ──────────────────────────────────────────
  await prisma.companyInfo.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      name: 'OPS CORPORATION',
      taglineFr: "L'IT de confiance pour votre business.",
      taglineEn: 'Trusted IT for your business.',
      missionFr:
        "Aider les entreprises, écoles, cliniques et institutions togolaises à sécuriser leurs infrastructures, déployer des réseaux fiables et se digitaliser avec des applications web et mobiles sur mesure — avec rigueur et réactivité.",
      missionEn:
        'Helping Togolese businesses, schools, clinics and institutions secure their infrastructure, deploy reliable networks, and go digital with tailor-made web and mobile applications — with rigor and responsiveness.',
      historyFr:
        "OPS CORPORATION est née à Lomé de la rencontre entre Kossi Caringthon MAATHEY et Flora NOUDOUKOU, réunis autour d'une conviction commune : les organisations togolaises méritent une IT aussi exigeante que celle des grands groupes, mais pensée pour leurs réalités locales. Depuis, l'équipe accompagne des cliniques, commerces, associations et ONG dans leur transformation digitale.",
      historyEn:
        'OPS CORPORATION was founded in Lomé by Kossi Caringthon MAATHEY and Flora NOUDOUKOU, united by a shared conviction: Togolese organizations deserve IT as rigorous as that of large corporations, built for their local realities. Since then, the team has supported clinics, businesses, associations and NGOs through their digital transformation.',
      valuesFr: 'Rigueur, réactivité, proximité et excellence technique.',
      valuesEn: 'Rigor, responsiveness, proximity and technical excellence.',
      foundedYear: 2023,
      email: 'cmaathey@gmail.com',
      phone: '+228 93 91 46 94',
      address: 'Lomé, Togo',
      linkedin: null,
      facebook: null,
      instagram: null
    }
  });

  // ── Stats ─────────────────────────────────────────────────────────────
  const stats = [
    { value: '3+', labelFr: "ans d'expertise", labelEn: 'years of expertise', order: 0 },
    { value: '15+', labelFr: 'projets livrés', labelEn: 'projects delivered', order: 1 },
    { value: '99.9%', labelFr: 'disponibilité visée', labelEn: 'targeted uptime', order: 2 },
    { value: '<24h', labelFr: 'temps de réponse', labelEn: 'response time', order: 3 }
  ];
  for (const s of stats) {
    const existing = await prisma.stat.findFirst({ where: { labelFr: s.labelFr } });
    if (!existing) await prisma.stat.create({ data: s });
  }

  // ── Équipe ────────────────────────────────────────────────────────────
  const team = [
    {
      name: 'Kossi Caringthon MAATHEY',
      roleFr: 'Directeur Général & Développeur Full-Stack',
      roleEn: 'CEO & Full-Stack Developer',
      bioFr:
        "Fondateur d'OPS CORPORATION, Kossi pilote les projets d'infrastructure et de développement, de la conception à la mise en production.",
      bioEn:
        'Founder of OPS CORPORATION, Kossi leads infrastructure and development projects, from design through to production.',
      order: 0
    },
    {
      name: 'Flora NOUDOUKOU',
      roleFr: 'Designeuse UI/UX & Développeuse Frontend',
      roleEn: 'UI/UX Designer & Frontend Developer',
      bioFr:
        "Flora conçoit des interfaces claires et soignées, et les transforme en expériences web fluides et accessibles.",
      bioEn: 'Flora designs clear, polished interfaces and turns them into smooth, accessible web experiences.',
      order: 1
    }
  ];
  for (const m of team) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) await prisma.teamMember.create({ data: m });
  }

  // ── Services ──────────────────────────────────────────────────────────
  const services = [
    {
      slug: 'infogerance-support',
      icon: 'Server',
      titleFr: 'Infogérance & support',
      titleEn: 'Managed IT & support',
      descFr:
        'Supervision proactive, maintenance planifiée et support utilisateur pour garantir la disponibilité et la performance de vos systèmes.',
      descEn:
        'Proactive monitoring, planned maintenance and user support to guarantee the availability and performance of your systems.',
      features: JSON.stringify([
        { fr: 'Supervision 24/7 & alerting', en: '24/7 monitoring & alerting' },
        { fr: 'Mises à jour & patches de sécurité', en: 'Updates & security patches' },
        { fr: 'Support utilisateurs réactif', en: 'Responsive user support' }
      ]),
      order: 0
    },
    {
      slug: 'deploiement-monitoring',
      icon: 'Network',
      titleFr: 'Déploiement & monitoring',
      titleEn: 'Deployment & monitoring',
      descFr:
        'Installation, configuration et observabilité complète de vos infrastructures serveurs, réseaux et cloud.',
      descEn: 'Installation, configuration and full observability of your server, network and cloud infrastructure.',
      features: JSON.stringify([
        { fr: 'Installation serveurs & réseaux', en: 'Server & network setup' },
        { fr: 'Monitoring temps réel & dashboards', en: 'Real-time monitoring & dashboards' },
        { fr: 'Documentation & runbooks', en: 'Documentation & runbooks' }
      ]),
      order: 1
    },
    {
      slug: 'securisation-soc',
      icon: 'Shield',
      titleFr: 'Sécurisation & SOC',
      titleEn: 'Security & SOC',
      descFr:
        'Audit, renforcement de vos défenses, détection proactive des menaces et réponse structurée aux incidents.',
      descEn: 'Audit, defense hardening, proactive threat detection and structured incident response.',
      features: JSON.stringify([
        { fr: 'Audit de sécurité & conformité', en: 'Security & compliance audit' },
        { fr: 'Détection & gestion des incidents', en: 'Incident detection & management' },
        { fr: 'Contrôle des accès & RBAC', en: 'Access control & RBAC' }
      ]),
      order: 2
    },
    {
      slug: 'applications-web',
      icon: 'Code2',
      titleFr: 'Applications web sur mesure',
      titleEn: 'Custom web applications',
      descFr:
        "Conception d'applications modernes, performantes et maintenables — de l'API REST à l'interface utilisateur.",
      descEn: 'Design of modern, high-performance, maintainable applications — from REST API to user interface.',
      features: JSON.stringify([
        { fr: 'Interfaces React / Next.js', en: 'React / Next.js interfaces' },
        { fr: 'APIs robustes & microservices', en: 'Robust APIs & microservices' },
        { fr: 'CI/CD & déploiement continu', en: 'CI/CD & continuous deployment' }
      ]),
      order: 3
    },
    {
      slug: 'applications-mobiles-digitalisation',
      icon: 'Smartphone',
      titleFr: 'Applications mobiles & digitalisation',
      titleEn: 'Mobile apps & digitalization',
      descFr:
        "Applications mobiles pour accompagner la digitalisation des villes, des populations et des organisations : gestion de l'urbanisation, suivi de population et gestion de stock pour écoles, restaurants et commerces.",
      descEn:
        'Mobile applications supporting the digitalization of cities, populations and organizations: urban management, population tracking, and stock management for schools, restaurants and businesses.',
      features: JSON.stringify([
        { fr: 'Apps de gestion urbaine & recensement', en: 'Urban management & census apps' },
        { fr: 'Gestion de stock (écoles, restaurants, commerces)', en: 'Stock management (schools, restaurants, shops)' },
        { fr: 'Applications Android / iOS sur mesure', en: 'Custom Android / iOS applications' }
      ]),
      order: 4
    }
  ];
  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }

  // ── Secteurs ──────────────────────────────────────────────────────────
  const sectors = [
    {
      icon: 'Store',
      titleFr: 'PME & Commerces',
      titleEn: 'SMEs & Retail',
      descFr:
        'Infrastructure fiable, sites vitrines et boutiques en ligne pour accompagner la croissance de votre commerce.',
      descEn: 'Reliable infrastructure, showcase sites and online stores to support your business growth.',
      order: 0
    },
    {
      icon: 'GraduationCap',
      titleFr: 'Écoles & établissements scolaires',
      titleEn: 'Schools & educational institutions',
      descFr:
        "Réseaux sécurisés, plateformes de gestion et applications de suivi adaptées aux établissements d'enseignement.",
      descEn: 'Secure networks, management platforms and tracking applications tailored for schools.',
      order: 1
    },
    {
      icon: 'HeartPulse',
      titleFr: 'Santé & cliniques',
      titleEn: 'Healthcare & clinics',
      descFr: 'Infrastructures conformes et sécurisées pour la gestion des données sensibles de vos patients.',
      descEn: 'Compliant, secure infrastructure for managing your patients’ sensitive data.',
      order: 2
    },
    {
      icon: 'Landmark',
      titleFr: 'Institutions, ONG & secteur public',
      titleEn: 'Institutions, NGOs & public sector',
      descFr: 'Déploiements réseau robustes et applications sur mesure pour organismes publics et ONG.',
      descEn: 'Robust network deployments and custom applications for public bodies and NGOs.',
      order: 3
    }
  ];
  for (const s of sectors) {
    const existing = await prisma.sector.findFirst({ where: { titleFr: s.titleFr } });
    if (!existing) await prisma.sector.create({ data: s });
  }

  // ── Réalisations ──────────────────────────────────────────────────────
  const projects = [
    {
      slug: 'ccl',
      clientName: 'Clinique Chirurgicale de Lomé (CCL)',
      url: 'https://ccl.tg',
      tagFr: 'Santé',
      tagEn: 'Healthcare',
      titleFr: 'Clinique Chirurgicale de Lomé',
      titleEn: 'Clinique Chirurgicale de Lomé',
      descFr:
        'Site vitrine pour une clinique chirurgicale privée à Lomé (chirurgie générale, orthopédique, vasculaire, maxillo-faciale, neurochirurgie) : présentation des spécialités, des équipes et des partenaires assurance.',
      descEn:
        'Showcase website for a private surgical clinic in Lomé (general, orthopedic, vascular, maxillofacial and neurosurgery): specialties, teams and insurance partners.',
      stack: JSON.stringify(['Next.js', 'Tailwind', 'SEO']),
      order: 0,
      featured: true
    },
    {
      slug: 'silvio-store',
      clientName: 'Silvio Store',
      url: 'https://silviostore.com',
      tagFr: 'E-commerce',
      tagEn: 'E-commerce',
      titleFr: 'Silvio Store',
      titleEn: 'Silvio Store',
      descFr:
        'Boutique en ligne dédiée aux accessoires premium pour smartphones (coques, écouteurs, chargeurs, protections) avec paiement mobile money et livraison en Afrique de l’Ouest.',
      descEn:
        'Online store for premium smartphone accessories (cases, headphones, chargers, screen protectors) with mobile money payment and delivery across West Africa.',
      stack: JSON.stringify(['E-commerce', 'Mobile Money', 'UI/UX']),
      order: 1,
      featured: true
    },
    {
      slug: 'aphrodite',
      clientName: 'Aphrodite Body Contouring',
      url: 'https://aphroditebodycontouring.com',
      tagFr: 'Beauté & bien-être',
      tagEn: 'Beauty & wellness',
      titleFr: 'Aphrodite Body Contouring',
      titleEn: 'Aphrodite Body Contouring',
      descFr:
        "Site vitrine pour un institut d'esthétique à Lomé spécialisé en soins non invasifs (Hydrafacial, HIFU, IPL) : présentation des protocoles et prise de contact.",
      descEn:
        'Showcase website for a Lomé-based medical spa specializing in non-invasive treatments (Hydrafacial, HIFU, IPL): treatment overview and contact.',
      stack: JSON.stringify(['Next.js', 'Design UI/UX']),
      order: 2,
      featured: false
    },
    {
      slug: 'aspa',
      clientName: 'ASPA — African Safety & Prevention Alliance',
      url: 'https://aspa-association.com',
      tagFr: 'Associatif',
      tagEn: 'Non-profit',
      titleFr: 'ASPA — African Safety & Prevention Alliance',
      titleEn: 'ASPA — African Safety & Prevention Alliance',
      descFr:
        "Site institutionnel pour une association dédiée à la prévention des risques, la santé-sécurité et la protection de l'environnement en Afrique.",
      descEn:
        'Institutional website for an association dedicated to risk prevention, health & safety and environmental protection across Africa.',
      stack: JSON.stringify(['Next.js', 'Multilingue']),
      order: 3,
      featured: false
    },
    {
      slug: 'semailles-togo',
      clientName: 'ONG Les Semailles',
      url: 'https://semaillestogo.tg',
      tagFr: 'ONG / Éducation',
      tagEn: 'NGO / Education',
      titleFr: 'ONG Les Semailles',
      titleEn: 'ONG Les Semailles',
      descFr:
        'Site institutionnel pour une ONG togolaise active dans l’éducation, la formation et la santé, mettant en avant ses programmes et actions de terrain.',
      descEn: 'Institutional website for a Togolese NGO active in education, training and healthcare programs.',
      stack: JSON.stringify(['Next.js', 'Accessibilité']),
      order: 4,
      featured: false
    }
  ];
  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  // ── Images de couverture (vides par défaut, à renseigner via /admin/covers) ──
  for (const s of SECTION_COVERS) {
    await prisma.sectionCover.upsert({ where: { id: s.key }, update: {}, create: { id: s.key, imageUrl: null } });
  }

  console.log('✅ Seed terminé.');
  if (createdAccounts.length) {
    console.log('\n🔑 Comptes admin créés (mots de passe temporaires — à changer sur /admin/account) :');
    for (const a of createdAccounts) console.log(`   ${a.email} / ${a.password}`);
  } else {
    console.log('ℹ️  Comptes admin déjà existants, aucun nouveau mot de passe généré.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
