import React from 'react';
// import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;

import Search from './Search';
import Login from './Login';

const Header = React.createClass({
  render(){
    return (<div className="ant-layout-header"><Search /><Login /></div>);
  }
})

export default Header;
