"use client";

import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { usePropertySearch } from "@/hooks/usePropertySearch";
import { properties } from "@/data/properties";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import SavedSearches from "@/components/search/SavedSearches";
import PropertyDetails from "@/components/property/PropertyDetails";
import UserProfile from "@/components/user/UserProfile";
import Modal from "@/components/shared/Modal";
import Toast from "@/components/shared/Toast";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

export default function Home() {
  const {
    selectedPropertyId,
    selectProperty,
    activeView,
    setView,
    toggleTheme,
    theme,
    favorites,
  } = useApp();

  const { filters, setFilters, filteredProperties, sortBy, setSortBy } =
    usePropertySearch(properties);

  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId) ?? null,
    [selectedPropertyId]
  );

  const nav: { id: "listing" | "wishlist" | "profile"; label: string }[] = [
    { id: "listing", label: "Explorer" },
    { id: "wishlist", label: `Favoris${favorites.length > 0 ? ` (${favorites.length})` : ""}` },
    { id: "profile", label: "Profil" },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 fill-rose-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 1C7.716 1 1 7.716 1 16s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 18.5c-5 0-9.418-2.557-12-6.435C4.023 14.83 9.622 12.5 16 12.5c6.378 0 11.977 2.33 12 4.565C25.418 20.943 21 23.5 16 23.5z" />
            </svg>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              airbnb
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {nav.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeView === id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex-shrink-0"
            aria-label="Changer le thème"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-zinc-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </header>

        {/* Explorer view */}
        {activeView === "listing" && (
          <>
            <SearchFilters
              filters={filters}
              onChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <SavedSearches currentFilters={filters} onLoad={setFilters} />
            <SearchResults properties={filteredProperties} />
          </>
        )}

        {/* Favoris view */}
        {activeView === "wishlist" && (
          <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              ❤️ Mes logements favoris
            </h1>
            <SearchResults
              properties={properties.filter((p) => favorites.includes(p.id))}
            />
          </div>
        )}

        {/* Profil view */}
        {activeView === "profile" && <UserProfile />}

        {/* Property detail modal */}
        {selectedProperty && (
          <Modal onClose={() => selectProperty(null)}>
            <PropertyDetails property={selectedProperty} />
          </Modal>
        )}

        <Toast />
      </div>
    </ErrorBoundary>
  );
}
