import { useEffect, useState } from 'react';

const ROLES = ['Developer', 'Designer', 'Builder'];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % ROLES.length);
        setVisible(true);
      }, 400);
    }, 2200);

    return () => clearInterval(cycle);
  }, []);

  return (
    <span
      className="inline-block transition-all duration-300 font-mono text-sm tracking-[0.25em] uppercase"
      style={{
        color: 'var(--fg-muted)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      }}
    >
      {ROLES[index]}
    </span>
  );
}

export default function Hero() {
  const [showSub, setShowSub] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      const hasDark = document.documentElement.classList.contains('dark');
      setIsDark(hasDark);
    };

    checkTheme();

    // Observe class changes (for toggle)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Animation sequence
  useEffect(() => {
    setTimeout(() => setShowSub(true), 200);
    setTimeout(() => setShowRole(true), 500);
    setTimeout(() => setShowCta(true), 800);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.3,
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-24 left-8 w-8 h-8 border-l border-t" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute top-24 right-8 w-8 h-8 border-r border-t" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute bottom-16 left-8 w-8 h-8 border-l border-b" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute bottom-16 right-8 w-8 h-8 border-r border-b" style={{ borderColor: 'var(--border)' }} />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Rotating role */}
        <div
          className="mb-6 h-5 transition-all duration-500"
          style={{ opacity: showRole ? 1 : 0 }}
        >
          <RotatingRole />
        </div>

        {/* ✅ Theme-based logo */}
        <div
          className="mb-6 flex justify-center"
          style={{
            width: 'clamp(200px, 35vw, 520px)',
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.5s ease',
          }}
        >
          <img
            src={isDark ? '/icons1.svg' : '/icons2.svg'}
            alt="JN4NI logo"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Subtitle */}
        <p
          className="text-sm md:text-base max-w-xl mx-auto font-mono tracking-wide leading-relaxed transition-all duration-700"
          style={{
            color: 'var(--fg-muted)',
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          I build systems, not just websites.
        </p>

        {/* CTA */}
        <div
          className="mt-10 flex items-center justify-center gap-4 flex-wrap transition-all duration-700"
          style={{
            opacity: showCta ? 1 : 0,
            transform: showCta ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <a href="#projects" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700"
        style={{ opacity: showCta ? 0.4 : 0 }}
      >
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--fg-muted)' }}>
          Scroll
        </span>

        <div className="w-px h-8 relative overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'var(--fg)',
              animation: 'scrollDot 1.5s ease-in-out infinite',
            }}
          />
        </div>

        <style>{`
          @keyframes scrollDot {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(350%); }
          }
        `}</style>
      </div>
    </section>
  );
}