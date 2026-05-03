# StageThree — Client
 
The frontend for [StageThree](https://stagethree.dev), a 3D stage plot web application for live music professionals. Built with React, TypeScript, and Three.js.
 
## Tech Stack
 
- **React** — UI framework
- **TypeScript** — Type safety
- **Three.js** — 3D scene rendering
- **React Router** — Client-side routing
- **Vite** — Build tooling and dev server
- **Cloudflare Turnstile** — Bot protection on auth forms
- **Lucide React** — UI icons
---
 
## Getting Started
 
### Prerequisites
 
- Node.js v20+
- The StageThree API server running locally (see [server README](../server/README.md))
### Install dependencies
 
```bash
npm install
```
 
### Environment variables
 
```bash
cp .env.development.example .env.development
```
 
| Variable | Description |
|---|---|
| `VITE_API_URL` | URL of the StageThree API server (default: `http://localhost:3000`) |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
 
### Run the dev server
 
```bash
npm run dev
```
 
The client runs on `http://localhost:5173` by default.
 
### Build for production
 
```bash
npm run build
```
 
Uses `.env.production` — set `VITE_API_URL` to your production API URL before building.
 
---
 
## Features
 
- Interactive 3D stage plot editor
- Drag-and-drop equipment placement
- GLTF model loading from Cloudflare R2 with client-side caching
- UUID-based public share links for read-only plot viewing
- PDF export
- JWT authentication via httpOnly cookies
- Dark/light theming via CSS custom properties
---
 
## Project Structure
 
```
src/
├── api/                  # API call modules (auth, venues, stages, plots, etc.)
├── components/
│   ├── admin/            # Admin portal (user and 3D model management)
│   ├── documentation/    # In-app documentation and help modals
│   ├── elements/         # Equipment element drawer
│   ├── inputChannels/    # Input channel drawer and modal
│   ├── plotting/         # Stage plot CRUD components
│   ├── projects/         # Project card component
│   ├── projectUtilities/ # Project utilities drawer
│   ├── shared/           # Shared components (auth, venues, stages, projects)
│   ├── sharedPlot/       # Public read-only plot scene
│   ├── threeDComponents/ # Three.js UI modals (background, position, rotation)
│   ├── userUI/           # General UI utilities (spinner, error, screen size)
│   ├── Navbar.tsx
│   └── ThreeD.tsx        # Main 3D scene component
├── contexts/             # React context (auth, stage state)
├── css/                  # Global styles
├── hooks/                # Custom hooks (useWindowSize)
├── pages/                # Route-level pages
├── types/                # TypeScript type definitions
└── utils/                # Shared utilities
```
 
---
 
## Related
 
- [StageThree API](../server/README.md)
- [Live Site](https://stagethree.dev)
