import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Jnani';
const DEFAULT_DESCRIPTION = 'A computer science undergraduate in Kerala building useful software systems.';
const SOCIAL_IMAGE = 'https://jn4n1.vercel.app/og-image.jpg';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute('content', content);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  type = 'website',
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Portfolio`;
    const canonical = new URL(pathname, 'https://jn4n1.vercel.app').href;

    document.title = pageTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', SOCIAL_IMAGE);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', 'Portrait of Jnanamithran outdoors among plants.');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:url', canonical);
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', SOCIAL_IMAGE);
    setMeta('name', 'twitter:image:alt', 'Portrait of Jnanamithran outdoors among plants.');

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [description, pathname, title, type]);

  return null;
}
