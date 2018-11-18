import LogoPng from '^/assets/terem-logov2.png';
import * as React from 'react';
import {StyledComponent} from 'styled-components';
import styled from 'styled-components';

const Root: StyledComponent<'div', {}> = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 70px;
  padding-right: 40px;
  background-color: #495766;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  align-items: center;
`;
const TopbarLogo: StyledComponent<'img', {}> = styled.img`
  cursor: pointer;
  width: 95px;
  margin: 0;
  padding: 0;
  margin-left: 7px;
  float: left;
  position: relative;
  left: 0;
  top: 0;
  z-index: 999999;
`;

const Title: StyledComponent<'h1', {}> = styled.h1`
  font-size: 1.5em;
  position: relative;
  left: 20px;
  color: #ff9595;
`;

export interface Props {
  onLogoClick(): void;
}
const Topbar: React.FunctionComponent<Props> = ({ onLogoClick }: Props) => {
  return (
    <Root>
      <TopbarLogo src={LogoPng} onClick={onLogoClick} />
      <Title>Game Ranking System</Title>
    </Root>
  );
};
export default Topbar;
