---
description: "Use when working on server-side code: tRPC routers, services, Prisma, middleware, or backend modules in packages/server."
applyTo: "packages/server/**"
---

# Server Patterns

## Service Pattern

```typescript
import type { User } from "@/generated/prisma/client/client";
import type { UserSettings } from "@specc/types";
import { db } from "@/db/client";

export const toUserOutput = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role as "admin" | "user",
  settings: (user.settings as UserSettings | null) ?? null,
});

export class UserService {
  async getById(userId: string) {
    return db.user.findUnique({ where: { id: userId } });
  }
}

export const userService = new UserService();
```

- Prisma types imported from `@/generated/prisma/client/client`
- Always export `toXxxOutput()` — never expose raw Prisma rows
- Export singleton: `export const xService = new XService()`
- Use `@/` path aliases, not relative paths

## tRPC Router Pattern

```typescript
import { protectedProcedure, router } from "@/trpc/init";
import { AppError } from "@/trpc/errors";
import { UserProfileOutputSchema, UserUpdateInputSchema } from "@specc/types";

export const userRouter = router({
  getProfile: protectedProcedure
    .output(UserProfileOutputSchema)
    .query(async ({ ctx }) => {
      const user = await userService.getById(ctx.userId);
      if (!user) throw AppError.notFound("user not found");
      return toUserOutput(user);
    }),

  updateProfile: protectedProcedure
    .input(UserUpdateInputSchema)
    .output(UserProfileOutputSchema)
    .mutation(async ({ input, ctx }) => { /* ... */ }),
});
```

## Procedures

| Procedure | Use case |
|-----------|----------|
| `publicProcedure` | No auth required |
| `protectedProcedure` | Requires `ctx.userId` (from `@/trpc/init`) |
| `workspaceProtectedProcedure` | Requires workspace membership (from `@/trpc/middlewares`) |

Errors: `AppError.notFound()` · `AppError.badRequest()` · `AppError.unauthorized()` · `AppError.forbidden()`

## Registering a Router

```typescript
// trpc/router.ts
export const appRouter = router({
  feature: featureRouter, // add here
});
export type AppRouter = typeof appRouter;
```

## Module Index

```typescript
// modules/user/index.ts
export * from "./user.router";
export * from "./user.service";
```

## Prisma / Database

After any schema change in `prisma/schema.prisma`:

```sh
pnpm --filter @specc/server db:push      # push to DB, no migration files (dev)
pnpm --filter @specc/server db:generate  # regenerate Prisma client
pnpm --filter @specc/server db:migrate   # create migration files + apply (production)
```

DB is PostgreSQL 18 running in Docker. Start it with `docker-compose up -d db minio`.

## Logger

```typescript
import { Logger } from "@/logger";
const logger = new Logger("ModuleName");
logger.log("message");   // INFO
logger.warn("message");  // WARN
logger.error("message"); // ERROR
```

## Storage

- `StorageProvider` interface: only `uploadFile(key, body, contentType): Promise<void>` and `deleteFile(key): Promise<void>`
- `uploadFile` returns **`void`** — no URL returned from storage layer
- Backend stores **file keys** (e.g. `userId/1234.jpg`) in DB, never full URLs
- Upload route responds with `{ key, user }` — frontend resolves URL via `VITE_STORAGE_PUBLIC_URL`
- When replacing a file, pass the old key directly to `storage.deleteFile(oldKey)`
