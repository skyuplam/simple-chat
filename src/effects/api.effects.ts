import { r, HttpError, HttpStatus, combineRoutes } from '@marblejs/core';
import { map, catchError } from 'rxjs/operators';
import { generateTokenPayload } from '../tokens';
import { throwError } from 'rxjs';


const sessions$ = r.pipe(
  r.matchPath('/sessions'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    map(req => {
      const { name, password } = req.body as {
        name: string; password: string;
      };
      const { origin } = req.headers;
      return { name, password, origin };
    }),
    map(generateTokenPayload),
    map(token => ({
      headers: {
        'Content-Type': 'application/json',
      },
      status: 201,
      body: { token },
    })),
    catchError(() => throwError(
      new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED),
    )),
  )),
);

const api$ = combineRoutes('/api', [
  sessions$,
]);

export default api$;
