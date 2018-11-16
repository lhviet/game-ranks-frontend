import reducers from '^/store/duck/reducers';
import {StoreState} from '^/store/duck/types';
import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createEpicMiddleware} from 'redux-observable';

export const INITIAL_STATE: StoreState = {
};

const configureStore = (
  middlewares: any[],
  initialState: any = {...INITIAL_STATE},
  reducers: any,
) => {
  const enhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  );

  return createStore(reducers, initialState, enhancer);
};

const epicMiddleware = createEpicMiddleware();

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [
  epicMiddleware
];

// console.log('ENVIRONMENT = ', process.env.NODE_ENV);
if (process.env.NODE_ENV === `development`) {
  /*const reduxLogger = require('redux-logger');
  const logger = reduxLogger.createLogger({
    collapsed: true
  });
  middlewares.push(logger);*/
}

export const store = configureStore(middlewares, {}, reducers);
