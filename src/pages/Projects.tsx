import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
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

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section className="projects-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Personal Projects</h1>
        <p>Below are some of my selected projects.</p>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
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
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="projects">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
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
                  <span className="tag" key={tag} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {getIcon(tag)} {tag}
                  </span>
                ))}
              </div>
              <ul>
                {project.description.map((desc, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
