"use client";

import { memo } from "react";
import type { Property } from "@/data/properties";
import PropertyCard from "@/components/property/PropertyCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

type Props = { properties: Property[]; loading?: boolean };

const SearchResults = memo(function SearchResults({ properties, loading = false }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <p className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
          Aucun logement trouvé
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Essayez d'ajuster vos filtres
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 px-6 py-3">
        {properties.length} logement{properties.length > 1 ? "s" : ""} trouvé
        {properties.length > 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-10">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
});

export default SearchResults;
