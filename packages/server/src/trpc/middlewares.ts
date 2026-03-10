import { db } from "@/db/client";
import { AppError } from "./errors";
import { protectedProcedure } from "./init";

/**
 * A protected procedure that also resolves and validates workspace membership.
 * Puts `workspace` on ctx. Use in workspace-scoped routes.
 */
export const workspaceProtectedProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    if (!ctx.workspaceKey) {
      throw AppError.badRequest(ctx.language, "errors.common.missingWorkspace");
    }

    const isUuid = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      );

    const workspace = await db.workspace.findFirst({
      where: isUuid(ctx.workspaceKey)
        ? { OR: [{ id: ctx.workspaceKey }, { slug: ctx.workspaceKey }] }
        : { slug: ctx.workspaceKey },
      include: { members: { where: { userId: ctx.userId }, take: 1 } },
    });

    if (!workspace) {
      throw AppError.notFound(ctx.language, "errors.workspace.notFound");
    }

    if (workspace.members.length === 0) {
      throw AppError.forbidden(
        ctx.language,
        "errors.common.workspaceForbidden",
      );
    }

    const { members: _members, ...workspaceData } = workspace;
    return next({ ctx: { ...ctx, workspace: workspaceData } });
  },
);
