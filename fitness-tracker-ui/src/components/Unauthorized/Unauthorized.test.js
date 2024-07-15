import React from 'react';
import ReactDOM from 'react-dom';
import Unauthorized from './Unauthorized';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Unauthorized />, div);
  ReactDOM.unmountComponentAtNode(div);
});