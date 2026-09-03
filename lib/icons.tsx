import {
  Server,
  Network,
  Shield,
  Code2,
  Smartphone,
  Store,
  GraduationCap,
  HeartPulse,
  Landmark,
  Zap,
  Award,
  MapPin,
  type LucideIcon
} from 'lucide-react';

/**
 * Registre central des icônes utilisables depuis l'admin (Services, Secteurs...).
 * Une icône est référencée en base par sa clé (string) — ce fichier fait le lien
 * avec le composant lucide-react réel, et sert aussi à peupler les <select> admin.
 */
export const ICONS: Record<string, LucideIcon> = {
  Server,
  Network,
  Shield,
  Code2,
  Smartphone,
  Store,
  GraduationCap,
  HeartPulse,
  Landmark,
  Zap,
  Award,
  MapPin
};

export type IconKey = keyof typeof ICONS;

export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

export function getIcon(key: string | null | undefined): LucideIcon {
  return (key && ICONS[key]) || Server;
}
