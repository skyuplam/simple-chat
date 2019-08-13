import { r, HttpError, HttpStatus, combineRoutes } from '@marblejs/core';
import { map, catchError, switchMap, flatMap } from 'rxjs/operators';
import { throwError, iif, of } from 'rxjs';
import { generateTokenPayload } from '../utils/tokens';
import { isAuthorized, findUserByName, User } from '../utils/dbHelpers';
import { jwtConfig } from '../config';
import { authorize$ } from '../middlewares/auth';


const sessionsPost$ = r.pipe(
  r.matchPath('/sessions'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    map(req => {
      const { name } = req.body as {
        name: string;
      };
      const { origin } = req.headers;
      const user = findUserByName(name) as User;
      return { ...user, origin };
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
      return { token, user: payload };
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

const sessionsGet$ = r.pipe(
  r.matchPath('/sessions'),
  r.matchType('GET'),
  r.use(authorize$(jwtConfig)),
  r.useEffect(req$ => req$.pipe(
    flatMap(req => of(req).pipe(
      map((req) => {
        const { id, name } = req.user as { id: string; name: string };
        const token = generateTokenPayload(req.user);
        return { token, user: { id, name } };
      }),
      map(body => ({
        headers: { 'Content-Type': 'application/json' },
        body,
      })),
    )),
    catchError(() => throwError(
      new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED),
    )),
  )),
);

const apis$ = combineRoutes('/api', [
  sessionsPost$, sessionsGet$,
]);

export default apis$;
