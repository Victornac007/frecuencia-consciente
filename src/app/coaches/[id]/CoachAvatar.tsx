"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { Coach } from "@/data/mock";

function Placeholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-green via-brand-bg-pink to-brand-bg-green flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center border border-white/70">
          <span className="text-4xl font-bold text-brand-green">{initials}</span>
        </div>
        <Sparkles className="w-5 h-5 text-brand-gold/50" />
      </div>
    </div>
  );
}

export function CoachAvatar({ coach }: { coach: Coach }) {
  const [error, setError] = useState(false);

  if (error) return <Placeholder name={coach.name} />;

  return (
    <Image
      src={coach.image}
      alt={coach.name}
      fill
      className="object-cover coach-image-sharp"
      onError={() => setError(true)}
    />
  );
}
