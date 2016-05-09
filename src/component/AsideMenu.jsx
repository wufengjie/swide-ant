
import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
const SubMenu = Menu.SubMenu;

const keyMap = {
  '/user': '0',
  '/website/add': '1',
  '/website/list': '2'
}

const AsideMenu = React.createClass({
  handleClick(e){
  },

  render(){
    var select = [keyMap[this.props.pathname]];
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">AUTHORIZE</div>
      <Menu mode="inline" theme="dark" onClick={this.handleClick}
        defaultSelectedKeys={select} defaultOpenKeys={['sub0','sub1','sub2']}>
        <SubMenu key="sub0" title={<span><Icon type="user" />我的资料</span>}>
          <Menu.Item key="0"><Link to="/user">资料修改</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" title={<span><Icon type="ie" />网站管理</span>}>
          <Menu.Item key="1"><Link to="/website/add">网站管理</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/website/list">网站列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="team" />朋友管理</span>}>
          <Menu.Item key="5"><Link to="/friend/contact">通讯录</Link></Menu.Item>
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

function select(state) {
  return {
    data: state
  }
}

export default connect(select)(AsideMenu);
