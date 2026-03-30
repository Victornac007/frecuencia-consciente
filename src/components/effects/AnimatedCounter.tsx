"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  const normalized = value === "24/7" ? "24/7" : value;
  const numericPart = normalized === "24/7"
    ? 24
    : parseInt(normalized.replace(/\D/g, ""), 10);
  const suffix = normalized === "24/7"
    ? "/7"
    : normalized.replace(/[\d]/g, "");
  const isNumeric = !isNaN(numericPart) && numericPart > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated || !isNumeric) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.unobserve(el);

        const duration = 1200;
        const start = performance.now();

        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * numericPart);
          setDisplayed(`${current}${suffix}`);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, isNumeric, numericPart, suffix]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
