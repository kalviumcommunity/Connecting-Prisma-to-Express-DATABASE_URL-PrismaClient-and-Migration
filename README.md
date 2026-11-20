# Connect Prisma to Express — PostgreSQL setup

This project introduces Prisma + PostgreSQL to the existing Express + React app.
The React client is intentionally unchanged, and `server/routes/threads.js`
remains the in-memory API for this lesson. This assignment focuses on configuring
the database connection, defining the Prisma model, creating the first migration,
and connecting Prisma before the Express server starts.

## Prerequisites

- Node.js 18+
- PostgreSQL running locally
- A database created, for example: `createdb threadbase`

## Setup

From the repository root:

```bash
npm run setup
cp client/.env.development.example client/.env.development
cp server/.env.example server/.env
```

Edit `server/.env` and set your own PostgreSQL credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/threadbase?schema=public"
```

Replace `USER` and `PASSWORD` with your local PostgreSQL username and password.
URL-encode special characters in the password. Never commit the real `.env` file.

Install server dependencies if you have not run setup:

```bash
npm --prefix server install
```

Generate the Prisma Client and apply the checked-in initial migration:

```bash
cd server
npx prisma generate
npx prisma migrate dev
cd ..
```

The migration creates the PostgreSQL `Thread` table. The Prisma schema and
migration are committed so every developer can reproduce the same database
structure.

## Run

```bash
npm run dev
```

The server connects to PostgreSQL before it starts listening on port 3001.
A successful startup prints:

```text
Prisma connected to PostgreSQL
Threadbase API running on http://localhost:3001
```

If the database is unavailable or `DATABASE_URL` is invalid, startup fails
with a connection error instead of starting an API that cannot reach its database.

## Prisma model

The `Thread` model contains:

- `id`: auto-incrementing integer primary key
- `title`: required text
- `body`: required text with an empty-string default
- `createdAt`: timestamp set automatically when a row is created

## Project structure

```text
server/
  server.js
  routes/threads.js
  prisma/
    client.js
    schema.prisma
    migrations/
      migration_lock.toml
      20261120000000_init/
        migration.sql
  .env.example
```

## Scope note

The existing routes file is deliberately not changed in this exercise, as
requested by the starter instructions. It still serves its in-memory sample
threads. A later data-layer exercise can replace those array operations with
Prisma queries. This assignment verifies the PostgreSQL connection and migration
setup without changing the API or frontend.

## Security

- Keep real database credentials in `server/.env` only.
- Commit `server/.env.example`, never `server/.env`.
- Do not expose `DATABASE_URL` to the React client.
