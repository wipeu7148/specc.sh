/**
 * Features — Feature highlights section
 * 1:1 port of miu2d Features spotlight hover glow card effect
 */

import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

type IconProps = { className?: string };

// ── Icon Components ──────────────────────────────────────────────────────────

function ShieldCheckIcon({ className }: IconProps) {
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
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function BoltIcon({ className }: IconProps) {
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
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  );
}

function DatabaseIcon({ className }: IconProps) {
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
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  );
}

function SwatchIcon({ className }: IconProps) {
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
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  );
}

function LockClosedIcon({ className }: IconProps) {
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

function LanguageIcon({ className }: IconProps) {
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
        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
      />
    </svg>
  );
}

function SunMoonIcon({ className }: IconProps) {
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
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function GlobeAltIcon({ className }: IconProps) {
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
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function UsersGroupIcon({ className }: IconProps) {
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
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
}

// ── Feature definitions ──────────────────────────────────────────────────────

const FEATURES = [
  {
    key: "typeSafe" as const,
    Icon: ShieldCheckIcon,
    gradient: "from-indigo-500 to-blue-500",
    spotlightColor: "99, 102, 241",
  },
  {
    key: "aiSpeed" as const,
    Icon: BoltIcon,
    gradient: "from-violet-500 to-purple-500",
    spotlightColor: "167, 139, 250",
  },
  {
    key: "database" as const,
    Icon: DatabaseIcon,
    gradient: "from-teal-500 to-cyan-500",
    spotlightColor: "20, 184, 166",
  },
  {
    key: "ui" as const,
    Icon: SwatchIcon,
    gradient: "from-pink-500 to-rose-500",
    spotlightColor: "244, 114, 182",
  },
  {
    key: "auth" as const,
    Icon: LockClosedIcon,
    gradient: "from-amber-500 to-orange-500",
    spotlightColor: "251, 191, 36",
  },
  {
    key: "i18n" as const,
    Icon: LanguageIcon,
    gradient: "from-emerald-500 to-green-500",
    spotlightColor: "74, 222, 128",
  },
  {
    key: "theme" as const,
    Icon: SunMoonIcon,
    gradient: "from-sky-500 to-cyan-500",
    spotlightColor: "14, 165, 233",
  },
  {
    key: "locale" as const,
    Icon: GlobeAltIcon,
    gradient: "from-violet-500 to-indigo-500",
    spotlightColor: "139, 92, 246",
  },
  {
    key: "workspace" as const,
    Icon: UsersGroupIcon,
    gradient: "from-orange-500 to-amber-500",
    spotlightColor: "249, 115, 22",
  },
];

// ── FeatureCard ──────────────────────────────────────────────────────────────

interface FeatureCardProps {
  featureKey: string;
  Icon: React.ComponentType<IconProps>;
  gradient: string;
  spotlightColor: string;
}

function FeatureCard({
  featureKey,
  Icon,
  gradient,
  spotlightColor,
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="feature-card relative h-full rounded-2xl"
      data-spotlight-color={spotlightColor}
      style={
        {
          "--spotlight-color": spotlightColor,
          "--spotlight-x": "0px",
          "--spotlight-y": "0px",
          "--spotlight-opacity": "0",
        } as React.CSSProperties
      }
    >
      {/* Default border — light mode */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none dark:hidden"
        style={{
          background: `linear-gradient(135deg, rgba(${spotlightColor}, 0.25), rgba(${spotlightColor}, 0.1))`,
        }}
      />
      {/* Default border — dark mode */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none hidden dark:block"
        style={{
          background: `linear-gradient(135deg, rgba(${spotlightColor}, 0.2), rgba(${spotlightColor}, 0.08))`,
        }}
      />

      {/* Spotlight border layer (mask: only show 2px border ring) */}
      <div
        className="spotlight-layer absolute inset-0 rounded-2xl pointer-events-none"
        style={
          {
            opacity: "var(--spotlight-opacity)",
            background: `radial-gradient(600px circle at var(--spotlight-x) var(--spotlight-y), rgba(var(--spotlight-color), 1) 0%, rgba(var(--spotlight-color), 0.9) 15%, rgba(var(--spotlight-color), 0.6) 30%, transparent 50%)`,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px",
          } as React.CSSProperties
        }
      />

      {/* Card content background — light */}
      <div className="absolute inset-[2px] rounded-[14px] bg-white/80 dark:bg-transparent backdrop-blur-sm" />
      {/* Card content background — dark */}
      <div className="absolute inset-[2px] rounded-[14px] hidden dark:block dark:bg-zinc-900/95 pointer-events-none" />

      {/* Spotlight background glow */}
      <div
        className="spotlight-layer absolute inset-[2px] rounded-[14px] pointer-events-none"
        style={
          {
            opacity: "var(--spotlight-opacity)",
            background: `radial-gradient(400px circle at calc(var(--spotlight-x) - 2px) calc(var(--spotlight-y) - 2px), rgba(var(--spotlight-color), 0.25), transparent 50%)`,
          } as React.CSSProperties
        }
      />

      {/* Content */}
      <div className="relative z-20 p-6">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
          {t(`landing.features.items.${featureKey}.title`)}
        </h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t(`landing.features.items.${featureKey}.desc`)}
        </p>
      </div>
    </motion.div>
  );
}

// ── Features Section ─────────────────────────────────────────────────────────

export function Features() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Native DOM event handling — completely bypasses React render cycle for smooth spotlight
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSpotlight = (clientX: number, clientY: number) => {
      for (const card of Array.from(
        container.querySelectorAll<HTMLElement>(".feature-card"),
      )) {
        const rect = card.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;
        const dx = relativeX - rect.width / 2;
        const dy = relativeY - rect.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 350;
        if (distance < maxDistance) {
          const opacity = Math.max(0.3, 1 - distance / maxDistance);
          card.style.setProperty("--spotlight-x", `${relativeX}px`);
          card.style.setProperty("--spotlight-y", `${relativeY}px`);
          card.style.setProperty("--spotlight-opacity", opacity.toString());
        } else {
          card.style.setProperty("--spotlight-opacity", "0");
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) =>
      updateSpotlight(e.clientX, e.clientY);
    const handleMouseLeave = () => {
      for (const card of Array.from(
        container.querySelectorAll<HTMLElement>(".feature-card"),
      )) {
        card.style.setProperty("--spotlight-opacity", "0");
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
            {t("landing.features.sectionTitle")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("landing.features.sectionSubtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                featureKey={feature.key}
                Icon={feature.Icon}
                gradient={feature.gradient}
                spotlightColor={feature.spotlightColor}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
