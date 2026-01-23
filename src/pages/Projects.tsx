export default function Projects() {
  return (
    <section className="projects-section">
      <h1>Personal Projects</h1>
      <p>Below are some of my selected projects.</p>

      <div className="projects">
        {/* Project 1 */}
        <div className="project-card">
          <h2>
            <a
              href="https://github.com/pinkpig777/Chatroom_Monitor_based_on_Sentiment_Analysis"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Sentiment Aware Chatroom Monitor
            </a>
          </h2>
          <div className="tags">
            <span className="tag">PyTorch</span>
            <span className="tag">Transformers</span>
            <span className="tag">Socket.IO</span>
            <span className="tag">JavaScript</span>
          </div>
          <ul>
            <li>
              Designed and built a real-time system to detect toxic messages using
              sentiment analysis, leading a team of 4 engineers.
            </li>
            <li>
              Fine-tuned a pre-trained Chinese BERT model on a custom dataset of
              chat logs, achieving <strong>87% accuracy</strong> and increasing
              toxic message classification AUC by <strong>36%</strong>.
            </li>
            <li>
              Engineered a full-stack solution with a Python backend and
              WebSocket-based frontend alerts, enabling users to take immediate
              action on flagged content.
            </li>
          </ul>
        </div>

        {/* Project 2 */}
        <div className="project-card">
          <h2>
            <a
              href="https://github.com/TAMUCSCE-606-Zapmail/ZapMail"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              ZapMail: AI-Driven Email Automation Platform
            </a>
          </h2>
          <div className="tags">
            <span className="tag">Ruby on Rails</span>
            <span className="tag">PostgreSQL</span>
            <span className="tag">Redis</span>
            <span className="tag">Sidekiq</span>
            <span className="tag">Heroku</span>
          </div>
          <ul>
            <li>
              Architected an email automation platform in Ruby on Rails,
              integrating GPT-4o to generate personalized content.
            </li>
            <li>
              Engineered a scalable background processing system using Sidekiq and
              Redis to manage high-volume async delivery.
            </li>
            <li>
              Spearheaded the adoption of TDD/BDD principles across a 4-developer
              team, enforcing comprehensive RSpec/Cucumber test coverage to
              prevent regression in critical workflows.
            </li>
          </ul>
        </div>

        {/* Project 3 */}
        <div className="project-card">
          <h2>
            <a
              href="https://github.com/pinkpig777/agentic-resume-tailor"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              ART - Agentic Resume Tailor
            </a>
          </h2>
          <div className="tags">
            <span className="tag">React</span>
            <span className="tag">Python</span>
            <span className="tag">FastAPI</span>
            <span className="tag">RAG</span>
            <span className="tag">AI Agents</span>
            <span className="tag">SQLite</span>
            <span className="tag">ChromaDB</span>
          </div>
          <ul>
            <li>
              Built a local-first tailoring system using React and FastAPI,
              utilizing SQLite for data persistence and ChromaDB for vector
              retrieval to generate single-page PDF/TeX artifacts.
            </li>
            <li>
              Designed a multi-agent loop (Query → Retrieve → Rewrite → Score)
              with iterative boost terms, optimizing content coverage against Job
              Description requirements.
            </li>
            <li>
              Implemented rewrite safety guardrails to prevent hallucinations
              (semantic-drift checks, fact-freezing), ensuring{' '}
              <strong>100% adherence</strong> to original resume facts while
              adapting tone.
            </li>
          </ul>
        </div>

        {/* Project 4 */}
        <div className="project-card">
          <h2>
            <a
              href="https://www.canva.com/design/DAFx6W80Bf8/ov6qqNMvedXMctArLpB1Mg/edit?utm_content=DAFx6W80Bf8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Kuiz - Educational Video Platform
            </a>
          </h2>
          <div className="tags">
            <span className="tag">Vue.js</span>
            <span className="tag">TypeScript</span>
            <span className="tag">Python</span>
            <span className="tag">FastAPI</span>
            <span className="tag">Firebase</span>
          </div>
          <ul>
            <li>
              Led a 5-member team to win 1st Prize at Meichu Hackathon by
              developing a TikTok-inspired educational platform.
            </li>
            <li>
              Built a mobile-first frontend with swipe navigation and VOD playback
              optimized for learning.
            </li>
            <li>
              Developed a FastAPI backend with authentication, video tagging, and
              playlist endpoints deployed to Firebase.
            </li>
            <li>
              Improved user engagement by implementing a neural collaborative
              filtering recommendation engine.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
