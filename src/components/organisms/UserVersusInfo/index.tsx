import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';

import * as T from '^/store/types';

import ButtonUser from '^/components/atoms/ButtonUser';
import ChartPie from '^/components/molecules/ChartPie';

const Root: StyledComponent<'div', {}> = styled.div`
  border: solid 1px #b4cceab5;
  border-radius: 3px;
  padding: 5px 10px;
  position: relative;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const UserWrapper: StyledComponent<'div', {}> = styled.div`
  width: 200px;
  text-align: left;
  display: inline-block;
  align-self: center;
`;

const RecordWrapper: StyledComponent<'div', {}> = styled.div`
  align-self: center;
`;

export interface Props {
  user: T.User;
  record: {
    total: number;
    win: number;
  };
}
const UserVersusInfo: React.FunctionComponent<Props> = ({user, record}: Props) => {
  return (
    <Root>
      <UserWrapper>
        <ButtonUser user={user}/>
      </UserWrapper>
      <RecordWrapper>
        <ChartPie
          type={'doughnut'}
          title={`${record.total} game matches`}
          loss={record.total - record.win}
          won={record.win}
        />
      </RecordWrapper>
    </Root>
  );
};
export default UserVersusInfo;
