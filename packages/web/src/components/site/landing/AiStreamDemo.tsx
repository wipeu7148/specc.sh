import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

const AI_ARTIFACTS = [
  {
    icon: "🗄️",
    labelKey: "prismaLabel" as const,
    detailKey: "prismaDetail" as const,
    color: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50 dark:bg-teal-950/40",
    border: "border-teal-200 dark:border-teal-800",
    text: "text-teal-700 dark:text-teal-300",
    delay: 800,
  },
  {
    icon: "🔌",
    labelKey: "trpcLabel" as const,
    detailKey: "trpcDetail" as const,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
    delay: 1600,
  },
  {
    icon: "📧",
    labelKey: "emailLabel" as const,
    detailKey: "emailDetail" as const,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
    delay: 2400,
  },
  {
    icon: "⚛️",
    labelKey: "reactLabel" as const,
    detailKey: "reactDetail" as const,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200 dark:border-violet-800",
    text: "text-violet-700 dark:text-violet-300",
    delay: 3200,
  },
];

export function AiStreamDemo() {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    const resetTimer = setTimeout(() => {
      setVisibleCount(0);
      setDone(false);
      setTyping(true);
    }, 0);
    return () => clearTimeout(resetTimer);
  }, []);

  React.useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyping(false), 900);
    return () => clearTimeout(t);
  }, [typing]);

  React.useEffect(() => {
    if (typing) return;
    if (visibleCount >= AI_ARTIFACTS.length) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
    const artifact = AI_ARTIFACTS[visibleCount];
    const t = setTimeout(
      () => setVisibleCount((c) => c + 1),
      artifact.delay - (AI_ARTIFACTS[visibleCount - 1]?.delay ?? 0),
    );
    return () => clearTimeout(t);
  }, [typing, visibleCount]);

  React.useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setVisibleCount(0);
      setDone(false);
      setTyping(true);
    }, 3500);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Prompt bubble */}
      <div className="mb-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm shrink-0 shadow-lg">
          {t("landing.highlights.aiDemo.userLabel")}
        </div>
        <div className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <p className="text-sm text-zinc-800 dark:text-zinc-200">
            {t("landing.highlights.aiDemo.userPrompt")}
          </p>
        </div>
      </div>

      {/* AI response bubble */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg">
          AI
        </div>
        <div className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm min-h-[296px]">
          {typing ? (
            <div className="flex items-center gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-zinc-400"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                {t("landing.highlights.aiDemo.aiResponse")}
              </p>
              {AI_ARTIFACTS.slice(0, visibleCount).map((a) => (
                <motion.div
                  key={a.labelKey}
                  initial={{ opacity: 0, x: -12, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${a.bg} ${a.border}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center text-sm shadow-sm shrink-0`}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold ${a.text}`}>
                      {t(`landing.highlights.aiDemo.artifacts.${a.labelKey}`)}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-500 truncate">
                      {t(`landing.highlights.aiDemo.artifacts.${a.detailKey}`)}
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 pt-1"
                >
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-700" />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {t("landing.highlights.aiDemo.doneMessage")}
                  </span>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-700" />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
