"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              Une erreur est survenue
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
            >
              Réessayer
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
