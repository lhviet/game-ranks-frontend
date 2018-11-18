import {createActionCancel, createActionDone, createActionFailed, createActionStart} from '^/store/duck/ActionHelper';
import {makeAPIURL} from '^/store/duck/API';
import {Action, AnyAction} from 'redux';
import {ActionsObservable, combineEpics, Epic, ofType} from 'redux-observable';
import {ajax, AjaxError} from 'rxjs/ajax';
import {catchError, mergeMap, switchMap, takeUntil, map} from 'rxjs/operators';

import * as T from '^/store/types';

// ----- ACTIONS & EPICS -------------------------------------------
export const USER__LIST: string = 'USER__LIST';
export const ListUsers: () => Action = () => createActionStart(USER__LIST);

export const USER__ADD: string = 'USER__ADD';
export const AddNewUser: (username: string, display_name: string) => Action =
  (username: string, display_name: string) => createActionStart(USER__ADD, {username, display_name});

const epicListUsers = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(createActionStart(USER__LIST).type),
  switchMap(() => ajax.get(makeAPIURL('user'))
    .pipe(
      switchMap(({response}) => [createActionDone(USER__LIST, response.data)]),
      catchError((ajaxError: AjaxError) => [(createActionFailed(USER__LIST, ajaxError))]),
      takeUntil(
        action$.pipe(
          ofType(createActionCancel(USER__LIST).type)
        )
      )
    ))
);

const epicAddNewUser = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(createActionStart(USER__ADD).type),
  mergeMap(({data}) => ajax.post(makeAPIURL('user'), data)
    .pipe(
      map(({response}) => createActionDone(USER__ADD, response)),
      catchError((ajaxError: AjaxError) => [(createActionFailed(USER__ADD, ajaxError))]),
      takeUntil(
        action$.pipe(
          ofType(createActionCancel(USER__ADD).type)
        )
      )
    ))
);

// ----- EPICs -----------------------------------------------------
export const epics: Epic = combineEpics(
  epicListUsers,
  epicAddNewUser,
);

// ----- REDUCER ---------------------------------------------------
const initialState: T.UserState = {
  user: {},
  userIds: [],
  getUsersStatus: T.APIStatus.IDLE,
  addUsersStatus: T.APIStatus.IDLE,
};
/**
 * Process only actions of USER__
 */
const reducer = (state = initialState, action: AnyAction) => {
  // if this action is not belong to USER, return the original state
  if (action.type.indexOf('USER__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${USER__LIST}_START`:
      return {...state, getUsersStatus: T.APIStatus.PROGRESS};
    case `${USER__LIST}_DONE`:
      const user = {};
      action.data.forEach((g: T.User) => user[g.keyid] = g);

      return {
        ...state,
        user,
        userIds: Object.keys(user),
        getUsersStatus: T.APIStatus.SUCCESS
      };
    case `${USER__LIST}_FAILED`:
      return {...state, getUsersStatus: T.APIStatus.ERROR};

    case `${USER__ADD}_START`:
      return {...state, addUsersStatus: T.APIStatus.PROGRESS};
    case `${USER__ADD}_DONE`:
      const newUserState = {
        ...state.user,
        [action.data.keyid]: action.data,
      };

      return {
        ...state,
        user: newUserState,
        userIds: state.userIds.push(action.data.keyid),
        addUsersStatus: T.APIStatus.SUCCESS
      };
    case `${USER__ADD}_FAILED`:
      return {...state, addUsersStatus: T.APIStatus.ERROR};

    default:
      return state;
  }
};
export default reducer;
