# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Architecture

This is a full-stack application with a React frontend and FastAPI backend:

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript, built using Vite
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router DOM with authentication guards
- **State Management**: TanStack React Query for server state, local state with React hooks
- **Authentication**: Supabase Auth with session management in `App.tsx:18-28`

### Backend (Python + FastAPI)
- **Location**: `/backend/` directory
- **API**: FastAPI with CORS middleware
- **Entry Point**: `backend/main.py` - simple agent endpoint at `/api/agent`

### Key Architecture Patterns

#### Authentication Flow
- `RequireAuth` component in `App.tsx` handles session management
- Supabase client configured in `src/lib/supabaseClient.ts`
- Protected routes can be wrapped with `RequireAuth`

#### Component Structure
- **Pages**: Main route components in `src/pages/`
- **Components**: Reusable components in `src/components/`
- **UI Components**: shadcn/ui components in `src/components/ui/`
- **Services**: API and mock services in `src/services/`

#### Styling System
- Tailwind CSS with custom configuration
- Component-specific CSS modules (e.g., `Index.module.css`)
- Global styles in `src/index.css`

#### Path Aliases
- `@/*` maps to `./src/*` (configured in `vite.config.ts` and `tsconfig.json`)

### Database & External Services
- **Supabase**: Used for authentication and potentially data storage
- **Three.js**: Used for 3D animations and visualizations

### Development Notes
- TypeScript configuration has relaxed settings (`noImplicitAny: false`, `strictNullChecks: false`)
- Development server runs on `::` (all interfaces) port 8080
- Uses component tagging for development mode debugging