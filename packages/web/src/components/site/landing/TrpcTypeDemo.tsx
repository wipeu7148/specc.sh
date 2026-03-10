import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function TrpcTypeDemo() {
  const { t } = useTranslation();
  const serverLines = [
    {
      text: "export const userRouter = router({",
      indent: 0,
      color: "text-zinc-300",
    },
    { text: "  getMe: protectedProcedure", indent: 0, color: "text-blue-400" },
    { text: "    .output(UserSchema)", indent: 0, color: "text-emerald-400" },
    {
      text: "    .query(async ({ ctx }) => {",
      indent: 0,
      color: "text-zinc-300",
    },
    { text: "      return ctx.user;", indent: 0, color: "text-violet-300" },
    { text: "    }),", indent: 0, color: "text-zinc-400" },
    { text: "});", indent: 0, color: "text-zinc-400" },
  ];
  const clientLines = [
    { text: "const { data } = trpc.user.getMe", color: "text-zinc-300" },
    { text: "  .useQuery();", color: "text-blue-400" },
    { text: "", color: "" },
    { text: "// ✅ Fully typed!", color: "text-emerald-400" },
    { text: "data?.name  // string", color: "text-violet-300" },
    { text: "data?.email // string", color: "text-violet-300" },
    { text: "data?.role  // 'admin'|'member'", color: "text-amber-300" },
  ];

  return (
    <div className="w-full max-w-lg">
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Window chrome */}
        <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="flex-1 text-center text-xs text-zinc-400">
            {t("landing.highlights.trpcDemo.windowTitle")}
          </span>
        </div>

        <div className="bg-zinc-900 p-4 grid grid-cols-2 gap-0 divide-x divide-zinc-700 font-mono text-xs leading-relaxed">
          {/* Server side */}
          <div className="pr-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">
              {t("landing.highlights.trpcDemo.server")}
            </div>
            {serverLines.map((line, i) => (
              <motion.div
                key={line.text || `s-${i}`}
                className={line.color}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.2 }}
              >
                {line.text || "\u00a0"}
              </motion.div>
            ))}
          </div>
          {/* Client side */}
          <div className="pl-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">
              {t("landing.highlights.trpcDemo.client")}
            </div>
            {clientLines.map((line, i) => (
              <motion.div
                key={line.text || `c-${i}`}
                className={line.color}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.5 }}
              >
                {line.text || "\u00a0"}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
          <motion.div
            className="flex items-center gap-1.5 text-emerald-400 text-xs"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            {t("landing.highlights.trpcDemo.zeroTypeErrors")}
          </motion.div>
          <span className="text-zinc-600 text-xs ml-auto">TypeScript 5.x</span>
        </div>
      </motion.div>
    </div>
  );
}
