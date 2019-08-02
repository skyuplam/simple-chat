import { httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { api$ } from './effects/api.effects';


const middlewares = [
  logger$(),
];

const effects = [api$];

export default httpListener({ middlewares, effects });
