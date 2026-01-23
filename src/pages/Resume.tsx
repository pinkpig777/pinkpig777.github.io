import { useState } from 'react';

export default function Resume() {
  const [role, setRole] = useState<'SWE' | 'MLE'>('SWE');

  // Load SWE resumes
  const sweModules = import.meta.glob('../assets/resume/swe/*.pdf', {
    eager: true,
    query: '?url',
    import: 'default',
  });

  // Load MLE resumes
  const mleModules = import.meta.glob('../assets/resume/mle/*.pdf', {
    eager: true,
    query: '?url',
    import: 'default',
  });

  const sweUrls = Object.values(sweModules) as string[];
  const mleUrls = Object.values(mleModules) as string[];

  const currentResumeUrl =
    role === 'SWE'
      ? sweUrls.length > 0
        ? sweUrls[0]
        : null
      : mleUrls.length > 0
      ? mleUrls[0]
      : null;

  return (
    <section className="resume-section">
      <h1>My Resume</h1>
      <p className="resume-subtext">
        Select a role to view the corresponding resume.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setRole('SWE')}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: role === 'SWE' ? 'var(--primary)' : 'var(--bg-card)',
            color: role === 'SWE' ? 'white' : 'var(--text)',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'background-color 0.2s ease'
          }}
        >
          Software Engineer
        </button>
        <button
          onClick={() => setRole('MLE')}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: role === 'MLE' ? 'var(--primary)' : 'var(--bg-card)',
            color: role === 'MLE' ? 'white' : 'var(--text)',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'background-color 0.2s ease'
          }}
        >
          Machine Learning Engineer
        </button>
      </div>

      {currentResumeUrl ? (
        <iframe
          key={role} // Force re-render on role change
          className="resume-iframe"
          src={currentResumeUrl}
          title={`Charlie Chiu ${role} Resume`}
        />
      ) : (
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p>
            No {role} resume found. Please add a PDF to{' '}
            <code style={{ background: 'var(--bg)', padding: '2px 4px', borderRadius: '4px' }}>src/assets/resume/{role.toLowerCase()}/</code>.
          </p>
        </div>
      )}
    </section>
  );
}
