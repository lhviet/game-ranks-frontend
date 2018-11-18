import styled, {StyledComponent} from 'styled-components';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from '^/registerServiceWorker';

import { store } from '^/store';
import {ListGames} from '^/store/duck/game';
import {ListUsers} from '^/store/duck/user';

import App from '^/containers/pages/App';

const MyApp: StyledComponent<React.ComponentClass, {}> = styled(App)`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

store.dispatch(ListGames());
store.dispatch(ListUsers());

const rootElement: HTMLElement | null = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  rootElement
);

registerServiceWorker();
