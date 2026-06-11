# Airbnb Experience Platform — Learning Insights

## React Hook Architecture

### useState vs useReducer

Working on the booking flow made the distinction concrete. `useState` works fine for isolated, independent values (gallery index, tab selection). When state transitions become interdependent — like a multi-step form where moving forward clears errors, and submitting locks the step — `useReducer` is the right tool. The `useBookingForm` hook centralises all booking state into a single reducer, making every transition explicit and testable.

### useMemo and useCallback

The `usePropertySearch` hook filters and sorts a list of properties on every render. Without `useMemo`, every keystroke in the search bar would re-run the filter even when unrelated state changed. Wrapping the result in `useMemo([properties, filters, sortBy])` means the expensive computation only runs when something it depends on actually changes.

`useCallback` was most valuable in `PropertyCard`: the `handleFavorite` handler closes over `isFavorite`, `property.id`, and two context functions. Without memoisation, every parent re-render would produce a new function reference, defeating any downstream `React.memo` optimisation.

### Custom Hooks

The four custom hooks follow a simple rule: **if the same stateful logic would be duplicated across two components, extract it**.

- `useLocalStorage` — generic key/value persistence. Used in `SavedSearches` and `BookingHistory` without either component knowing about `localStorage` directly.
- `useFetch` — abort-controller-aware data fetching. The cleanup function in `useEffect` cancels the in-flight request when the URL changes or the component unmounts, preventing stale state.
- `useBookingForm` — multi-step form state machine. Validation errors are scoped per field and cleared individually when the user edits that field.
- `usePropertySearch` — combines filter state with memoised filtering and sorting. The component that owns the filters (`SearchFilters`) is decoupled from the component that displays results (`SearchResults`).

## Global State with React Context

The `AppContext` manages state that genuinely needs to be shared across the tree: theme, favorites, selected property, toast queue, and active view. Each belongs here because multiple unrelated components read or write it.

The reducer pattern inside the context keeps transitions predictable. Adding a new action type (e.g., `SET_CURRENCY`) means updating the reducer and the context value type — nothing else changes.

### What stays local

Not everything belongs in context. The `SearchFilters` state lives in `usePropertySearch` because only the search section cares about it. The calendar navigation (`viewDate`) lives inside `DatePicker` because nothing outside it ever reads it. Keeping this state local avoids unnecessary context re-renders across the whole tree.

## Performance Patterns

### React.memo

`SearchResults` is wrapped in `memo`. It receives an array of properties derived from `usePropertySearch`'s `useMemo`, so the array reference is stable as long as filters don't change. Memoising the component means changing the theme or selecting a property won't re-render the entire results grid.

### Context re-render risk

One known trade-off: the `AppContext` value object is rebuilt on every `useReducer` dispatch. Any component that calls `useApp()` re-renders even if it only uses `theme` and the dispatch was for `TOGGLE_FAVORITE`. For this project's scale this is acceptable. At Airbnb's scale, the context would be split into smaller providers (e.g., `ThemeContext`, `FavoritesContext`) to narrow re-render scope.

## Component Architecture

The folder structure follows the domain model: `property/`, `booking/`, `search/`, `user/`, `shared/`. Each folder is independently navigable — a developer working on the booking flow doesn't need to understand the search components.

`PropertyDetails` is the composition root for a single property view. It assembles `PropertyGallery`, `PropertyMap`, `PropertyReviews`, and `BookingForm` without any of those components knowing about each other.

## What I Would Do Differently at Scale

1. **Split context by domain** to reduce unnecessary re-renders.
2. **Add React Query or SWR** for server data fetching — `useFetch` is fine for a demo but lacks caching, deduplication, and background refetch.
3. **Virtualise the property grid** with `react-virtual` once the listing count exceeds a few hundred.
4. **Add unit tests** for the custom hooks using `@testing-library/react`'s `renderHook`. The reducer in `useBookingForm` is pure and trivially testable.
5. **Lazy-load the booking modal** with `React.lazy` + `Suspense` since it's not needed until the user clicks a property.
