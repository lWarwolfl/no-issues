# Architecture

## Layers

### `api/`
One file per entity with HTTP calls. Shared Axios instance reads `VITE_API_BASE_URL`.

### `store/`
Vanilla Redux + redux-thunk. Each module (issues, toast) is a slice with manual actions and async thunks. No Toolkit required.

Why vanilla: project spec says so.

### `pages/`
One component per route. Connects to Redux via `useAppDispatch` / `useAppSelector`.

### `components/`
Shared UI: Navbar, Layout, Toast.

### `schemas/`
Zod schemas + inferred types. Split from `types/` so validation stays decoupled.

### `hooks/`
- `useDebounce` — delays search to reduce API calls
- `useIssuesFilter` — reads/writes filters from URL search params

## State

- **Redux** — global (issues list, toast)
- **URL** — filters, page, sort (persists on refresh)
- **Local state** — inputs, dialogs

## Routes

```
/           → list
/new        → create
/:id        → detail
/:id/edit   → edit
*           → 404
```

## Decisions

- API errors dispatch toast notifications
- Form validation via Zod + RHF (schemas/ folder, separate from types/)
- Filters in URL so they survive F5
- `@/` imports, no relative paths
