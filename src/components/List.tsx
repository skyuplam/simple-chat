import React from 'react';
import cn from 'clsx';
import './List.css';


interface Props {
  children: React.ReactNode;
  className?: string;
}
function List({
  children, className,
}: Props) {
  return (
    <ul className={cn('List', className)}>
      {children}
    </ul>
  );
}

export default List;
