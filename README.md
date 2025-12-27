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

---

This project is a clean, minimal sample intended for viewing and learning. It demonstrates a tidy directory layout, sensible defaults for colors and fonts, and a small, focused code surface so you can quickly understand how Socket.IO works on both server and client sides.

**Design / Visuals**

- Color & fonts: the frontend includes simple, readable defaults. Swap CSS variables or your font stack in `frontend/src/index.css` or `frontend/src/App.css` to match your brand.
- Clean UI: the sample chat UI keeps elements minimal (join screen, message list, input row) for clarity.

**Project workflow**

| Step               | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| Plan               | Define chat features and simple UI layout                   |
| Implement backend  | Create Socket.IO server handlers in `backend/src/socket`    |
| Implement frontend | Build chat UI and client socket in `frontend/src/App.tsx`   |
| Test locally       | Run backend + frontend and verify messaging between clients |
| Iterate            | Tweak styling, add persistence or auth as needed            |

**Socket implementation**

- Server-side: sockets are implemented in `backend/src/socket/chat.handlers.ts` and wired in `backend/src/server.ts`.
- Client-side: the socket client is in `frontend/src/App.tsx` and connects to `http://localhost:3001` by default.
