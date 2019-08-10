import React from 'react';
import { TabProps, Value, TabChangeHandler } from './Tab';


interface Props {
  value: Value;
  children: React.ReactNode;
  onChange?: TabChangeHandler;
}
function Tabs({
  children, value, onChange,
}: Props) {
  const numOfChildren = React.Children.count(children);
  const tabWidth = [100 / numOfChildren, '%'].join('');
  const tabs = React.Children.map(children, (child, idx) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const c = child as React.ReactElement<TabProps>;
    const childValue = c.props.value || idx;
    const selected = childValue === value;
    const style = { width: tabWidth };

    return React.cloneElement(c, {
      selected,
      style,
      value: childValue,
      onTab: onChange,
      children: c.props.children,
    });
  });
  return (
    <div className="TabsContainer">
      {tabs}
    </div>
  );
}

export default Tabs;
