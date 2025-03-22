import React from 'react';
import ReactDOM from 'react-dom';
import AerobicTrainings from './AerobicTrainings';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AerobicTrainings />, div);
  ReactDOM.unmountComponentAtNode(div);
});