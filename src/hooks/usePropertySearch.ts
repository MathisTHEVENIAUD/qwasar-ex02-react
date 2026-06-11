"use client";

import { useMemo, useCallback, useState } from "react";
import type { Property } from "@/data/properties";

export type SearchFilters = {
  query: string;
  minPrice: number;
  maxPrice: number;
  guests: number;
  city: string;
  type: string;
};

const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  minPrice: 0,
  maxPrice: 1000,
  guests: 1,
  city: "",
  type: "",
};

export type SortOption = "price_asc" | "price_desc" | "rating";

export function usePropertySearch(properties: Property[]) {
  const [filters, setFiltersState] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const setFilters = useCallback((updates: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const filteredProperties = useMemo(() => {
    const result = properties.filter((p) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q))
          return false;
      }
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (p.maxGuests < filters.guests) return false;
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.type && p.type !== filters.type) return false;
      return true;
    });

    return result.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [properties, filters, sortBy]);

  return { filters, setFilters, resetFilters, filteredProperties, sortBy, setSortBy };
}
