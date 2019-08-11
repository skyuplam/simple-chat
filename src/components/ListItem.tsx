import React from 'react';
import cn from 'clsx';
import './ListItem.css';


interface Props {
  children: React.ReactNode;
  className?: string;
}
function ListItem({
  children, className,
}: Props) {
  return (
    <li className={cn('ListItem', className)}>
      {children}
    </li>
  );
}

export default ListItem;
