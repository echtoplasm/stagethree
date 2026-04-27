# StageThree — Client

The frontend for [StageThree](https://stagethree.dev), a 3D stage plot web application for live music professionals. Built with React, TypeScript, and Three.js.

## Tech Stack

- **React** — UI framework
- **TypeScript** — Type safety
- **Three.js** — 3D scene rendering
- **Vite** — Build tooling and dev server

## Getting Started

### Prerequisites

- Node.js v18+
- The StageThree API server running locally

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The client runs on `http://localhost:5173` by default.

### Build for production

```bash
npm run build
```

## Features

- Interactive 3D stage plot editor
- Drag-and-drop equipment placement
- GLTF model loading with client-side caching
- UUID-based public share links for read-only plot viewing
- PDF export
- JWT authentication via httpOnly cookies

## Project Structure

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

## Related

- [StageThree API](../server/README.md)
