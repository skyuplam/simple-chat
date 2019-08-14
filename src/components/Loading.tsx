import React from 'react';
import cn from 'clsx';
import './Loading.css';


interface Props {
  isLoading: boolean;
  className?: string;
}
function Loading({ isLoading, className }: Props) {
  return isLoading ? (
    <div className={cn('lds-ring', className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  ) : null;
}

export default Loading;
