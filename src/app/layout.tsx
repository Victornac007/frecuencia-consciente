import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { GlobalPlayer, PlayerSpacer } from "@/components/player";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundEffects } from "@/components/effects";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Frecuencia Consciente — Radio Digital y Despertar Interior",
  description:
    "Plataforma de radio digital, coaching espiritual y despertar interior. Programas en vivo, podcasts, meditaciones guiadas y artículos para elevar tu consciencia.",
  keywords: [
    "radio espiritual",
    "coaching espiritual",
    "despertar interior",
    "meditación",
    "podcasts conscientes",
    "frecuencia consciente",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Frecuencia Consciente",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#eef5ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${jakarta.variable} ${playfair.variable} ${caveat.variable} antialiased`}
      >
        <AudioPlayerProvider>
          <BackgroundEffects />
          <Navbar />
          <div className="pt-18">{children}</div>
          <Footer />
          <PlayerSpacer />
          <GlobalPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
