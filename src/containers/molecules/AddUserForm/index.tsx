import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import AddUserForm, {Props} from '^/components/molecules/AddUserForm';
import {AddNewUser} from '^/store/duck/user';

type DispatchPropsKey = 'onSubmitNewUser';
export type DispatchProps = Pick<Props, DispatchPropsKey>;

export const mapDispatchToProps: (
  dispatch: Dispatch
) => DispatchProps = (
  dispatch
) => ({
  onSubmitNewUser(username: string, display_name: string, img_url: string): void {
    dispatch(AddNewUser(username, display_name, img_url));
  }
});

export default connect(undefined, mapDispatchToProps)(AddUserForm);
