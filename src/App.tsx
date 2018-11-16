import * as React from 'react';

import logoSvg from '^/logo.svg';
import styled, {Keyframes, keyframes, StyledComponent} from 'styled-components';

class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <Root>
        <Header>
          <Logo src={logoSvg} alt='logo' />
          <Title>Welcome to React</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </Intro>
      </Root>
    );
  }
}

const LogoSpinAnimation: Keyframes = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Root: StyledComponent<'div', {}> = styled.div`
  text-align: center;
`;
const Header: StyledComponent<'header', {}> = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;
const Intro: StyledComponent<'p', {}> = styled.p`
  font-size: large;
`;
const Logo: StyledComponent<'img', {}> = styled.img`
  animation: ${LogoSpinAnimation} infinite 20s linear;
  height: 80px;
`;
const Title: StyledComponent<'h1', {}> = styled.h1`
  font-size: 1.5em;
`;

export default App;
