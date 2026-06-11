"use client";

import { useCallback } from "react";

type Props = {
  adults: number;
  children: number;
  infants: number;
  maxGuests: number;
  onChange: (field: "adults" | "children" | "infants", value: number) => void;
};

export default function GuestSelector({ adults, children, infants, maxGuests, onChange }: Props) {
  const totalGuests = adults + children;

  const adjust = useCallback(
    (key: "adults" | "children" | "infants", delta: number, min: number, max: number) => {
      const cur = key === "adults" ? adults : key === "children" ? children : infants;
      onChange(key, Math.max(min, Math.min(max, cur + delta)));
    },
    [adults, children, infants, onChange]
  );

  const rows: {
    key: "adults" | "children" | "infants";
    label: string;
    sublabel: string;
    current: number;
    min: number;
    max: number;
  }[] = [
    { key: "adults", label: "Adultes", sublabel: "13 ans et plus", current: adults, min: 1, max: maxGuests },
    { key: "children", label: "Enfants", sublabel: "De 2 à 12 ans", current: children, min: 0, max: Math.max(0, maxGuests - adults) },
    { key: "infants", label: "Bébés", sublabel: "Moins de 2 ans", current: infants, min: 0, max: 5 },
  ];

  return (
    <div className="space-y-1">
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
        {totalGuests} voyageur{totalGuests > 1 ? "s" : ""}
        {infants > 0 ? `, ${infants} bébé${infants > 1 ? "s" : ""}` : ""}
        {" · "}max {maxGuests}
      </p>
      {rows.map(({ key, label, sublabel, current, min, max }) => (
        <div
          key={key}
          className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
        >
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
            <p className="text-xs text-zinc-400">{sublabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => adjust(key, -1, min, max)}
              disabled={current <= min}
              className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center hover:border-zinc-400 transition disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 dark:text-zinc-400"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {current}
            </span>
            <button
              onClick={() => adjust(key, 1, min, max)}
              disabled={current >= max || (key !== "infants" && totalGuests >= maxGuests)}
              className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center hover:border-zinc-400 transition disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 dark:text-zinc-400"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
