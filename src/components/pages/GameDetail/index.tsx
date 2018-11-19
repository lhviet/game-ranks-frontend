import * as _ from 'lodash-es';
import * as React from 'react';
import { match } from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import ButtonUser from '^/components/atoms/ButtonUser';
import ButtonUserBucket from '^/components/molecules/ButtonUserBucket';
import CardItemGame from '^/components/molecules/CardItemGame';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

const Title: StyledComponent<'h1', {}> = styled.h1`
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const BucketWrapper: StyledComponent<'div', {}> = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`;

const SubmitButton: StyledComponent<'button', {}> = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;

  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
const ResetButton = styled(SubmitButton)`
  background-color: #ec9090;
`;

export interface Props {
  readonly match: match<{game_code: string}>;
  readonly games: T.Game[];
  readonly addMatchStatus: T.APIStatus;
  readonly user: T.UserState['user'];
  readonly userIds: T.User['keyid'][];
  addMatch(
    gameKeyid: string,
    winners: T.User['keyid'][],
    losers: T.User['keyid'][]
  ): void;
  resetApiStatus(): void;
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

  public render(): React.ReactNode {
    const {match, games, user, userIds, addMatchStatus}: Props = this.props;
    const {isWinner, winners, losers}: State = this.state;
    const game: T.Game | undefined = games.find((g) => g.value.code === match.params.game_code);


    const gameInfo: React.ReactNode = game === undefined ? (
      <h1>Game not Found :-(</h1>
      ) : (
      <CardItemGame game={game} isFullDisplay={true} />
    );

    return (
      <Root>
        {gameInfo}

        <Title>Select the participants below for a new Game</Title>

        {userIds.map((userKeyid) => (
          <ButtonUser key={userKeyid} user={user[userKeyid].info} onClick={() => this.addParticipant(userKeyid)} />
        ))}

        <BucketWrapper>
          <ButtonUserBucket title={'The winners'} isSelected={isWinner} onClick={this.selectWinner}>
            <React.Fragment>
              {winners.map((winner) => (
                <ButtonUser key={winner} user={user[winner].info} onClick={() => this.removeParticipant(winner)} />
              ))}
            </React.Fragment>
          </ButtonUserBucket>
          <ButtonUserBucket title={'Other participants'} isSelected={!isWinner} onClick={this.selectLoser}>
            <React.Fragment>
              {losers.map((loser) => (
                <ButtonUser key={loser} user={user[loser].info} onClick={() => this.removeParticipant(loser)} />
              ))}
            </React.Fragment>
          </ButtonUserBucket>
        </BucketWrapper>

        <SubmitButton
          type='button'
          onClick={this.addMatch}
          disabled={addMatchStatus === T.APIStatus.SUCCESS}
        >
          {this.getSubmitButton(addMatchStatus)}
        </SubmitButton>

        <ResetButton type='button' onClick={this.reset}>
          {'Reset'}
        </ResetButton>
      </Root>
    );
  }

  private getSubmitButton: (status: T.APIStatus) => string = (status: T.APIStatus) => {
    switch (status) {
      case T.APIStatus.IDLE:
        return 'Submit';
      case T.APIStatus.PROGRESS:
        return 'Adding';
      case T.APIStatus.SUCCESS:
        return 'Done';
      default:
        return 'Submit';
    }
  }

  private selectWinner = () => this.setState({isWinner: true});
  private selectLoser = () => this.setState({isWinner: false});

  private addParticipant = (userKeyid: string) => this.setState((prevState: State) => {
    let winners: T.User['keyid'][] = [];
    let losers: T.User['keyid'][] = [];
    if (prevState.isWinner) {
      winners = _.uniq([...prevState.winners, userKeyid]);
      const duplicateUser = _.intersection(winners, prevState.losers);
      losers = _.difference(prevState.losers, duplicateUser);
    } else {
      losers = _.uniq([...prevState.losers, userKeyid]);
      const duplicateUser = _.intersection(losers, prevState.winners);
      winners = _.difference(prevState.winners, duplicateUser);
    }

    return {
      ...prevState,
      winners,
      losers
    };
  })

  private removeParticipant = (userKeyid: string) => this.setState((prevState: State) => (
    prevState.isWinner ? {
      ...prevState,
      winners: _.difference(prevState.winners, [userKeyid])
    } : {
      ...prevState,
      losers: _.difference(prevState.losers, [userKeyid])
    }
  ))

  private addMatch = () => {
    const game: T.Game | undefined = this.props.games
      .find((g) => g.value.code === this.props.match.params.game_code);
    if (game && this.props.addMatchStatus !== T.APIStatus.SUCCESS) {
      this.props.addMatch(game.keyid, this.state.winners, this.state.losers);
    }
  }

  private reset = () => {
    this.props.resetApiStatus();
    this.setState({
      isWinner: true,
      winners: [],
      losers: [],
    });
  }
}

export default GameDetail;
