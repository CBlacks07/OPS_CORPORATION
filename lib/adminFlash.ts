/**
 * Petit système de message de confirmation ("toast") pour l'admin, basé sur
 * un paramètre d'URL — fonctionne avec les Server Actions + redirect() sans
 * JS côté client supplémentaire. Voir components/admin/AdminToast.tsx pour
 * l'affichage.
 */
export function withFlash(path: string, message: string, type: 'success' | 'error' = 'success') {
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}flash=${encodeURIComponent(message)}&type=${type}`;
}
