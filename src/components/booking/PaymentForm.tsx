"use client";

import type { BookingFormData } from "@/hooks/useBookingForm";

type Props = {
  data: BookingFormData;
  errors: Partial<Record<keyof BookingFormData, string>>;
  onChange: (field: keyof BookingFormData, value: string) => void;
};

const inputClass =
  "mt-1 w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-400";

export default function PaymentForm({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Paiement sécurisé · Vos données sont protégées
      </p>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Numéro de carte
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={data.cardNumber}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
              onChange("cardNumber", raw.replace(/(.{4})/g, "$1 ").trim());
            }}
            className={inputClass}
          />
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Nom sur la carte
          </label>
          <input
            type="text"
            placeholder="Jean Dupont"
            value={data.cardName}
            onChange={(e) => onChange("cardName", e.target.value)}
            className={inputClass}
          />
          {errors.cardName && (
            <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Expiration
            </label>
            <input
              type="text"
              placeholder="MM/AA"
              maxLength={5}
              value={data.cardExpiry}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                onChange("cardExpiry", v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v);
              }}
              className={inputClass}
            />
            {errors.cardExpiry && (
              <p className="text-xs text-red-500 mt-1">{errors.cardExpiry}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              maxLength={4}
              value={data.cardCvc}
              onChange={(e) => onChange("cardCvc", e.target.value.replace(/\D/g, ""))}
              className={inputClass}
            />
            {errors.cardCvc && (
              <p className="text-xs text-red-500 mt-1">{errors.cardCvc}</p>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-zinc-400 flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Paiement sécurisé par cryptage SSL 256 bits
      </p>
    </div>
  );
}
