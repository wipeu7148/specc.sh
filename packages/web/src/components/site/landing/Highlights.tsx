/**
 * Highlights — Core capabilities showcase
 * 1:1 port of miu2d HighlightCard + LargeHighlight card pattern
 */

import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiStreamDemo } from "./AiStreamDemo";
import {
  BoltIcon,
  BuildingIcon,
  DatabaseIcon,
  ShieldIcon,
  SparklesIcon,
  SwatchIcon,
} from "./LandingIcons";
import { TrpcTypeDemo } from "./TrpcTypeDemo";
import { WorkspaceDemo } from "./WorkspaceDemo";

// ── HighlightCard (1:1 miu2d pattern) ─────────────────────────────────────
interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

function HighlightCard({
  icon,
  title,
  description,
  gradient,
  delay = 0,
}: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      {/* Glow background */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
      />

      <div className="relative h-full p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-lg">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg mb-4`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ── LargeHighlight (1:1 miu2d pattern) ────────────────────────────────────
interface LargeHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  demo: React.ReactNode;
  stats?: { label: string; value: string }[];
  reversed?: boolean;
  delay?: number;
}

function LargeHighlight({
  icon,
  title,
  description,
  gradient,
  demo,
  stats,
  reversed = false,
  delay = 0,
}: LargeHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}
    >
      {/* Content area */}
      <div className="flex-1 text-center lg:text-left">
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl mb-6`}
        >
          {icon}
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          {description}
        </p>
        {stats && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div
                  className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Demo area */}
      <div className="flex-1 w-full flex justify-center">{demo}</div>
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export function Highlights() {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      id="highlights"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
            {t("landing.highlights.title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("landing.highlights.subtitle")}
          </p>
        </motion.div>

        {/* tRPC type safety — large card */}
        <div className="mb-24">
          <LargeHighlight
            icon={<ShieldIcon className="w-8 h-8" />}
            title={t("landing.highlights.trpc.title")}
            description={t("landing.highlights.trpc.desc")}
            gradient="from-blue-500 to-indigo-600"
            demo={<TrpcTypeDemo />}
            stats={[
              {
                label: t("landing.highlights.trpc.stat1Label"),
                value: t("landing.highlights.trpc.stat1"),
              },
              {
                label: t("landing.highlights.trpc.stat2Label"),
                value: t("landing.highlights.trpc.stat2"),
              },
            ]}
          />
        </div>

        {/* AI integration — large card (reversed) */}
        <div className="mb-24">
          <LargeHighlight
            icon={<SparklesIcon className="w-8 h-8" />}
            title={t("landing.highlights.ai.title")}
            description={t("landing.highlights.ai.desc")}
            gradient="from-violet-500 to-purple-600"
            demo={<AiStreamDemo />}
            stats={[
              {
                label: t("landing.highlights.ai.stat1Label"),
                value: t("landing.highlights.ai.stat1"),
              },
              {
                label: t("landing.highlights.ai.stat2Label"),
                value: t("landing.highlights.ai.stat2"),
              },
            ]}
            reversed
            delay={0.1}
          />
        </div>

        {/* Multi-workspace — large card */}
        <div className="mb-24">
          <LargeHighlight
            icon={<BuildingIcon className="w-8 h-8" />}
            title={t("landing.highlights.workspace.title")}
            description={t("landing.highlights.workspace.desc")}
            gradient="from-emerald-500 to-teal-600"
            demo={<WorkspaceDemo />}
            delay={0.2}
          />
        </div>

        {/* Small highlight cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <HighlightCard
            icon={<DatabaseIcon className="w-6 h-6" />}
            title={t("landing.highlights.prisma.title")}
            description={t("landing.highlights.prisma.desc")}
            gradient="from-teal-500 to-cyan-600"
            delay={0}
          />
          <HighlightCard
            icon={<BoltIcon className="w-6 h-6" />}
            title={t("landing.highlights.i18n.title")}
            description={t("landing.highlights.i18n.desc")}
            gradient="from-amber-500 to-orange-600"
            delay={0.1}
          />
          <HighlightCard
            icon={<SwatchIcon className="w-6 h-6" />}
            title={t("landing.highlights.ui.title")}
            description={t("landing.highlights.ui.desc")}
            gradient="from-pink-500 to-rose-600"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
