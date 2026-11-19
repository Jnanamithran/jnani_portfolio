import { createElement } from 'react';

export default function Card({
  as = 'article',
  className = '',
  children,
  ...props
}) {
  return createElement(
    as,
    { ...props, className: `ui-card${className ? ` ${className}` : ''}` },
    children,
  );
}
