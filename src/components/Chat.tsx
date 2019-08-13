import React from 'react';
import { Message } from 'SCModels';
import Dialog from '../containers/Dialog';
import DialogInputBox from '../containers/DialogInputBox';
import './Chat.css';


interface Props {
  messages: Message[];
}
function Chat({ messages }: Props) {
  return (
    <div className="Chat" key={innerHeight} >
      <div className="ChatMessages">
        {messages.map(msg => (
          <Dialog
            key={msg.id}
            msg={msg}
          />
        ))}
      </div>
      <div className="ChatInput" >
        <DialogInputBox />
      </div>
    </div>
  );
}

export default Chat;
