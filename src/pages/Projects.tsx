import { useState } from 'react';
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
      <div>
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
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects">
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
      </div>
    </section>
  );
}
