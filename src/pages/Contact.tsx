export default function Contact() {
  return (
    <section className="contact-section">
      <h1>Get in Touch</h1>

      <p className="contact-subtext">
        Whether it&apos;s about opportunities, collaboration, or just a
        conversation, feel free to reach out.
      </p>

      <div className="contact-card">
        <div className="contact-item">
          <span className="contact-icon"></span>
          <a href="mailto:charly729.chiu@gmail.com">
            charly729.chiu@gmail.com
          </a>
        </div>

        <div className="contact-item">
          <span className="contact-icon"></span>
          <a
            href="https://www.linkedin.com/in/charliechiu0729/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}
