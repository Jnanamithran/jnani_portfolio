export default function Tag({ children, className = '', ...props }) {
  return (
    <span className={`ui-tag${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </span>
  );
}
