
import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router';
const SubMenu = Menu.SubMenu;

const AsideMenu = React.createClass({
  handleClick(e){
  },

  render(){
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo"> Oauth2.0</div>
      <Menu mode="inline" theme="dark" onClick={this.handleClick}
        defaultSelectedKeys={['0']} defaultOpenKeys={['sub0','sub1','sub2']}>
        <SubMenu key="sub0" title={<span><Icon type="user" />我的资料</span>}>
          <Menu.Item key="0"><Link to="/info">资料修改</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" title={<span><Icon type="ie" />网站管理</span>}>
          <Menu.Item key="1"><Link to="/website">网站管理</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/website/list">网站列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="team" />朋友管理</span>}>
          <Menu.Item key="5">选项5</Menu.Item>
          <Menu.Item key="6">选项6</Menu.Item>
          <Menu.Item key="7">选项7</Menu.Item>
          <Menu.Item key="8">选项8</Menu.Item>
        </SubMenu>
      </Menu>
      </aside>
    );
  }
})
;

export default AsideMenu;
