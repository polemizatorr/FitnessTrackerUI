import React from 'react';
import ReactDOM from 'react-dom';
import CreateSet from './CreateSet';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateSet />, div);
  ReactDOM.unmountComponentAtNode(div);
});