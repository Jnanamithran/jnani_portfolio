import { createElement } from 'react';

export default function Container({ as = 'div', className = '', children, ...props }) {
  return createElement(
    as,
    { ...props, className: `ui-container${className ? ` ${className}` : ''}` },
    children,
  );
}
