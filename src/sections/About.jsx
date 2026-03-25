import { useReveal } from '../utils/useReveal';

const STACK = [
  'React', 'Node.js', 'TypeScript', 'PostgreSQL',
  'Redis', 'Docker', 'WebSockets', 'Tailwind CSS',
];

export default function About() {
  const sectionRef = useReveal();
  const stackRef = useReveal(0.1);

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <div ref={sectionRef} className="reveal mb-16">
          <span className="section-label">01 — About</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--fg)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: text */}
          <div className="reveal space-y-6" ref={useReveal()}>
            <h2
              className="font-display leading-none uppercase"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--fg)' }}
            >
              Crafting systems that scale.
            </h2>

            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              I’m a Full-Stack Developer and Computer Science student at the intersection of
              engineering rigour and product thinking. I care as much about why something is built
              as how it functions.
            </p>

            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              My work focuses on building reliable, well-architected systems—from performance-first
              React applications to robust backend infrastructures. When I’m not writing code, I’m
              usually breaking down technical decisions, architecture trade-offs, and the lessons
              learned from shipping real-world projects.
            </p>

            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Currently focused on distributed systems, developer tooling, and mastering AngularJS
              alongside modern web standards.
            </p>

            <a href="#contact" className="btn-primary inline-block mt-4">
              Let's Build Together
            </a>
          </div>

          {/* Right: image + stack */}
          <div className="space-y-10">

            {/* ✅ IMAGE BLOCK (UNCHANGED) */}
            <div className="reveal" ref={useReveal()}>
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 group overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />

                <div
                  className="absolute bottom-0 left-0 right-0 py-2 text-center font-mono text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                >
                  JNANAMITHRAN M
                </div>
              </div>
            </div>

            {/* Stack */}
            <div ref={stackRef} className="stagger-children reveal">
              <p className="section-label mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}