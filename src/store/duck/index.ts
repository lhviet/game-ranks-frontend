import GameReducer from '^/store/duck/game';
import * as T from '^/store/Types';
import {combineReducers, Reducer} from 'redux';

export default combineReducers({
  Game: GameReducer
}) as Reducer<T.State>;
