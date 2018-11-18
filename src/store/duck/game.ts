import {createActionCancel, createActionDone, createActionFailed, createActionStart} from '^/store/duck/ActionHelper';
import {makeAPIURL} from '^/store/duck/API';
import {Action, AnyAction} from 'redux';
import {ActionsObservable, combineEpics, Epic, ofType} from 'redux-observable';
import {ajax, AjaxError} from 'rxjs/ajax';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';

import * as T from '^/store/types';

// ----- ACTIONS & EPICS -------------------------------------------
export const GAME__LIST: string = 'GAME__LIST';
export const ListGames: () => Action = () => createActionStart(GAME__LIST);

const epicListGames = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(ListGames().type),
  switchMap(() => ajax.get(makeAPIURL('game'))
    .pipe(
      switchMap(({response}) => [createActionDone(GAME__LIST, response.data)]),
      catchError((ajaxError: AjaxError) => [(createActionFailed(GAME__LIST, ajaxError))]),
      takeUntil(
        action$.pipe(
          ofType(createActionCancel(GAME__LIST).type)
        )
      )
    ))
);

// ----- EPICs -----------------------------------------------------
export const epics: Epic = combineEpics(
  epicListGames
);

// ----- REDUCER ---------------------------------------------------
const initialState: T.GameState = {
  games: [],
  getGamesStatus: T.APIStatus.IDLE
};
/**
 * Process only actions of GAME__
 */
const reducer = (state = initialState, action: AnyAction) => {
  // if this action is not belong to GAME, return the original state
  if (action.type.indexOf('GAME__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${GAME__LIST}_START`:
      return {...state, getGamesStatus: T.APIStatus.PROGRESS};
    case `${GAME__LIST}_DONE`:
      return {
        ...state,
        games: action.data,
        getGamesStatus: T.APIStatus.SUCCESS
      };
    case `${GAME__LIST}_FAILED`:
      return {...state, getGamesStatus: T.APIStatus.ERROR};

    default:
      return state;
  }
};
export default reducer;
