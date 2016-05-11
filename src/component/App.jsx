import React from 'react';
import AsideMenu from './AsideMenu';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import {connect} from 'react-redux';

let $ = require('jquery');

const App = React.createClass({
    componentDidMount() {
        $.ajax({
            url: this.props.data.prefix + '/api/me/status',
            xhrFields: {
                withCredentials: true
            }
        }).then((data) => {
            let info = data.result.other;
            this.props.dispatch({
                type: 'userInfo',
                field: info
            })
        });
    },

    render(){
        return (
            <div className="ant-layout-aside" id="main">
                <AsideMenu pathname={this.props.location.pathname}/>
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
                <Login />
            </div>
        )
    }
});

function select(state) {
    return {
        data: state
    }
}

export default connect(select)(App);
