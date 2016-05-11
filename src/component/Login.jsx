import React from 'react';
import {Modal} from 'antd';
import {connect} from "react-redux";
let $ = require('jquery');

const Login = React.createClass({
  getInitialState(){
    return {
      userInfo:{}
    }
  },
  componentWillReceiveProps(props) {
    this.setState({
      userInfo:props.data.userInfo
    })

  },
  handleLogout(){
    const _this = this;
    Modal.confirm({
     title: '您是否确认要退出登录？',
     content: '',
     onOk() {
       $.get({
           url: _this.props.data.prefix + "/api/logout",
           dataType: "json",
           xhrFields: {
               withCredentials: true
           },
           success: function(data) {
               if(data.code == 0){
                 location.reload();
               }
           },
           error: function(err) {}
       });
     },
     onCancel() {},
   });

  },
  render(){
    return (
      <div className="login-info">
        <img className="login-avatar" src={this.state.userInfo.user_avatar} title={this.state.userInfo.user_nick} />
        <div className="login-out" onClick={this.handleLogout}>退出登录</div>
      </div>
    );
  }
})


function select(state) {
  return {
    data: state
  }
}

export default connect(select)(Login);
