"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LivePlayButton } from "@/components/player";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/programas" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Radio 24/7", href: "/radio" },
  { label: "Artículos", href: "/articulos" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? window.scrollY / totalHeight : 0);
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm shadow-black/5"
          : "backdrop-blur-[12px] bg-[rgba(255,255,255,0.25)] border-b border-transparent"
      }`}
    >
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex shrink-0 w-10 h-10 rounded-full overflow-hidden border border-white/30 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Frecuencia Consciente"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            <span className="font-serif text-xl font-bold tracking-wide text-[#1E293B]">
              Frecuencia{" "}
              <span className="text-accent-orange italic">Consciente</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 tracking-wide ${
                    isActive
                      ? "text-[#1E293B] bg-[#FAF9F6] border border-[#4A7856]/30"
                      : "text-[#1E293B]/85 hover:text-[#1E293B] hover:bg-white/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/admin/login"
              className="text-sm font-medium text-[#1E293B] hover:text-[#4A7856] transition-colors px-2 py-1"
            >
              Acceder
            </Link>
            <LivePlayButton size="md" />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-slate-200/50 backdrop-blur-2xl bg-white/95 -mx-4 px-4 sm:-mx-6 sm:px-6">
            <div className="pt-3 space-y-1 flex flex-col items-center justify-center text-center">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block w-full max-w-xs px-4 py-3 font-medium rounded-xl transition-all text-[#1E293B] tracking-wide ${
                    isActive
                      ? "bg-[#FAF9F6] border border-[#4A7856]/30"
                      : "hover:bg-white/40"
                  }`}
                >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="px-4 pt-4 pb-2 w-full flex flex-col items-center gap-4">
              <Link 
                href="/admin/login"
                onClick={closeMobileMenu}
                className="text-sm font-medium text-[#1E293B] hover:text-[#4A7856] transition-colors"
              >
                Acceder al Portal
              </Link>
              <div className="w-full max-w-xs">
                <LivePlayButton size="lg" fullWidth />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
