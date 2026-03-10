import { slugify } from "@specc/types";
import { db } from "@/db/client";
import { type Language } from "@/i18n";
import { AppError } from "@/trpc/errors";

export class WorkspaceService {
  async getDefaultSlugForUser(userId: string) {
    const member = await db.workspaceMember.findFirst({
      where: { userId },
      select: { workspace: { select: { slug: true } } },
      orderBy: { workspace: { createdAt: "asc" } },
    });
    return member?.workspace.slug ?? null;
  }

  async listByUser(userId: string) {
    return db.workspace.findMany({
      where: { members: { some: { userId } } },
    });
  }

  async getBySlug(slug: string, userId: string) {
    return db.workspace.findFirst({
      where: { slug, members: { some: { userId } } },
    });
  }

  async ensureUniqueSlug(baseSlug: string) {
    let slug = baseSlug;
    let suffix = 1;

    while (true) {
      const existing = await db.workspace.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!existing) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    return slug;
  }

  async create(
    input: { name: string; slug?: string; description?: string | null },
    userId: string,
  ) {
    const baseSlug = input.slug?.trim() || slugify(input.name) || "workspace";
    const slug = await this.ensureUniqueSlug(baseSlug);

    return db.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: {
          name: input.name,
          slug,
          description: input.description ?? null,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId,
          role: "owner",
        },
      });

      return workspace;
    });
  }

  private async requireOwner(
    id: string,
    userId: string,
    language: Language,
    forbiddenKey: string,
  ) {
    const workspace = await db.workspace.findUnique({
      where: { id },
      include: { members: { where: { userId, role: "owner" }, take: 1 } },
    });
    if (!workspace) {
      throw AppError.notFound(language, "errors.workspace.notFound");
    }
    if (workspace.members.length === 0) {
      throw AppError.forbidden(language, forbiddenKey);
    }
    return workspace;
  }

  async update(
    id: string,
    input: { name?: string; slug?: string; description?: string | null },
    userId: string,
    language: Language,
  ) {
    const workspace = await this.requireOwner(
      id,
      userId,
      language,
      "errors.workspace.onlyOwnerCanUpdate",
    );

    let nextSlug = input.slug?.trim();
    if (nextSlug) {
      nextSlug = slugify(nextSlug) || workspace.slug;
      const existing = await db.workspace.findUnique({
        where: { slug: nextSlug },
        select: { id: true },
      });
      if (existing && existing.id !== workspace.id) {
        throw AppError.badRequest(language, "errors.workspace.slugExists");
      }
    }

    return db.workspace.update({
      where: { id },
      data: {
        name: input.name ?? workspace.name,
        slug: nextSlug ?? workspace.slug,
        description:
          input.description !== undefined
            ? input.description
            : workspace.description,
      },
    });
  }

  async delete(id: string, userId: string, language: Language) {
    await this.requireOwner(
      id,
      userId,
      language,
      "errors.workspace.onlyOwnerCanDelete",
    );

    await db.workspace.delete({ where: { id } });

    return { id };
  }
}

export const workspaceService = new WorkspaceService();
