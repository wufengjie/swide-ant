import React from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
import Header from '../component/Header';
import AsideMenu from '../component/AsideMenu';
import WebsiteAddForm from './WebsiteAddForm';


const WebsiteAdd = () =>
  <div className="main-content">
      <AsideMenu />
      <div className="ant-layout-main">
          <Header/>
          <div className="ant-layout-breadcrumb">
              <Breadcrumb>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>我的资料</Breadcrumb.Item>
                  <Breadcrumb.Item>资料修改</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <div className="ant-layout-container">
              <div className="ant-layout-content">
                  <div style={{
                      minHeight: 590
                  }}>
                  wwwwwww
                      <WebsiteAddForm />
                  </div>
              </div>
          </div>
          <div className="ant-layout-footer">
              Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
          </div>
      </div>
  </div>;

export default WebsiteAdd;
