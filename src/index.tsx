import App from '^/App';
import registerServiceWorker from '^/registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { store } from '^/store';
import { Provider } from 'react-redux';

import styled, {StyledComponent} from 'styled-components';

const MyApp: StyledComponent<React.ComponentClass, {}> = styled(App)`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

const rootElement: HTMLElement | null = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  rootElement
);

registerServiceWorker();
