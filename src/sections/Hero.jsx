import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';

const ROLES = ['Developer', 'Designer', 'Builder'];

function RotatingRole({ reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex(current => (current + 1) % ROLES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <span className="hero-role" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROLES[index]}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { dark } = useTheme();
  const reduceMotion = useReducedMotion();

  const handlePointerMove = event => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  const handlePointerLeave = event => {
    event.currentTarget.style.removeProperty('--pointer-x');
    event.currentTarget.style.removeProperty('--pointer-y');
  };

  return (
    <section
      id="home"
      className="hero-stage px-6"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-content">
        <motion.div
          className="hero-role-line"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.08 }}
        >
          <RotatingRole reduceMotion={reduceMotion} />
        </motion.div>

        <motion.h1
          className="hero-logo"
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={dark ? '/icons1.svg' : '/icons2.svg'}
            alt="JN4NI — Jnanamithran M"
          />
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.3 }}
        >
          I build systems, not just websites.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.44 }}
        >
          <a href="#projects" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero-scroll"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.8 }}
      >
        <span>Scroll to explore</span>
        {!reduceMotion && <span className="hero-scroll-line" aria-hidden="true" />}
      </motion.a>
    </section>
  );
}
