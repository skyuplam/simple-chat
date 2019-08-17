import { createContextToken } from '@marblejs/core';
import { MarbleWebSocketServer } from '@marblejs/websockets';
import { generateToken } from '@marblejs/middleware-jwt';
import { jwtConfig } from '../config';


// WebSocket Token
// See [marblejs doc](https://docs.marblejs.com/advanced/context)
export const WebSocketServerToken = createContextToken<MarbleWebSocketServer>();

// JWT toke generator
// See
// [marbelejs/middleware-jwt](https://docs.marblejs.com/api-reference/middleware-jwt/token-creation)
export const generateTokenPayload = generateToken(jwtConfig);
