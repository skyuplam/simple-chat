/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ChatClient from '../ChatClient';


describe('ChatClient', () => {
  test('render without crashing', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'application');
    ReactDOM.render((<ChatClient />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
