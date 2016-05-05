

import React from 'react';
import AsideMenu from './AsideMenu';
import Footer from './Footer';
import Header from './Header';

const App = React.createClass({
  render(){
    return (
      <div className="ant-layout-aside" id="main">
        <AsideMenu />
        <Header />
        <div className="ant-layout-main">
        <div className="ant-layout-container">
            <div className="ant-layout-content">
                <div style={{minHeight: 490}}>
                    {this.props.children}
                </div>
            </div>
        </div>
        <Footer />
        </div>
      </div>
    )

  }
})

export default App;
