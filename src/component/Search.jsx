import React from 'react';
import {Icon, Button, Input, Modal } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;
import {connect} from 'react-redux';

const Search = React.createClass({
    getInitialState() {
        return {value: '', focus: false, open: false, friendList: []};
    },
    componentDidMount() {
        var _this = this;
        document.body.addEventListener("keyup", function(e) {
            console.log(e);
            _this.handleKeyUp(e);
        })
    },
    handleInputChange(e) {
        this.setState({value: e.target.value});
    },
    handleBlur(e) {
        this.setState({
            focus: e.target === document.activeElement
        });
    },
    handleFocus(e) {
        this.setState({
            focus: e.target === document.activeElement,
            open: true
        });
    },
    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch();
        }
        this.getSearchResult(this.value, 1);

    },
    handleAdd(item,index){
      var _this = this;
      console.log(item,index);
      if(item)
      $.get({
          url: _this.props.data.prefix + "/api/me/user/watch/" + item.user_openid,
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          success: function(data) {
            console.log(data,data.code);
              if (data.code == 0) {
                  Modal.success({title: '已申请！', content: ''});
                  _this.state.friendList.splice(index,1);
                  _this.setState({
                    friendList:_this.state.friendList
                  })
              } else {
                  Modal.error({title: '出现错误了', content: data.message});
              }

          },
          error: function(err) {
            Modal.error({title: '出现错误了', content: err});
          }
      })

    },
    searchSubmit(){
      this.getSearchResult(1);
    },
    getSearchResult(page) {
        const _this = this;
        const keyword = this.state.value;
        $.post({
            url: this.props.data.prefix + "/api/me/user/search",
            dataType: "json",
            data: {
                page: 1,
                size: 10,
                keyword: keyword
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
    handleKeyUp(press) {
        console.log();
        if (press.keyCode == 27) {
            this.setState({open: false, focus: false})
        } else if (press.keyCode == 13) {
            console.log("search 1!!!!");
            this.searchSubmit();
        }
    },
    render() {
        var _this = this;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        const searchCls = classNames({'ant-search-input': true, 'ant-search-input-focus': this.state.open, 'ant-search-input-open': this.state.open});
        const searchWrapperCls = classNames({'search-wrapper': true, 'search-wrapper-open': this.state.open});
        const searchOutterCls = classNames({'searchOutter': true, 'searchOutter-open': this.state.open});
        return (
            <div className="searchOutter"  className={searchOutterCls}>
                <InputGroup className={searchCls} style={this.props.style}>
                    <Input {...this.props} value={this.state.value} onChange={this.handleInputChange} onFocus={this.handleFocus} onBlur={this.handleBlur} size="large"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} size={this.props.size} onClick={this.handleSearch} size="large">
                            <Icon type="search"/>
                        </Button>
                    </div>
                </InputGroup>
                <div className={searchWrapperCls}>
                    <div className="search-result-content">
                        {this.state.friendList.map(function(item, index) {
                            return (
                                <div className="friend-item" key={item.user_id}>
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
                                        <Button type="primary" onClick={_this.handleAdd.bind(_this,item,index)}>加为好友</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        );
    }
})
function select(state) {
    return {data: state}
}

export default connect(select)(Search);
