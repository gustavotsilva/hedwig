import React from 'react';
import ReactDOM from 'react-dom';

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

/* Analytics */
import { setup } from './analytics/gtm';

setup();

ReactDOM.render(<HomePage />, document.getElementById('root'));