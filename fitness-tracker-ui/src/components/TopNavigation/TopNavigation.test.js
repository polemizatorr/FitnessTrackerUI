import React from 'react';
import ReactDOM from 'react-dom';
import TopNavigation from './TopNavigation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopNavigation />, div);
  ReactDOM.unmountComponentAtNode(div);
});