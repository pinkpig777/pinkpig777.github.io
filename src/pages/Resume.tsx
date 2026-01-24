import { useState } from 'react';
import {
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import resumeData from '../assets/resume/data.json';

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

type ResumeData = {
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

const data = resumeData as ResumeData;

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

export default function Resume() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [expandAll, setExpandAll] = useState(false);

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

  const timelineItems = [...educationItems, ...workItems].sort(
    (a, b) => b.sortDate - a.sortDate,
  );

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="resume-section">
      <h1>My Resume</h1>
      <p className="resume-subtext">
        Timeline of education and work experience.
      </p>

      <div className="resume-stats">
        <div className="resume-stat resume-stat--work">
          <div className="resume-stat-icon">
            <FaBriefcase />
          </div>
          <div>
            <div className="resume-stat-value">{data.work_experience.length}</div>
            <div className="resume-stat-label">Positions Held</div>
          </div>
        </div>
        <div className="resume-stat resume-stat--edu">
          <div className="resume-stat-icon">
            <FaGraduationCap />
          </div>
          <div>
            <div className="resume-stat-value">{data.education.length}</div>
            <div className="resume-stat-label">Degrees</div>
          </div>
        </div>
      </div>

      <div className="resume-controls">
        <button
          type="button"
          className="resume-toggle-all"
          onClick={() => setExpandAll((prev) => !prev)}
        >
          {expandAll ? 'Collapse all details' : 'Expand all details'}
        </button>
      </div>

      <div className="resume-timeline">
        {timelineItems.map((item, index) => {
          const range = formatRange(item.date);
          const itemKey = `${item.type}-${item.org}-${item.title}-${index}`;
          const isExpanded = expandAll || Boolean(expandedItems[itemKey]);
          return (
            <article
              key={`${item.type}-${item.org}-${index}`}
              className={`resume-item resume-item--${item.type}`}
            >
              <div className="resume-time">
                <span className="resume-time-start">{range.start}</span>
                <span className="resume-time-end">{range.end}</span>
              </div>
              <div className="resume-node">
                <span className="resume-dot" />
              </div>
              <div className="resume-card">
                <div className="resume-card-header">
                  <div className="resume-card-heading">
                    <div className="resume-card-icon">
                      {item.type === 'education' ? <FaGraduationCap /> : <FaBriefcase />}
                    </div>
                    <div>
                      <h3 className="resume-card-title">{item.title}</h3>
                      <p className="resume-card-org">{item.org}</p>
                      <p className="resume-card-location">
                        <FaMapMarkerAlt />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>
                  {item.details.length > 0 && (
                    <button
                      type="button"
                      className="resume-toggle"
                      onClick={() => toggleItem(itemKey)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  )}
                </div>
                {item.details.length > 0 && isExpanded && (
                  <ul className="resume-card-list">
                    {item.details.map((detail, detailIndex) => (
                      <li key={`${item.org}-${detailIndex}`}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
