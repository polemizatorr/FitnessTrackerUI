import React from 'react';
import ReactDOM from 'react-dom';
import VerifyUser from './VerifyUser';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VerifyUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});