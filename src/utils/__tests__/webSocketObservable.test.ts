/* eslint-disable @typescript-eslint/no-explicit-any */
import wsMock from 'jest-websocket-mock';
import ws from '../webSocketObservable';


interface WSEvent {
  type: string;
  payload: any;
}
describe('webSocketObservable', () => {
  const url = 'ws://localhost:1234';
  let server: wsMock;

  let connections = 0;

  beforeEach(async () => {
    connections = 0;

    server = new wsMock(
      url,
      { jsonProtocol: true },
    );

    server.on('connection', () => { connections += 1; });
    server.on('close', () => { connections -= 1; });
  });

  afterEach(() => {
    wsMock.clean();
  });

  test('send hello and receive world', async () => {
    const socket$ = ws(url);
    const subscription = socket$.subscribe({
      next: (x) => {
        expect(x).toEqual('world');
      },
    });

    await server.connected;

    expect(connections).toEqual(1);

    socket$.next('hello');
    await expect(server).toReceiveMessage('hello');
    server.send('world');

    subscription.unsubscribe();

    await server.closed;
    expect(connections).toEqual(0);
  });

  test('server error', async () => {
    const socket$ = ws(url);
    const subscription = socket$.subscribe({
      error: (e) => {
        expect(e.type).toEqual('error');
      },
    });

    await server.connected;

    server.error();

    await server.closed;
    expect(subscription.closed).toBeTruthy();
  });

  test('default de/serializer', async () => {
    const config = { url };
    const socket$ = ws<WSEvent>(config);
    const data = { type: 'TEST', payload: { hello: 'world' } };
    const subscription = socket$.subscribe({
      next: (x) => {
        expect(x).toEqual(data);
      },
    });

    await server.connected;

    server.send(data);

    socket$.next(data);
    await expect(server).toReceiveMessage(data);

    subscription.unsubscribe();
  });

  test('subMsg', async () => {
    const subMsg = () => ({ type: 'TEST sub MSG', payload: 'Hello' });
    const config = { url, subMsg };
    const socket$ = ws<WSEvent>(config);
    const data = { type: 'TEST', payload: { hello: 'world' } };
    const subscription = socket$.subscribe({
      next: (x) => {
        expect(x).toEqual(data);
      },
    });

    await server.connected;
    await expect(server).toReceiveMessage(subMsg());

    server.send(data);

    socket$.next(data);
    await expect(server).toReceiveMessage(data);

    subscription.unsubscribe();
  });

  test('unsubMsg', async () => {
    const unsubMsg = () => ({ type: 'TEST unsub MSG', payload: 'Hello' });
    const config = { url, unsubMsg };
    const socket$ = ws<WSEvent>(config);
    const data = { type: 'TEST', payload: { hello: 'world' } };
    const subscription = socket$.subscribe({
      next: (x) => {
        expect(x).toEqual(data);
      },
    });

    await server.connected;

    server.send(data);

    socket$.next(data);
    await expect(server).toReceiveMessage(data);

    subscription.unsubscribe();
    await expect(server).toReceiveMessage(unsubMsg());
  });

  test('openObserver, closingObserver, closingObserver', async () => {
    let closing = false;
    const config = {
      url,
      openObserver: {
        next: (e: Event) => {
          expect(e.type).toEqual('open');
        },
      },
      closingObserver: {
        next: () => {
          closing = true;
        },
      },
      closeObserver: {
        next: (e: CloseEvent) => { expect(e.type).toEqual('close'); },
      },
    };
    const socket$ = ws<WSEvent>(config);
    const data = { type: 'TEST', payload: { hello: 'world' } };
    const subscription = socket$.subscribe({
      next: (x) => {
        expect(x).toEqual(data);
      },
    });

    await server.connected;

    server.send(data);

    socket$.next(data);
    await expect(server).toReceiveMessage(data);

    subscription.unsubscribe();
    await server.closed;
    expect(closing).toBeTruthy();
  });
});
