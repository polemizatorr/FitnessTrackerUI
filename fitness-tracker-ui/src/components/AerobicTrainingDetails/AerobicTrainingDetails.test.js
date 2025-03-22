import React from 'react';
import ReactDOM from 'react-dom';
import AerobicTrainingDetails from './AerobicTrainingDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AerobicTrainingDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});