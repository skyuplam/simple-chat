/**
 * Message utilities for creating System Message
 */
import cuid from 'cuid';
import { getUsers, User } from '../utils/dbHelpers';


interface MessageLike {
  id: string;
  content: string;
  meta: {
    createdAt: string;
  };
}

const systemMsg = (content: string, users?: User[]) => ({
  type: 'SYSTEM',
  payload: {
    id: cuid(),
    content,
    meta: {
      createdAt: (new Date()).toISOString(),
      users: users || getUsers(),
    },
  }
});

// Convert a [[MessageLike]] message to a [[Message]]
// Use hard-code useId as BOT user for simplicity
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

export const unsubscriptionMsg = (name: string, users: User[]) => {
  const content = `${name} left.`;
  return systemMsg(content, users);
};
