"use client";

interface LeakConfig {
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  background: string;
  animation: string;
  duration: string;
  delay: string;
}

const LEAKS: LeakConfig[] = [
  {
    top: "-10%",
    right: "-5%",
    width: "600px",
    height: "600px",
    background:
      "radial-gradient(ellipse, rgba(167,216,156,0.22) 0%, rgba(134,197,134,0.06) 40%, transparent 70%)",
    animation: "leak-drift-1",
    duration: "18s",
    delay: "0s",
  },
  {
    top: "20%",
    left: "-8%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(ellipse, rgba(248,180,180,0.18) 0%, rgba(244,164,175,0.05) 40%, transparent 70%)",
    animation: "leak-drift-2",
    duration: "22s",
    delay: "3s",
  },
  {
    top: "50%",
    right: "10%",
    width: "450px",
    height: "450px",
    background:
      "radial-gradient(ellipse, rgba(252,224,141,0.16) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)",
    animation: "leak-drift-3",
    duration: "25s",
    delay: "6s",
  },
  {
    top: "70%",
    left: "15%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(ellipse, rgba(167,216,156,0.14) 0%, rgba(134,197,134,0.04) 40%, transparent 70%)",
    animation: "leak-drift-1",
    duration: "20s",
    delay: "9s",
  },
];

export function LightLeaks() {
  return (
    <>
      {LEAKS.map((leak, i) => (
        <div
          key={`leak-${i}`}
          className="light-leak"
          style={{
            top: leak.top,
            left: leak.left,
            right: leak.right,
            width: leak.width,
            height: leak.height,
            background: leak.background,
            animation: `${leak.animation} ${leak.duration} ease-in-out infinite`,
            animationDelay: leak.delay,
          }}
        />
      ))}
    </>
  );
}
