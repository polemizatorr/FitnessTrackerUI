import React from 'react';
import ReactDOM from 'react-dom';
import CreateStrengthTraining from './CreateStrengthTraining';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateStrengthTraining />, div);
  ReactDOM.unmountComponentAtNode(div);
});