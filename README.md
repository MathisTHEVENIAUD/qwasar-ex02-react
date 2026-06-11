# Airbnb Experience Platform

A Next.js 16 + React 19 marketplace application demonstrating advanced React hook patterns, global state management, and component architecture inspired by Airbnb's platform.

## Tech Stack

- **Next.js 16** — App Router, Server + Client Components
- **React 19** — hooks, context, reducers, memo
- **TypeScript** — strict mode
- **Tailwind CSS 4** — utility-first styling with class-based dark mode

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Property listing grid** — search, filter by type/city/price/guests, sort
- **Saved searches** — persisted via `localStorage`
- **Property detail modal** — image gallery with navigation, amenities, map placeholder, reviews
- **Multi-step booking form** — dates → guests → price summary → payment → confirmation
- **Favorites (wishlist)** — heart toggle on cards, persisted across sessions
- **Dark/light mode toggle** — class-based, persisted
- **User profile** — booking history, wishlist tab

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout — wraps with AppProvider
│   └── page.tsx            # Main page — header, routing, modal
├── components/
│   ├── property/
│   │   ├── PropertyCard.tsx      # Card with favorite toggle
│   │   ├── PropertyGallery.tsx   # Image slider
│   │   ├── PropertyDetails.tsx   # Full detail view (composition root)
│   │   ├── PropertyMap.tsx       # Location placeholder
│   │   └── PropertyReviews.tsx   # Reviews section
│   ├── booking/
│   │   ├── BookingForm.tsx       # Multi-step orchestrator
│   │   ├── DatePicker.tsx        # Custom calendar
│   │   ├── GuestSelector.tsx     # Adults/children/infants counter
│   │   ├── PriceCalculator.tsx   # Dynamic price breakdown
│   │   └── PaymentForm.tsx       # Card payment fields
│   ├── search/
│   │   ├── SearchFilters.tsx     # Filter bar
│   │   ├── SearchResults.tsx     # Memoised results grid
│   │   ├── MapView.tsx           # Map placeholder
│   │   └── SavedSearches.tsx     # localStorage-backed saved searches
│   ├── user/
│   │   ├── UserProfile.tsx       # Profile page with tabs
│   │   ├── BookingHistory.tsx    # Past reservations
│   │   ├── Wishlist.tsx          # Favorited properties
│   │   └── ReviewSystem.tsx      # Guest reviews
│   └── shared/
│       ├── Button.tsx            # Variant-aware button
│       ├── Modal.tsx             # Keyboard-dismissible overlay
│       ├── LoadingSpinner.tsx    # Animated spinner
│       ├── ErrorBoundary.tsx     # Class component error wrapper
│       └── Toast.tsx             # Notification queue
├── context/
│   └── AppContext.tsx      # Global reducer — theme, favorites, toasts, view
├── hooks/
│   ├── useLocalStorage.ts  # Generic localStorage hook
│   ├── useFetch.ts         # Abort-controller fetch hook
│   ├── useBookingForm.ts   # Multi-step booking state machine
│   └── usePropertySearch.ts # Filter + sort with useMemo
└── data/
    └── properties.ts       # Property data and TypeScript types
```

## React Patterns Demonstrated

| Pattern | Where |
|---|---|
| `useState` | Gallery index, tab selection, calendar navigation |
| `useReducer` | Booking form steps, global app state |
| `useContext` | `useApp()` — theme, favorites, toasts |
| `useMemo` | Property filtering, price breakdown, amenity icons |
| `useCallback` | Event handlers in PropertyCard, BookingForm |
| `useEffect` | localStorage sync, keyboard listener (Modal), fetch |
| `useRef` | AbortController in useFetch |
| Custom hooks | useLocalStorage, useFetch, useBookingForm, usePropertySearch |
| `React.memo` | SearchResults |
| Class component | ErrorBoundary (error boundaries require class components) |
