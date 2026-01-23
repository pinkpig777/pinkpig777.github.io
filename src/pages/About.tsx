import { motion } from 'framer-motion';
import { 
  FaPython, FaJs, FaReact, FaNodeJs, FaCloud,
  FaTerminal, FaCode, FaGem, FaBrain
} from 'react-icons/fa';
import { 
  SiTypescript, SiRubyonrails, SiFastapi, SiPostgresql, 
  SiPytorch, SiOpencv, SiNumpy, 
  SiScikitlearn, SiDocker, SiLinux, SiFirebase
} from 'react-icons/si';

const skillGroups = [
  {
    title: 'Languages',
    icon: <FaCode />,
    skills: [
      { name: 'Python', icon: <FaPython color="#3776ab" /> },
      { name: 'TypeScript', icon: <SiTypescript color="#3178c6" /> },
      { name: 'JavaScript', icon: <FaJs color="#f7df1e" /> },
      { name: 'C++', icon: <FaCode color="#00599c" /> },
      { name: 'Ruby', icon: <FaGem color="#cc342d" /> },
    ]
  },
  {
    title: 'Frontend',
    icon: <FaTerminal />,
    skills: [
      { name: 'React', icon: <FaReact color="#61dafb" /> },
      { name: 'HTML/CSS', icon: <FaCode color="#e34f26" /> },
    ]
  },
  {
    title: 'Backend',
    icon: <FaNodeJs />,
    skills: [
      { name: 'FastAPI', icon: <SiFastapi color="#05998b" /> },
      { name: 'Rails', icon: <SiRubyonrails color="#cc0000" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
    ]
  },
  {
    title: 'AI & CV',
    icon: <FaBrain />,
    skills: [
      { name: 'PyTorch', icon: <SiPytorch color="#ee4c2c" /> },
      { name: 'OpenCV', icon: <SiOpencv color="#5c3ee8" /> },
      { name: 'NumPy', icon: <SiNumpy color="#013243" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn color="#f7931e" /> },
    ]
  },
  {
    title: 'Infrastructure',
    icon: <FaCloud />,
    skills: [
      { name: 'Docker', icon: <SiDocker color="#2496ed" /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'Firebase', icon: <SiFirebase color="#ffca28" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql color="#336791" /> },
    ]
  }
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ maxWidth: '900px', margin: '0 auto' }}
    >
      <section className="about">
        <motion.h1 variants={itemVariants}>About Me</motion.h1>

        <motion.p variants={itemVariants}>
          I&apos;m Charlie Chiu, a Master of Computer Science student at Texas
          A&M University, specializing in AI-powered computer vision, scalable backend
          systems, and full-stack product engineering.
        </motion.p>

        <motion.p variants={itemVariants}>
          I build systems that bridge the gap between advanced models and real-world 
          utility. My work ranges from optimizing PPE detection pipelines to architecting 
          AI-driven automation platforms that solve practical business problems.
        </motion.p>
      </section>

      <section className="skills-upgrade">
        <motion.h2 variants={itemVariants} style={{ marginBottom: '2rem' }}>Technical Arsenal</motion.h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {skillGroups.map((group) => (
            <motion.div 
              key={group.title} 
              variants={itemVariants}
              className="project-card" 
              style={{ padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--primary)' }}>
                <span style={{ fontSize: '1.2rem' }}>{group.icon}</span>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{group.title}</h3>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="tag"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
