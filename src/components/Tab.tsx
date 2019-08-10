import React from 'react';
import cn from 'clsx';
import './Tab.css';


export type TabEvent = React.SyntheticEvent<HTMLButtonElement>;
export type Value = string | number;
export type TabChangeHandler = (e: TabEvent, value: Value) => void;
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  value?: Value;
  selected?: boolean;
  style?: React.CSSProperties;
  onTab?: TabChangeHandler;
}
export type TabProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;
function Tab({
  children, value, onTab, type, selected, style, role, className, ...rest
}: TabProps) {
  function handleOnClick(e: TabEvent) {
    if (onTab) {
      onTab(e, value || 0);
    }
  }

  return (
    <button
      type={type || 'button'}
      role={role || 'tab'}
      className={cn('Tab', {
        TabSelected: selected,
      }, className)}
      {...rest}
      onClick={handleOnClick}
      style={style}
    >
      <span>
        {children}
      </span>
    </button>
  );
}

export default Tab;
