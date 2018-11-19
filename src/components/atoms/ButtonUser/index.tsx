import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

const Root: StyledComponent<'div', {}> = styled.div`
  max-width: 250px;
  overflow: hidden;
  border: solid 1px #b4cceab5;
  border-radius: 8px;
  padding: 2px;
  position: relative;
  transition: 0.3s;
  cursor: pointer;
  display: inline-block;
  margin: 5px;

  &:hover {
    background: #c9e1ff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  max-width: 30px;
  max-height: 30px;
`;
const ImageWrapper = styled.div`
  width: 35px;
  text-align: left;
  padding: 2px;
  border: solid 1px #e0e0e0;
  background: #bbcada;
  border-radius: 8px;
  display: inline-block;
  align-self: center;
`;

const UserInfoWrapper: StyledComponent<'div', {}> = styled.div`
  display: inline-block;
  text-align: left;
  padding: 5px;
  
`;
const UserName: StyledComponent<'div', {}> = styled.div`
  font-size: 18px;
  color: #495766;
  font-weight: 700;
  margin-bottom: 5px;
  padding-left: 3px;
  white-space: nowrap;
`;
const UserCode: StyledComponent<'div', {}> = styled.div`
  font-size: 15px;
  color: gray;
  font-weight: 400;
  margin-bottom: 5px;
  padding-left: 3px;
  white-space: nowrap;
`;
export interface Props {
  user: T.User;
  onClick(user_keyid: string): void;
}

const ButtonUser: React.FunctionComponent<Props> = ({user, onClick}: Props) => {
  return (
    <Root onClick={() => onClick(user.keyid)}>
      <ButtonWrapper>
        <ImageWrapper>
          <Image src={user.value.img_url} />
        </ImageWrapper>
        <UserInfoWrapper>
          <UserName>{user.value.display_name}</UserName>
          <UserCode>{user.value.username}</UserCode>
        </UserInfoWrapper>
      </ButtonWrapper>
    </Root>
  );
};
export default ButtonUser;
