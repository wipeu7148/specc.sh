import { authRouter, userRouter, workspaceRouter } from "@/modules/index";
import { router } from "./init";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
