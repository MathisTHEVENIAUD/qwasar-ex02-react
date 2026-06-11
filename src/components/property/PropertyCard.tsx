"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import type { Property } from "@/data/properties";
import { useApp } from "@/context/AppContext";

type Props = { property: Property };

export default function PropertyCard({ property }: Props) {
  const { favorites, toggleFavorite, selectProperty, showToast } = useApp();

  const isFavorite = useMemo(
    () => favorites.includes(property.id),
    [favorites, property.id]
  );

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(property.id);
      showToast(
        isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
        isFavorite ? "info" : "success"
      );
    },
    [isFavorite, property.id, toggleFavorite, showToast]
  );

  const displayRating = useMemo(
    () => Math.round(property.rating * 10) / 10,
    [property.rating]
  );

  return (
    <div
      className="group cursor-pointer"
      onClick={() => selectProperty(property.id)}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition hover:scale-110"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition ${
              isFavorite
                ? "fill-rose-500 stroke-rose-500"
                : "fill-none stroke-zinc-700 dark:stroke-zinc-300"
            }`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-zinc-900/90 text-xs font-semibold px-2 py-1 rounded-full text-zinc-700 dark:text-zinc-300">
          {property.type}
        </div>
      </div>

      <div className="mt-3 space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
            {property.title}
          </h3>
          <span className="flex items-center gap-0.5 text-sm whitespace-nowrap flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 fill-zinc-900 dark:fill-zinc-100"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-zinc-700 dark:text-zinc-300">{displayRating}</span>
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{property.location}</p>
        <p className="text-sm text-zinc-900 dark:text-zinc-100">
          <span className="font-semibold">{property.price} €</span>
          <span className="text-zinc-500 dark:text-zinc-400"> / nuit</span>
        </p>
      </div>
    </div>
  );
}
