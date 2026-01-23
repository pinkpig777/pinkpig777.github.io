import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleNetwork from '../components/ParticleNetwork';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      <ParticleNetwork />
      <motion.section 
        className="hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
      <div className="hero-text">
        <motion.h1 variants={itemVariants}>Howdy, I&apos;m Charlie.</motion.h1>
        <motion.p variants={itemVariants}>
          AI-driven software engineer specializing in computer vision, backend
          systems, and real-world engineering problems.
        </motion.p>
        <motion.p variants={itemVariants}>
          I build full-stack applications, intelligent tools, and modern
          engineering systems that solve actual problems.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link className="cta-btn" to="/projects">
            View My Projects
          </Link>
        </motion.div>
      </div>

      <motion.div className="hero-image" variants={itemVariants}>
        <img src="/assets/img/profile.jpg" alt="Charlie profile" />
      </motion.div>
      </motion.section>
    </>
  );
}
