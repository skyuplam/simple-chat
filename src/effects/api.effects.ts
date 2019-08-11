import { r, HttpError, HttpStatus, combineRoutes } from '@marblejs/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { generateTokenPayload } from '../tokens';
import { throwError, iif, of } from 'rxjs';
import { isAuthorized, findUserByName } from '../utils/dbHelpers';


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
    switchMap(payload => iif(
      () => !isAuthorized(payload),
      throwError(
        new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED),
      ),
      of(payload),
    )),
    map(payload => {
      const token = generateTokenPayload(payload);
      const user = findUserByName(payload.name);
      return { token, user };
    }),
    map(body => ({
      headers: { 'Content-Type': 'application/json' },
      status: 201,
      body,
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
