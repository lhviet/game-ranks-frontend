import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import TimeSpan from '^/components/atoms/TimeSpan';

const Root: StyledComponent<'div', {}> = styled.div`
  border: solid 1px #b4cceab5;
  border-radius: 3px;
  padding: 5px;
  position: relative;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  &:hover {
    background: #c9e1ff;
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
  background: #bbcada;
  border-radius: 8px;
  display: inline-block;
  align-self: center;
`;

const UserInfoWrapper: StyledComponent<'div', {}> = styled.div`
  display: inline-block;
  text-align: left;
  padding: 10px;
`;
const UserCode: StyledComponent<'h3', {}> = styled.h2`
  font-size: 16px;
  color: gray;
  font-weight: 400;
  margin-bottom: 5px;
  padding-left: 10px;
`;
const UserName: StyledComponent<'h1', {}> = styled.h1`
  font-size: 20px;
  color: #495766;
  font-weight: 700;
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
  user: T.User;
  isFullDisplay?: boolean;
}

const CardItemUser: React.FunctionComponent<Props> = ({user, isFullDisplay}: Props) => {
  const extraInfo: React.ReactNode = isFullDisplay ? (
    <React.Fragment>
      <tr>
        <td>Updated at</td>
        <td>
          <TimeSpanWrapper>
            <TimeSpan timestamp={user.value.updated_at}/>
          </TimeSpanWrapper>
        </td>
      </tr>
      <tr>
        <td>Created at</td>
        <td>
          <TimeSpanWrapper>
            <TimeSpan timestamp={user.value.created_at}/>
          </TimeSpanWrapper>
        </td>
      </tr>
    </React.Fragment>
  ) : undefined;

  return (
    <Root>
      <ImageWrapper>
        <Image src={user.value.img_url} imgSize={isFullDisplay ? '100px' : '70px'} />
      </ImageWrapper>
      <UserInfoWrapper>
        <table>
          <tr>
            <td>Code</td>
            <td><UserCode>{user.value.username}</UserCode></td>
          </tr>
          <tr>
            <td>User</td>
            <td><UserName>{user.value.display_name}</UserName></td>
          </tr>
          {extraInfo}
        </table>
      </UserInfoWrapper>
    </Root>
  );
};
export default CardItemUser;
