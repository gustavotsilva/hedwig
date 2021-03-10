import React from 'react';
import ReactDOM from 'react-dom';

/* Google Tag Manager */
import TagManager from 'react-gtm-module';

/* Styles */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/fonts.css';
import './css/index.css';

/* Components */
import HomePage from './components/homepage';

/* Modules */
import '../node_modules/bootstrap/dist/js/bootstrap';

/* Scripts */
import './js/index';
import keys from './analytics/analytics'

/* Analytics */
TagManager.initialize({ gtmId: keys().gtm });

ReactDOM.render(<HomePage />, document.getElementById('root'));