import { httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import api$ from './effects/api.effects';


const middlewares = [
  logger$(),
  bodyParser$(),
  cors$({
    origin: '*',
    allowHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
];

const effects = [api$];

export default httpListener({ middlewares, effects });
