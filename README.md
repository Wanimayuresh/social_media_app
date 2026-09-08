# Problem-Solving Social Platform

A full-stack social platform where people post **real problems**, the community proposes **solutions**, everyone **discusses**, and the problem owner **accepts** the solution that worked.

This is a personal engineering project built to go deep rather than wide. Everything — authentication, authorization, session management, relational modelling, transactions — is written from scratch in TypeScript, with no Firebase, no Auth0, no ORM. The goal is to be able to open any file in this repo and explain *why* it is written that way.

**Core product loop**

```text
User has a problem → Creates a problem → Community discovers it → Users post solutions
→ Discussion + voting → Owner accepts a solution → Problem becomes SOLVED
```

---

## Progress

Built against a self-authored 12-week MVP roadmap. Status is honest — shipped means the code is in `main`-track branches and working end to end.

| Week | Focus | Status | What exists today |
| --- | --- | --- | --- |
| 1 | Foundation + Auth | ✅ Shipped | JWT access/refresh, refresh-token rotation, hashed refresh sessions, HttpOnly cookies, logout / logout-all, change password, CORS, Zod-validated env. Frontend: signup, login, silent refresh, protected routes. |
| 2 | Problem domain | ✅ Shipped | `problems` entity, full CRUD, Zod request validation, ownership authorization on update/delete. |
| 3 | Problems frontend | ⬜ Not started | Next up. Feed, detail page, create/edit/delete, cached queries. |
| 4 | Solutions | ✅ Shipped | Solutions CRUD scoped to a problem, ownership rules, accept-solution flow wrapped in a **DB transaction** that also flips the problem to `SOLVED`. |
| 5 | Comments + Voting | 🚧 In progress | Comments on problems *and* solutions, one level of replies, ownership checks, soft delete (`status = REMOVED`). Voting not started. |
| 6 | Profiles + Reputation | ⬜ Not started | |
| 7 | Search + Topics | ⬜ Not started | |
| 8 | Feed + ranking | ⬜ Not started | |
| 9 | Notifications | ⬜ Not started | |
| 10 | Media + AWS S3 | ⬜ Not started | |
| 11 | Production hardening | ⬜ Not started | |
| 12 | Deployment + system design | ⬜ Not started | |

**Roughly 4 of 12 weeks complete.** The backend is ahead of the frontend by design — the domain and authorization model are being settled first so the UI is built against a stable API.

---

## Tech Stack

**Backend** — Node.js · Express 5 · TypeScript · PostgreSQL (`pg`, raw SQL) · JWT · bcrypt · Zod · Pino

**Frontend** — React 19 · TypeScript · Vite · React Router · Redux Toolkit (auth state) · TanStack Query (server state) · React Hook Form + Zod · Tailwind CSS v4 · shadcn/Base UI

**Tooling** — Git/GitHub · ESLint · Prettier · Postman · tsx

Deliberate omissions: no ORM (raw SQL, so query behaviour and indexes stay visible), no auth provider (the whole point), no Redis/Docker/queues *yet* — each of those gets added when a real requirement appears, not to pad the stack.

---

## Architecture

Layered backend with one direction of dependency:

```text
Client → Routes → Middleware (auth / validate) → Controllers → Services → Repositories → PostgreSQL
```

* **Routes** — wiring and middleware composition only.
* **Controllers** — HTTP in, HTTP out. No business rules.
* **Services** — business rules and authorization decisions (ownership, state transitions). Transactions live here.
* **Repositories** — SQL only. Accept an optional `PoolClient` so a repository call can join an ongoing transaction.

```text
backend/src
├── config/          env (Zod-validated), pg pool, pino logger
├── middlewares/     auth, role authorize, zod validate, error + 404 handlers
├── modules/
│   ├── auth/        controllers, services (token, password, refresh-hash), repository
│   ├── user/        profile read/update
│   ├── problems/    controller, service, repository, zod schemas
│   ├── solutions/   controller, service, repository
│   └── comment/     controller, service, repository
├── shared/          AppError, asyncHandler, response helpers, withTransaction, constants
└── types/           express augmentation, roles
```

```text
frontend/src
├── app/             providers, router, auth guard, api client, redux store
├── features/auth/   pages, queries, api layer, slice, zod schemas
└── components/ui/   design-system primitives
```

---

## Engineering Highlights

**Refresh-token rotation with hashed sessions.** Refresh tokens are stored hashed, one row per session, and rotated on every use — the old session row is deleted as the new one is written. Changing a password revokes every session.

```text
Login                          Refresh
  ↓                              ↓
verify credentials             verify JWT
  ↓                              ↓
issue access + refresh         validate stored session
  ↓                              ↓
hash refresh token             delete previous session
  ↓                              ↓
store session row              issue + store new pair
```

**Transactional accept-solution.** Accepting a solution must mark the solution accepted *and* the problem solved, or neither. `withTransaction()` hands a `PoolClient` down to both repositories so the two writes commit or roll back together — [solution.service.ts](backend/src/modules/solutions/service/solution.service.ts).

