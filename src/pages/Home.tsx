import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Howdy, I&apos;m Charlie.</h1>

        <p>
          AI-driven software engineer specializing in computer vision, backend
          systems, and real-world engineering problems.
        </p>

        <p>
          I build full-stack applications, intelligent tools, and modern
          engineering systems that solve actual problems.
        </p>

        <Link className="cta-btn" to="/projects">
          View My Projects
        </Link>
      </div>

      <div className="hero-image">
        <img src="/assets/img/profile.jpg" alt="Charlie profile" />
      </div>
    </section>
  );
}
