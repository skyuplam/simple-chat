import { createContextToken } from '@marblejs/core';
import { MarbleWebSocketServer } from '@marblejs/websockets';
import { generateToken } from '@marblejs/middleware-jwt';
import { jwtConfig } from '../config';


export const WebSocketServerToken = createContextToken<MarbleWebSocketServer>();

export const generateTokenPayload = generateToken(jwtConfig);
