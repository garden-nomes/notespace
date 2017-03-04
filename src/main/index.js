import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './stylesheets/bootstrap.css';
import './stylesheets/font-awesome/css/font-awesome.css';
import './stylesheets/index.css';


import store from './store';
import App from './components/app';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
