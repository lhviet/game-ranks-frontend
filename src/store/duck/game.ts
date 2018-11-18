import {createActionCancel, createActionDone, createActionFailed, createActionStart} from '^/store/duck/ActionHelper';
import {makeAPIURL} from '^/store/duck/API';
import {Action, AnyAction} from 'redux';
import {ActionsObservable, combineEpics, Epic, ofType} from 'redux-observable';
import {ajax, AjaxError} from 'rxjs/ajax';
import {catchError, map, mergeMap, switchMap, takeUntil} from 'rxjs/operators';

import * as T from '^/store/types';

// ----- ACTIONS & EPICS -------------------------------------------
export const GAME__LIST: string = 'GAME__LIST';
export const ListGames: () => Action = () => createActionStart(GAME__LIST);

export const GAME_MATCH__ADD: string = 'GAME_MATCH__ADD';
export const AddNewMatch: (gameKeyid: string, winners: T.User['keyid'][], losers: T.User['keyid'][]) => Action =
  (gameKeyid: string, winners: T.User['keyid'][], losers: T.User['keyid'][]) =>
    createActionStart(GAME_MATCH__ADD, {gameKeyid, winners, losers});

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

const epicAddNewMatch = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(createActionStart(GAME_MATCH__ADD).type),
  mergeMap(({data}) => {
    const body = {
      participants: [
        ...data.winners.map((w: string) => ({user_keyid: w, status: T.WinLossStatus.WIN})),
        ...data.losers.map((l: string) => ({user_keyid: l, status: T.WinLossStatus.LOSS})),
      ]
    };
    console.log('body = ', body);

    return ajax.post(makeAPIURL('game', data.gameKeyid, 'match'), body, T.HEADER_JSON)
      .pipe(
        map(({response}) => createActionDone(GAME_MATCH__ADD, response)),
        catchError((ajaxError: AjaxError) => [(createActionFailed(GAME_MATCH__ADD, ajaxError))]),
        takeUntil(
          action$.pipe(
            ofType(createActionCancel(GAME_MATCH__ADD).type)
          )
        )
      );
  })
);

// ----- EPICs -----------------------------------------------------
export const epics: Epic = combineEpics(
  epicListGames,
  epicAddNewMatch,
);

// ----- REDUCER ---------------------------------------------------
const initialState: T.GameState = {
  games: [],
  getGamesStatus: T.APIStatus.IDLE,
  addMatchStatus: T.APIStatus.IDLE,
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


    case `${GAME_MATCH__ADD}_START`:
      return {...state, addMatchStatus: T.APIStatus.PROGRESS};
    case `${GAME_MATCH__ADD}_DONE`:
      return {...state, addMatchStatus: T.APIStatus.SUCCESS};
    case `${GAME_MATCH__ADD}_FAILED`:
      return {...state, addMatchStatus: T.APIStatus.ERROR};

    default:
      return state;
  }
};
export default reducer;
