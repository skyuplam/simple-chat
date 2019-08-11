import React from 'react';
import cn from 'clsx';
import './Button.css';


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'reset' | 'submit';
  onClick?: (evt: React.SyntheticEvent<HTMLButtonElement>) => void;
  icon?: boolean;
  primary?: boolean;
}
function Button({
  children, className, type, onClick, icon, primary, ...rest
}: Props) {
  return (
    <button
      className={cn(
        'ButtonRoot',
        'ButtonBase',
        {
          ButtonIcon: icon,
          Button: !icon,
          ButtonPrimary: primary,
        },
        className,
      )}
      type={type || 'button'}
      onClick={onClick}
      {...rest}
    >
      <div className="ButtonContent">
        {children}
      </div>
    </button>
  );
}

export default Button;
