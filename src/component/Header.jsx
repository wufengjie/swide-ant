import React from 'react';
// import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;

import Login from './Login';

const Header = React.createClass({
  render(){
    return (<div className="ant-layout-header"><Login /></div>);
  }
})

export default Header;
