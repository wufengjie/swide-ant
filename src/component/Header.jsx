import React from 'react';
// import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;

import Search from './Search';

const Header = React.createClass({
  render(){
    return (<div className="ant-layout-header"><Search /></div>);
  }
})

export default Header;
