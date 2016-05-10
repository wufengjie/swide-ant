import React from "react";
import {
    Row,
    Col,
    Pagination,
    Input,
    Button,
    Icon,
    Modal
} from "antd";
import classNames from 'classnames';
import {connect} from 'react-redux';
let $ = require("jquery");
const InputGroup = Input.Group;
const confirm = Modal.confirm;

import "../css/friends.less";
const FriendContact = React.createClass({
    getInitialState() {
        return {
          friendList: [],
          applyList: []
        };
    },
    componentDidMount() {
        var _this = this;
        this.getFriendData();
        this.getApplyData();
    },
    getApplyData() {
        let _this = this;
        let pageSize = 10;
        let pageToLoad = Math.ceil(this.state.applyList.length/pageSize)+1;
        $.get({
            url: this.props.data.prefix + "/api/me/user/fans",
            dataType: "json",
            data: {
                page: pageToLoad,
                size: pageSize
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                var _applyList = _this.state.applyList;
                _applyList = _applyList.concat(data.result);
                _this.setState({applyList: _applyList});
            },
            error: function(err) {}
        });
    },
    getFriendData() {
        let _this = this;
        let pageSize = 10;
        let pageToLoad = Math.ceil(this.state.friendList.length/pageSize)+1;
        $.get({
            url: this.props.data.prefix + "/api/me/user/friends",
            dataType: "json",
            data: {
                page: pageToLoad,
                size: pageSize
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                var _friendList = _this.state.friendList;
                _friendList = _friendList.concat(data.result);
                _this.setState({friendList: _friendList});
            },
            error: function(err) {}
        });
    },
    applyConfirm(item, index) {
        var _this = this;
        if (item) {
            $.get({
                url: _this.props.data.prefix + "/api/me/user/watch/" + item.user_openid,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data.code == 0) {
                        _this.state.applyList.splice(index, 1)
                        _this.state.friendList.splice(0, 0, item);

                        _this.setState({friendList: _this.state.friendList, applyList: _this.state.applyList})
                        Modal.success({title: '添加成功！', content: ''});
                    } else {
                        Modal.error({title: '添加失败！', content: data.message});
                    }

                },
                error: function(err) {}
            })

        }

    },
    deleteConfirm(item, index) {
        var _this = this;
        if (item)
            confirm({
                title: '您是否确认要删除这个朋友',
                content: '说了再见 才发现再也见不到 能不能就这样忍着痛泪不掉。说好陪我到老 永恒往哪里找',
                onOk() {
                    $.get({
                        url: _this.props.data.prefix + "/api/me/user/unwatch/" + item.user_openid,
                        dataType: "json",
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(data) {
                            console.log(data);
                            if (data.code == 0) {
                                _this.state.friendList.splice(index, 1);
                                _this.state.applyList.splice(0, 0, item);
                                _this.setState({friendList: _this.state.friendList, applyList: _this.state.applyList})
                                Modal.success({title: '删除成功！', content: '终于走到分岔路的路口，是不是你和我 要有两个相反的梦',okText:'是的'});
                            } else {
                                Modal.error({title: '删除失败！', content: data.message});
                            }

                        },
                        error: function(err) {}
                    })
                },
                onCancel() {}
            });
        }
    ,
    loadAvatarErr(index, e) {},
    render() {
        var _this = this;
        return (
            <Row>
                <Col span="12">

                    <div className="panel friend-panel ">
                        <div className="panel-head">好友</div>
                        <div className="panel-body">
                            {this.state.friendList.map(function(item, index) {
                                return (
                                    <div className="friend-item" key={item.user_mail}>
                                        <img className="friend-avatar" src={item.user_avatar || "http://pic4.zhongsou.com/img?id=5227b19fbc8288bdba3"} onError={_this.loadAvatarErr} alt=""/>
                                        <div className="friend-info ib">
                                            <div className="friend-name">
                                                {item.user_nick}
                                            </div>
                                            <div className="friend-desc">
                                                {item.user_signature || '这家伙很懒，什么都没写'}
                                            </div>
                                        </div>
                                        <div className="friend-opt ib pull-right tr">
                                            <Button type="ghost">查看资料</Button><br/>
                                            <Button type="ghost" className="friend-delete-btn" onClick={_this.deleteConfirm.bind(_this, item, index)}>删除</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="panel-foot">
                            <Button type="ghost" onClick={this.getFriendData}>更多</Button>
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div className="panel friend-panel ">
                        <div className="panel-head">申请列表</div>
                        <div className="panel-body">

                            {this.state.applyList.map(function(item, index) {
                                return (
                                    <div className="friend-item" key={item.user_mail}>
                                        <img className="friend-avatar" src={item.user_avatar || "http://pic4.zhongsou.com/img?id=5227b19fbc8288bdba3"} onError={_this.loadAvatarErr} alt=""/>
                                        <div className="friend-info ib">
                                            <div className="friend-name">
                                                {item.user_nick}
                                            </div>
                                            <div className="friend-desc">
                                                {item.user_signature || '这家伙很懒，什么都没写'}
                                            </div>
                                        </div>
                                        <div className="friend-opt ib pull-right tr">
                                            <Button type="ghost" onClick={_this.applyConfirm.bind(_this, item, index)}>通过</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="panel-foot">
                            <Button type="ghost" onClick={this.getApplyData}>更多</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
})

function select(state) {
    return {data: state}
}

export default connect(select)(FriendContact);
