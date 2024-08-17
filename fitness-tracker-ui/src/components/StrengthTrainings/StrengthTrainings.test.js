import React from 'react';
import ReactDOM from 'react-dom';
import StrengthTrainings from './StrengthTrainings';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StrengthTrainings />, div);
  ReactDOM.unmountComponentAtNode(div);
});