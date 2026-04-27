# StageThree

> A full-stack 3D stage plotting application for audio engineers, technical directors, and event production teams.

**Live:** [stagethree.dev](https://stagethree.dev)

---

## Overview

StageThree lets production professionals design stage layouts and visualize them in three dimensions before load-in day. No more guessing sightlines from a 2D PDF. Build a plot, place your elements, and walk through the space in 3D.

The app supports multi-project workflows, per-plot input channel lists, public stage templates, venue management, and a UUID-based public share link system for sharing plots without requiring an account.

---

## For Reviewers 

Model attribution documentation is available via markdown at root/attribution.md

Sql schema dump is located at root/schema.sql

[DB Diagram](https://dbdiagram.io/d/Stage-three-finalized-69d7d5f50f7c9ef2c0bc85d0)


---

## Tech Stack

**Frontend** — React, TypeScript, Three.js, React Router, custom CSS design system with dark/light theming via CSS custom properties, Cloudflare Turnstile for bot protection on auth forms.

**Backend** — Node.js, Express, PostgreSQL, Knex for query building and migrations, JWT authentication via httpOnly cookies, AWS SDK v3 for admin GLTF model uploads to Cloudflare R2. Soft deletes across all primary entities.

**Infrastructure** — DigitalOcean VPS, Docker and Docker Compose, nginx as reverse proxy with SSL termination, GitHub Actions CI/CD pipeline, Cloudflare R2 for 3D model object storage, Cloudflare DNS and CDN.

---

## Features

- **3D Scene** — Place, drag, rotate, and delete stage elements in a Three.js scene. Raycaster-based interaction with context menus and position/rotation modals.
- **Stage Templates** — Browse public stage configurations with a searchable, filterable grid. Jump directly into a new plot from any template.
- **Project Management** — Organize plots by project. Full CRUD for projects, stages, venues, and plots.
- **Input Channel List** — Per-plot channel-by-channel input list attached directly to each stage plot.
- **Public Share Links** — UUID-based shareable URLs for read-only plot access without authentication.
- **Admin Portal** — R2 model uploads, user management, stage and venue oversight.
- **JWT Auth** — httpOnly cookie-based authentication with Cloudflare Turnstile CAPTCHA.

---

## Architecture

The client is a React TypeScript SPA. Typed fetch wrappers per resource live in `api/`, route-level pages in `pages/`, shared UI in `components/`, and Three.js scene logic in its own module handling the renderer, raycaster, and GLTF loader. Global state is managed through `StageContext` and `AuthContext`.

The server follows MVC — Express routers delegate to controllers which handle DB queries via Knex and transform results at the boundary. All DB columns follow a `_suffix` naming convention per table (`_stg`, `_ven`, `_prj`, etc). Transformer functions handle the DB to API mapping so the rest of the app works with clean camelCase types.

---

## Local Development

**Prerequisites** — Node.js 20+, PostgreSQL, Docker (optional)

```bash
git clone https://github.com/echtoplasm/stagethree
cd stagethree
```

**Server**
```bash
cd server
cp .env.example .env
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
```

**Client**
```bash
cd client
npm install
npm run dev
```

**Docker**
```bash
docker compose up --build
```

---

## Deployment

Deployed on DigitalOcean via Docker Compose behind nginx. GitHub Actions runs the CI/CD pipeline on push to `main` — builds the client, SSHs into the droplet, pulls the latest image, and restarts the containers. 3D model assets are served from Cloudflare R2.

---

## Database

PostgreSQL with Knex migrations.

| Table | Description |
|---|---|
| `user_usr` | Authenticated users |
| `venue_ven` | Venues with city and state FK |
| `stage_stg` | Stage dimensions, public flag, venue FK |
| `project_prj` | User projects |
| `stage_plot_stp` | Plots linking a project to a stage, with UUID share link |
| `element_placement_elp` | 3D element positions and rotations per plot |
| `input_channel_inc` | Per-plot input channel list |
| `state_sta` | US states lookup |


[DB Diagram](https://dbdiagram.io/d/Stage-three-finalized-69d7d5f50f7c9ef2c0bc85d0)

---

## License

MIT
