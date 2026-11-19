import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../utils/projects';
import { useReveal } from '../utils/useReveal';

const SKILLS = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Qdrant',
  'Ollama',
  'WebSockets',
  'Tailwind CSS',
];

function TerminalResponse({ command }) {
  switch (command) {
    case 'help':
      return <p>Available commands: about, projects, skills, contact, help</p>;
    case 'about':
      return (
        <p>
          I’m Jnanamithran M, a full-stack developer and Computer Science &amp; Engineering
          undergraduate. I build reliable software with thoughtful design and maintainable systems.
        </p>
      );
    case 'projects':
      return (
        <ul className="space-y-2">
          {projects.map(project => (
            <li key={project.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{project.title}</span>
              {project.github && (
                <a className="terminal-link" href={project.github} target="_blank" rel="noopener noreferrer">
                  source
                </a>
              )}
              {project.blog && <Link className="terminal-link" to={project.blog}>notes</Link>}
            </li>
          ))}
        </ul>
      );
    case 'skills':
      return <p>{SKILLS.join(' · ')}</p>;
    case 'contact':
      return (
        <p>
          Email: <a className="terminal-link" href="mailto:jnanamithranm@gmail.com">jnanamithranm@gmail.com</a>
          {' · '}
          <a className="terminal-link" href="#contact">Open the contact form</a>
        </p>
      );
    default:
      return (
        <p>
          Unknown command: <span className="text-white">{command}</span>. Type <span className="text-white">help</span> to see available commands.
        </p>
      );
  }
}

export default function InteractiveTerminal() {
  const sectionRef = useReveal();
  const terminalRef = useReveal(0.1);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;

    setHistory(current => [...current, value]);
    setCommand('');
  };

  return (
    <section id="terminal" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={sectionRef} className="reveal mb-16">
          <span className="section-label">06 — Interactive Terminal</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--accent)' }} />
          <p className="mt-6 font-body text-base max-w-lg" style={{ color: 'var(--fg-muted)' }}>
            Explore my work from the command line. Type <code className="terminal-inline-code">help</code> to get started.
          </p>
        </div>

        <div ref={terminalRef} className="reveal terminal-window">
          <div className="terminal-titlebar">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="terminal-window-dot" />
              <span className="terminal-window-dot" />
              <span className="terminal-window-dot" />
            </div>
            <span>jn4ni@portfolio: ~</span>
            <span className="w-10" aria-hidden="true" />
          </div>

          <div className="terminal-body">
            <div className="terminal-output" aria-live="polite" aria-relevant="additions">
              <p className="mb-4">Welcome. Type <span className="terminal-accent">help</span> to see available commands.</p>
              {history.map((entry, index) => (
                <div key={`${entry}-${index}`} className="mb-4">
                  <p className="mb-1">
                    <span className="terminal-accent">jn4ni@portfolio:~$</span> {entry}
                  </p>
                  <div className="terminal-result">
                    <TerminalResponse command={entry} />
                  </div>
                </div>
              ))}
            </div>

            <form className="terminal-form" onSubmit={handleSubmit}>
              <label htmlFor="terminal-command" className="terminal-accent shrink-0">
                jn4ni@portfolio:~$
              </label>
              <input
                id="terminal-command"
                className="terminal-input"
                type="text"
                value={command}
                onChange={event => setCommand(event.target.value)}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                aria-label="Enter a portfolio terminal command"
              />
              <button type="submit" className="terminal-run-button">
                Run
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
