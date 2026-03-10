import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

export function WorkspaceDemo() {
  const { t } = useTranslation();
  const [active, setActive] = React.useState(0);
  const workspaces = [
    {
      name: t("landing.highlights.workspaceDemo.acmeCorp"),
      role: t("landing.highlights.workspaceDemo.owner"),
      color: "from-blue-500 to-indigo-600",
      members: 12,
    },
    {
      name: t("landing.highlights.workspaceDemo.sideProject"),
      role: t("landing.highlights.workspaceDemo.admin"),
      color: "from-emerald-500 to-teal-600",
      members: 3,
    },
    {
      name: t("landing.highlights.workspaceDemo.openSource"),
      role: t("landing.highlights.workspaceDemo.member"),
      color: "from-violet-500 to-purple-600",
      members: 48,
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(
      () => setActive((a) => (a + 1) % workspaces.length),
      2200,
    );
    return () => clearInterval(timer);
  }, [workspaces.length]);

  return (
    <div className="w-full max-w-md">
      <motion.div
        className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${workspaces[active].color} flex items-center justify-center text-white text-xs font-bold`}
          >
            {workspaces[active].name[0]}
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">
              {workspaces[active].name}
            </div>
            <div className="text-[10px] text-zinc-500">
              {workspaces[active].role} · {workspaces[active].members}{" "}
              {t("landing.highlights.workspaceDemo.members")}
            </div>
          </div>
          <div className="ml-auto w-5 h-5 text-zinc-400">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
            </svg>
          </div>
        </div>
        {/* Workspace list */}
        <div className="p-2 space-y-1">
          {workspaces.map((ws, i) => (
            <motion.div
              key={ws.name}
              onClick={() => setActive(i)}
              animate={{
                backgroundColor: active === i ? undefined : undefined,
              }}
              className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                active === i
                  ? "bg-zinc-100 dark:bg-zinc-800"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ws.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {ws.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-900 dark:text-white">
                  {ws.name}
                </div>
                <div className="text-[10px] text-zinc-500">{ws.role}</div>
              </div>
              {active === i && (
                <motion.div
                  layoutId="ws-check"
                  className="w-4 h-4 text-indigo-500"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
          <button
            type="button"
            className="flex-1 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
          >
            {t("landing.highlights.workspaceDemo.createWorkspace")}
          </button>
          <button
            type="button"
            className="flex-1 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            {t("landing.highlights.workspaceDemo.inviteMembers")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
