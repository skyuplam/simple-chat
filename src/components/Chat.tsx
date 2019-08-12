import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Message } from 'SCModels';
import Dialog from './Dialog';
import DialogInputBox from '../containers/DialogInputBox';
import useClientRect from '../hooks/useClientRect';
import './Chat.css';


interface Props {
  messages: Message[];
}
function Chat({ messages }: Props) {
  const [chatDivRect, chatDivRef] = useClientRect<HTMLDivElement>();
  const [inputRect, inputRef] = useClientRect<HTMLDivElement>();

  // As FixedSizeList.height can only be number,
  // We need to calculate the size of possible height
  // 16px/1rem is the margin
  const listHeight = (chatDivRect && inputRect)
    ? chatDivRect.height - inputRect.height - 16
    : 647;

  return (
    <div className="Chat" ref={chatDivRef}>
      <List
        className="ChatMessages"
        itemCount={messages.length}
        itemSize={45}
        width="100%"
        height={listHeight}
      >
        {({ style, index }) => (
          <Dialog
            style={style}
            key={messages[index].id}
            msg={messages[index]}
          />
        )}
      </List>
      <div className="ChatInput" ref={inputRef}>
        <DialogInputBox />
      </div>
    </div>
  );
}

export default Chat;
