import React from 'react';
import { Message } from 'SCModels';
import dayjs from 'dayjs';
import cn from 'clsx';
import './Dialog.css';


interface Props {
  msg: Message;
  style?: React.CSSProperties;
}
function Dialog({ msg, style }: Props) {
  const datetime = dayjs(msg.meta.editedAt || msg.meta.createdAt);
  // Check if the msg is created at the current day
  // Prepend with date, e.g. 8-13 12:03, otherwise only show the time
  const dateformat = dayjs().isSame(datetime, 'day') ? 'H:mm' : 'M-D H:mm';
  const isSystem = msg.meta.userId === 'user0000';

  return (
    <article key={msg.id} style={style} className="DialogContainer">
      <h3 className="DialogHeading">
        {msg.meta.user && msg.meta.user.name}
        <span className="Datetime">
          {datetime.format(dateformat)}
          {msg.meta.editedAt && '(edited)'}
        </span>
      </h3>
      <p className={cn('DialogContent', { DialogBOT: isSystem })}>
        {msg.content}
      </p>
    </article>
  );
}

export default Dialog;
