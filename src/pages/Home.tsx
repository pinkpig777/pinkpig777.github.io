import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Boxes,
  Code2,
  Cpu,
  NotebookPen,
  Sparkles,
  Waypoints,
} from 'lucide-react';
import BentoPanel from '../components/BentoPanel';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const capabilityPanels = [
    {
      icon: BrainCircuit,
      title: 'Applied AI',
      description:
        'RAG systems, computer vision pipelines, evaluation loops, and model-assisted product workflows grounded in real constraints.',
    },
    {
      icon: Code2,
      title: 'Product Engineering',
      description:
        'Frontend polish, backend reliability, and end-to-end systems that feel deliberate from architecture to UX.',
    },
    {
      icon: Waypoints,
      title: 'Systems Thinking',
      description:
        'I like software that scales in both directions: technically under load and organizationally as a product matures.',
    },
  ];

  return (
    <motion.div
      className="w-full space-y-6 lg:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={itemVariants}>
          <BentoPanel className="relative overflow-hidden rounded-[36px] p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              AI + Full-Stack Engineer
            </div>

            <h1 className="mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white">
              Building AI-powered software that holds up in the real world.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-400">
              I&apos;m Charlie Chiu, an engineer focused on computer vision, backend systems,
              and high-leverage product development. I like turning messy, ambiguous
              problems into systems that are fast, reliable, and actually shippable.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-white"
              >
                Let&apos;s Build Something
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="surface-muted rounded-3xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  Focus
                </p>
                <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Applied AI, platform engineering, and polished product delivery
                </p>
              </div>
              <div className="surface-muted rounded-3xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  Stack
                </p>
                <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  React, Python, FastAPI, Firebase, Postgres, and model pipelines
                </p>
              </div>
              <div className="surface-muted rounded-3xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  Outcome
                </p>
                <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Useful software, clear UX, and systems that survive real usage
                </p>
              </div>
            </div>
          </BentoPanel>
        </motion.div>

        <div className="grid gap-6">
          <motion.div variants={itemVariants}>
            <BentoPanel className="overflow-hidden rounded-[32px] p-3">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[24px]">
                <img
                  src="/assets/img/profile.jpg"
                  alt="Charlie Chiu portrait"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    Currently exploring
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                    Retrieval systems, edge inference, and better systems thinking.
                  </p>
                </div>
              </div>
            </BentoPanel>
          </motion.div>

          <motion.div variants={itemVariants}>
            <BentoPanel className="grid gap-4 rounded-[32px] p-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200/80 bg-zinc-950 px-4 py-5 text-white dark:border-white/10 dark:bg-white/[0.05]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Cpu className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Delivery
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-200">
                  I care about moving from prototype to production without losing rigor.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/70 px-4 py-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-300">
                  <Boxes className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Systems
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  I prefer interfaces and architectures that stay clean as the product grows.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/70 px-4 py-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                  <NotebookPen className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Working Style
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Product-aware engineering, blunt tradeoff analysis, and pragmatic implementation.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/70 px-4 py-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Goal
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Ship software that feels premium to users and dependable to teams.
                </p>
              </div>
            </BentoPanel>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {capabilityPanels.map((panel) => {
          const Icon = panel.icon;

          return (
            <motion.div key={panel.title} variants={itemVariants}>
              <BentoPanel className="h-full rounded-[30px] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                  {panel.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {panel.description}
                </p>
              </BentoPanel>
            </motion.div>
          );
        })}
      </section>
    </motion.div>
  );
}
