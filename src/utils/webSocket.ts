import { head } from 'lodash';


export interface WebSocketCreator {
  new(url: string, protocols?: string|string[]): WebSocket;
}
const webSocketCreator: WebSocketCreator = head([
  typeof WebSocket !== 'undefined' && WebSocket,
  // @ts-ignore
  typeof MozWebSocket !== 'undefined' && MozWebSocket,
  // @ts-ignore
  typeof global !== 'undefined' && (global.WebSocket || global.MozWebSocket),
  // @ts-ignore
  typeof window !== 'undefined' && (window.WebSocket || window.MozWebSocket),
].filter(Boolean));

export default webSocketCreator;
