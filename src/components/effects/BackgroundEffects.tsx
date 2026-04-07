"use client";

import { useMemo } from "react";
import Image from "next/image";
import { MysticWaves } from "./MysticWaves";
import { LightLeaks } from "./LightLeaks";

interface Star {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  baseOpacity: number;
  peakOpacity: number;
}

interface Particle {
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  color: string;
  glow: string;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    left: `${((i * 137.508 + 31.41) % 100).toFixed(1)}%`,
    top: `${((i * 119.473 + 17.29) % 100).toFixed(1)}%`,
    size: 1 + (i % 3),
    delay: parseFloat(((i * 0.37) % 6).toFixed(2)),
    duration: 3 + (i % 5) * 0.8,
    baseOpacity: 0.03 + (i % 4) * 0.03,
    peakOpacity: 0.2 + (i % 3) * 0.1,
  }));
}

const PARTICLE_COLORS = [
  { color: "rgba(167,216,156,O)", glow: "rgba(167,216,156,G)" },
  { color: "rgba(248,180,180,O)", glow: "rgba(248,180,180,G)" },
  { color: "rgba(251,191,36,O)", glow: "rgba(251,191,36,G)" },
  { color: "rgba(134,197,134,O)", glow: "rgba(134,197,134,G)" },
  { color: "rgba(244,164,175,O)", glow: "rgba(244,164,175,G)" },
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const palette = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
    const opacity = 0.15 + (i % 5) * 0.05;
    return {
      left: `${((i * 13.7 + 5.3) % 100).toFixed(1)}%`,
      size: 2 + (i % 5),
      duration: 18 + (i % 9) * 3,
      delay: (i * 1.7) % 22,
      drift: ((i % 7) - 3) * 35,
      opacity,
      color: palette.color.replace("O", String(opacity)),
      glow: palette.glow.replace("G", String(opacity * 0.3)),
    };
  });
}

function StarField() {
  const stars = useMemo(() => generateStars(50), []);

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={`s-${i}`}
          className="star"
          style={
            {
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--star-delay": `${star.delay}s`,
              "--star-duration": `${star.duration}s`,
              "--star-base-opacity": star.baseOpacity,
              "--star-peak-opacity": star.peakOpacity,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function RisingParticles() {
  const particles = useMemo(() => generateParticles(20), []);

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={`p-${i}`}
          className="rising-particle"
          style={
            {
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.glow}`,
              "--p-duration": `${p.duration}s`,
              "--p-delay": `${p.delay}s`,
              "--p-drift": `${p.drift}px`,
              "--p-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function ZenWaveOverlays() {
  return (
    <>
      <svg
        className="wave-overlay wave-overlay-1"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
      >
        <path
          d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1400,20 1600,100 1800,60 C2000,20 2200,100 2400,60 L2400,120 L0,120 Z"
          fill="rgba(124,191,113,0.06)"
        />
      </svg>
      <svg
        className="wave-overlay wave-overlay-2"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ height: "100px" }}
      >
        <path
          d="M0,80 C300,40 500,110 800,70 C1100,30 1300,100 1600,65 C1900,30 2100,95 2400,70 L2400,120 L0,120 Z"
          fill="rgba(232,141,150,0.05)"
        />
      </svg>
      <svg
        className="wave-overlay wave-overlay-3"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
      >
        <path
          d="M0,50 C150,80 350,30 600,65 C850,100 1050,35 1300,60 C1550,85 1750,40 2000,70 C2200,95 2350,45 2400,55 L2400,120 L0,120 Z"
          fill="rgba(247,194,68,0.04)"
        />
      </svg>
    </>
  );
}

export function BackgroundEffects() {
  return (
    <>
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/zen-bg.png"
          alt="Zen Landscape Background"
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
          quality={85}
        />
      </div>
      <div className="zen-landscape-overlay" aria-hidden="true" />

      <div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="aurora" />
      <div
        className="aurora"
        style={{
          top: "30%",
          height: "40%",
          opacity: 0.3,
          animationDelay: "10s",
          animationDuration: "28s",
        }}
      />

      <div
        className="orb orb-violet"
        style={{ top: "5%", left: "8%", width: "550px", height: "550px" }}
      />
      <div
        className="orb orb-teal"
        style={{ top: "35%", right: "3%", width: "450px", height: "450px" }}
      />
      <div
        className="orb orb-indigo"
        style={{ bottom: "5%", left: "15%", width: "500px", height: "500px" }}
      />
      <div
        className="orb orb-rose"
        style={{ top: "10%", right: "15%", width: "400px", height: "400px" }}
      />
      <div
        className="orb orb-gold"
        style={{ top: "55%", left: "40%", width: "350px", height: "350px" }}
      />
      <div
        className="orb orb-teal"
        style={{
          bottom: "20%",
          right: "25%",
          width: "300px",
          height: "300px",
          animationDelay: "8s",
        }}
      />

      <LightLeaks />
      <MysticWaves />
      <StarField />
      <RisingParticles />
      <ZenWaveOverlays />
    </div>
    </>
  );
}
