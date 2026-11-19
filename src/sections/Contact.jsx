import { useEffect, useState } from 'react';
import { useReveal } from '../utils/useReveal';
import { sendContactMessage } from '../services/contact';
import Button from '../components/ui/Button';

const CONTACT_COOLDOWN_MS = 30_000;
const CONTACT_COOLDOWN_KEY = 'jn4ni-contact-last-sent';

function readCooldownRemaining() {
  try {
    const lastSent = window.localStorage.getItem(CONTACT_COOLDOWN_KEY);
    if (!lastSent) return 0;
    return Math.max(0, Math.ceil((Number(lastSent) + CONTACT_COOLDOWN_MS - Date.now()) / 1000));
  } catch (error) {
    console.error('Unable to read the contact form cooldown.', error);
    return 0;
  }
}

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
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [cooldownRemaining, setCooldownRemaining] = useState(readCooldownRemaining);

  useEffect(() => {
    if (cooldownRemaining <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setCooldownRemaining(remaining => Math.max(0, remaining - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [cooldownRemaining]);

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
    if (values.website.trim()) {
      setSubmitError('Unable to send your message. Please email me directly.');
      setStatus('error');
      return;
    }
    if (cooldownRemaining > 0) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitError('');
    setStatus('loading');
    try {
      const { name, email, message } = values;
      await sendContactMessage({ name, email, message });
      setCooldownRemaining(Math.ceil(CONTACT_COOLDOWN_MS / 1000));
      try {
        window.localStorage.setItem(CONTACT_COOLDOWN_KEY, String(Date.now()));
      } catch (error) {
        console.error('Unable to save the contact form cooldown.', error);
      }
      setStatus('success');
      setValues({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      console.error('Contact form submission failed.', error);
      setSubmitError(error instanceof Error
        ? error.message
        : 'The message could not be sent. Please try again or email me directly.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-space section-alt px-6">
      <div className="content-width">
        <div ref={sectionRef} className="reveal section-heading">
          <div>
            <span className="section-label">06 — Contact</span>
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
              <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    value={values.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>
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
                    {submitError || 'The message couldn’t be sent. Please try again or email me directly.'}
                  </p>
                )}

                {cooldownRemaining > 0 && (
                  <p className="contact-cooldown" role="status" aria-live="polite">
                    You can send another message in {cooldownRemaining} seconds.
                  </p>
                )}

                <Button
                  type="submit"
                  className="contact-submit"
                  disabled={status === 'loading' || cooldownRemaining > 0}
                >
                  {status === 'loading'
                    ? 'Sending…'
                    : cooldownRemaining > 0
                      ? `Try again in ${cooldownRemaining}s`
                      : 'Send message'}
                  <span aria-hidden="true">{status === 'loading' ? '···' : '↗'}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
