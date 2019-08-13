import React, { useEffect, useRef, useState } from 'react';
import { Message } from 'SCModels';
import dayjs from 'dayjs';
import cn from 'clsx';
import { Formik, Form, FormikHelpers } from 'formik';
import Icon from '@mdi/react';
import { mdiSquareEditOutline, mdiCheck, mdiClose } from '@mdi/js';
import Button from './Button';
import TextArea from './TextArea';
import './Dialog.css';

interface Values {
  content: string;
}
interface Props {
  msg: Message;
  sendEditedMsg: (msg: Message) => void;
}
function Dialog({ msg, sendEditedMsg }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isEditing, setEditing] = useState(false);
  const [isValid, setValid] = useState(false);

  // Scroll into this view when mounted
  useEffect(() => {
    if (ref !== null) {
      const article = ref.current as HTMLDivElement;
      article.scrollIntoView();
    }
  }, []);

  const datetime = dayjs(msg.meta.editedAt || msg.meta.createdAt);
  // Check if the msg is created at the current day
  // Prepend with date, e.g. 8-13 12:03, otherwise only show the time
  const dateformat = dayjs().isSame(datetime, 'day') ? 'H:mm' : 'M-D H:mm';

  function handleEdit() {
    setEditing(!isEditing);
  }

  function handleOnSubmit(values: Values, actions: FormikHelpers<Values>) {
    const { content } = values;
    sendEditedMsg({
      ...msg,
      content,
      meta: {
        createdAt: msg.meta.createdAt,
        userId: msg.meta.userId,
        editedAt: (new Date).toISOString(),
      },
    });
    setEditing(false);
    setValid(false);
    actions.resetForm();
  }

  function handleValidation(values: Values) {
    const { content } = values;
    setValid(Boolean(content));
    return isValid ? {} : { content: 'Empty message!' };
  }

  const msgContent = (
    <p className={cn('DialogContent', { DialogBOT: msg.isBOT })}>
      {msg.content}
    </p>
  );

  const Content = isEditing ? (
    <Formik
      initialValues={{ content: msg.content }}
      onSubmit={handleOnSubmit}
      validate={handleValidation}
    >
      {() => (
        <Form id={msg.id}>
          <TextArea name="content" />
        </Form>
      )}
    </Formik>
  ) : msgContent;

  const EditBtn = (
    <Button
      className="DialogIconBtn"
      type="button"
      onClick={handleEdit}
    >
      <Icon size={1} path={mdiSquareEditOutline} />
    </Button>
  );

  const EditingBtns = [
    (
      <Button
        key="no"
        className="DialogIconBtn"
        type="button"
        onClick={handleEdit}
      >
        <Icon size={1} path={mdiClose} />
      </Button>
    ),
    (
      <Button
        key="yes"
        className="DialogIconBtn"
        type="submit"
        form={msg.id}
        disabled={!isValid}
      >
        <Icon size={1} path={mdiCheck} />
      </Button>
    )
  ];

  const actions = (
    <div>
      {isEditing ? EditingBtns : EditBtn}
    </div>
  );

  return (
    <article ref={ref} key={msg.id} className="DialogContainer">
      <div className="DialogHeadingContainer">
        <h3 className="DialogHeading">
          {msg.meta.user && msg.meta.user.name}
          <span className="Datetime">
            {datetime.format(dateformat)}
            {msg.meta.editedAt && '(edited)'}
          </span>
        </h3>
        {msg.isEditable && actions}
      </div>
      {Content}
    </article>
  );
}

export default Dialog;
