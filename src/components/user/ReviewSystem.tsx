"use client";

import { useState } from "react";
import type { Review } from "@/data/properties";

type Props = { reviews: Review[] };

export default function ReviewSystem({ reviews }: Props) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, 2);

  return (
    <div className="space-y-4">
      {visible.map((r) => (
        <div key={r.id} className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-sm font-bold text-rose-500 flex-shrink-0">
            {r.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {r.author}
              </span>
              <span className="text-xs text-zinc-400">{r.date}</span>
            </div>
            <div className="flex mt-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3 w-3 ${
                    i < r.rating
                      ? "fill-zinc-900 dark:fill-zinc-100"
                      : "fill-zinc-200 dark:fill-zinc-700"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{r.comment}</p>
          </div>
        </div>
      ))}
      {reviews.length > 2 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 underline underline-offset-2 hover:text-rose-500 transition"
        >
          {expanded ? "Voir moins" : `Voir les ${reviews.length} avis`}
        </button>
      )}
    </div>
  );
}
