import { useState } from 'react';
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
  if (normalize.includes('redis')) return <SiRedis />;
  if (normalize.includes('heroku')) return <SiHeroku />;
  if (normalize.includes('fastapi')) return <SiFastapi />;
  if (normalize.includes('sqlite')) return <SiSqlite />;
  if (normalize.includes('typescript')) return <SiTypescript />;
  if (normalize.includes('firebase')) return <SiFirebase />;
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
  description: string[];
  tags: string[];
  link?: string;
  category: 'AI/ML' | 'Full Stack' | 'Mobile' | 'Other';
};

const projects = projectsData as Project[];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

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
            <div className="tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {getIcon(tag)} {tag}
                </span>
              ))}
            </div>
            <ul>
              {project.description.map((desc, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </ul>
          </div>
        ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
