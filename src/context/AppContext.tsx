"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

export type ToastItem = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type AppState = {
  theme: Theme;
  favorites: string[];
  selectedPropertyId: string | null;
  toasts: ToastItem[];
  activeView: "listing" | "wishlist" | "profile";
};

type AppAction =
  | { type: "SET_THEME"; theme: Theme }
  | { type: "SET_FAVORITES"; favorites: string[] }
  | { type: "TOGGLE_FAVORITE"; id: string }
  | { type: "SELECT_PROPERTY"; id: string | null }
  | { type: "ADD_TOAST"; toast: ToastItem }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "SET_VIEW"; view: AppState["activeView"] };

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "SET_FAVORITES":
      return { ...state, favorites: action.favorites };
    case "TOGGLE_FAVORITE": {
      const has = state.favorites.includes(action.id);
      return {
        ...state,
        favorites: has
          ? state.favorites.filter((f) => f !== action.id)
          : [...state.favorites, action.id],
      };
    }
    case "SELECT_PROPERTY":
      return { ...state, selectedPropertyId: action.id };
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case "SET_VIEW":
      return { ...state, activeView: action.view, selectedPropertyId: null };
    default:
      return state;
  }
}

type AppContextValue = AppState & {
  toggleTheme: () => void;
  toggleFavorite: (id: string) => void;
  selectProperty: (id: string | null) => void;
  showToast: (message: string, type?: ToastItem["type"]) => void;
  setView: (view: AppState["activeView"]) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    theme: "light",
    favorites: [],
    selectedPropertyId: null,
    toasts: [],
    activeView: "listing",
  });

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) ?? "light";
    const savedFavs = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
    dispatch({ type: "SET_THEME", theme: savedTheme });
    dispatch({ type: "SET_FAVORITES", favorites: savedFavs });
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  const toggleTheme = useCallback(
    () =>
      dispatch({ type: "SET_THEME", theme: state.theme === "light" ? "dark" : "light" }),
    [state.theme]
  );

  const toggleFavorite = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_FAVORITE", id }),
    []
  );

  const selectProperty = useCallback(
    (id: string | null) => dispatch({ type: "SELECT_PROPERTY", id }),
    []
  );

  const showToast = useCallback((message: string, type: ToastItem["type"] = "info") => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "ADD_TOAST", toast: { id, message, type } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), 3500);
  }, []);

  const setView = useCallback(
    (view: AppState["activeView"]) => dispatch({ type: "SET_VIEW", view }),
    []
  );

  return (
    <AppContext.Provider
      value={{ ...state, toggleTheme, toggleFavorite, selectProperty, showToast, setView }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
