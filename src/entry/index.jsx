import '../common/lib';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import React from 'react';


import { Router, Route, Link, hashHistory } from 'react-router'
import '../css/MainContent.less';
import Userinfo from '../views/Userinfo';
import WebsiteAdd from '../views/WebsiteAdd';


render((
  <Router history={hashHistory}>
    <Route path="/" component={Userinfo}>
      <Route path="user" component={Userinfo} />
      <Route path="website" component={WebsiteAdd}>
        <Route path="add" component={WebsiteAdd} />
        <Route path="list" component={Userinfo} />
      </Route>
      <Route path="*" component={Userinfo}/>
    </Route>
  </Router>
), document.getElementById("main"))
