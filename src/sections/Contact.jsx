import { useState } from 'react';
import { useReveal } from '../utils/useReveal';
import { sendContactMessage } from '../services/contact';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
];

export default function Contact() {
  const labelRef = useReveal();
  const formRef = useReveal(0.1);

  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = 'Name is required';
    if (!values.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email';
    if (!values.message.trim()) e.message = 'Message is required';
    else if (values.message.trim().length < 10) e.message = 'Message is too short';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    try {
      await sendContactMessage(values);
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div ref={labelRef} className="reveal mb-16">
          <span className="section-label">04 — Contact</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--fg)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="reveal space-y-5" ref={useReveal()}>
            <h2
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--fg)' }}
            >
              Let's work on something together.
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Whether it's a project idea, a collaboration, or just a question — my inbox is open. I read every message.
            </p>
            <div className="space-y-3 pt-4">
              <a
                href="mailto:jnanamithranm@gmail.com"
                className="flex items-center gap-3 font-mono text-sm transition-opacity duration-200 hover:opacity-60"
                style={{ color: 'var(--fg)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                jnanamithranm@gmail.com
              </a>
              <a
                href="https://github.com/Jnanamithran"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-sm transition-opacity duration-200 hover:opacity-60"
                style={{ color: 'var(--fg)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                github.com/Jnanamithran
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="reveal">
            {status === 'success' ? (
              <div
                className="p-8 border flex flex-col items-center gap-4 text-center"
                style={{ borderColor: 'var(--fg)', background: 'var(--card-bg)' }}
              >
                <div className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid var(--fg)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-body text-base" style={{ color: 'var(--fg)' }}>Message sent. I'll be in touch soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-mono text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {FIELDS.map(field => (
                  <div key={field.name}>
                    <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="input-field"
                      style={{ borderColor: errors[field.name] ? '#e05252' : undefined }}
                    />
                    {errors[field.name] && (
                      <p className="mt-1 font-mono text-xs" style={{ color: '#e05252' }}>{errors[field.name]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or question..."
                    rows={5}
                    className="input-field resize-none"
                    style={{ borderColor: errors.message ? '#e05252' : undefined }}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-xs" style={{ color: '#e05252' }}>{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs" style={{ color: '#e05252' }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center flex items-center gap-2"
                  style={{ opacity: status === 'loading' ? 0.6 : 1 }}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
