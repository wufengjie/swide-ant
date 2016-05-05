import '../common/lib';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import 'whatwg-fetch';

import { Router, Route, Link, hashHistory } from 'react-router'
import '../css/MainContent.less';

import App from '../component/App';
import UserinfoForm from '../views/UserinfoForm';
import WebsiteAddForm from '../views/WebsiteAddForm';

import rootReducer from '../reducer/rootReducer';
const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddlewares(rootReducer);


render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/user" component={UserinfoForm} />
                <Route path="/website">
                    <Route path="/website/add" component={WebsiteAddForm} />
                    <Route path="/website/list" component={UserinfoForm} />
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById("main"))
