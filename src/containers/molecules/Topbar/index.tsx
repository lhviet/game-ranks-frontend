import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import Topbar, {Props} from '^/components/molecules/Topbar';

type DispatchPropsKey = 'onLogoClick';
export type DispatchProps = Pick<Props, DispatchPropsKey>;

export const mapDispatchToProps: (
  dispatch: Dispatch
) => DispatchProps = (
  dispatch
) => ({
  onLogoClick(): void {
    console.log('onLogoClick ...');
  }
});

export default connect(undefined, mapDispatchToProps)(Topbar);
