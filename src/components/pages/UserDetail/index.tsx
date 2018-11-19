import * as React from 'react';
import { match } from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import CardItemUser from '^/components/molecules/CardItemUser';
import ChartPie from '^/components/molecules/ChartPie';
import UserVersusInfo from '^/components/organisms/UserVersusInfo';
import ChartRadar from '^/components/molecules/ChartRadar';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const GameWrapper: StyledComponent<'div', {}> = styled.div`
  padding: 5px;
  margin-top: 15px;
`;
const GameChartWrapper: StyledComponent<'div', {}> = styled.div`
  display: inline-block;
  width: 300px;
  height: 250px;
  border: solid 1px #e0e0e0;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px;
`;
const GameRadarWrapper: StyledComponent<'div', {}> = styled.div`
  width: 400px;
  height: 400px;
  margin: 5px auto;
`;
const RecordInfoWrapper: StyledComponent<'div', {}> = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
const UserVersusInfoWrapper: StyledComponent<'div', {}> = styled.div`
  display: inline-block;
  margin-bottom: 15px;
`;
const Title: StyledComponent<'h2', {}> = styled.h2`
  font-size: 18px
  font-weight: 700;
  color: gray;
  margin-top: 10px;
  margin-bottom: 15px;
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
    }

    const userInfo: React.ReactNode = currentUser === undefined ? (
      <Title>User not Found :-(</Title>
    ) : (
      <CardItemUser user={currentUser.info} isFullDisplay={true} />
    );

    return (
      <Root>
        {userInfo}

        {this.getGameChart(currentUser)}

        {this.getUserChart(currentUser)}

      </Root>
    );
  }

  private selectGame = (selectedGameId: T.Game['keyid']) => this.setState({selectedGameId});

  private getGameChart: (currentUser: T.UserGame | undefined) => React.ReactNode = (currentUser: T.UserGame | undefined) => {
    if (currentUser === undefined || currentUser.game === undefined) {
      return undefined;
    }

    return <GameWrapper>
      <Title>Click on Game below to see detailed matches</Title>
      {
        Object.keys(currentUser.game).map((gId) => {
          const game = currentUser.game[gId];

          return <GameChartWrapper key={gId} onClick={() => this.selectGame(gId)}>
            <ChartPie title={`${game.total} matches of ${game.game_name}`} loss={game.total - game.win} won={game.win} />
          </GameChartWrapper>;
        })
      }
    </GameWrapper>;
  }

  private getUserChart: (currentUser: T.UserGame | undefined) => React.ReactNode = (currentUser: T.UserGame | undefined) => {
    const {selectedGameId} = this.state;
    if (currentUser === undefined || currentUser.game === undefined || selectedGameId === undefined) {
      return undefined;
    }

    const gameRecords: T.RecordInfo = currentUser.game[selectedGameId].records;

    const opponentNames = Object.keys(gameRecords).map((keyid) => this.props.user[keyid].info.value.username);
    const opponentTotals = Object.keys(gameRecords).map((keyid) => gameRecords[keyid].total);

    return (
      <RecordInfoWrapper>
        <Title>{currentUser.game[selectedGameId].game_name}</Title>

        <GameRadarWrapper>
          <ChartRadar title={'Total games'} usernames={opponentNames} totals={opponentTotals} />
        </GameRadarWrapper>

        {
          Object.keys(gameRecords).map((opponentId) => {
            const record = gameRecords[opponentId];
            const opponent = this.props.user[opponentId];

            return (
              <UserVersusInfoWrapper key={opponentId}>
                <UserVersusInfo user={opponent.info} record={record} />
              </UserVersusInfoWrapper>
            );
          })
        }
      </RecordInfoWrapper>
    );
  }
}

export default UserDetail;
