import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import * as T from '^/store/types';
import {AddNewMatch} from '^/store/duck/game';

import GameDetail, {Props} from '^/components/pages/GameDetail';

type StatePropKeys = 'games' | 'user';
export type StateProps = Pick<Props, StatePropKeys>;

type DispatchPropsKey = 'addMatch';
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
  addMatch(
    gameKeyid: string,
    winners: T.User['keyid'][],
    losers: T.User['keyid'][]
  ): void {
    dispatch(AddNewMatch(gameKeyid, winners, losers));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
