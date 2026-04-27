# StageThree — Server

The backend API for [StageThree](https://stagethree.dev), a 3D stage plot web application for live music professionals. Built with Express, TypeScript, and PostgreSQL.

## Tech Stack

- **Express 5** — HTTP server and routing
- **TypeScript** — Type safety
- **PostgreSQL** — Primary database
- **Knex** — Query builder and migrations
- **JWT** — Authentication via httpOnly cookies
- **bcrypt** — Password hashing
- **Multer** — File upload handling
- **AWS SDK (S3)** — Cloudflare R2 storage for 3D models and images

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL running locally
- pnpm

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env` file at the root of the server directory:

```env
DATABASE_URL=
JWT_SECRET=
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
```

### Run migrations

```bash
pnpm knex migrate:latest
```

### Seed the database

```bash
pnpm knex seed:run
```

### Run the dev server

```bash
pnpm dev
```

The server runs on `http://localhost:3000` by default.

### Build for production

```bash
pnpm build
```

## Project Structure

src/
├── controllers/      # Route handler logic
├── db/
│   ├── migrations/   # Knex migration files
│   ├── seeds/        # Reference and demo data
│   ├── db.ts         # Database connection
│   └── knex.ts       # Knex instance
├── middleware/        # Auth middleware (JWT verification)
├── routes/           # Express route definitions
├── types/            # TypeScript type definitions
├── utils/            # Shared utilities (DTO transformers)
├── index.ts          # Server entry point
└── knexfile.ts       # Knex configuration

## Related

- [StageThree Client](../client/README.md)

