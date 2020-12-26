import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Routes from '../components/Routes';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  )
})