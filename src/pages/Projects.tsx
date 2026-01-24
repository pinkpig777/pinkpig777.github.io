import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import projectsData from '../assets/projects.json';
import {
  FaPython,
  FaReact,
  FaVuejs,
  FaTasks,
  FaBrain,
  FaRobot,
  FaDatabase,
  FaChartPie,
} from 'react-icons/fa';
import {
  SiPytorch,
  SiHuggingface,
  SiSocketdotio,
  SiJavascript,
  SiRubyonrails,
  SiPostgresql,
  SiRedis,
  SiHeroku,
  SiFastapi,
  SiSqlite,
  SiTypescript,
  SiFirebase,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';

const getIcon = (tag: string) => {
  const normalize = tag.toLowerCase();
  if (normalize.includes('python')) return <FaPython />;
  if (normalize.includes('react')) return <FaReact />;
  if (normalize.includes('vue')) return <FaVuejs />;
  if (normalize.includes('pytorch')) return <SiPytorch />;
  if (normalize.includes('transformers')) return <SiHuggingface />;
  if (normalize.includes('socket')) return <SiSocketdotio />;
  if (normalize.includes('javascript')) return <SiJavascript />;
  if (normalize.includes('ruby')) return <SiRubyonrails />;
  if (normalize.includes('postgres')) return <SiPostgresql />;
  if (normalize.includes('supabase')) return <SiSupabase />;
  if (normalize.includes('redis')) return <SiRedis />;
  if (normalize.includes('heroku')) return <SiHeroku />;
  if (normalize.includes('fastapi')) return <SiFastapi />;
  if (normalize.includes('sqlite')) return <SiSqlite />;
  if (normalize.includes('typescript')) return <SiTypescript />;
  if (normalize.includes('firebase')) return <SiFirebase />;
  if (normalize.includes('tailwind')) return <SiTailwindcss />;
  if (normalize.includes('recharts')) return <FaChartPie />;
  if (normalize.includes('finnhub')) return <FaChartPie />;
  if (normalize.includes('rag')) return <FaBrain />;
  if (normalize.includes('agent')) return <FaRobot />;
  if (normalize.includes('database') || normalize.includes('chroma'))
    return <FaDatabase />;
  return <FaTasks />;
};

const categories = ['All', 'AI/ML', 'Full Stack', 'Other'];

type Project = {
  id: string;
  title: string;
  context?: string[];
  description: string[];
  tags: string[];
  link?: string;
  category: 'AI/ML' | 'Full Stack' | 'Mobile' | 'Other';
};

const projects = projectsData as Project[];

export default function Projects() {
  const [filter, setFilter] = useState('All');
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

  const modalContent = activeProject ? (
    <div className="project-modal" role="dialog" aria-modal="true">
      <div className="project-modal__overlay" onClick={() => setActiveProjectId(null)} />
      <div className="project-modal__card">
        <button
          type="button"
          className="project-modal__close"
          onClick={() => setActiveProjectId(null)}
        >
          Back
        </button>
        <h2>{activeProject.title}</h2>
        <div className="tags">
          {activeProject.tags.map((tag) => (
            <span className="tag" key={tag}>
              {getIcon(tag)} {tag}
            </span>
          ))}
        </div>
        <ul>
          {activeProject.description.map((desc, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{
                __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  ) : null;

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <section className="projects-section">
          <motion.h1 variants={itemVariants}>Personal Projects</motion.h1>
          <motion.p variants={itemVariants}>Below are some of my selected projects.</motion.p>

          {/* Filter Bar */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  background: filter === cat ? 'var(--primary)' : 'var(--bg-card)',
                  color: filter === cat ? '#fff' : 'var(--text)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="projects">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >
              <h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {project.title}
                </a>
              </h2>
              {project.context && project.context.length > 0 && (
                <div className="project-context">
                  {project.context.map((line, index) => (
                    <p key={`${project.id}-context-${index}`}>{line}</p>
                  ))}
                </div>
              )}
              <div className="project-actions">
                <button
                  type="button"
                  className="project-toggle"
                  onClick={() => setActiveProjectId(project.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          </motion.div>
        </section>
      </motion.div>
      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
