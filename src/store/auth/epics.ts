import { Ep, isActionOf } from 'typesafe-actions';
import {
  filter, switchMap, map, catchError, takeUntil, flatMap, mapTo,
} from 'rxjs/operators';
import { from, of, empty } from 'rxjs';
import { createSession, loadCookie, validateSession, storeCookie } from './actions';
import { createCookiesStorage } from '../../utils/persistence';
import { COOKIE_KEY } from '../../config';

const cookies = createCookiesStorage();

// create a new session
export const postSessionFlow: Ep = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(createSession.request)),
  switchMap(action => from(api.auth.postSession(action.payload)).pipe(
    map(createSession.success),
    catchError((err) => of(createSession.failure(err))),
    takeUntil(action$.pipe(filter(isActionOf(createSession.cancel)))),
  )),
);

// persist token into cookie
export const storeCookieFlow: Ep = action$ => action$.pipe(
  filter(isActionOf(createSession.success)),
  switchMap(action => {
    const { payload: { payload: { token } } } = action;
    return from(cookies.setItem(COOKIE_KEY, token)).pipe(
      mapTo(storeCookie.success()),
      catchError(() => of(storeCookie.failure())),
    );
  }),
);

// Load cookie token from cookie storage
export const loadCookieFlow: Ep = action$ => action$.pipe(
  filter(isActionOf(loadCookie.request)),
  switchMap(() => from(cookies.getItem(COOKIE_KEY)).pipe(
    map(loadCookie.success),
    catchError((err) => of(loadCookie.failure(err))),
  )),
);

// Validate the cookie token from server
export const validateSessionFlow: Ep = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(loadCookie.success)),
  switchMap(() => from(api.auth.getSession()).pipe(
    map(validateSession.success),
    catchError((err) => of(validateSession.failure(err))),
    takeUntil(action$.pipe(filter(isActionOf(validateSession.cancel)))),
  )),
);

// Remove Cookie when fail on validation
export const cleanCookieFlow: Ep = action$ => action$.pipe(
  filter(isActionOf(validateSession.failure)),
  switchMap(() => from(cookies.removeItem(COOKIE_KEY)).pipe(
    flatMap(() => empty()),
  )),
);
