"use client";

import { useReducer, useCallback } from "react";

export type BookingStep = "dates" | "guests" | "review" | "payment" | "confirmation";

export type BookingFormData = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  specialRequests: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
};

type BookingState = {
  step: BookingStep;
  data: BookingFormData;
  errors: Partial<Record<keyof BookingFormData, string>>;
  submitted: boolean;
};

type BookingAction =
  | { type: "SET_FIELD"; field: keyof BookingFormData; value: string | number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof BookingFormData, string>> }
  | { type: "SUBMIT" }
  | { type: "RESET" };

const STEPS: BookingStep[] = ["dates", "guests", "review", "payment", "confirmation"];

const initialData: BookingFormData = {
  checkIn: "",
  checkOut: "",
  adults: 1,
  children: 0,
  infants: 0,
  specialRequests: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "NEXT_STEP": {
      const idx = STEPS.indexOf(state.step);
      return { ...state, step: STEPS[Math.min(idx + 1, STEPS.length - 1)], errors: {} };
    }
    case "PREV_STEP": {
      const idx = STEPS.indexOf(state.step);
      return { ...state, step: STEPS[Math.max(idx - 1, 0)], errors: {} };
    }
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SUBMIT":
      return { ...state, step: "confirmation", submitted: true };
    case "RESET":
      return { step: "dates", data: initialData, errors: {}, submitted: false };
    default:
      return state;
  }
}

export function useBookingForm() {
  const [state, dispatch] = useReducer(bookingReducer, {
    step: "dates",
    data: initialData,
    errors: {},
    submitted: false,
  });

  const setField = useCallback(
    (field: keyof BookingFormData, value: string | number) => {
      dispatch({ type: "SET_FIELD", field, value });
    },
    []
  );

  const nextStep = useCallback(
    (validationErrors?: Partial<Record<keyof BookingFormData, string>>) => {
      if (validationErrors && Object.keys(validationErrors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors: validationErrors });
        return;
      }
      dispatch({ type: "NEXT_STEP" });
    },
    []
  );

  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const submit = useCallback(() => dispatch({ type: "SUBMIT" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const stepIndex = STEPS.indexOf(state.step);
  const totalSteps = STEPS.length - 1;

  return { ...state, stepIndex, totalSteps, setField, nextStep, prevStep, submit, reset };
}
