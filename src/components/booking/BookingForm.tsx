"use client";

import { useCallback } from "react";
import { useBookingForm, type BookingFormData } from "@/hooks/useBookingForm";
import type { Property } from "@/data/properties";
import { useApp } from "@/context/AppContext";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import PriceCalculator from "./PriceCalculator";
import PaymentForm from "./PaymentForm";
import Button from "@/components/shared/Button";

type Props = { property: Property };

const STEP_LABELS = ["Dates", "Voyageurs", "Récapitulatif", "Paiement"];

export default function BookingForm({ property }: Props) {
  const { step, data, errors, stepIndex, submit, setField, nextStep, prevStep, reset } =
    useBookingForm();
  const { showToast } = useApp();

  const totalGuests = data.adults + data.children;

  const handleNext = useCallback(() => {
    if (step === "dates") {
      const errs: Partial<Record<keyof BookingFormData, string>> = {};
      if (!data.checkIn) errs.checkIn = "Choisissez une date d'arrivée";
      if (!data.checkOut) errs.checkOut = "Choisissez une date de départ";
      nextStep(errs);
    } else if (step === "payment") {
      const errs: Partial<Record<keyof BookingFormData, string>> = {};
      if (data.cardNumber.replace(/\s/g, "").length < 16)
        errs.cardNumber = "Numéro de carte invalide";
      if (!data.cardName.trim()) errs.cardName = "Nom requis";
      if (data.cardExpiry.length < 5) errs.cardExpiry = "Date invalide (MM/AA)";
      if (data.cardCvc.length < 3) errs.cardCvc = "CVC invalide";
      if (Object.keys(errs).length > 0) {
        nextStep(errs);
        return;
      }
      submit();
      showToast("Réservation confirmée ! 🎉", "success");
    } else {
      nextStep();
    }
  }, [step, data, nextStep, submit, showToast]);

  if (step === "confirmation") {
    return (
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 text-center space-y-4">
        <div className="text-5xl">🎉</div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Réservation confirmée !
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Vous séjournez chez {property.hostName} du {data.checkIn} au {data.checkOut}.
        </p>
        <Button onClick={reset} variant="secondary" className="w-full">
          Nouvelle réservation
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-white dark:bg-zinc-800 p-5 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {property.price} €
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400"> / nuit</span>
          </p>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">★ {property.rating}</span>
        </div>

        <div>
          <div className="flex gap-0.5 mb-1">
            {STEP_LABELS.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i <= stepIndex ? "bg-rose-500" : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Étape {stepIndex + 1}/{STEP_LABELS.length} — {STEP_LABELS[stepIndex]}
          </p>
        </div>

        {step === "dates" && (
          <DatePicker
            checkIn={data.checkIn}
            checkOut={data.checkOut}
            onCheckInChange={(v) => setField("checkIn", v)}
            onCheckOutChange={(v) => setField("checkOut", v)}
          />
        )}
        {step === "guests" && (
          <GuestSelector
            adults={data.adults}
            children={data.children}
            infants={data.infants}
            maxGuests={property.maxGuests}
            onChange={(field, value) => setField(field, value)}
          />
        )}
        {step === "review" && (
          <div className="space-y-4">
            <PriceCalculator
              pricePerNight={property.price}
              checkIn={data.checkIn}
              checkOut={data.checkOut}
              guests={totalGuests}
            />
            <div>
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Demandes spéciales (optionnel)
              </label>
              <textarea
                value={data.specialRequests}
                onChange={(e) => setField("specialRequests", e.target.value)}
                placeholder="Arrivée tardive, allergie..."
                rows={2}
                className="mt-1 w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />
            </div>
          </div>
        )}
        {step === "payment" && (
          <PaymentForm
            data={data}
            errors={errors}
            onChange={(f, v) => setField(f, v)}
          />
        )}

        {errors.checkIn && (
          <p className="text-xs text-red-500">{errors.checkIn}</p>
        )}
        {errors.checkOut && (
          <p className="text-xs text-red-500">{errors.checkOut}</p>
        )}

        <div className="flex gap-2">
          {stepIndex > 0 && (
            <Button variant="secondary" onClick={prevStep} className="flex-1">
              Retour
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {step === "payment" ? "Confirmer et payer" : "Continuer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
