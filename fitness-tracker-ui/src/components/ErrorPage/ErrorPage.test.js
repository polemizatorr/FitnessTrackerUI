import React from 'react';
import ReactDOM from 'react-dom';
import ErrorPage from './ErrorPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});