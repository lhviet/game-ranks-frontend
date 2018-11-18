import {createActionCancel, createActionDone, createActionFailed, createActionStart} from '^/store/duck/ActionHelper';
import {makeAPIURL} from '^/store/duck/API';
import {AnyAction, Reducer} from 'redux';
import {ActionsObservable, combineEpics, Epic, ofType} from 'redux-observable';
import {of} from 'rxjs';
import {ajax, AjaxError} from 'rxjs/ajax';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';

import * as T from '^/store/types';

// ----- ACTIONS & EPICS -------------------------------------------
export const GAME__LIST: string = 'GAME__LIST';
export const listGames: () => AnyAction = () => ({ type: GAME__LIST });

const epicListGamesStart = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(createActionStart(GAME__LIST)),
  switchMap(() => ajax.get(makeAPIURL('game'))
    .pipe(
      switchMap(({response}) => of(createActionDone(GAME__LIST, response.data))),
      catchError((ajaxError: AjaxError) => of(createActionFailed(GAME__LIST, ajaxError))),
      takeUntil(
        action$.pipe(
          ofType(createActionCancel(GAME__LIST))
        )
      )
    ))
);

// ----- EPICs -----------------------------------------------------
export const epics: Epic = combineEpics(
  epicListGamesStart,
);

// ----- REDUCER ---------------------------------------------------
const initialState: T.GameState = {
  games: {},
  allIds: [],
  getGamesStatus: T.APIStatus.IDLE,
};
/**
 * Process only actions of GAME__
 */
const reducer: Reducer<T.GameState> = (state = initialState, action: AnyAction) => {

  // console.log('action = ', action);

  // if this action is not belong to WORD, return the original state
  if (action.type.indexOf('GAME__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${GAME__LIST}_START`:
      return {...state, getGamesStatus: T.APIStatus.PROGRESS};
    case `${GAME__LIST}_DONE`:
      return {...state, searchResult: action.data, getGamesStatus: T.APIStatus.SUCCESS};
    case `${GAME__LIST}_FAILED`:
      return {...state, getGamesStatus: T.APIStatus.ERROR};

    default:
      return state;
  }
};
export default reducer;
