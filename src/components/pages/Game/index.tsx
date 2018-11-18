import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import styled, {StyledComponent} from 'styled-components';

import Topbar from '^/components/molecules/Topbar';
import GameDetail from '^/containers/pages/GameDetail';

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;

const FixedTopbar: StyledComponent<React.ComponentClass, {}> = styled(Topbar)`
  position: fixed;
`;

export interface Props {
}

class Game extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <Root>
        <FixedTopbar />
        <Switch>
          <Route path='/game/:game_code' component={GameDetail}/>
          <Redirect from='/game' to='/'/>
        </Switch>
      </Root>
    );
  }
}

export default Game;
