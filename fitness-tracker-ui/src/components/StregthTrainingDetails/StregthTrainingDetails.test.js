import React from 'react';
import ReactDOM from 'react-dom';
import StregthTrainingDetails from './StregthTrainingDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StregthTrainingDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});