import * as _ from 'lodash-es';
import * as React from 'react';
import { match } from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

const SubmitButton: StyledComponent<'button', {}> = styled.button`
  padding: 15px;
`;

export interface Props {
  readonly match: match<{game_code: string}>;
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

class GameDetail extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isWinner: true,
      winners: [],
      losers: [],
    };
  }


  private setWinnerLoser = () => this.setState((prevState: State) => ({isWinner: !prevState.isWinner}));

  private addParticipant = (userKeyid: string) => this.setState((prevState: State) => (
    prevState.isWinner ? {
      ...prevState,
      winners: _.uniq([...prevState.winners, userKeyid])
    } : {
      ...prevState,
      losers: _.uniq([...prevState.losers, userKeyid])
    }
  ));

  private removeParticipant = (userKeyid: string) => this.setState((prevState: State) => (
    prevState.isWinner ? {
      ...prevState,
      winners: _.difference(prevState.winners, [userKeyid])
    } : {
      ...prevState,
      losers: _.difference(prevState.losers, [userKeyid])
    }
  ));

  private addMatch = () => {
    const game: T.Game | undefined = this.props.games.find((g) => g.value.code === this.props.match.params.game_code);
    if (game) {
      this.props.addMatch(game.keyid, this.state.winners, this.state.losers);
    }
  }

  public render(): React.ReactNode {
    const {match, games, user, userIds}: Props = this.props;
    const {winners, losers}: State = this.state;
    const game = games.find((g) => g.value.code === match.params.game_code);

    return (
      <Root>
        Hello, this is GameDetail of {game ? game.value.name : 'ERROR, does this Game exist ?!'}

        {userIds.map((u) => {
          return (<div key={u} onClick={() => this.addParticipant(u)}>{user[u].value.username} ({user[u].value.display_name})</div>);
        })}

        <br />

        <div onClick={this.setWinnerLoser}>
          <h2>Winners</h2>
          {winners.map((winner) => {
            return (<div key={winner} onClick={() => this.removeParticipant(winner)}>{user[winner].value.username}</div>);
          })}
        </div>

        <br />

        <div onClick={this.setWinnerLoser}>
          <h2>Others</h2>
          {losers.map((loser) => {
            return (<div key={loser} onClick={() => this.removeParticipant(loser)}>{user[loser].value.username}</div>);
          })}
        </div>

        <SubmitButton type='button' onClick={this.addMatch}>
          {'Submit'}
        </SubmitButton>
      </Root>
    );
  }
}

export default GameDetail;
