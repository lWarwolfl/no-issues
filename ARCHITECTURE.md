# Architecture

## High-Level Structure

The project follows a **feature-based architecture** with clear layer separation for maintainability and scalability.

## Architecture Layers

### 1. API Layer (`api/`)

Each domain entity (e.g., issues) has its own file with all related HTTP requests. A shared Axios instance (`client.ts`) is configured with `baseURL` sourced from the `VITE_API_BASE_URL` environment variable.

### 2. Store Layer (`store/`)

Global state is managed with **vanilla Redux** (no Toolkit) and **redux-thunk**. Each state module (issues, toast) is a separate slice with manually defined sync actions and async thunks.

**Why vanilla Redux:** The project requirement prohibits Redux Toolkit. redux-thunk handles side effects.

### 3. Page Layer (`pages/`)

Each route maps to an independent page component. Pages use `useAppDispatch` and `useAppSelector` hooks to interact with Redux.

### 4. Shared Components (`components/`)

Reusable UI components: Navbar, Layout, ToastNotification.

### 5. Hooks (`hooks/`)

- **useDebounce** — delays search application to reduce API calls
- **useIssuesFilter** — manages filters via URL search params (single source of truth)

## State Management

- **Redux** — global state (issue list, toast)
- **URL Search Params** — transient state (filters, pagination, sort order)
- **Local state** — component-only state (inputs, dialog visibility)

## Routing

```
/           → Issue list
/new        → Create issue
/:id        → Issue detail
/:id/edit   → Edit issue
*           → 404
```

## Key Decisions

- Every API thunk dispatches a **Toast notification** on failure for consistent UX
- Form validation uses **Zod schemas** with **React Hook Form**
- Filters and pagination are stored in the **URL** so they persist across page reloads
- All imports use the `@/` alias instead of relative paths
