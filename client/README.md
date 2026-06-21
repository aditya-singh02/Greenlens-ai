# GreenLens AI — Frontend

React + Tailwind CSS frontend for GreenLens AI urban sustainability dashboard.

## Setup

```bash
npm install
npm run dev
```

Make sure the backend is running on `http://localhost:5000` or set `VITE_API_URL` in `.env`.

## Pages

- `/` — Landing page with hero, features, and how-it-works
- `/dashboard` — All 85 wards with search, filter, sort, and stress charts
- `/ward/:id` — Ward detail with charts, AI recommendations, and full data
- `/about` — Project methodology, tech stack, and data sources

## Environment Variables

```
VITE_API_URL=http://localhost:5000/api
```