**Authorization as a business rule, not a route guard.** `authMiddleware` only answers *who are you*. Whether you may edit a solution, delete a comment, or accept an answer is decided in the service layer against ownership and current entity state (`ACTIVE` / `REMOVED` / `SOLVED`).

**Silent token refresh on the client.** Access tokens live in memory (Redux), never `localStorage`; the refresh token is an HttpOnly cookie. A single `apiClient` wrapper intercepts `401`, refreshes once, and replays the original request — [apiClient.ts](frontend/src/app/service/apiClient.ts).

**Soft deletes where history matters.** Comments and solutions flip to `REMOVED` rather than disappearing, so reply threads and accepted-answer history stay coherent.

---

## API

Base path: `/api/v1` · 🔒 = requires access token

### Auth
| Method | Endpoint | |
| --- | --- | --- |
| POST | `/auth/sign-up` | Register |
| POST | `/auth/login` | Issue access token + refresh cookie |
| POST | `/auth/refresh` | Rotate refresh token |
| POST | `/auth/logout` | Revoke current session |
| POST | `/auth/logout-all` 🔒 | Revoke every session |
| PATCH | `/auth/change-password` 🔒 | Change password + revoke sessions |

### User
| Method | Endpoint | |
| --- | --- | --- |
| GET | `/me` 🔒 | Current user |
| PATCH | `/me` 🔒 | Update profile |

### Problems
| Method | Endpoint | |
| --- | --- | --- |
| POST | `/problems` 🔒 | Create |
| GET | `/problems` | List |
| GET | `/problems/:id` | Detail |
| PATCH | `/problems/:id` 🔒 | Update (owner) |
| DELETE | `/problems/:id` 🔒 | Delete (owner) |

### Solutions
| Method | Endpoint | |
| --- | --- | --- |
| POST | `/problems/:problemId/solutions` 🔒 | Propose a solution |
| GET | `/problems/:problemId/solutions` | List for a problem |
| GET | `/solutions/:solutionId` | Detail |
| PATCH | `/solutions/:solutionId` 🔒 | Update (owner) |
| DELETE | `/solutions/:solutionId` 🔒 | Soft delete (owner) |
| PATCH | `/solutions/:solutionId/accept` 🔒 | Accept (problem owner) — transactional |

### Comments
| Method | Endpoint | |
| --- | --- | --- |
| POST | `/problems/:problemId/comments` 🔒 | Comment on a problem |
| POST | `/solutions/:solutionId/comments` 🔒 | Comment on a solution |
| POST | `/comments/:commentId/replies` 🔒 | Reply |
| GET | `/problems/:problemId/comments` | Top-level comments |
| GET | `/solutions/:solutionId/comments` | Top-level comments |
| GET | `/comments/:commentId/replies` | Replies |
| PATCH | `/comments/:commentId` 🔒 | Edit (owner) |
| DELETE | `/comments/:commentId` 🔒 | Soft delete (owner) |

`GET /health` returns service status.

---

## Data Model

```text
users
  └── problems        (status: OPEN | SOLVED)
        ├── solutions (status: ACTIVE | ACCEPTED | REMOVED)
        │     └── comments
        └── comments  (status: ACTIVE | REMOVED)
              └── comments (self-referencing via parent_comment_id)
```

A comment belongs to exactly one of a problem or a solution; replies inherit their parent's context.

---

## Running Locally

**Prerequisites:** Node.js 20+, PostgreSQL 14+

```bash
# Backend
cd backend
npm install
cp .env.example .env      # then fill in DB_* and JWT_* values
npm run dev               # http://localhost:4000

# Frontend
cd frontend
npm install
npm run dev               # http://localhost:5173
```

Required environment variables (validated at boot by [env.ts](backend/src/config/env.ts) — the process exits on a bad config):

```env
NODE_ENV=development
PORT=4000
LOG_LEVEL=info
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
```

Backend scripts: `dev` · `build` · `start` · `lint` · `format` · `typecheck`

---

## Known Gaps

Tracked deliberately rather than hidden:

* **No migration files checked in** — the schema currently lives outside the repo. Adding versioned migrations is the next infrastructure task.
* **No pagination yet** — list endpoints return everything; keyset pagination arrives with the feed work (Weeks 3 & 8).
* **Validation coverage is uneven** — problems and profile updates run through Zod schemas; solutions and comments still validate inside their services.
* **No automated tests** — planned for Week 11 alongside rate limiting and a security review.
* **Local only** — no deployment or AWS infrastructure until Weeks 10–12, on purpose.

---

## What I'm Learning Here

Backend architecture and layering · authentication vs authorization as separate concerns · PostgreSQL schema design, joins and transactions · REST API design · TypeScript at the type-design level · React data-fetching and cache design · and, later in the roadmap, indexing and query performance, ranking and feeds, async work and queues, object storage, rate limiting, and deployment.

Rule I hold myself to: **no technology gets added unless it solves a problem this application actually has.**

---

## License

MIT — see [LICENSE](LICENSE).
