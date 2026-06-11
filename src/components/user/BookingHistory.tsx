"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

type Booking = {
  id: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  total: number;
  status: "confirmed" | "completed" | "cancelled";
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    propertyTitle: "Appartement atypique vue Notre Dame de la Garde",
    checkIn: "2026-03-10",
    checkOut: "2026-03-15",
    total: 615,
    status: "completed",
  },
  {
    id: "b2",
    propertyTitle: "Suite L'Alpina avec Sauna et Baignoire",
    checkIn: "2026-05-20",
    checkOut: "2026-05-22",
    total: 450,
    status: "confirmed",
  },
];

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  cancelled: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_LABELS = {
  confirmed: "Confirmée",
  completed: "Terminée",
  cancelled: "Annulée",
};

export default function BookingHistory() {
  const [bookings] = useLocalStorage<Booking[]>("booking_history", MOCK_BOOKINGS);

  if (bookings.length === 0) {
    return (
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        Aucune réservation pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl space-y-2"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
              {b.propertyTitle}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[b.status]}`}
            >
              {STATUS_LABELS[b.status]}
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {b.checkIn} → {b.checkOut}
          </p>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{b.total} €</p>
        </div>
      ))}
    </div>
  );
}
