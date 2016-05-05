import '../common/lib';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import React from 'react';


import { Router, Route, Link, hashHistory } from 'react-router'
import '../css/MainContent.less';

import App from '../component/App';
import UserinfoForm from '../views/UserinfoForm';
import WebsiteAddForm from '../views/WebsiteAddForm';


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/user" component={UserinfoForm} />
      <Route path="/website">
        <Route path="/website/add" component={WebsiteAddForm} />
        <Route path="/website/list" component={UserinfoForm} />
      </Route>
    </Route>
  </Router>
), document.getElementById("main"))
