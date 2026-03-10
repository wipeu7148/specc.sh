import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { slugify } from "@specc/types";
import { db } from "@/db/client";
import { type Language, t } from "@/i18n";
import { toUserOutput } from "@/modules/user/user.mapper";
import { userService } from "@/modules/user/user.service";
import { workspaceService } from "@/modules/workspace/workspace.service";
import { AppError } from "@/trpc/errors";

const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, stored: string): boolean => {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  return timingSafeEqual(Buffer.from(hash, "hex"), derived);
};

export class AuthService {
  async createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
    const session = await db.session.create({ data: { userId, expiresAt } });
    return session.id;
  }

  async deleteSession(sessionId: string) {
    await db.session.delete({ where: { id: sessionId } });
  }

  async login(email: string, password: string) {
    const user = await userService.getByEmail(email);
    if (!user || !verifyPassword(password, user.passwordHash)) return null;
    const defaultWorkspaceSlug = await workspaceService.getDefaultSlugForUser(
      user.id,
    );
    return { user: toUserOutput(user), defaultWorkspaceSlug };
  }

  async registerUser(
    input: { email: string; password: string },
    language: Language,
  ) {
    const existing = await userService.getByEmail(input.email);
    if (existing)
      throw AppError.badRequest(language, "errors.auth.emailAlreadyRegistered");

    const name = input.email.split("@")[0] ?? input.email;
    const workspaceName = `${name}${t(language, "workspace.defaultNameSuffix")}`;
    const baseSlug = slugify(workspaceName) || "workspace";
    const workspaceSlug = await workspaceService.ensureUniqueSlug(baseSlug);

    const result = await db.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          name,
          email: input.email,
          passwordHash: hashPassword(input.password),
          role: "user",
        },
      });

      const createdWorkspace = await tx.workspace.create({
        data: {
          slug: workspaceSlug,
          name: workspaceName,
          description: t(language, "workspace.defaultDesc"),
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: createdWorkspace.id,
          userId: createdUser.id,
          role: "owner",
        },
      });

      return { user: createdUser, workspace: createdWorkspace };
    });

    return {
      user: toUserOutput(result.user),
      defaultWorkspaceSlug: result.workspace.slug,
    };
  }
}

export const authService = new AuthService();
