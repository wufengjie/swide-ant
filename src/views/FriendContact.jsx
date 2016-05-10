import React from "react";
import {Row,Col,Pagination,Input,Button,Icon,Modal } from "antd";
import classNames from 'classnames';
const InputGroup = Input.Group;
const confirm = Modal.confirm;

import "../css/friends.less";
const FriendContact = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
  },
  deleteConfirm() {
    confirm({
      title: '您是否确认要删除这个朋友',
      content: '说了再见 才发现再也见不到 能不能就这样忍着痛泪不掉。说好陪我到老 永恒往哪里找',
      onOk() {
        console.log('确定');
      },
      onCancel() {}
    });
  },
  render(){
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim()
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus
    });
    // function deleteConfirm() {
    //   confirm({
    //     title: '您是否确认要删除这个朋友',
    //     content: '说了再见，却发现再也见不到，我不能就这样忍着痛泪不掉',
    //     onOk() {
    //       console.log('确定');
    //     },
    //     onCancel() {}
    //   });
    // }

    return (
      <Row>
        <Col span="12">

          <div className="panel friend-panel ">
            <div className="panel-head">好友</div>
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
              <div className="friend-opt ib pull-right tr">
                <Button type="primary">发消息</Button><br/>
                <Button type="ghost" className="friend-delete-btn" onClick={this.deleteConfirm}>删除</Button>
              </div>
            </div>
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
              <div className="friend-opt ib pull-right tr">
                <Button type="primary" >发消息</Button><br/>
                <Button type="ghost" className="friend-delete-btn" onClick={this.deleteConfirm}>删除</Button>
              </div>
            </div>

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

export default FriendContact;
