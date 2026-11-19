import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const STACK = ['React', 'Node.js', 'Express', 'Prisma', 'FastAPI', 'PostgreSQL', 'Qdrant', 'Ollama', 'Docker'];

const WORKFLOW = [
  {
    number: '01',
    title: 'Ingest documents',
    description:
      'Add PDF, DOCX, XLSX, or TXT files to a workspace. The text service prepares supported content for indexing; scanned pages can use a separate optional visual service.',
  },
  {
    number: '02',
    title: 'Retrieve relevant context',
    description:
      'A question is matched against indexed content with semantic and hybrid retrieval. Access rules constrain which documents are available to the signed-in user.',
  },
  {
    number: '03',
    title: 'Answer with sources',
    description:
      'A locally hosted language model produces a context-aware answer with document citations. PDF page previews are available when the original file is retained.',
  },
];

const CAPABILITIES = [
  {
    title: 'Knowledge ingestion',
    description: 'Index text-based PDFs, DOCX, XLSX, and TXT documents for retrieval.',
  },
  {
    title: 'Grounded answers',
    description: 'Combine hybrid search and locally hosted LLMs, returning relevant source citations.',
  },
  {
    title: 'Permission-aware retrieval',
    description: 'Apply organization, workspace, department, and role access rules in the backend.',
  },
  {
    title: 'Optional integrations',
    description: 'Import supported files from Google Drive when OAuth is configured; Drive sharing rules are not carried over.',
  },
];

export default function EkipCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'EKIP Case Study | JN4NI';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="case-study-page section-space px-6">
      <article className="content-width">
        <Link to="/#projects" className="text-link case-study-back">
          <span aria-hidden="true">←</span> Back to work
        </Link>

        <header className="case-study-hero">
          <span className="section-label">CASE STUDY / 01</span>
          <div className="case-study-status">
            <span aria-hidden="true" />
            Development prototype · not production-hardened
          </div>
          <h1 className="display-heading">EKIP</h1>
          <p className="case-study-lede">
            An Enterprise Knowledge Intelligence Platform for finding trusted answers
            across organizational documents—grounded in citations and bounded by access rules.
          </p>
          <div className="case-study-actions">
            <a
              href="https://github.com/Jnanamithran/ekip-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Explore repository <span aria-hidden="true">↗</span>
            </a>
            <Link to="/blog/ekip-enterprise-knowledge-intelligence" className="btn-ghost inline-flex items-center gap-2">
              Read the article <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </header>

        <section className="case-study-section case-study-overview">
          <div>
            <span className="section-label">01 / The problem</span>
            <h2 className="case-study-heading">Knowledge is only useful when people can find and trust it.</h2>
          </div>
          <div className="case-study-copy">
            <p>
              Teams often store useful information across documents and formats. EKIP explores
              a local-first workspace where people can ask questions in plain language and get
              answers tied back to the documents they are allowed to access.
            </p>
            <p>
              The project focuses on connecting document ingestion, retrieval, generation,
              citations, and permissions as one workflow—not treating a language-model response
              as a source of truth by itself.
            </p>
          </div>
        </section>

        <section className="case-study-section">
          <div className="case-study-section-heading">
            <span className="section-label">02 / System architecture</span>
            <h2 className="case-study-heading">A local-first, multi-service workspace.</h2>
          </div>
          <div className="ekip-architecture" role="group" aria-label="EKIP system architecture">
            <div className="ekip-architecture-flow">
              <div className="ekip-architecture-node">
                <span>01 · CLIENT</span>
                <strong>React + Vite</strong>
                <small>Browser workspace</small>
              </div>
              <span className="ekip-architecture-arrow" aria-hidden="true">→</span>
              <div className="ekip-architecture-node">
                <span>02 · API</span>
                <strong>Express + Prisma</strong>
                <small>Auth, roles, documents</small>
              </div>
              <span className="ekip-architecture-arrow" aria-hidden="true">→</span>
              <div className="ekip-architecture-node">
                <span>03 · DATA</span>
                <strong>PostgreSQL</strong>
                <small>Application metadata</small>
              </div>
            </div>
            <div className="ekip-architecture-ai">
              <span className="ekip-architecture-branch" aria-hidden="true" />
              <div className="ekip-architecture-node ekip-architecture-node-ai">
                <span>AI SERVICE · FASTAPI</span>
                <strong>Retrieval + generation</strong>
                <small>Qdrant vector search · Ollama local models</small>
              </div>
              <div className="ekip-architecture-optional">
                <span>OPTIONAL</span> Visual service for scanned-page processing
              </div>
            </div>
          </div>
          <p className="case-study-caption">
            Development services run locally through Docker Compose or a direct local setup.
          </p>
        </section>

        <section className="case-study-section">
          <div className="case-study-section-heading">
            <span className="section-label">03 / Document to answer</span>
            <h2 className="case-study-heading">One connected retrieval workflow.</h2>
          </div>
          <ol className="case-study-workflow">
            {WORKFLOW.map(step => (
              <li className="case-study-workflow-step" key={step.number}>
                <span className="case-study-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-study-section">
          <div className="case-study-section-heading">
            <span className="section-label">04 / Product principles</span>
            <h2 className="case-study-heading">Useful answers need boundaries.</h2>
          </div>
          <div className="case-study-capabilities">
            {CAPABILITIES.map((capability, index) => (
              <article className="case-study-capability" key={capability.title}>
                <span className="section-label">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
          <div className="case-study-note">
            <span className="section-label">Access model</span>
            <p>
              Department access is limited to the user’s workspace. A document’s allowed roles
              must match its target department, and the protected Owner role receives special handling.
            </p>
          </div>
        </section>

        <section className="case-study-section case-study-stack">
          <div>
            <span className="section-label">05 / Technology</span>
            <h2 className="case-study-heading">A stack designed to run locally.</h2>
          </div>
          <div className="project-card-tags">
            {STACK.map(technology => <span className="tag" key={technology}>{technology}</span>)}
          </div>
        </section>

        <footer className="case-study-footer">
          <p>
            EKIP is a development prototype. Production security, operations, and backup
            requirements still need independent review.
          </p>
          <Link to="/#projects" className="text-link">
            More selected work <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </article>
    </div>
  );
}
