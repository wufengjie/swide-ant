import '../common/lib';
import MainContent from '../component/MainContent';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import React from 'react';

import { Router, Route, Link, hashHistory } from 'react-router'


render((
  <Router history={hashHistory}>
    <Route path="/" component={MainContent}>
      <Route path="*" component={MainContent}/>
    </Route>
  </Router>
), document.getElementById("main"))
