import * as React from 'react';
import styled, {StyledComponent} from 'styled-components';

const Root: StyledComponent<'span', {}> = styled.span`
  font-size: 1rem;
  color: #2f3d67d6;
`;

export interface Props {
  timestamp: number;
}
function convert(unixtimestamp: number) {
  // Months array
  const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Convert timestamp to milliseconds
  const date = new Date(unixtimestamp * 1000);
  // Year
  const year = date.getFullYear();
  // Month
  const month = months_arr[date.getMonth()];
  // Day
  const day = date.getDate();
  // Hours
  const hours = date.getHours();
  // Minutes
  const minutes = '0' + date.getMinutes();
  // Seconds
  const seconds = '0' + date.getSeconds();
  // Display date time in MM-dd-yyyy h:m:s format
  return month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
const TimeSpan: React.FunctionComponent<Props> = ({timestamp}: Props) => {
  return (
      <Root>{convert(timestamp / 1000)}</Root>
  );
};
export default TimeSpan;
