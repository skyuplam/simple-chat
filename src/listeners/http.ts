import { httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import apis$ from '../effects/apis';


const middlewares = [
  logger$(),
  bodyParser$(),
  cors$({
    origin: '*',
    allowHeaders: '*',
    withCredentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
];

const effects = [apis$];

export default httpListener({ middlewares, effects });
