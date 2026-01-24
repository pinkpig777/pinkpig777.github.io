import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import experienceData from '../assets/experience/data.json';

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
  projects?: {
    name: string;
    technologies: string;
    highlights: string[];
  }[];
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

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [expandAll, setExpandAll] = useState(false);
  const [viewFilter, setViewFilter] = useState<'all' | 'work' | 'education'>('all');

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
      className="experience-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants}>My Experience</motion.h1>
      <motion.p className="experience-subtext" variants={itemVariants}>
        Timeline of education and work experience.
      </motion.p>

      <motion.div className="experience-stats" variants={itemVariants}>
        <div className="experience-stat experience-stat--work">
          <div className="experience-stat-icon">
            <FaBriefcase />
          </div>
          <div>
            <div className="experience-stat-value">{data.work_experience.length}</div>
            <div className="experience-stat-label">Positions Held</div>
          </div>
        </div>
        <div className="experience-stat experience-stat--edu">
          <div className="experience-stat-icon">
            <FaGraduationCap />
          </div>
          <div>
            <div className="experience-stat-value">{data.education.length}</div>
            <div className="experience-stat-label">Degrees</div>
          </div>
        </div>
      </motion.div>

      <motion.div className="experience-controls" variants={itemVariants}>
        <div className="experience-filter" role="tablist" aria-label="Experience filter">
          <button
            type="button"
            className={`experience-filter-btn ${viewFilter === 'all' ? 'is-active' : ''}`}
            data-filter="all"
            onClick={() => setViewFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`experience-filter-btn ${viewFilter === 'work' ? 'is-active' : ''}`}
            data-filter="work"
            onClick={() => setViewFilter('work')}
          >
            <FaBriefcase />
            Work
          </button>
          <button
            type="button"
            className={`experience-filter-btn ${viewFilter === 'education' ? 'is-active' : ''}`}
            data-filter="education"
            onClick={() => setViewFilter('education')}
          >
            <FaGraduationCap />
            Edu
          </button>
        </div>
        <button
          type="button"
          className="experience-toggle-all"
          onClick={() => setExpandAll((prev) => !prev)}
        >
          {expandAll ? 'Collapse all details' : 'Expand all details'}
        </button>
      </motion.div>

      <div className="experience-timeline">
        <AnimatePresence mode="popLayout">
          {filteredTimelineItems.map((item, index) => {
            const range = formatRange(item.date);
            const itemKey = `${item.type}-${item.org}-${item.title}-${index}`;
            const isExpanded = expandAll || Boolean(expandedItems[itemKey]);
            return (
              <motion.article
                key={`${item.type}-${item.org}-${index}`}
                className={`experience-item experience-item--${item.type}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="experience-time">
                  <span className="experience-time-start">{range.start}</span>
                  <span className="experience-time-end">{range.end}</span>
                </div>
                <div className="experience-node">
                  <span className="experience-dot" />
                </div>
                <div className="experience-card">
                  <div className="experience-card-header">
                    <div className="experience-card-heading">
                      <div className="experience-card-icon">
                        {item.type === 'education' ? <FaGraduationCap /> : <FaBriefcase />}
                      </div>
                      <div>
                        <h3 className="experience-card-title">{item.title}</h3>
                        <p className="experience-card-org">{item.org}</p>
                        <p className="experience-card-location">
                          <FaMapMarkerAlt />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </div>
                    {item.details.length > 0 && (
                      <button
                        type="button"
                        className="experience-toggle"
                        onClick={() => toggleItem(itemKey)}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                      >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    )}
                  </div>
                  {item.details.length > 0 && isExpanded && (
                    <ul className="experience-card-list">
                      {item.details.map((detail, detailIndex) => (
                        <li key={`${item.org}-${detailIndex}`}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
