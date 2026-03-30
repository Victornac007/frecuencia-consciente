import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { FOOTER_SOCIAL_LINKS } from "@/data/social";

interface FooterLink {
  label: string;
  href: string;
}

const QUICK_LINKS: FooterLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/programas" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Radio 24/7", href: "/radio" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "Artículos", href: "/articulos" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Colaboraciones", href: "/contacto" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#2d3a2e]/88 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#2d3a2e]/75 hover:text-brand-green transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/25 bg-white/35 backdrop-blur-md shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Frecuencia Consciente"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-serif text-lg font-bold tracking-tight">
                <span className="text-[#2D3436]">Frecuencia</span>{" "}
                <span className="text-accent-orange italic">Consciente</span>
              </span>
            </Link>
            <p className="text-sm text-[#2d3a2e]/75 leading-relaxed max-w-xs">
              Tu espacio de radio digital, coaching espiritual y despertar
              interior. Sintoniza tu frecuencia más elevada.
            </p>
            <div className="flex gap-2.5">
              {FOOTER_SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-[#2D3436]/15 flex items-center justify-center text-[#2D3436]/70 hover:text-[#4A7856] hover:border-[#4A7856]/40 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkGroup title="Navegación" links={QUICK_LINKS} />
          <FooterLinkGroup title="Recursos" links={RESOURCE_LINKS} />

          <div>
            <h3 className="text-sm font-semibold text-[#2d3a2e]/88 uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <div className="space-y-2.5 text-sm text-[#2d3a2e]/75">
              <p>contacto@frecuenciaconsciente.com</p>
              <p>Radio Digital 24/7</p>
              <p>Coaching y Despertar Interior</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-green/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#2d3a2e]/65">
            &copy; {currentYear} Frecuencia Consciente. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-[#2d3a2e]/65 flex items-center gap-1.5">
            Hecho con{" "}
            <Heart className="w-3 h-3 text-brand-pink fill-brand-pink" /> para
            el despertar colectivo
          </p>
        </div>
      </div>
    </footer>
  );
}
