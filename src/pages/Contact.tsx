import { useState, type FormEvent } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, integrate with Formspree or EmailJS here
    window.location.href = `mailto:charly729.chiu@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <section className="contact-section">
      <h1>Get in Touch</h1>

      <p className="contact-subtext">
        Whether it&apos;s about opportunities, collaboration, or just a
        conversation, feel free to reach out.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        {/* Contact Info Card */}
        <div className="contact-card" style={{ height: 'fit-content' }}>
          <h3>Connect with me</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
             <a href="mailto:charly729.chiu@gmail.com" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', textDecoration: 'none' }}>
               <FaEnvelope size={24} color="var(--primary)" />
               <span>charly729.chiu@gmail.com</span>
             </a>
             <a href="https://www.linkedin.com/in/charliechiu0729/" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', textDecoration: 'none' }}>
               <FaLinkedin size={24} color="#0077b5" />
               <span>LinkedIn Profile</span>
             </a>
             <a href="https://github.com/pinkpig777" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', textDecoration: 'none' }}>
               <FaGithub size={24} color="var(--text)" />
               <span>GitHub Profile</span>
             </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
              <input
                type="text"
                id="name"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
              <input
                type="email"
                id="email"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
              <textarea
                id="message"
                required
                rows={5}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', resize: 'vertical' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button type="submit" className="cta-btn" style={{ border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
