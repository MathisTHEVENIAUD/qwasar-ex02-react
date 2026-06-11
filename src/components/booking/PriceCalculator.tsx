"use client";

import { useMemo } from "react";

type Props = {
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export default function PriceCalculator({ pricePerNight, checkIn, checkOut, guests }: Props) {
  const breakdown = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const nights = Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) return null;
    const subtotal = pricePerNight * nights;
    const cleaningFee = Math.round(subtotal * 0.12);
    const serviceFee = Math.round(subtotal * 0.14);
    return { nights, subtotal, cleaningFee, serviceFee, total: subtotal + cleaningFee + serviceFee };
  }, [pricePerNight, checkIn, checkOut]);

  if (!breakdown) {
    return (
      <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center py-2">
        Sélectionnez des dates pour voir le prix
      </p>
    );
  }

  const rows = [
    { label: `${pricePerNight} € × ${breakdown.nights} nuit${breakdown.nights > 1 ? "s" : ""}`, value: breakdown.subtotal },
    { label: "Frais de ménage", value: breakdown.cleaningFee },
    { label: "Frais de service", value: breakdown.serviceFee },
  ];

  return (
    <div className="space-y-2 text-sm">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between text-zinc-700 dark:text-zinc-300">
          <span>{r.label}</span>
          <span>{r.value} €</span>
        </div>
      ))}
      <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100 border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-1">
        <span>Total ({guests} voyageur{guests > 1 ? "s" : ""})</span>
        <span>{breakdown.total} €</span>
      </div>
    </div>
  );
}
