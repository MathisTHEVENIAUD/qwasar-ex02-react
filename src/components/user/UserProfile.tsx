"use client";

import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { properties } from "@/data/properties";
import BookingHistory from "./BookingHistory";
import Wishlist from "./Wishlist";

type Tab = "bookings" | "wishlist";

export default function UserProfile() {
  const { favorites } = useApp();
  const [tab, setTab] = useState<Tab>("bookings");

  const favoriteProperties = useMemo(
    () => properties.filter((p) => favorites.includes(p.id)),
    [favorites]
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-2xl font-bold text-rose-500">
          M
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Mathis</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Membre depuis 2024 · {favoriteProperties.length} favori
            {favoriteProperties.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-700">
        {(["bookings", "wishlist"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium border-b-2 transition ${
              tab === t
                ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-zinc-100"
                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {t === "bookings" ? "Mes réservations" : "Liste de souhaits"}
          </button>
        ))}
      </div>

      {tab === "bookings" && <BookingHistory />}
      {tab === "wishlist" && <Wishlist properties={favoriteProperties} />}
    </div>
  );
}
