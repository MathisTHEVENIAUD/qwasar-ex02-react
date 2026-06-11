type Props = { location: string };

export default function PropertyMap({ location }: Props) {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        Où vous serez
      </h2>
      <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-[16/7] flex items-center justify-center">
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-sm font-medium">{location}</p>
          <p className="text-xs mt-1 text-zinc-300 dark:text-zinc-600">
            Carte interactive non disponible
          </p>
        </div>
      </div>
    </div>
  );
}
