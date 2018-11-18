import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import * as T from '^/store/types';

import UserDetail, {Props} from '^/components/pages/UserDetail';
import {GetUserGameInfo} from '^/store/duck/user';

type StatePropKeys = 'games' | 'user';
export type StateProps = Pick<Props, StatePropKeys>;

type DispatchPropsKey = 'getUserGameInfo';
export type DispatchProps = Pick<Props, DispatchPropsKey>;

export const mapStateToProps: (
  state: Pick<T.State, 'Game' | 'User'>
) => StateProps = (
  { Game, User }
) => ({
  games: Game.games,
  user: User.user,
  userIds: User.userIds,
});

export const mapDispatchToProps: (
  dispatch: Dispatch
) => DispatchProps = (
  dispatch
) => ({
  getUserGameInfo(userKeyid: string): void {
    dispatch(GetUserGameInfo(userKeyid));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
