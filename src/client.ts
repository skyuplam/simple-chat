/**
 * Client entry point
 */
// This must be the first line in src/index.ts
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'tslib';

import ReactDOM from 'react-dom';
import { createElement } from 'react';
import ChatClient from './components/ChatClient';


ReactDOM.render(
  createElement(ChatClient),
  document.getElementById('application'),
);
