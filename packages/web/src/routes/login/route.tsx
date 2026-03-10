import type { LoaderFunctionArgs, MetaFunction } from "react-router";

function parseLang(cookieHeader: string): "zh" | "en" {
  return /(?:^|;\s*)i18next=en/.test(cookieHeader) ? "en" : "zh";
}

export async function loader({ request }: LoaderFunctionArgs) {
  return { lang: parseLang(request.headers.get("Cookie") ?? "") };
}

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  data?.lang === "en"
    ? [
        { title: "Sign In — specc.sh" },
        {
          name: "description",
          content:
            "Sign in to specc.sh and start building with the AI full-stack template.",
        },
        { name: "robots", content: "noindex, nofollow" },
      ]
    : [
        { title: "登录 — specc.sh" },
        {
          name: "description",
          content: "登录到 specc.sh，开始使用 AI 全栈规范模板。",
        },
        { name: "robots", content: "noindex, nofollow" },
      ];

export { default } from "@/components/auth/AuthPage";
