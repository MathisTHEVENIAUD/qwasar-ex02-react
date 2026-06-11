"use client";

import { useCallback, useMemo } from "react";
import type { SearchFilters as FilterType, SortOption } from "@/hooks/usePropertySearch";
import { properties } from "@/data/properties";

type Props = {
  filters: FilterType;
  onChange: (updates: Partial<FilterType>) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
};

export default function SearchFilters({ filters, onChange, sortBy, onSortChange }: Props) {
  const types = useMemo(
    () => ["", ...Array.from(new Set(properties.map((p) => p.type)))],
    []
  );
  const cities = useMemo(
    () => ["", ...Array.from(new Set(properties.map((p) => p.city)))],
    []
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange({ query: e.target.value }),
    [onChange]
  );

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 space-y-3">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Titre ou ville…"
            value={filters.query}
            onChange={handleSearch}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {types.map((type) => (
            <button
              key={type || "all"}
              onClick={() => onChange({ type })}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                filters.type === type
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {type || "Tous"}
            </button>
          ))}
        </div>

        <select
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          {cities.map((c) => (
            <option key={c || "all"} value={c}>
              {c || "Toutes les villes"}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <option value="rating">Trier : Note</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>

        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Max :</span>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-24 accent-rose-500"
          />
          <span className="w-14">{filters.maxPrice} €/n</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Voy. min :</span>
          <input
            type="number"
            min={1}
            max={10}
            value={filters.guests}
            onChange={(e) => onChange({ guests: Number(e.target.value) })}
            className="w-14 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-400 text-center"
          />
        </div>
      </div>
    </div>
  );
}
