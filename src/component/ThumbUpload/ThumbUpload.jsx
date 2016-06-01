import React from 'react';
import { connect } from 'react-redux';
import './ThumbUpload.less';
import { Button } from 'antd';

window.$ = require('jquery');

window.Hammer = require('../../common/photoClip/hammer');
window.IScroll = require('../../common/photoClip/iscroll-zoom');
window.lrz = require('../../common/photoClip/lrz.all.bundle');

require('../../common/photoClip/jquery.photoClip');

let uid = 1;
const ThumbUpload = React.createClass({
    getInitialState(){
        return {
            file_id: 'thumb-upload-' + (uid++),
            view_id: 'thumb-upload-' + (uid++),
            ok_id: 'thumb-upload-' + (uid++),
            modal_id: 'thumb-upload-' + (uid++),
            cliping: false,
            thumb: '',
            propThumb: ''
        }
    },

    componentWillReceiveProps(props){
        if( props.thumb !== this.state.propThumb ){
            this.setState({
                propThumb: props.thumb,
                thumb: props.thumb
            })
        }
    },
    
    componentDidMount(){

        var _this = this;
        $('#' + this.state.modal_id).photoClip({
            size: [260, 260], // 截取框的宽和高组成的数组。默认值为[260,260]
            outputSize: [260, 260], // 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
            outputType: "jpg", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
            file: '#' + this.state.file_id, // 上传图片的<input type="file">控件的选择器或者DOM对象
            view: '#' + this.state.view_id, // 显示截取后图像的容器的选择器或者DOM对象
            ok: '#' + this.state.ok_id, // 确认截图按钮的选择器或者DOM对象
            loadStart: function(file) {}, // 开始加载的回调函数。this指向 fileReader 对象，并将正在加载的 file 对象作为参数传入
            loadComplete: function(src) {}, // 加载完成的回调函数。this指向图片对象，并将图片地址作为参数传入
            loadError: function(event) {}, // 加载失败的回调函数。this指向 fileReader 对象，并将错误事件的 event 对象作为参数传入
            clipFinish: function(dataURL) {
                //_this.cliping = false;
                //_this.avatar = dataURL;
                _this.setState({
                    cliping: false
                });
                //console.log(dataURL)
                _this.submit(dataURLtoBlob(dataURL));
            } // 裁剪完成的回调函数。this指向图片对象，会将裁剪出的图像数据DataURL作为参数传入
        });
    },

    submit(blob){
        var form = new FormData();
        form.append('avatar', blob, 'avatar.jpg');
        var _this = this;
        $.ajax({
            type: 'POST',
            url: this.props.data.prefix + '/api/me/user/avatar',
            data: form,
            processData: false,
            contentType: false,
            xhrFields: {
                withCredentials: true
            },

            dataType: 'json'
        }).then(function(data){
            console.log(data);
            if( data.code == 0 ){
                // _this.setState({
                //     thumb: data.avatar
                // })
                alert('修改成功');
                _this.props.dispatch({
                    type: 'userInfo',
                    field: {
                        user_avatar: data.avatar
                    }
                })
            }
        }, function(err){
            console.log(err);
        });
    },

    change(){
        this.setState({
            cliping: true
        })
    },

    click(){
        $('#' + this.state.file_id).click();
    },
    
    cancel(){
        this.setState({
            cliping: false
        })
    },
    
    render() {
        var modalStyle = {
            'display': 'none'
        };
        
        if(this.state.cliping){
            modalStyle.display = 'block';
        }

        var thumbStyle = {
            'backgroundImage': `url(${this.state.thumb})`,
            'backgroundColor': 'rgb(102,102,102)',
            'backgroundSize': 'contain',
            'backgroundPosition': '50% 50%',
            'backgroundRepeat': 'no-repeat'
        };
        
        return (
            <div className="thumb-upload">
                <div className="thumb-upload-view-wrapper">
                    <div className="thumb-upload-view" id={this.state.view_id} style={thumbStyle} onClick={this.click}></div>
                </div>
                <input id={this.state.file_id} type="file" onChange={this.change}/>

                <div style={modalStyle}>
                    <div className="thumb-upload-modal" id={this.state.modal_id}></div>
                    <Button className="thumb-upload-button" type="ghost" id={this.state.ok_id}>截取头像</Button>
                    <Button className="thumb-upload-cancel" type="ghost" onClick={this.cancel}>取消截图</Button>
                </div>
            </div>
        )
    }
});

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function select(state){
    return {
        data: state
    }
}

export default connect(select)(ThumbUpload);