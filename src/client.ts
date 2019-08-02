import ReactDOM from 'react-dom';
import { createElement } from 'react';
import ChatClient from './components/ChatClient';


ReactDOM.render(
  createElement(ChatClient),
  document.getElementById('application'),
);
