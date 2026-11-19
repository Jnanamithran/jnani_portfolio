import { Link } from 'react-router-dom';

export default function Button({
  to,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const classes = `button button--${variant}${className ? ` ${className}` : ''}`;

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
