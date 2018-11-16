import App from '^/App';
import '^/index.css';
import registerServiceWorker from '^/registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { store } from '^/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

registerServiceWorker();
