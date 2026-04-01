import { motion } from 'framer-motion';
import {
  Blocks,
  BrainCircuit,
  CloudCog,
  Code2,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
} from 'lucide-react';
import BentoPanel from '../components/BentoPanel';
import SectionHeading from '../components/SectionHeading';

const skillGroups = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Ruby'],
  },
  {
    title: 'Frontend',
    icon: MonitorSmartphone,
    skills: ['React', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: ServerCog,
    skills: ['FastAPI', 'Rails', 'PostgreSQL', 'Firebase'],
  },
  {
    title: 'AI & CV',
    icon: BrainCircuit,
    skills: ['PyTorch', 'OpenCV', 'NumPy', 'Scikit-learn'],
  },
  {
    title: 'Infrastructure',
    icon: CloudCog,
    skills: ['Docker', 'Linux', 'Firebase', 'PostgreSQL'],
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="w-full space-y-6 lg:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionHeading
        eyebrow="About Me"
        title="Engineering at the intersection of intelligent systems and product quality."
        description="I care about useful AI, strong backend foundations, and frontend interfaces that feel polished rather than improvised."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <BentoPanel className="h-full rounded-[32px] p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Builder mindset
            </div>

            <div className="mt-6 space-y-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
              <p>
                I&apos;m Charlie Chiu, a Master of Computer Science student at Texas A&amp;M
                University focused on AI-powered computer vision, scalable backend
                systems, and full-stack product engineering.
              </p>
              <p>
                My best work usually sits between research depth and engineering
                discipline: taking technically ambitious ideas and shaping them into
                systems that can actually be deployed, maintained, and trusted.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                  AI systems
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Model pipelines, retrieval, evaluation loops, and computer vision workflows.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  Backend
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  APIs, data flows, background jobs, and pragmatic architecture.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  Frontend
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Interfaces with hierarchy, intentional motion, and engineering-grade UX.
                </p>
              </div>
            </div>
          </BentoPanel>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-5">
          <BentoPanel className="h-full rounded-[32px] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white/80 text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                <Blocks className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
                  Technical Arsenal
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Compact capability widgets instead of generic category cards.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  Working principle
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Strong systems are not only technically correct. They should also be
                  legible, resilient, and pleasant to evolve.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  Sweet spot
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Applied ML, data-backed product design, and full-stack builds with a clear UX layer.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  What I optimize for
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Fast iteration without losing correctness, maintainability, or interface quality.
                </p>
              </div>
            </div>
          </BentoPanel>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-12">
          <BentoPanel className="rounded-[32px] p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  Technical Arsenal
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  Compact skill widgets with tighter hierarchy.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                The toolkit is grouped by how I think about systems in practice, not
                by generic resume buckets.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {skillGroups.map((group) => {
                const Icon = group.icon;

                return (
                  <div
                    key={group.title}
                    className="rounded-3xl border border-zinc-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white/80 text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
                        {group.title}
                      </h3>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-950/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </BentoPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
