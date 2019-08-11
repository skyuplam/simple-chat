import { createContextToken } from '@marblejs/core';
import { MarbleWebSocketServer } from '@marblejs/websockets';
import { generateToken } from '@marblejs/middleware-jwt';
import { SECRET_KEY } from './config';


export const WebSocketServerToken = createContextToken<MarbleWebSocketServer>();

export const generateTokenPayload = generateToken({
  secret: SECRET_KEY,
  algorithm: 'HS512',
});
