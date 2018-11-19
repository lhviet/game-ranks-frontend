import {Color} from 'csstype';
import * as React from 'react';
import {FormEvent, SyntheticEvent} from 'react';
import styled, {StyledComponent} from 'styled-components';

const Root: StyledComponent<'form', {}> = styled.form`
  border: solid 1px grey;
  padding: 20px;
`;

interface InputProps {
  color: Color;
}
const Input: StyledComponent<'input', {}> = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props: InputProps) => props.color || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const SubmitButton: StyledComponent<'button', {}> = styled.button`
  padding: 15px;
`;

export interface State {
  username: string;
  display_name: string;
  img_url: string;
}
export interface Props {
  onSubmitNewUser(username: string, display_name: string, img_url: string): void;
}
class AddUserForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      display_name: '',
      img_url: ''
    };
  }

  private onChangeUsername = (event: FormEvent<HTMLInputElement>) => {
    this.setState({username: event.currentTarget.value});
  }
  private onChangeDisplayname = (event: FormEvent<HTMLInputElement>) => {
    this.setState({display_name: event.currentTarget.value});
  }
  private onChangeImgUrl = (event: FormEvent<HTMLInputElement>) => {
    this.setState({img_url: event.currentTarget.value});
  }
  private onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    this.props.onSubmitNewUser(this.state.username, this.state.display_name, this.state.img_url);
    event.preventDefault();
  }

  public render(): React.ReactNode {
    return (
      <Root onSubmit={this.onSubmit}>
        <h1>Add New User</h1>
        <Input
          type={'text'}
          placeholder={'Username'}
          value={this.state.username}
          onChange={this.onChangeUsername}
        />
        <Input
          type={'text'}
          placeholder={'Your display name'}
          value={this.state.display_name}
          onChange={this.onChangeDisplayname}
        />
        <Input
          type={'url'}
          placeholder={'Avatar url'}
          value={this.state.img_url}
          onChange={this.onChangeImgUrl}
        />

        <SubmitButton type='submit'>
          {'Submit'}
        </SubmitButton>
      </Root>
    );
  }
}
export default AddUserForm;
