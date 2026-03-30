import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Music,
  MessageCircle,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

/**
 * Enlaces de redes sociales de Frecuencia Consciente.
 * Edita aquí las URLs y agrega o quita redes; se usan en Footer, Newsletter y Contacto.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Instagram, href: "https://www.instagram.com/frecuenciaconsciente.radio/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCL9sKEOxpf8sJDbSrZkjr6w", label: "YouTube" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587680687259", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/frecconsciente", label: "X (Twitter)" },
  { icon: Music, href: "https://open.spotify.com/show/frecuenciaconsciente", label: "Spotify" },
  { icon: MessageCircle, href: "https://t.me/frecuenciaconsciente", label: "Telegram" },
];

/** Solo redes (sin email), para secciones "Síguenos" */
export const SOCIAL_LINKS_FOLLOW = SOCIAL_LINKS.filter((s) => s.icon !== Mail);

/** Enlaces para el Footer (incluye Email) */
export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  ...SOCIAL_LINKS_FOLLOW,
  { icon: Mail, href: "mailto:contacto@frecuenciaconsciente.com", label: "Email" },
];
