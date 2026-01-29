# Kalam 2026 - AI Coding Instructions

## Architecture Overview
This is a **full-stack event management platform** with a containerized monorepo:
- **Frontend**: Next.js 16 (App Router) + React 19 + Tailwind CSS 4 on port 3000
- **Backend**: Fastify 5 + TypeScript + Mongoose on port 4000
- **Database**: MongoDB 7 (Dockerized)
- **Proxy**: NGINX reverse proxy routing `/api/*` → backend, `/*` → frontend

## Development Commands
```bash
# Docker development (recommended) - runs all services with hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Local development (without Docker)
cd backend && pnpm install && pnpm run dev   # Port 4000
cd frontend && pnpm install && pnpm run dev  # Port 3000

# Type checking (both projects)
pnpm run typecheck
```

## Project Conventions

### Backend (Fastify + TypeScript)
- **ESM-only**: All imports use `.js` extension (`import { config } from './config/env.js'`)
- **Zod validation**: Request schemas defined in route files, validated inline
- **Route structure**: Routes in `/routes`, business logic in `/controllers`, DB in `/models`
- **Environment config**: Centralized in `src/config/env.ts` using Zod schema parsing
- **Auth pattern**: JWT access/refresh tokens, middleware attaches `request.user`
- **API responses**: Always return `{ success: boolean, data?: T, error?: { message } }`

```typescript
// Route pattern example (backend/src/routes/*.routes.ts)
app.post('/endpoint', async (request, reply) => {
  const body = zodSchema.parse(request.body);
  const result = await controller.method(body);
  return reply.status(201).send(result);
});
```

### Frontend (Next.js App Router)
- **Styling**: Tailwind CSS with `cn()` helper from `lib/utils.ts` for class merging
- **API client**: Centralized in `lib/api.ts` with typed methods (authApi, eventsApi, etc.)
- **Fonts**: Inter (body) + Outfit (headings) via CSS variables `--font-inter`, `--font-outfit`
- **Components**: Layout components in `components/layout/`, feature components in `components/`
- **Types**: Shared interfaces in `types/index.ts` (User, Event, Registration, Payment)

### Mongoose Models
- Interfaces prefixed with `I` (`IUser`, `IEvent`)
- Timestamps enabled via `{ timestamps: true }`
- Indexes added for frequently queried fields

## External Integrations
- **Payments**: PhonePe gateway (UAT/PRODUCTION modes) - see `services/payment.service.ts`
- **Email**: Google Workspace SMTP with separate product/support accounts
- **CDN/Security**: Cloudflare (Full SSL mode, rate limiting at edge)

## File Patterns
| Need | Location |
|------|----------|
| Add new API endpoint | `backend/src/routes/*.routes.ts` + controller in `/controllers` |
| Add database model | `backend/src/models/*.model.ts` (interface + schema) |
| Add environment var | `backend/src/config/env.ts` (Zod schema) + `.env` |
| Add frontend page | `frontend/src/app/[route]/page.tsx` |
| Add React component | `frontend/src/components/[category]/Component.tsx` |
| Add shared type | `frontend/src/types/index.ts` |
