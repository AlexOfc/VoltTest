import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index';
import { BrowserRouter as Router } from "react-router-dom";

    ReactDOM.render(
        <Router>
          <Index />
        </Router>, document.getElementById('app-root'));
