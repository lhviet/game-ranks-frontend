import * as enzyme from 'enzyme';
import * as React from 'react';
import Topbar, { Props } from './';

describe('Topbar', () => {
  const createTopbarProps: () => Props = () => ({
    onLogoClick: jest.fn(),
  });
  let topbarProps: Props;

  describe('by Shallow Rendering', () => {
    let component: enzyme.ShallowWrapper<Props>;

    beforeEach(() => {
      topbarProps = createTopbarProps();
      component = enzyme.shallow(
        <Topbar {...topbarProps} />
      );
    });

    it('should be renderable', () => {
      expect(component).toBeTruthy();
    });

    it('should match with the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});

