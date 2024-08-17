import React from 'react';
import ReactDOM from 'react-dom';
import CreateAerobicTraining from './CreateAerobicTraining';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAerobicTraining />, div);
  ReactDOM.unmountComponentAtNode(div);
});