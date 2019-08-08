import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Header from './Header';
import Main from '../containers/Main';


function ChatClient() {
  return (
    <Provider store={store}>
      <Header />
      <Main />
    </Provider>
  );
}

export default ChatClient;
