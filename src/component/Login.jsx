import React from 'react';
import {connect} from 'react-redux';

const Login = React.createClass({
  componentWillReceiveProps(props) {
    console.log(props)
  },
  
  render(){
    return (
      <div className="login-info">
        
      </div>
    );
  }
})

function select(state) {
  return {
    data: state.userInfo
  }
}

export default connect(select)(Login);
