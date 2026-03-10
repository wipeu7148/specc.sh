---
description: "Use when adding a new feature, business module, tRPC router, or full-stack capability to the project. Covers all steps from types to frontend."
---

# Adding a New Feature

## 1. Types & Schemas (`packages/types/src/[feature].ts`)

```typescript
import { z } from "zod";

export const FeatureSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  createdAt: z.string()
});
export const CreateFeatureInputSchema = z.object({
  workspaceId: z.string(),
  name: z.string().min(1)
});
export type Feature = z.infer<typeof FeatureSchema>;
export type CreateFeatureInput = z.infer<typeof CreateFeatureInputSchema>;
```

Re-export from `packages/types/src/index.ts`.

## 2. Prisma Model (`packages/server/prisma/schema.prisma`)

```prisma
model Feature {
  id          String    @id @default(uuid())
  workspaceId String
  name        String
  createdAt   DateTime  @default(now())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
}
```

After adding the model:
```sh
pnpm --filter @specc/server db:push      # push schema to DB
pnpm --filter @specc/server db:generate  # regenerate Prisma client
```

## 3. Service (`modules/[feature]/[feature].service.ts`)

```typescript
import type { Feature } from "@/generated/prisma/client/client";
import { db } from "@/db/client";

export const toFeatureOutput = (row: Feature) => ({
  id: row.id,
  workspaceId: row.workspaceId,
  name: row.name,
  createdAt: row.createdAt.toISOString()
});

export class FeatureService {
  async list(workspaceId: string) {
    return db.feature.findMany({ where: { workspaceId } });
  }
}
export const featureService = new FeatureService();
```

## 4. Router (`modules/[feature]/[feature].router.ts`)

```typescript
import { FeatureSchema, CreateFeatureInputSchema } from "@specc/types";
import { protectedProcedure, router } from "@/trpc/init";
import { featureService, toFeatureOutput } from "./feature.service";

export const featureRouter = router({
  list: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .output(z.array(FeatureSchema))
    .query(async ({ input }) => {
      const rows = await featureService.list(input.workspaceId);
      return rows.map(toFeatureOutput);
    }),
});
```

## 5. Module Index + Register Router

```typescript
// modules/[feature]/index.ts
export * from "./feature.router";
export * from "./feature.service";
```

```typescript
// trpc/router.ts
export const appRouter = router({
  feature: featureRouter, // add here
});
export type AppRouter = typeof appRouter;
```

## 6. Frontend Usage

```typescript
const { data, isLoading } = trpc.feature.list.useQuery({ workspaceId });
```

## Checklist

- [ ] Types/schemas in `packages/types`, exported from `index.ts`
- [ ] Prisma model added, `db:push` + `db:generate` run
- [ ] Service with `toXxxOutput(row: PrismaType)` — import type from `@/generated/prisma/client/client`
- [ ] Router with `.input()` + `.output()` on all procedures, `protectedProcedure` for auth
- [ ] Module `index.ts` exports router + service; router added to `appRouter`
- [ ] `make lint && make tsc` passes
