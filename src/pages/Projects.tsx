import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import projectsData from '../assets/projects.json';
import ProjectThumbnail from '../components/ProjectThumbnail';
import BentoPanel from '../components/BentoPanel';
import SectionHeading from '../components/SectionHeading';
import SegmentedControl, {
  type SegmentedControlOption,
} from '../components/SegmentedControl';
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  LayoutGrid,
  X,
} from 'lucide-react';
import { cn } from '../utils/cn';

type Project = {
  id: string;
  title: string;
  context?: string[];
  description: string[];
  tags: string[];
  link?: string;
  category: 'AI/ML' | 'Full Stack' | 'Mobile' | 'Other';
};

type ProjectFilter = 'All' | 'AI/ML' | 'Full Stack' | 'Other';

const featuredProjectIds = new Set([
  'art',
  'styledit',
  'conversation-series-manager',
]);

const categoryOptions: Array<SegmentedControlOption<ProjectFilter>> = [
  { value: 'All', label: 'All', icon: LayoutGrid },
  { value: 'AI/ML', label: 'AI / ML', icon: BrainCircuit },
  { value: 'Full Stack', label: 'Full Stack', icon: Blocks },
  { value: 'Other', label: 'Other' },
];

const projects = projectsData as Project[];

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  const activeProject = activeProjectId
    ? projects.find((project) => project.id === activeProjectId) ?? null
    : null;

  useEffect(() => {
    if (activeProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProjectId]);

  useEffect(() => {
    if (!activeProjectId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProjectId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProjectId]);

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

  const modalContent =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {activeProject && (
            <motion.div
              key={activeProject.id}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-950/70 px-4 py-6 backdrop-blur-md sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                type="button"
                aria-label="Close project details"
                onClick={() => setActiveProjectId(null)}
                className="absolute inset-0"
              />
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.24 }}
                className="surface relative z-10 w-full max-w-4xl overflow-hidden rounded-[36px] p-4 sm:p-5"
                role="dialog"
                aria-modal="true"
              >
                <button
                  type="button"
                  onClick={() => setActiveProjectId(null)}
                  className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <ProjectThumbnail
                    projectId={activeProject.id}
                    projectTitle={activeProject.title}
                    projectCategory={activeProject.category}
                    className="rounded-[28px]"
                  />

                  <div className="flex flex-col">
                    <span className="inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                      {activeProject.category}
                    </span>
                    <h2 className="mt-4 pr-14 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
                      {activeProject.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {activeProject.context?.[0] ?? activeProject.description[0]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {activeProject.link && (
                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                        >
                          Visit project
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveProjectId(null)}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[28px] border border-zinc-200/80 bg-zinc-950/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                    Delivery notes
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {activeProject.description.map((desc, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <motion.div
      className="w-full space-y-6 lg:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Personal projects built to prove range, rigor, and product taste."
        description="A curated mix of AI systems, full-stack products, and engineering-heavy builds. The layout is intentionally bento-style: bigger bets get more visual weight."
      />

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
      >
        <SegmentedControl
          id="project-filters"
          options={categoryOptions}
          value={filter}
          onChange={setFilter}
        />

        <BentoPanel className="max-w-xl rounded-[26px] p-4">
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            Featured projects span wider cells to emphasize the highest-leverage work.
            Every card keeps the same image ratio, compressed tag treatment, and a
            two-line summary for a cleaner scan path.
          </p>
        </BentoPanel>
      </motion.div>

      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-6"
      >
        {filteredProjects.map((project, index) => {
          const isFeatured = featuredProjectIds.has(project.id);
          const summary = project.context?.[0] ?? project.description[0] ?? '';

          return (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.04 }}
              className={cn(
                'group h-full',
                isFeatured ? 'md:col-span-2 xl:col-span-3' : 'xl:col-span-2',
              )}
            >
              <BentoPanel className="flex h-full flex-col rounded-[30px] p-3">
                <ProjectThumbnail
                  projectId={project.id}
                  projectTitle={project.title}
                  projectCategory={project.category}
                />

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                      {project.category}
                    </span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="line-clamp-3 transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <span className="line-clamp-3">
                        {project.title}
                      </span>
                    )}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={`${project.id}-${tag}`}
                        className="rounded-full border border-zinc-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-full border border-zinc-200/80 bg-zinc-950/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => setActiveProjectId(project.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500/30 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-200 dark:hover:border-emerald-400/30 dark:hover:text-emerald-400"
                    >
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      {project.id}
                    </span>
                  </div>
                </div>
              </BentoPanel>
            </motion.article>
          );
        })}

        {filteredProjects.length === 0 && (
          <BentoPanel className="md:col-span-2 xl:col-span-6 rounded-[30px] p-8">
            <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
              No projects matched this category.
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              This should normally not happen with the current dataset, but the
              fallback keeps the page from looking broken if categories drift.
            </p>
          </BentoPanel>
        )}
      </motion.div>
      {modalContent}
    </motion.div>
  );
}
