import React from 'react';
import ReactDOM from 'react-dom';
import EditAerobicTraining from './EditAerobicTraining';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditAerobicTraining />, div);
  ReactDOM.unmountComponentAtNode(div);
});