# Issue Tracker

A simple Issue Tracker built with React, TypeScript, and Redux.

## Getting Started

```bash
npm install

# Terminal 1 — start the mock API
npm run serve:api

# Terminal 2 — start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **React 19** + **TypeScript 5**
- **Redux** (vanilla, no Toolkit) + redux-thunk
- **React Router** v6
- **Material UI** v7
- **Axios** for HTTP requests
- **Zod** + **React Hook Form** for form validation
- **SCSS** for custom styles
- **Vite** for building
- **json-server** for the mock API

## Project Structure

```
src/
├── api/          # API communication layer (Axios client)
├── components/   # Shared components (Navbar, Layout, Toast)
├── hooks/        # Custom hooks (useDebounce, useIssuesFilter)
├── pages/        # Route pages
├── store/        # Redux state management
├── styles/       # SCSS styles
└── types/        # TypeScript type definitions
```

## Features

- **Issue list** with pagination, sorting, search, and multi-field filters
- **Issue detail** with edit and delete actions
- **Create & edit** with full form validation
- **Loading, empty, and error** state handling
- **Toast notifications** for all API events
- **URL-synced filters** that survive page refresh
- **Responsive layout** with Material UI
