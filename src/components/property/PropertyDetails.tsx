"use client";

import { useMemo } from "react";
import type { Property } from "@/data/properties";
import PropertyGallery from "./PropertyGallery";
import PropertyReviews from "./PropertyReviews";
import PropertyMap from "./PropertyMap";
import BookingForm from "@/components/booking/BookingForm";

type Props = { property: Property };

const AMENITY_ICONS: Record<string, string> = {
  WiFi: "📶",
  Climatisation: "❄️",
  "Cuisine équipée": "🍳",
  "Lave-linge": "🫧",
  TV: "📺",
  Parking: "🅿️",
  Sauna: "🧖",
  "Baignoire balnéo": "🛁",
  Cheminée: "🔥",
  Balcon: "🌅",
  Nespresso: "☕",
  "Lave-vaisselle": "🍽️",
  "Vue mer": "🌊",
  "Mini-bar": "🍸",
  "Room service": "🛎️",
};

export default function PropertyDetails({ property }: Props) {
  const amenities = useMemo(
    () =>
      property.amenities.map((name) => ({
        name,
        icon: AMENITY_ICONS[name] ?? "✓",
      })),
    [property.amenities]
  );

  return (
    <div className="space-y-6">
      <PropertyGallery images={property.images} title={property.title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {property.title}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              {property.location} · {property.bedrooms} chambre
              {property.bedrooms > 1 ? "s" : ""} · {property.maxGuests} voyageurs max
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                ★ {property.rating}
              </span>
              <span className="text-sm text-zinc-400">({property.reviewCount} avis)</span>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
              Hôte : {property.hostName}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Ce que propose ce logement
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <PropertyMap location={property.location} />
          <PropertyReviews
            reviews={property.reviews}
            rating={property.rating}
            reviewCount={property.reviewCount}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <BookingForm property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
