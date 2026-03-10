/**
 * WhyNotNextjs — Why this template chose Vite + Hono over Next.js
 * Explains: vendor lock-in, slow DX, AI confusion vs SSR+CSR split
 */

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ── Icons ──────────────────────────────────────────────────────────────────

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z"
      />
    </svg>
  );
}

function BoltSlashIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21"
      />
    </svg>
  );
}

function LockClosedIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function CpuChipIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    </svg>
  );
}

function GlobeAltIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function RectangleStackIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
      />
    </svg>
  );
}

// ── Pain point card ────────────────────────────────────────────────────────

const PAIN_POINTS = [
  { key: "slow", Icon: BoltSlashIcon },
  { key: "vendor", Icon: LockClosedIcon },
  { key: "aiConfused", Icon: CpuChipIcon },
];

function PainCard({
  painKey,
  Icon,
  index,
}: {
  painKey: string;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="flex gap-4 p-5 rounded-xl border border-red-200/60 bg-red-50/60 dark:border-red-900/40 dark:bg-red-950/20"
    >
      <div className="shrink-0 w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
        <Icon className="w-5 h-5 text-red-500 dark:text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-zinc-900 dark:text-white text-sm">
          {t(`landing.whyNotNextjs.problems.${painKey}.title`)}
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          {t(`landing.whyNotNextjs.problems.${painKey}.desc`)}
        </p>
      </div>
    </motion.div>
  );
}

// ── Solution card ──────────────────────────────────────────────────────────

function SolutionCard({
  tag,
  tagColor,
  Icon,
  titleKey,
  descKey,
  pills,
  index,
}: {
  tag: string;
  tagColor: string;
  Icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descKey: string;
  pills: string[];
  index: number;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
      className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/80 p-6 flex flex-col gap-4"
    >
      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${tagColor}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tracking-wide ${tagColor} text-white`}
            >
              {tag}
            </span>
            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
              {t(titleKey)}
            </h4>
          </div>
          <p className="mt-1.5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t(descKey)}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {pills.map((pill) => (
          <span
            key={pill}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            {pill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────

export function WhyNotNextjs() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 via-white to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 mb-6 border border-red-200 dark:border-red-800/50">
            <XCircleIcon className="w-4 h-4" />
            {t("landing.whyNotNextjs.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
            {t("landing.whyNotNextjs.sectionTitle")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("landing.whyNotNextjs.sectionSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Left: Next.js pain points ───── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/15 dark:bg-red-500/20 flex items-center justify-center text-red-500 text-xs font-bold">
                  ✕
                </span>
                {t("landing.whyNotNextjs.problemsTitle")}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {t("landing.whyNotNextjs.problemsSubtitle")}
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {PAIN_POINTS.map((p, i) => (
                <PainCard key={p.key} painKey={p.key} Icon={p.Icon} index={i} />
              ))}
            </div>
          </div>

          {/* ── Right: Our SSR+CSR solution ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs">
                  <CheckCircleIcon className="w-4 h-4" />
                </span>
                {t("landing.whyNotNextjs.solutionTitle")}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {t("landing.whyNotNextjs.solutionSubtitle")}
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              <SolutionCard
                tag="SSR"
                tagColor="bg-indigo-500"
                Icon={GlobeAltIcon}
                titleKey="landing.whyNotNextjs.ssr.title"
                descKey="landing.whyNotNextjs.ssr.desc"
                pills={["React Router v7", "Hono", "SEO Ready", "Fast FCP"]}
                index={0}
              />
              <SolutionCard
                tag="CSR"
                tagColor="bg-emerald-500"
                Icon={RectangleStackIcon}
                titleKey="landing.whyNotNextjs.csr.title"
                descKey="landing.whyNotNextjs.csr.desc"
                pills={[
                  "Vite SPA",
                  "TanStack Query",
                  "Instant HMR",
                  "No SSR Overhead",
                ]}
                index={1}
              />
            </div>

            {/* Divider note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40"
            >
              <MagnifyingGlassIcon className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {t("landing.whyNotNextjs.clarification")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
