import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from 'src/components/pages/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App games={[]} user={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
