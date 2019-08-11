import React, { useState } from 'react';
import { map, head } from 'lodash';
import Tabs from './Tabs';
import Tab, { TabChangeHandler } from './Tab';
import Participants from '../containers/Participants';
import Chat from './Chat';
import Login from '../containers/Login';

import './Main.css';


interface Props {
  userCount: number;
}
function Main({ userCount }: Props) {
  const tabs = {
    participants: {
      label: `Participants (${userCount})`,
      value: 'participants',
    },
    chat: { label: 'Chat', value: 'chat' },
  };

  const [tab, setTab] = useState(tabs.participants.value);

  const handleTabChange: TabChangeHandler = (_, val) => {
    setTab(val as string);
  };

  const content = head([
    tab === tabs.participants.value && (<Participants />),
    tab === tabs.chat.value && (<Chat />),
  ].filter(Boolean));

  return (
    <main>
      <Tabs value={tab} onChange={handleTabChange}>
        {map(tabs, (tab) => (
          <Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <div
        className="MainContent"
      >
        {content}
      </div>
      <Login />
    </main>
  );
}

export default Main;
