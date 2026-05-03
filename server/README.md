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
- **AWS SDK v3 (S3)** — Cloudflare R2 storage for 3D model assets
---
 
## Getting Started
 
### Prerequisites
 
- Node.js v20+
- PostgreSQL running locally
- npm or pnpm
### Install dependencies
 
```bash
npm install
```
 
### Environment variables
 
Copy the example file and fill in your values:
 
```bash
cp .env.example .env
```
 
`.env.example` documents all required variables. Key ones to configure:
 
| Variable | Description |
|---|---|
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | Database host (default: `localhost`) |
| `DB_NAME` | Database name (default: `stagethree`) |
| `DB_PORT` | Database port (default: `5432`) |
| `JWT_SECRET` | Secret key for JWT signing — generate a random string |
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret key |
| `R2_PUBLIC_URL` | Public URL for the R2 bucket (3D models load from here) |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 access key (admin model uploads only) |
| `R2_SECRET_ACCESS_KEY` | R2 secret key (admin model uploads only) |
| `R2_BUCKET_NAME` | R2 bucket name |
| `R2_PUBLIC_DOMAIN` | Public domain for R2 assets |
| `DEMO_USER_PASSWORD` | Password for the seeded demo account |
| `ADMIN_USER_PASSWORD` | Password for the seeded admin account |
| `REGULAR_USER_PASSWORD` | Password for seeded regular user |
| `SUPER_USER_PASSWORD` | Password for seeded super user |
 
> **Note:** The R2 bucket is publicly readable — 3D models will load without R2 credentials. The access key and secret are only required for admin model uploads.
 
### Create the database
 
```bash
createdb stagethree
```
 
### Run migrations
 
```bash
npx knex migrate:latest
```
 
### Seed the database
 
```bash
npx knex seed:run
```
 
### Run the dev server
 
```bash
npm run dev
```
 
The server runs on `http://localhost:3000` by default.
 
### Build for production
 
```bash
npm run build
```
 
---
 
## Project Structure
 
```
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
```
 
---
 
## Architecture Notes
 
All database columns follow a per-table suffix naming convention (`_usr`, `_stg`, `_ven`, `_prj`, `_stp`, `_elp`, etc.). Transformer functions in `utils/` handle mapping between DB column names and clean camelCase types at the API boundary. All primary entities use soft deletes.
 
---
 
## Related
 
- [StageThree Client](../client/README.md)
- [Live Site](https://stagethree.dev)
 
