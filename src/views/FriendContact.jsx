import React from "react";
import {Row,Col,Pagination,Input,Button,Icon,Modal } from "antd";
import classNames from 'classnames';
import { connect } from 'react-redux';
let $ = require("jquery");
const InputGroup = Input.Group;
const confirm = Modal.confirm;

import "../css/friends.less";
const FriendContact = React.createClass({
    getInitialState() {
        return {
            friendList:[],
            applyList:[]
        };
    },
    componentDidMount(){
        var _this = this;
        $.get({
            url:this.props.data.prefix + "/api/me/user/friends",
            dataType:"json",
            data:{
                page:1,
                size:10
            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){
                _this.setState({
                    friendList : data.result
                })
            },
            error:function(err){

            }
        });
    },
    deleteConfirm() {
        console.log(arguments);
        confirm({
            title: '您是否确认要删除这个朋友',
            content: '说了再见 才发现再也见不到 能不能就这样忍着痛泪不掉。说好陪我到老 永恒往哪里找',
            onOk() {
                console.log('确定');
            },
            onCancel() {}
        });
    },
    loadAvatarErr(index, e){
        console.log(arguments)
        // let list = this.state.friendList.slice(0);
        // list[index].user_avatar = "http://pic4.zhongsou.com/img?id=5227b19fbc8288bdba3";
        // this.setState({
        //   friendList:list
        // })

    },
    render(){
        var _this=this;
        return (
            <Row>
                <Col span="12">

                    <div className="panel friend-panel ">
                        <div className="panel-head">好友</div>
                        <div className="panel-body">
                            {this.state.friendList.map(function(item,index){
                                return (
                                    <div className="friend-item" key={item.user_mail}>
                                        <img className="friend-avatar" src={item.user_avatar || "http://pic4.zhongsou.com/img?id=5227b19fbc8288bdba3"}  onError={_this.loadAvatarErr}  alt="" />
                                        <div className="friend-info ib">
                                            <div className="friend-name">
                                                {item.user_nick}
                                            </div>
                                            <div className="friend-desc">
                                                {item.user_signature || '这家伙很懒，什么都没写'}
                                            </div>
                                        </div>
                                        <div className="friend-opt ib pull-right tr">
                                            <Button type="primary">发消息</Button><br/>
                                            <Button type="ghost" className="friend-delete-btn" onClick={_this.deleteConfirm} >删除</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="panel-foot">
                            <Pagination size="small" total={50} />
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div className="panel friend-panel ">
                        <div className="panel-head">申请列表</div>
                        <div className="panel-body">
                            <div className="friend-item">
                                <img className="friend-avatar" src="https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=71cd4229be014a909e3e41bd99763971/472309f7905298221dd4c458d0ca7bcb0b46d442.jpg" alt="" />
                                <div className="friend-info ib">
                                    <div className="friend-name">
                                        伍峰杰
                                    </div>
                                    <div className="friend-desc">
                                        我想加你，可以吗？
                                    </div>
                                </div>
                                <div className="friend-opt ib pull-right">
                                    <Button type="ghost">通过</Button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-foot">
                            <Pagination size="small" total={50} />
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
})

function select(state){
    return {
        data: state
    }
}

export default connect(select)(FriendContact);