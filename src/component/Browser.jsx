import React from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
import AsideMenu from './AsideMenu';
import Header from './Header';

const Browser = () =>
  <div className="ant-layout-aside">
    <aside className="ant-layout-sider">
      <div className="ant-layout-logo"> Oauth2.0</div>
      <AsideMenu/>
    </aside>
    <div className="ant-layout-main">
      <Header />
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>应用列表</Breadcrumb.Item>
          <Breadcrumb.Item>某应用</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="ant-layout-container">
        <div className="ant-layout-content">
          <div style={{
            height: 590
          }}>
            内容区域
          </div>
        </div>
      </div>
      <div className="ant-layout-footer">
        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
      </div>
    </div>
  </div>;

export default Browser;
