import '../common/lib';
import AsideMenu from '../component/AsideMenu';
import MainContent from '../component/MainContent';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(<AsideMenu />, document.getElementById('aside-menu'));

ReactDOM.render(<MainContent />, document.getElementById('main-content'));
