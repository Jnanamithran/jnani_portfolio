import { createElement } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  as = 'h2',
  titleId,
  className = '',
}) {
  return (
    <div className={`ui-section-heading${className ? ` ${className}` : ''}`}>
      {eyebrow && <span className="ui-section-kicker">{eyebrow}</span>}
      {createElement(as, { id: titleId, className: 'ui-section-title' }, title)}
      {description && <p className="ui-section-copy">{description}</p>}
    </div>
  );
}
