import * as React from 'react';
import { match } from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import ButtonUser from '^/components/atoms/ButtonUser';
import CardItemUser from '^/components/molecules/CardItemUser';
import ChartPie from '^/components/molecules/ChartPie';
import * as T from '^/store/types';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;
const GameChartWrapper: StyledComponent<'div', {}> = styled.div`
  display: inline-block;
  width: 300px;
  height: 250px;
  border: solid 1px #e0e0e0;
  border-radius: 3px;
  cursor: pointer;
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
      <h1>User not Found :-(</h1>
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

    return <React.Fragment>
      {
        Object.keys(currentUser.game).map((gId) => {
          const game = currentUser.game[gId];

          return <GameChartWrapper key={gId} onClick={() => this.selectGame(gId)}>
            <ChartPie title={`${game.total} matches of ${game.game_name}`} loss={game.total - game.win} won={game.win} />
          </GameChartWrapper>;
        })
      }
    </React.Fragment>;
  }

  private getUserChart: (currentUser: T.UserGame | undefined) => React.ReactNode = (currentUser: T.UserGame | undefined) => {
    const {selectedGameId} = this.state;
    if (currentUser === undefined || currentUser.game === undefined || selectedGameId === undefined) {
      return undefined;
    }

    const gameRecords: T.RecordInfo = currentUser.game[selectedGameId].records;

    return (
      <table>
        <tbody>
        {
          Object.keys(gameRecords).map((opponentId) => {
            const record = gameRecords[opponentId];
            const opponent = this.props.user[opponentId];

            return (
              <tr key={opponentId}>
                <td>
                  <ButtonUser user={opponent.info}/>
                </td>
                <td>
                  <ChartPie
                    title={`${record.total} game matches`}
                    loss={record.total - record.win}
                    won={record.win}
                  />
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

export default UserDetail;
