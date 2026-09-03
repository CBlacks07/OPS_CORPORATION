/**
 * Liste fixe des "sections à image de couverture" du site. Chaque clé
 * correspond à un bandeau photo optionnel, éditable depuis /admin/covers,
 * et affiché (avec animation Ken Burns) sur la page publique correspondante.
 * Sans image définie, la section garde son rendu actuel (aucune casse).
 */
export const SECTION_COVERS = [
  { key: 'hero', label: 'Accueil — Hero (bandeau principal)' },
  { key: 'services_home', label: 'Accueil — Section Services' },
  { key: 'sectors_home', label: 'Accueil — Section Secteurs' },
  { key: 'whyus_home', label: 'Accueil — Section Pourquoi nous' },
  { key: 'projects_home', label: 'Accueil — Section Réalisations (aperçu)' },
  { key: 'contact_cta_home', label: 'Accueil — Bandeau Contact' },
  { key: 'services_page', label: 'Page Services — bandeau' },
  { key: 'about_page', label: 'Page À propos — bandeau' },
  { key: 'projects_page', label: 'Page Réalisations — bandeau' },
  { key: 'contact_page', label: 'Page Contact — bandeau' }
] as const;

export type SectionCoverKey = (typeof SECTION_COVERS)[number]['key'];
