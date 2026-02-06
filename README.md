# Cloudflare Workers + React Starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/medkrich/atlasdrop-mobile-first-delivery-marketplace)

A production-ready full-stack starter template for Cloudflare Workers and Pages. Features a modern React frontend with shadcn/ui, TailwindCSS, and a Hono-powered API backend. Includes TypeScript, Vite, TanStack Query, and seamless deployment to Cloudflare.

## Features

- **Full-Stack Ready**: React 18 frontend + Hono API backend on Cloudflare Workers
- **Modern UI**: shadcn/ui components, TailwindCSS with custom design system
- **Type-Safe**: End-to-end TypeScript with Workers type generation
- **State Management**: TanStack Query, Zustand, Immer
- **Developer Experience**: Hot reload, error boundaries, theme support (light/dark)
- **Performance**: Optimized Vite builds, Cloudflare Assets for static hosting
- **API Routes**: Easy extension via `worker/userRoutes.ts`
- **Responsive Design**: Mobile-first with sidebar layout option
- **Deployment**: One-command deploy to Cloudflare Pages/Workers

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, Lucide Icons, Framer Motion, Sonner (Toasts) |
| **Backend** | Cloudflare Workers, Hono, TypeScript |
| **Data/UI** | TanStack Query, React Router, React Hook Form, Zod, Recharts |
| **State/UI** | Zustand, Immer, Radix UI Primitives |
| **Dev Tools** | Bun, ESLint, Wrangler, Cloudflare Vite Plugin |

## Quick Start

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Run Development Server**
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (frontend) with API at `/api/*`.

3. **Build for Production**
   ```bash
   bun build
   ```

## Local Development

- **Frontend**: `src/` directory with React Router pages in `src/pages/`
- **Backend**: Add API routes in `worker/userRoutes.ts` (auto-loaded, HMR supported)
- **Types**: Run `bun cf-typegen` to regenerate Worker bindings
- **Linting**: `bun lint`
- **Preview**: `bun preview`

### Customizing the App

- **Homepage**: Edit `src/pages/HomePage.tsx`
- **Sidebar**: Customize `src/components/app-sidebar.tsx` or use `AppLayout` wrapper
- **Theme**: Toggle via `ThemeToggle` component (persists in localStorage)
- **API Example**: Extend `/api/test` in `worker/userRoutes.ts`

## Deployment

Deploy to Cloudflare with one command:

```bash
bun deploy
```

This builds assets and deploys via Wrangler. Configure your Cloudflare account in `wrangler.toml` or use `wrangler login`.

For custom domains and bindings:

1. Update `wrangler.jsonc` with your KV/DO namespaces
2. Run `wrangler deploy --env production`
3. Assets served via Cloudflare Pages, API via Workers

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/medkrich/atlasdrop-mobile-first-delivery-marketplace)

## Project Structure

```
├── src/              # React frontend
│   ├── components/   # UI components (shadcn/ui + custom)
│   ├── pages/        # Route pages
│   └── hooks/        # Custom hooks
├── worker/           # Hono API backend
├── shared/           # Shared TypeScript types (optional)
├── tailwind.config.js # Design system
└── wrangler.jsonc    # Cloudflare config
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server (frontend + API) |
| `bun build` | Build for production |
| `bun lint` | Lint codebase |
| `bun preview` | Preview production build |
| `bun deploy` | Deploy to Cloudflare |
| `bun cf-typegen` | Generate Worker types |

## Contributing

1. Fork the repo
2. `bun install`
3. Create a feature branch
4. `bun dev` for testing
5. Submit PR

## License

MIT License. See [LICENSE](LICENSE) for details.