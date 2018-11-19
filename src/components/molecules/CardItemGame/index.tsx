import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import TimeSpan from '^/components/atoms/TimeSpan';

const Root: StyledComponent<'div', {}> = styled.div`
  border: solid 1px #ffd4bf;
  border-radius: 3px;
  padding: 5px;
  position: relative;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  &:hover {
    background: #ffd4bf;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

interface ImageProps {
  imgSize: string;
}
const Image = styled.img`
  max-width: 100px;
  max-height: ${(props: ImageProps) => props.imgSize || '100px'};
`;
const ImageWrapper = styled.div`
  width: 100px;
  text-align: center;
  padding: 5px;
  border: solid 1px #e0e0e0;
  background: #f3d2a7;
  border-radius: 8px;
  display: inline-block;
  align-self: center;
`;

const GameInfoWrapper: StyledComponent<'div', {}> = styled.div`
  display: inline-block;
  text-align: left;
  padding: 10px;
`;
const GameCode: StyledComponent<'h3', {}> = styled.h2`
  font-size: 16px;
  color: gray;
  font-weight: 400;
  margin-bottom: 5px;
  padding-left: 10px;
`;
const GameName: StyledComponent<'h1', {}> = styled.h1`
  font-size: 20px;
  color: #495766;
  font-weight: 700;
  margin-bottom: 5px;
  padding-left: 10px;
`;
const GameDescription: StyledComponent<'p', {}> = styled.p`
  font-size: 16px;
  color: #515050;
  font-weight: 400;
  margin-bottom: 5px;
  padding-left: 10px;
`;
const TimeSpanWrapper: StyledComponent<'div', {}> = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: 400;
  padding-left: 10px;
`;
export interface Props {
  game: T.Game;
  isFullDisplay?: boolean;
}

const CardItemGame: React.FunctionComponent<Props> = ({game, isFullDisplay}: Props) => {
  const extraInfo: React.ReactNode = isFullDisplay ? (
    <React.Fragment>
      <tr>
        <td>Description</td>
        <td><GameDescription>{game.value.description}</GameDescription></td>
      </tr>
      <tr>
        <td>Updated at</td>
        <td>
          <TimeSpanWrapper>
            <TimeSpan timestamp={game.value.updated_at}/>
          </TimeSpanWrapper>
        </td>
      </tr>
      <tr>
        <td>Created at</td>
        <td>
          <TimeSpanWrapper>
            <TimeSpan timestamp={game.value.created_at}/>
          </TimeSpanWrapper>
        </td>
      </tr>
    </React.Fragment>
  ) : undefined;

  return (
    <Root>
      <ImageWrapper>
        <Image src={game.value.img_url} imgSize={isFullDisplay ? '100px' : '70px'} />
      </ImageWrapper>
      <GameInfoWrapper>
        <table>
          <tr>
            <td>Code</td>
            <td><GameCode>{game.value.code}</GameCode></td>
          </tr>
          <tr>
            <td>Game</td>
            <td><GameName>{game.value.name}</GameName></td>
          </tr>
          {extraInfo}
        </table>
      </GameInfoWrapper>
    </Root>
  );
};
export default CardItemGame;
