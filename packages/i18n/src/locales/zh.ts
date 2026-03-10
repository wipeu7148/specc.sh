import { authZh } from "./auth/zh.js";
import { commonZh } from "./common/zh.js";
import { landingZh } from "./landing/zh.js";
import { userZh } from "./user/zh.js";
import { workspaceZh } from "./workspace/zh.js";

// Explicit union of all sub-module error shapes.
// When adding a new i18n module with errors, add it here first —
// TypeScript will then enforce it appears in the errors block below.
type TranslationErrors = {
  common: typeof commonZh.errors;
  auth: typeof authZh.errors;
  user: typeof userZh.errors;
  workspace: typeof workspaceZh.errors;
};

export const zh = {
  translation: {
    errors: {
      common: commonZh.errors,
      auth: authZh.errors,
      user: userZh.errors,
      workspace: workspaceZh.errors,
    } satisfies TranslationErrors,
    auth: authZh.ui,
    common: commonZh.ui,
    landing: landingZh.ui,
    user: userZh.ui,
    workspace: workspaceZh.ui,
  },
};

export type TranslationSchema = typeof zh;
