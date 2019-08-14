import cuid from 'cuid';
import { getUsers } from '../utils/dbHelpers';


interface MessageLike {
  id: string;
  content: string;
  meta: {
    createdAt: string;
  };
}

const systemMsg = (content: string) => ({
  type: 'SYSTEM',
  payload: {
    id: cuid(),
    content,
    meta: {
      createdAt: (new Date()).toISOString(),
      users: getUsers(),
    },
  }
});

export const toBOTMessage = (msg: MessageLike) => {
  const { id, content, meta } = msg;
  return {
    id,
    content,
    meta: {
      createdAt: meta.createdAt,
      userId: 'user0000',
    }
  };
};

export const subscriptionMsg = (name: string) => {
  const content = `${name} joined.`;
  return systemMsg(content);
};

export const unsubscriptionMsg = (name: string) => {
  const content = `${name} left.`;
  return systemMsg(content);
};
