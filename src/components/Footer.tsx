import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer-clean">
      <div className="footer-main">
        <div className="footer-brand">
          <h3>Charlie Chiu</h3>
          <p>AI • Computer Vision • Software Engineering</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '1.5rem' }}>
            <a href="https://github.com/pinkpig777" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)' }}>
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/charliechiu0729/" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2025 Charlie Chiu</div>
    </footer>
  );
}
