import React from 'react';
import './Loading.css';


interface Props {
  isLoading: boolean;
}
function Loading({ isLoading }: Props) {
  return isLoading ? (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  ) : null;
}

export default Loading;
