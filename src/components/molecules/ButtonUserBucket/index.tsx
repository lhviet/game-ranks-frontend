import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';
import {ReactElement} from 'react';

interface RootProps {
  isSelected: boolean;
}
const Root = styled.div`
  border: solid 1px #b4cceab5;
  border-radius: 8px;
  padding: 2px;
  position: relative;
  cursor: pointer;
  display: block;
  margin: 5px;
  width: 100%;
  min-height: 150px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background: ${({isSelected}: RootProps) => isSelected && '#ffd4bf'};

  &:hover {
    background: #c9e1ff;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const Title: StyledComponent<'h2', {}> = styled.h2`
  font-size: 18px;
  color: #495766;
  font-weight: 700;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const Content: StyledComponent<'div', {}> = styled.div`
  padding: 5px;
`;

export interface Props {
  title: string;
  isSelected: boolean;
  onClick(): void;
  readonly children: ReactElement<object>;
}

const ButtonUserBucket: React.FunctionComponent<Props> = ({title, isSelected, onClick, children}: Props) => {
  return (
    <Root onClick={onClick} isSelected={isSelected}>
      <Title>{title}</Title>
      <Content>
        {children}
      </Content>
    </Root>
  );
};
export default ButtonUserBucket;
