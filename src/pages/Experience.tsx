import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  CalendarRange,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import experienceData from '../assets/experience/data.json';
import BentoPanel from '../components/BentoPanel';
import SectionHeading from '../components/SectionHeading';
import SegmentedControl, {
  type SegmentedControlOption,
} from '../components/SegmentedControl';

type EducationEntry = {
  institution: string;
  location: string;
  degree: string;
  date: string;
  details?: string[];
};

type WorkEntry = {
  company: string;
  location: string;
  role: string;
  date: string;
  highlights?: string[];
};

type ExperienceData = {
  education: EducationEntry[];
  work_experience: WorkEntry[];
};

type TimelineItem = {
  type: 'education' | 'work';
  title: string;
  org: string;
  location: string;
  date: string;
  details: string[];
  sortDate: number;
};

const data = experienceData as ExperienceData;
type ExperienceFilter = 'all' | 'work' | 'education';

const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parseMonthYear = (value: string) => {
  const [month, year] = value.trim().split(' ');
  if (!month || !year) return new Date(0);
  const monthIndex = MONTH_INDEX[month] ?? 0;
  return new Date(Number(year), monthIndex, 1);
};

const getSortDate = (range: string) => {
  const [start] = range.split('-');
  return parseMonthYear(start);
};

const formatRange = (range: string) => {
  const [start, end] = range.split(' - ').map((part) => part.trim());
  return { start, end: end ?? '' };
};

const filterOptions: Array<SegmentedControlOption<ExperienceFilter>> = [
  { value: 'all', label: 'All' },
  { value: 'work', label: 'Work', icon: BriefcaseBusiness },
  { value: 'education', label: 'Education', icon: GraduationCap },
];

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [expandAll, setExpandAll] = useState(false);
  const [viewFilter, setViewFilter] = useState<ExperienceFilter>('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const educationItems: TimelineItem[] = data.education.map((entry) => ({
    type: 'education',
    title: entry.degree,
    org: entry.institution,
    location: entry.location,
    date: entry.date,
    details: entry.details ?? [],
    sortDate: getSortDate(entry.date).getTime(),
  }));

  const workItems: TimelineItem[] = data.work_experience.map((entry) => ({
    type: 'work',
    title: entry.role,
    org: entry.company,
    location: entry.location,
    date: entry.date,
    details: entry.highlights ?? [],
    sortDate: getSortDate(entry.date).getTime(),
  }));

  const sortedEducationItems = [...educationItems].sort(
    (a, b) => b.sortDate - a.sortDate,
  );
  const sortedWorkItems = [...workItems].sort(
    (a, b) => b.sortDate - a.sortDate,
  );
  const timelineItems = [...sortedEducationItems, ...sortedWorkItems].sort(
    (a, b) => b.sortDate - a.sortDate,
  );
  const filteredTimelineItems =
    viewFilter === 'all'
      ? timelineItems
      : viewFilter === 'work'
      ? sortedWorkItems
      : sortedEducationItems;


  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <motion.section
      className="w-full space-y-6 lg:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionHeading
        eyebrow="Experience"
        title="A leaner timeline with the details hidden until they matter."
        description="Work and education are kept on one vertical track. The first pass is easy to scan; the deeper descriptions live behind accordions."
      />

      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
        <BentoPanel className="rounded-[28px] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Roles
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
            {data.work_experience.length}
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Applied engineering and research roles across industry and academia.
          </p>
        </BentoPanel>
        <BentoPanel className="rounded-[28px] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Education
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
            {data.education.length}
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Formal training in computer science with a strong ML and systems slant.
          </p>
        </BentoPanel>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <SegmentedControl
          id="experience-filter"
          options={filterOptions}
          value={viewFilter}
          onChange={setViewFilter}
        />
        <button
          type="button"
          onClick={() => setExpandAll((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-xl transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-white"
        >
          {expandAll ? 'Collapse all details' : 'Expand all details'}
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <div className="absolute bottom-0 left-[13px] top-3 w-px bg-zinc-200 dark:bg-white/10" />
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {filteredTimelineItems.map((item, index) => {
              const range = formatRange(item.date);
              const itemKey = `${item.type}-${item.org}-${item.title}-${index}`;
              const isExpanded = expandAll || Boolean(expandedItems[itemKey]);
              const Icon = item.type === 'education' ? GraduationCap : BriefcaseBusiness;

              return (
                <motion.article
                  key={`${item.type}-${item.org}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24 }}
                  className="relative pl-10"
                >
                  <span className="absolute left-0 top-7 h-[26px] w-[26px] rounded-full border-[6px] border-emerald-500 bg-zinc-50 shadow-[0_0_0_6px_rgba(16,185,129,0.12)] dark:bg-zinc-950" />
                  <BentoPanel className="rounded-[30px] p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 dark:border-white/10 dark:bg-white/[0.04]">
                              <CalendarRange className="h-4 w-4" />
                              {range.start}
                              {range.end ? ` — ${range.end}` : ''}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {item.location}
                            </span>
                          </div>
                          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                            {item.org}
                          </p>
                        </div>
                      </div>
                      {item.details.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleItem(itemKey)}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {item.details.length > 0 && isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="mt-5 space-y-3 overflow-hidden border-t border-zinc-200 pt-5 text-sm leading-7 text-zinc-600 dark:border-white/10 dark:text-zinc-300"
                        >
                          {item.details.map((detail, detailIndex) => (
                            <li key={`${item.org}-${detailIndex}`} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </BentoPanel>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  );
}
