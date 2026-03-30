"use client";

import { useMemo } from "react";

interface WaveConfig {
  topPercent: number;
  heightVh: number;
  amplitude: number;
  wavelength: number;
  fill: string;
  duration: number;
  reverse: boolean;
}

const VIEWBOX_W = 1440;
const VIEWBOX_H = 200;

function buildWavePath(amplitude: number, wavelength: number): string {
  const cy = VIEWBOX_H * 0.4;
  const doubleWidth = VIEWBOX_W * 2;
  const steps = Math.ceil(doubleWidth / wavelength);

  let d = `M 0 ${cy}`;
  for (let i = 0; i < steps; i++) {
    const qx = i * wavelength + wavelength * 0.5;
    const qy = cy + (i % 2 === 0 ? -amplitude : amplitude);
    const ex = (i + 1) * wavelength;
    d += ` Q ${qx} ${qy} ${ex} ${cy}`;
  }

  d += ` V ${VIEWBOX_H} H 0 Z`;
  return d;
}

const WAVES: WaveConfig[] = [
  {
    topPercent: 5,
    heightVh: 35,
    amplitude: 18,
    wavelength: 320,
    fill: "rgba(167,216,156,0.08)",
    duration: 28,
    reverse: false,
  },
  {
    topPercent: 15,
    heightVh: 30,
    amplitude: 14,
    wavelength: 380,
    fill: "rgba(252,224,141,0.06)",
    duration: 35,
    reverse: true,
  },
  {
    topPercent: 30,
    heightVh: 32,
    amplitude: 22,
    wavelength: 280,
    fill: "rgba(248,180,180,0.07)",
    duration: 24,
    reverse: false,
  },
  {
    topPercent: 45,
    heightVh: 28,
    amplitude: 12,
    wavelength: 350,
    fill: "rgba(134,197,134,0.06)",
    duration: 32,
    reverse: true,
  },
  {
    topPercent: 58,
    heightVh: 30,
    amplitude: 16,
    wavelength: 300,
    fill: "rgba(251,191,36,0.04)",
    duration: 30,
    reverse: false,
  },
  {
    topPercent: 70,
    heightVh: 28,
    amplitude: 10,
    wavelength: 400,
    fill: "rgba(244,164,175,0.05)",
    duration: 40,
    reverse: true,
  },
  {
    topPercent: 82,
    heightVh: 25,
    amplitude: 20,
    wavelength: 260,
    fill: "rgba(167,216,156,0.05)",
    duration: 26,
    reverse: false,
  },
];

export function MysticWaves() {
  const layers = useMemo(
    () => WAVES.map((w) => ({ ...w, path: buildWavePath(w.amplitude, w.wavelength) })),
    []
  );

  return (
    <>
      {layers.map((wave, i) => (
        <div
          key={`wave-${i}`}
          className="absolute left-0 w-[200vw]"
          style={{
            top: `${wave.topPercent}%`,
            height: `${wave.heightVh}vh`,
            animation: `wave-flow ${wave.duration}s linear infinite`,
            animationDirection: wave.reverse ? "reverse" : "normal",
          }}
        >
          <svg
            viewBox={`0 0 ${VIEWBOX_W * 2} ${VIEWBOX_H}`}
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path d={wave.path} fill={wave.fill} />
          </svg>
        </div>
      ))}
    </>
  );
}
