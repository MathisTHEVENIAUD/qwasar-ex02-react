"use client";

import type { Property } from "@/data/properties";
import PropertyCard from "@/components/property/PropertyCard";

type Props = { properties: Property[] };

export default function Wishlist({ properties }: Props) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-5xl mb-3">❤️</p>
        <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          Aucun favori pour l'instant
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Cliquez sur le cœur d'un logement pour l'ajouter ici
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
