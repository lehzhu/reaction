import React from 'reaction';
import {StrictMode} from 'reaction';
import ReactDOM from 'reaction-dom';
import {Provider} from 'reaction-redux';
import App from './App';
import {store} from '../store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
