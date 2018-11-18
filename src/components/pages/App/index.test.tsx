import App from 'src/components/pages/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App games={[]} user={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});