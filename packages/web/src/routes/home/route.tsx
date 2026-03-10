import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import LandingPage from "@/components/site/landing/LandingPage";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://specc.sh";

function parseLang(cookieHeader: string): "zh" | "en" {
  const match = cookieHeader.match(/(?:^|;\s*)i18next=([^;]+)/);
  return match?.[1] === "en" ? "en" : "zh";
}

export async function loader({ request }: LoaderFunctionArgs) {
  const lang = parseLang(request.headers.get("Cookie") ?? "");
  return { lang };
}

const META = {
  zh: {
    title: "specc.sh — AI 全栈规范模板 · AI Full-Stack Template",
    description:
      "为 AI Coding 而生的全栈规范模板，让 Claude Code / Copilot / Cursor 每次都写出生产级代码。TypeScript · tRPC · React 19 · Hono · Prisma · PostgreSQL.",
    ogTitle: "specc.sh — AI 全栈规范模板",
    ogLocale: "zh_CN",
    ogLocaleAlt: "en_US",
  },
  en: {
    title: "specc.sh — AI Full-Stack Template for Spec Coding",
    description:
      "A full-stack spec template built for AI Coding. Make Claude Code / Copilot / Cursor produce production-grade code every time. TypeScript · tRPC · React 19 · Hono · Prisma · PostgreSQL.",
    ogTitle: "specc.sh — AI Full-Stack Template",
    ogLocale: "en_US",
    ogLocaleAlt: "zh_CN",
  },
} as const;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const m = META[data?.lang ?? "zh"];
  return [
    { title: m.title },
    { name: "description", content: m.description },
    {
      name: "keywords",
      content:
        "AI coding, full-stack template, tRPC, React, Hono, Prisma, TypeScript, Claude Code, Copilot, Cursor, specc",
    },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:site_name", content: "specc.sh" },
    { property: "og:title", content: m.ogTitle },
    { property: "og:description", content: m.description },
    { property: "og:locale", content: m.ogLocale },
    { property: "og:locale:alternate", content: m.ogLocaleAlt },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: m.ogTitle },
    { name: "twitter:description", content: m.description },
    // Canonical
    { tagName: "link", rel: "canonical", href: SITE_URL },
  ];
};

export default function HomeRoute() {
  return <LandingPage />;
}
