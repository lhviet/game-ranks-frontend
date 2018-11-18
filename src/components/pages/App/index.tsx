import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import AddUserForm from '^/containers/molecules/AddUserForm';
import Topbar from '^/containers/molecules/Topbar';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

const FixedTopbar: StyledComponent<React.ComponentClass, {}> = styled(Topbar)`
  position: fixed;
`;

const PageContainer: StyledComponent<'div', {}> = styled.div`
  position: relative;
  padding: 20px;
`;

const ListItem: StyledComponent<'li', {}> = styled.li`
  margin-bottom: 5px;
  padding: 4px;
  border: solid 1px grey;
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
            {games.map((g) => <ListItem key={g.keyid}>
              <div>{g.keyid}</div>
              <div>{g.value.code}</div>
              <div>{g.value.name}</div>
              <div>{g.value.description}</div>
              <div>{g.value.updated_at}</div>
              <div>{g.value.created_at}</div>
            </ListItem>)}
          </ul>

          <br />
          <h2>User List</h2>
          <br />
          <ul>
            {Object.keys(user).map((uKeyid) => <ListItem key={uKeyid}>
              <div>{uKeyid}</div>
              <div>{user[uKeyid].value.username}</div>
              <div>{user[uKeyid].value.display_name}</div>
              <div>{user[uKeyid].value.updated_at}</div>
              <div>{user[uKeyid].value.created_at}</div>
            </ListItem>)}
          </ul>
        </PageContainer>

        <AddUserForm />
      </Root>
    );
  }
}

export default App;
