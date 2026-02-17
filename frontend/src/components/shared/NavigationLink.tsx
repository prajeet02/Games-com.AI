import { Link } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  kind?: 'text' | 'cta';
  onClick?: () => void | Promise<void>;
}

function NavigationLink({ to, text, kind = 'text', onClick }: Props) {
  return (
    <Link
      className={`nav-link nav-link--${kind}`}
      to={to}
      onClick={onClick ? (() => { void onClick(); }) : undefined}
    >
      {text}
    </Link>
  )
}

export default NavigationLink