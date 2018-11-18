import { connect } from 'react-redux';

import * as T from '^/store/types';

import App, {Props} from '^/components/pages/App';

type StatePropKeys = 'games' | 'user';
export type StateProps = Pick<Props, StatePropKeys>;

export const mapStateToProps: (
  state: Pick<T.State, 'Game' | 'User'>
) => StateProps = (
  { Game, User }
) => ({
  games: Game.games,
  user: User.user,
});

export default connect(mapStateToProps, undefined)(App);
