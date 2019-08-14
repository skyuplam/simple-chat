import React from 'react';
import cn from 'clsx';
import './Link.css';


type Anchor = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export interface LinkProps extends Anchor {
  href: string;
  children: React.ReactNode;
  className?: string;
}
const Link = ({ children, className, href, ...rest }: LinkProps) => (
  <a
    href={href}
    className={cn('Link', className)}
    {...rest}
  >
    {children}
  </a>
);

export default Link;
