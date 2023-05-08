// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'
import { setChonkyDefaults } from '../.';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
// Somewhere in your `index.ts`:
setChonkyDefaults({ iconComponent: ChonkyIconFA });

const Index = () => {
    return (
      <App />
    );
  };
  
  ReactDOM.render(<Index />, document.getElementById('root'));