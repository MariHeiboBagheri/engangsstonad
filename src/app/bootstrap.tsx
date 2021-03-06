import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';
import IntlProvider from './intl/IntlProvider';
import store from './redux/index';

import * as countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Modal = require('nav-frontend-modal').default;
(Modal as any).setAppElement('#app');

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <IntlProvider>
            <Router>
                <div className="app">
                    <AppContainer />
                </div>
            </Router>
        </IntlProvider>
    </Provider>,
    root
);
