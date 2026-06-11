"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type Props = { images: string[]; title: string };

export default function PropertyGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-zinc-100 dark:bg-zinc-800">
      <Image
        src={images[current]}
        alt={`${title} – photo ${current + 1}`}
        fill
        className="object-cover"
        priority
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900 transition"
            aria-label="Photo précédente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900 transition"
            aria-label="Photo suivante"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition ${
                  i === current ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
          <span className="absolute top-3 right-3 text-xs font-medium bg-black/40 text-white px-2 py-1 rounded-full">
            {current + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
