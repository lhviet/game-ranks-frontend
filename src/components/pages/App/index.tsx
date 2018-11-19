import * as React from 'react';
import {Link, LinkProps} from 'react-router-dom';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import Topbar from '^/components/molecules/Topbar';
import AddUserForm from '^/containers/molecules/AddUserForm';
import CardItemGame from '^/components/molecules/CardItemGame';
import CardItemUser from '^/components/molecules/CardItemUser';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

const FixedTopbar: StyledComponent<React.ComponentClass, {}> = styled(Topbar)`
  position: fixed;
`;

const LinkItem: StyledComponent<React.ComponentClass<LinkProps>, {}> = styled(Link)`
  text-decoration: none;
  color: #464646;
`;
const LinkItemWrapper = styled.div`
  margin-bottom: 10px;
`;

const PageContainer: StyledComponent<'div', {}> = styled.div`
  position: relative;
  padding: 20px;
`;

export interface Props {
  readonly games: T.Game[];
  readonly user: T.UserState['user'];
}

class App extends React.Component<Props> {
  public render(): React.ReactNode {
    const {games, user} = this.props;

    return (
      <Root>
        <FixedTopbar />

        <PageContainer>
          <h2>Game List</h2>
          <br />
          <ul>
            {games.map((g) =>
              <LinkItemWrapper key={g.keyid}>
                <LinkItem to={`/game/${g.value.code}`}>
                  <CardItemGame
                    game={g}
                    isFullDisplay={false}
                  />
                </LinkItem>
              </LinkItemWrapper>
            )}
          </ul>

          <br />
          <h2>User List</h2>
          <br />
          <ul>
            {Object.keys(user).map((uKeyid) =>
              <LinkItemWrapper key={uKeyid}>
                <LinkItem to={`/user/${user[uKeyid].info.value.username}`}>
                  <CardItemUser
                    user={user[uKeyid].info}
                    isFullDisplay={false}
                  />
                </LinkItem>
              </LinkItemWrapper>
            )}
          </ul>
        </PageContainer>

        <AddUserForm />
      </Root>
    );
  }
}

export default App;
