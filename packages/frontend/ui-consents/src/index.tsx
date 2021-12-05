import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import setI18n from 'lib-utils/src/i18n';

import App from '$/App';
import store from '$/state';

export function Root(): JSX.Element {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

setI18n('Global', true, { en: '0.2' });

const rootElement = document.querySelector('#root');
ReactDOM.render(<Root />, rootElement);
