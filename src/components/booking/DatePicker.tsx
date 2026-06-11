"use client";

import { useState, useMemo, useCallback } from "react";

type Props = {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
};

const DAYS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function DatePicker({ checkIn, checkOut, onCheckInChange, onCheckOutChange }: Props) {
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split("T")[0], [today]);

  const [viewDate, setViewDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selecting, setSelecting] = useState<"in" | "out">("in");

  const daysInMonth = useMemo(() => {
    const days: (number | null)[] = [];
    const firstDay = new Date(viewDate.year, viewDate.month, 1);
    const startPad = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < startPad; i++) days.push(null);
    const total = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
    for (let d = 1; d <= total; d++) days.push(d);
    return days;
  }, [viewDate]);

  const prevMonth = useCallback(() => {
    setViewDate((v) => ({
      year: v.month === 0 ? v.year - 1 : v.year,
      month: v.month === 0 ? 11 : v.month - 1,
    }));
  }, []);

  const nextMonth = useCallback(() => {
    setViewDate((v) => ({
      year: v.month === 11 ? v.year + 1 : v.year,
      month: v.month === 11 ? 0 : v.month + 1,
    }));
  }, []);

  const handleDay = useCallback(
    (day: number) => {
      const dateStr = toDateStr(viewDate.year, viewDate.month, day);
      if (dateStr < todayStr) return;

      if (selecting === "in") {
        onCheckInChange(dateStr);
        if (checkOut && dateStr >= checkOut) onCheckOutChange("");
        setSelecting("out");
      } else {
        if (checkIn && dateStr <= checkIn) {
          onCheckInChange(dateStr);
          onCheckOutChange("");
        } else {
          onCheckOutChange(dateStr);
          setSelecting("in");
        }
      }
    },
    [selecting, viewDate, checkIn, checkOut, todayStr, onCheckInChange, onCheckOutChange]
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["in", "out"] as const).map((which) => (
          <div
            key={which}
            onClick={() => setSelecting(which)}
            className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition ${
              selecting === which
                ? "border-rose-500"
                : "border-zinc-200 dark:border-zinc-700"
            } bg-white dark:bg-zinc-800`}
          >
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              {which === "in" ? "Arrivée" : "Départ"}
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {which === "in" ? checkIn || "Ajouter" : checkOut || "Ajouter"}
            </p>
          </div>
        ))}
      </div>

      <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {MONTHS[viewDate.month]} {viewDate.year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-zinc-400 py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {daysInMonth.map((day, i) => {
              if (day === null) return <div key={`pad-${i}`} />;
              const dateStr = toDateStr(viewDate.year, viewDate.month, day);
              const isPast = dateStr < todayStr;
              const isStart = dateStr === checkIn;
              const isEnd = dateStr === checkOut;
              const isInRange =
                checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;

              return (
                <button
                  key={day}
                  onClick={() => handleDay(day)}
                  disabled={isPast}
                  className={`
                    text-sm py-1.5 rounded-full w-full transition
                    ${isPast ? "text-zinc-300 dark:text-zinc-600 cursor-not-allowed" : "cursor-pointer"}
                    ${isStart || isEnd ? "bg-rose-500 text-white" : ""}
                    ${isInRange ? "bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 rounded-none" : ""}
                    ${!isStart && !isEnd && !isInRange && !isPast ? "text-zinc-800 dark:text-zinc-200 hover:bg-rose-100 dark:hover:bg-rose-900/20" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
