import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = isHome
    ? [
        { label: 'Home', href: '#home' },
        { label: 'Projects', href: '#projects' },
        { label: 'Blogs', href: '#blogs' },
        { label: 'Contact', href: '#contact' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/#projects' },
        { label: 'Blogs', href: '/#blogs' },
        { label: 'Contact', href: '/#contact' },
      ];

  return (
    <header className="fixed top-2 left-0 right-0 z-[9990] flex justify-center px-4">
      <nav
        className="w-full max-w-5xl flex items-center justify-between px-6 py-4 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* ✅ Logo (theme-based) */}
        <Link to="/" className="flex items-center">
          <img
            src={dark ? '/icons1.svg' : '/icons2.svg'}
            alt="JN4NI logo"
            className="h-6 md:h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith('#') || link.href.startsWith('/') ? (
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              ) : (
                <Link to={link.href} className="nav-link">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-10 h-10 flex items-center justify-center transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--fg)' }}
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: 'var(--fg)',
                transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: 'var(--fg)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: 'var(--fg)',
                transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden absolute top-full left-4 right-4 overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '300px' : '0',
          background: 'var(--bg)',
          border: menuOpen ? '1px solid var(--border)' : 'none',
        }}
      >
        <ul className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link text-base"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}