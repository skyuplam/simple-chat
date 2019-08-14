import React from 'react';
import cn from 'clsx';
import './Link.css';


export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
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
