import * as React from 'react';
import { match } from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';
import ChartBar from '^/components/molecules/ChartBar';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

export interface Props {
  readonly match: match<{username: string}>;
  readonly games: T.Game[];
  readonly user: T.UserState['user'];
  readonly userIds: T.User['keyid'][];
  getUserGameInfo(userKeyid: string): void;
}
export interface State {
  selectedGameId?: T.Game['keyid'];
}

class UserDetail extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  public componentDidMount(): void {
    const {match, user, userIds}: Props = this.props;
    if (userIds) {
      const currentUser = userIds.map((uId) => user[uId])
        .find((u) => u.info.value.username === match.params.username);
      if (currentUser) {
        console.log('dispatch get game info');
        this.props.getUserGameInfo(currentUser.info.keyid);
      }
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    const {match, user, userIds}: Props = this.props;
    if ((!prevProps.userIds || prevProps.userIds.length === 0) && userIds.length > 0) {
      const currentUser = userIds.map((uId) => user[uId])
        .find((u) => u.info.value.username === match.params.username);
      if (currentUser) {
        console.log('dispatch get game info');
        this.props.getUserGameInfo(currentUser.info.keyid);
      }
    }
  }

  public render(): React.ReactNode {
    const {match, user, userIds}: Props = this.props;
    let currentUser: T.UserGame | undefined;
    if (userIds) {
      currentUser = userIds.map((uId) => user[uId])
        .find((u) => u.info.value.username === match.params.username);
      if (currentUser) {
        console.log('currentUser game = ', currentUser.game);
      }
    }

    return (
      <Root>
        Hello, this is UserDetail of {currentUser ? currentUser.info.value.display_name : 'ERROR, does this User exist ?!'}

        <ChartBar />

        {currentUser !== undefined && currentUser.game && (
          Object.keys(currentUser.game).map((gId) => {
            const game = currentUser!.game[gId];
            return <div>
              <h1>{game.game_name} ({game.game_code})</h1>
              <div>Total: {game.total}</div>
              <div>Won: {game.win}</div>
            </div>;
          })
        )}
      </Root>
    );
  }
}

export default UserDetail;
