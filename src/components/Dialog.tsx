/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Message } from 'SCModels';
import dayjs from 'dayjs';
import cn from 'clsx';
import { Formik, Form, FormikHelpers } from 'formik';
import Icon from '@mdi/react';
import { mdiSquareEditOutline, mdiCheck, mdiClose, mdiDelete } from '@mdi/js';
import { Match } from 'linkify-it';
// @ts-ignore
import ReactTinyLink from 'react-tiny-link';

import { linkifyString } from '../utils/string';
import Button from './Button';
import TextArea from './TextArea';
import Link from './Link';
import Modal from './Modal';
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
  const [isDeleting, setDeleting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // Scroll into this view when mounted
  useEffect(() => {
    if (ref !== null) {
      const article = ref.current as HTMLDivElement;
      article.scrollIntoView();
    }
  }, []);

  const datetime = dayjs(
    msg.meta.deletedAt || msg.meta.editedAt || msg.meta.createdAt);
  // Check if the msg is created at the current day
  // Prepend with date, e.g. 8-13 12:03, otherwise only show the time
  const dateformat = dayjs().isSame(datetime, 'day') ? 'H:mm' : 'M-D H:mm';

  const handleMouseOver = (match: Match) => () => { setPreviewUrl(match.url); };
  const handleMouseLeave = () => { setPreviewUrl(''); };

  // Linkify message content if necessary
  const toLink = (match: Match) => (
    <Link
      key={[match.url, match.index].join('_')}
      href={match.url}
      rel="noopener noreferrer"
      onMouseOver={handleMouseOver(match)}
      onMouseLeave={handleMouseLeave}
    >
      {match.text}
    </Link>
  );
  const content = linkifyString(msg.content, toLink);

  function handleEdit() {
    setEditing(!isEditing);
  }

  function handleNotEditing() {
    setEditing(false);
    setValid(false);
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
    setValid(false);
    actions.resetForm();
    setEditing(false);
  }

  function handleDeleting() {
    setDeleting(!isDeleting);
  }

  function handleDelete() {
    sendEditedMsg({
      ...msg,
      meta: {
        createdAt: msg.meta.createdAt,
        userId: msg.meta.userId,
        editedAt: msg.meta.editedAt,
        deletedAt: (new Date).toISOString(),
      },
    });
    setDeleting(false);
  }

  function handleValidation(values: Values) {
    const { content } = values;
    setValid(Boolean(content.trim()));
    return content.trim() ? {} : { content: 'Empty message!' };
  }

  const msgContent = (
    <p className={cn('DialogContent', {
      DialogBOT: msg.isBOT,
      DialogDeleted: msg.meta.deletedAt,
    })}>
      {msg.meta.deletedAt ? 'XXX....' : content}
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

  const EditBtns = [
    <Button
      key="delete"
      className="DialogIconBtn"
      type="button"
      onClick={handleDeleting}
    >
      <Icon size={1} path={mdiDelete} />
    </Button>,
    <Button
      key="edit"
      className="DialogIconBtn"
      type="button"
      onClick={handleEdit}
    >
      <Icon size={1} path={mdiSquareEditOutline} />
    </Button>,
  ];

  const EditingBtns = [
    (
      <Button
        key="no"
        className="DialogIconBtn"
        type="button"
        onClick={handleNotEditing}
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
      {isEditing ? EditingBtns : EditBtns}
    </div>
  );

  const remark = [
    msg.meta.deletedAt && '(deleted)',
    msg.meta.editedAt && '(edited)',
  ].find(Boolean);

  return (
    <article ref={ref} key={msg.id} className="DialogContainer">
      <div className="DialogHeadingContainer">
        <h3 className="DialogHeading">
          {msg.meta.user && msg.meta.user.name}
          <span className="Datetime">
            {datetime.format(dateformat)}
            {remark}
          </span>
        </h3>
        {msg.isEditable && actions}
      </div>
      {Content}
      {previewUrl && (<ReactTinyLink url={previewUrl} />)}
      <Modal
        isOpen={isDeleting}
        onRequestClose={handleDeleting}
        className="DialogModalContainer"
      >
        <div className="DialogModal">
          <h1 className="DialogModalHeading">
            Delete this message?
          </h1>
          <p className="DialogRef">{content}</p>
          <div className="DialogModalActions">
            <Button type="button" onClick={handleDeleting}>
              Cancel
            </Button>
            <Button type="button" primary onClick={handleDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </article>
  );
}

export default Dialog;
