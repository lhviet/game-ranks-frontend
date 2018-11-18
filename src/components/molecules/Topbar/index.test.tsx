import * as enzyme from 'enzyme';
import * as React from 'react';

import Topbar from './';

describe('Topbar', () => {

  describe('by Shallow Rendering', () => {
    let component: enzyme.ShallowWrapper;

    beforeEach(() => {
      component = enzyme.shallow(
        <Topbar />
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

