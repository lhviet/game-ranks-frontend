import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import {AddNewMatch, ResetAddMatchAPIStatus} from '^/store/duck/game';
import * as T from '^/store/types';

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
  addMatchStatus: Game.addMatchStatus,
  user: User.user,
  userIds: User.userIds
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
  },
  resetApiStatus(): void {
    dispatch(ResetAddMatchAPIStatus());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
