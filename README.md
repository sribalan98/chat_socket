# Chat Socket

Simple full-stack chat app using Socket.IO, Vite + React frontend and an Express + Socket.IO backend.

## Project structure

- `backend/` — Node + TypeScript Socket.IO server (listens on port 3001)
  - `backend/src/server.ts` — server entry (CORS set for `http://localhost:5173`)
  - `backend/src/socket/` — Socket.IO handlers
- `frontend/` — Vite + React client
  - `frontend/src/App.tsx` — chat UI and Socket.IO client

## Requirements

- Node.js v18+ (recommended)

## Setup & Run (development)

1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on port `3001` by default.

2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend uses Vite and runs on `http://localhost:5173` by default.

## Scripts

- Backend: `npm run dev` (uses `nodemon` with `ts-node`) and `npm run build` / `npm start` after build.
- Frontend: `npm run dev`, `npm run build`.

## Notes

- The backend CORS is configured for `http://localhost:5173`. If you change the Vite port, update `backend/src/server.ts` accordingly.
- Socket events used:
  - `join_room` — join a room
  - `send_message` — broadcast a message to a room
  - `receive_message` — received on clients
  - `typing` — typing indicator

## Files of interest

- `backend/src/server.ts`
- `backend/src/socket/chat.handlers.ts`
- `frontend/src/App.tsx`

## Want me to…

- Start the dev servers here? (I can run them if you want.)
- Add minimal CSS for the chat UI? (I can add `frontend/src/App.css` tweaks.)
