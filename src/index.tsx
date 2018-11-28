import styled, {StyledComponent} from 'styled-components';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import registerServiceWorker from '^/registerServiceWorker';

import { store } from '^/store';
import {ListGames} from '^/store/duck/game';
import {ListUsers} from '^/store/duck/user';

import Game from '^/components/pages/Game';
import User from '^/components/pages/User';
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
    <Router>
      <div>
        <Route exact={true} path='/' component={MyApp}/>
        <Route path='/game' component={Game}/>
        <Route path='/user' component={User}/>
      </div>
    </Router>
  </Provider>,
  rootElement
);

registerServiceWorker();
