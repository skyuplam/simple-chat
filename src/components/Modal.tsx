import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';


interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  className?: string;
}
function Modal({
  children, isOpen, onRequestClose, className,
}: Props) {
  const [el, setEl] = useState();
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const app = document.getElementById('application');
      setEl(app);
    }
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      appElement={el}
      className={className}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
