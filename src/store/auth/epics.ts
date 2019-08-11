import { Ep, isActionOf } from 'typesafe-actions';
import { createSession } from './actions';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { from, of } from 'rxjs';

export const postSessionFlow: Ep = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(createSession.request)),
  switchMap(action => from(api.auth.postSession(action.payload)).pipe(
    map(createSession.success),
    catchError((err) => of(createSession.failure(err))),
    takeUntil(action$.pipe(filter(isActionOf(createSession.cancel)))),
  )),
);
