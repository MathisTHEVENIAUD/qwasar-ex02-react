"use client";

import { useApp } from "@/context/AppContext";

const typeStyles = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900",
};

export default function Toast() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${typeStyles[t.type]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
