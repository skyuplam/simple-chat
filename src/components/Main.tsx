import React, { useEffect, useState } from 'react';
import { map, head } from 'lodash';
import { User } from 'SCModels';
import Tabs from './Tabs';
import Tab, { TabChangeHandler } from './Tab';
import Participants from './Participants';
import Chat from './Chat';
import Login from '../containers/Login';

import './Main.css';


interface Props {
  startStream: (user: User) => void;
}
function Main({ startStream }: Props) {
  const tabs = {
    participants: { label: 'Participants', value: 'participants' },
    chat: { label: 'Chat', value: 'chat' },
  };

  const [tab, setTab] = useState(tabs.participants.value);

  useEffect(() => {
    startStream({ id: 'test@sc.org', name: 'Elon Musk' });
  }, []);

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
