type Props = { location?: string };

export default function MapView({ location }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 h-64 flex items-center justify-center">
      <div className="text-center text-zinc-400 dark:text-zinc-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <p className="font-medium text-sm">{location ?? "Carte des logements"}</p>
        <p className="text-xs mt-1">Intégration Maps API requise</p>
      </div>
    </div>
  );
}
