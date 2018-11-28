import {connectRouter, routerMiddleware} from 'connected-react-router';
import {History} from 'history';
import {applyMiddleware, combineReducers, createStore, Reducer} from 'redux';
import {combineEpics, createEpicMiddleware, Epic} from 'redux-observable';

import { epics as gameEpic } from '^/store/duck/game';
import { epics as userEpic } from '^/store/duck/user';

import GameReducer from '^/store/duck/game';
import UserReducer from '^/store/duck/user';

import * as T from '^/store/types';
import createBrowserHistory from 'history/createBrowserHistory';

export const rootEpic: Epic = combineEpics(
  gameEpic,
  userEpic
);

const epicMiddleware = createEpicMiddleware();

export const configureStore = (
  history: History,
  reducers: Reducer<T.State>
) => {
  const enhancer =
    applyMiddleware(
      epicMiddleware,
      routerMiddleware(history)
      // other store enhancers if any
    );

  const store = createStore(reducers, enhancer);

// run the epics after middlewares in store really applied
  epicMiddleware.run(rootEpic);

  return store;
};

// console.log('ENVIRONMENT = ', process.env.NODE_ENV);
if (process.env.NODE_ENV === `development`) {
  /*const reduxLogger = require('redux-logger');
  const logger = reduxLogger.createLogger({
    collapsed: true
  });
  middlewares.push(logger);*/
}

const history: History = createBrowserHistory();
const storeReducer = combineReducers({
    Game: GameReducer,
    User: UserReducer,
    router: connectRouter(history)
  }) as Reducer<T.State>;
export const store = configureStore(history, storeReducer);
