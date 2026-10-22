import useReveal from '../hooks/useReveal.js';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useReveal();
  return (
    <Tag ref={ref} className={`rv${seen ? ' in' : ''} ${className}`} style={{ '--d': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}
