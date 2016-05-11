import React from 'react';
import Modal from 'antd';
import {connect} from "react-redux";
import $ from "jquery";

const Login = React.createClass({
  handleLogout(){
      $.get({
          url: this.props.data.prefix + "/logout",
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          success: function(data) {
              if(data.code == 0){
                Modal.success({
                  title:"退出成功",
                  onOk:function(){
                    location.reload();
                  }
                })
              }
          },
          error: function(err) {}
      });
  }
  render(){
    return (
      <div className="login-info">
        <div className="login-out">退出登录</div>
      </div>
    );
  }
})


function select(state) {
    return {data: state}
}

export default connect(select)(Login);
