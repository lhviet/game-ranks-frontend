import * as React from 'react';
import { match } from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

export interface Props {
  readonly match: match<{username: string}>;
  readonly games: T.Game[];
  readonly user: T.UserState['user'];
  readonly userIds: T.User['keyid'][];
  addMatch(
    gameKeyid: string,
    winners: T.User['keyid'][],
    losers: T.User['keyid'][]
  ): void;
}
export interface State {
  isWinner: boolean;
  winners: T.User['keyid'][];
  losers: T.User['keyid'][];
}

class UserDetail extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isWinner: true,
      winners: [],
      losers: [],
    };
  }

  public render(): React.ReactNode {
    const {match, user, userIds}: Props = this.props;
    const currentUser = userIds
      .map((uId) => user[uId])
      .find((u) => u.value.username === match.params.username);

    return (
      <Root>
        Hello, this is UserDetail of {currentUser ? currentUser.value.display_name : 'ERROR, does this User exist ?!'}
      </Root>
    );
  }
}

export default UserDetail;
