# Issue Tracker

React + TypeScript + Redux issue tracker.

## Run

```bash
npm install
npm run serve:api   # Terminal 1 — json-server on :3001
npm run dev         # Terminal 2 — Vite on :5173
```

Open [http://localhost:5173](http://localhost:5173).

## Stack

React 19, TS 5, Redux (vanilla + thunk), React Router 6, MUI 7, Axios, Zod + React Hook Form, SCSS, Vite.

## Structure

```
src/
├── api/          # Axios client + endpoints
├── components/   # Navbar, Layout, Toast
├── hooks/        # useDebounce, useIssuesFilter
├── pages/        # Route pages
├── schemas/      # Zod schemas
├── store/        # Redux slices
├── styles/       # SCSS
└── types/        # TS interfaces
```

## Features

- Issue list with pagination, sorting, search, status/priority/assignee filters
- Issue detail with edit and delete
- Create & edit with Zod + RHF validation
- Loading, empty, error states
- Toast on API errors
- URL-synced filters
- MUI responsive layout
