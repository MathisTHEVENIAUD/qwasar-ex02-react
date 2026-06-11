"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useApp } from "@/context/AppContext";
import type { SearchFilters } from "@/hooks/usePropertySearch";

type SavedSearch = { id: string; name: string; filters: SearchFilters };

type Props = {
  currentFilters: SearchFilters;
  onLoad: (filters: Partial<SearchFilters>) => void;
};

export default function SavedSearches({ currentFilters, onLoad }: Props) {
  const [saved, setSaved] = useLocalStorage<SavedSearch[]>("saved_searches", []);
  const { showToast } = useApp();

  const saveSearch = () => {
    const name = `Recherche ${saved.length + 1}`;
    setSaved([...saved, { id: Date.now().toString(), name, filters: currentFilters }]);
    showToast("Recherche sauvegardée", "success");
  };

  const deleteSearch = (id: string) => {
    setSaved(saved.filter((s) => s.id !== id));
  };

  if (saved.length === 0) {
    return (
      <div className="px-6 py-2 flex justify-end">
        <button
          onClick={saveSearch}
          className="text-xs text-rose-500 hover:text-rose-600 font-medium"
        >
          + Sauvegarder cette recherche
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-2 flex items-center gap-3 flex-wrap">
      <span className="text-xs text-zinc-500 dark:text-zinc-400">Récent :</span>
      {saved.map((s) => (
        <div
          key={s.id}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs"
        >
          <button
            onClick={() => onLoad(s.filters)}
            className="text-zinc-700 dark:text-zinc-300 hover:text-rose-500 transition"
          >
            {s.name}
          </button>
          <button
            onClick={() => deleteSearch(s.id)}
            className="text-zinc-400 hover:text-red-500 transition ml-0.5"
          >
            ×
          </button>
        </div>
      ))}
      <button onClick={saveSearch} className="text-xs text-rose-500 hover:text-rose-600 font-medium">
        + Sauvegarder
      </button>
    </div>
  );
}
