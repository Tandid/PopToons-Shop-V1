import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import {Provider} from 'react-redux'
import App from './App';

ReactDOM.render(
  // <Provider>
    <Router>
      <App />
    </Router>
  // </Provider>
  ,
  document.getElementById('root')
)