import { useState } from 'react';
import { useReveal } from '../utils/useReveal';
import { sendContactMessage } from '../services/contact';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Jnanamithran' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jnanamithran/' },
];

export default function Contact() {
  const sectionRef = useReveal();
  const formRef = useReveal(0.1);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required.';
    if (!values.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (!values.message.trim()) nextErrors.message = 'Message is required.';
    else if (values.message.trim().length < 10) nextErrors.message = 'Add a little more detail (at least 10 characters).';
    return nextErrors;
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    if (errors[name]) setErrors(current => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

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
    <section id="contact" className="section-space px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="content-width">
        <div ref={sectionRef} className="reveal section-heading">
          <div>
            <span className="section-label">05 — Contact</span>
            <div className="section-rule" />
          </div>
        </div>

        <div className="contact-layout">
          <div className="contact-copy">
            <span className="contact-availability">
              <span aria-hidden="true" />
              Open to opportunities
            </span>
            <h2 className="display-heading">Have a good problem to solve?</h2>
            <p>
              I’m open to internship opportunities, thoughtful collaborations, and conversations
              about building useful software.
            </p>
            <a className="contact-email" href="mailto:jnanamithranm@gmail.com">
              jnanamithranm@gmail.com <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-socials">
              {SOCIAL_LINKS.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div ref={formRef} className="reveal contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success" role="status">
                <span className="section-label">MESSAGE SENT</span>
                <p>Thanks for reaching out. I’ll be in touch.</p>
                <button type="button" className="text-link" onClick={() => setStatus('idle')}>
                  Send another message <span aria-hidden="true">↗</span>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {FIELDS.map(field => (
                  <div className="contact-field" key={field.name}>
                    <label htmlFor={`contact-${field.name}`}>{field.label}</label>
                    <input
                      id={`contact-${field.name}`}
                      type={field.type}
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
                    />
                    {errors[field.name] && (
                      <p id={`contact-${field.name}-error`} className="contact-error">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="What are you working on?"
                    rows={4}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="contact-error">{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="contact-error" role="alert">
                    The message couldn’t be sent. Please try again or email me directly.
                  </p>
                )}

                <button type="submit" className="btn-primary contact-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Send message'}
                  <span aria-hidden="true">{status === 'loading' ? '···' : '↗'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
