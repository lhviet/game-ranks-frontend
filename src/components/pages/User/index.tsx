import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import Topbar from '^/components/molecules/Topbar';
import UserDetail from '^/containers/pages/UserDetail';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

const FixedTopbar: StyledComponent<React.ComponentClass, {}> = styled(Topbar)`
  position: fixed;
`;

export interface Props {
}

class User extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <Root>
        <FixedTopbar />
        <Switch>
          <Route path='/user/:username' component={UserDetail}/>
          <Redirect from='/user' to='/'/>
        </Switch>
      </Root>
    );
  }
}

export default User;
