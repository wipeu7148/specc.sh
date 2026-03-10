/**
 * @specc/i18n - Internationalization resource package
 *
 * Exports:
 * - zh / en: Full translation resources (for react-i18next registration)
 * - *Zh / *En: Domain-specific translations (server/client can import as needed)
 * - *Schema: TypeScript types
 */

// Domain-specific translations (split by domain model, importable by server/client as needed)
export { authEn } from "./locales/auth/en.js";
export type { AuthSchema } from "./locales/auth/zh.js";
export { authZh } from "./locales/auth/zh.js";
export { commonEn } from "./locales/common/en.js";
export type { CommonSchema } from "./locales/common/zh.js";
export { commonZh } from "./locales/common/zh.js";
// Full language packs (for react-i18next initialization)
export { en } from "./locales/en.js";
export { landingEn } from "./locales/landing/en.js";
export type { LandingSchema } from "./locales/landing/zh.js";
export { landingZh } from "./locales/landing/zh.js";
export { userEn } from "./locales/user/en.js";
export type { UserSchema } from "./locales/user/zh.js";
export { userZh } from "./locales/user/zh.js";
export { workspaceEn } from "./locales/workspace/en.js";
export type { WorkspaceSchema } from "./locales/workspace/zh.js";
export { workspaceZh } from "./locales/workspace/zh.js";
export type { TranslationSchema } from "./locales/zh.js";
export { zh } from "./locales/zh.js";
