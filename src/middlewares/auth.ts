/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Authorization Middleware for HTTP/WebSocket
 * Verify the request cookie contains a valid JWT token
 */
import {
  AuthorizeMiddlewareConfig, verifyToken$,
} from '@marblejs/middleware-jwt';
import {
  HttpMiddlewareEffect, HttpRequest, HttpError, HttpStatus,
} from '@marblejs/core';
import { throwError, of, iif } from 'rxjs';
import { flatMap, tap, catchError, map } from 'rxjs/operators';
import Cookies from 'universal-cookie';

import { COOKIE_KEY } from '../config';
import { isAuthorized } from '../utils/dbHelpers';


/**
 * Parse Cookie from request header using `universal-cookie`
 */
export const parseCookies = (req: HttpRequest) => {
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get(COOKIE_KEY);
  if (token) {
    return token;
  }
  throw new Error();
};

/**
 * Assign the verify content, i.e. user info, to request object
 */
export const assignPayloadToRequest = (req: HttpRequest) =>
  (payload: object) => { req.user = payload; };

/**
 * Verify the payload returned from JWT verifier
 */
export const verifyPayload$ = (payload: any) => of(payload).pipe(
  flatMap((payload) => iif(
    () => isAuthorized(payload),
    of(payload),
    throwError(new Error()),
  )),
);


/**
 * Authorization middleware
 *
 * @param config See [[AuthorizeMiddlewareConfig]] for details
 */
export const authorize$ = (
  config: AuthorizeMiddlewareConfig,
): HttpMiddlewareEffect => req$ =>
  req$.pipe(
    flatMap(req => of(req).pipe(
      map(parseCookies),
      flatMap(verifyToken$(config)),
      flatMap(verifyPayload$),
      tap(assignPayloadToRequest(req)),
      flatMap(() => req$),
    )),
    catchError(() => throwError(
      new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED),
    )),
  );
