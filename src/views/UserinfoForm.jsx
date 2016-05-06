
import React from "react";
import { Select, Radio, Checkbox, Button, DatePicker, InputNumber, Form, Cascader,Input,Upload,Icon } from 'antd';
import { citys } from '../common/citys';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import { connect } from 'react-redux';
import ThumbUpload from '../component/ThumbUpload/ThumbUpload.jsx';


let UserinfoForm = React.createClass({
  getInitialState(){
    return {};
  },
  
  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true
    });
    
    fetch(this.props.data.prefix + '/api/me/status', {credentials: 'include'}).then((data) => {
      data.json().then((data) => {
        this.setState(data.result.other);
        this.setState({
          locate: [data.result.other.user_province, data.result.other.user_city, data.result.other.user_area]
        })
      }, function(err){
        console.log(err)
      })
    }, function(err){
      
    })
  },

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleThumb(info){
    console.log(info)
  },

  handleSubmit(e) {
    e.preventDefault();
    var obj = this.props.form.getFieldsValue();
    
    var form = [];
    Object.keys(obj).forEach(function(key){
      if(typeof obj[key] !== 'undefined'){
        form.push(key + '=' + obj[key]);
      }
    });
    
    form.push('user_province' + '=' + this.state.locate[0]);
    form.push('user_city' + '=' + this.state.locate[1]);
    form.push('user_area' + '=' + this.state.locate[2]);
    
    fetch(this.props.data.prefix + '/api/me/user/modify', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: form.join('&')
    }).then(function(data){
      data.json().then(function(result){
        // console.log(result)
        if(result.code == 0){
          alert('修改成功');
        }
      }, function(err){
        console.log(err)
      })
    }, function(){});
  },

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  },

  checkPrime(rule, value, callback) {
    if (value !== 11) {
      callback(new Error('8~12之间的质数明明是11啊!'));
    } else {
      callback();
    }
  },

  changeLocate(locate){
    this.setState({
      locate: locate
    })
  },

  render() {
    let address = citys;
    const { getFieldProps } = this.props.form;
    console.log(this.props);
    const defaultLocate = ["110000", "110100", "110101"];
    const uploadProps = {
      action: '/upload.do',
      listType: 'picture-card',
      onChange: this.handleThumb,
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }]
    };
    const usernameProps = getFieldProps('user_realname',{
      rules: [
        { required: true, message: '真实姓名还是需要的' }
      ],
      initialValue: this.state.user_realname
    })

    const nicknameProps = getFieldProps('user_nick',{
      rules: [
        { required: true, message: '昵称还是需要的' }
      ],
      initialValue: this.state.user_nick
    })
    const radioProps = getFieldProps('user_sex', {
      rules: [
        { required: true, message: '你不会是其他性别吧？' }
      ],
      initialValue: this.state.user_sex
    });

    const signatureProps = getFieldProps('user_signature' ,{
      rules: [{ required: true,message:'真的不打算说点什么吗？' }],
      initialValue: this.state.user_signature
    })
    const fulladdressProps = getFieldProps('user_address' ,{
      rules: [{ required: false,message:'地址还是填一个吧？' }],
      initialValue: this.state.user_address
    })
    const zipcodeProps = getFieldProps('user_zipcode' ,{
      rules: [{ required: false }],
      initialValue: this.state.user_zipcode
    })
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };
    
    return (


      <Form horizontal>
        
        <ThumbUpload thumb={this.state.user_avatar}></ThumbUpload>

        <FormItem
          {...formItemLayout}
          label="用户名：">
          <p className="ant-form-text" id="userName" name="userName">{this.state.user_mail}</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="昵称：">
           <Input {...nicknameProps} type="text" placeholder="昵称" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="真实姓名：">
          <Input {...usernameProps} type="text" placeholder="请输入你的真实姓名" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="性别：">
          <RadioGroup {...radioProps}>
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="签名：">
          <Input {...signatureProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="选择地址：">
          <Cascader options={address} defaultValue={defaultLocate} value={this.state.locate} onChange={this.changeLocate} />
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="邮编：">
           <Input {...zipcodeProps} type="text" placeholder="邮编" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="详细地址：">
          <Input {...fulladdressProps} type="textarea" placeholder="请填写你的详细地址" id="fulladdress" name="fulladdress" />
        </FormItem>



        <FormItem
          wrapperCol={{ span: 12, offset: 7 }} >
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});

UserinfoForm = createForm()(UserinfoForm);

function select(state){
  return {
    data: state
  }
}

export default connect(select)(UserinfoForm);
