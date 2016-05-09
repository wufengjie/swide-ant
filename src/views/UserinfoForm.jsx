
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
    return {
      locate: ['110000', '110100', '110101'] //默认北京地区
    };
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
      if(typeof obj[key] !== 'undefined' && key.indexOf('user_') === 0){
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

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };

    const nicknameProps = getFieldProps('user_nick',{
      rules: [
        { required: true, message: '昵称还是需要的' }
      ],
      initialValue: this.state.user_nick
    });
    
    let nickFormItem = <FormItem
        {...formItemLayout}
        label="昵称：">
      <Input {...nicknameProps} type="text" placeholder="昵称" />
    </FormItem>;

    const realnameProps = getFieldProps('user_realname',{
      rules: [
        { required: true, message: '真实姓名还是需要的' }
      ],
      initialValue: this.state.user_realname
    });
    
    let realnameFormItem = <FormItem
        {...formItemLayout}
        label="真实姓名：">
      <Input {...realnameProps} type="text" placeholder="请输入你的真实姓名" />
    </FormItem>;
    
    const sexProps = getFieldProps('user_sex', {
      rules: [
        { required: true, message: '你不会是其他性别吧？' }
      ],
      initialValue: this.state.user_sex
    });
    
    let sexFormItem = <FormItem
        {...formItemLayout}
        label="性别：">
      <RadioGroup {...sexProps}>
        <Radio value="0">男</Radio>
        <Radio value="1">女</Radio>
      </RadioGroup>
    </FormItem>;
    
    const phoneProps = getFieldProps('user_telphone', {
      initialValue: this.state.user_telphone
    });

    let phoneFormItem = <FormItem
        {...formItemLayout}
        label="电话：">
      <Input {...phoneProps} type="tel" placeholder="电话号码" />
    </FormItem>;

    const signatureProps = getFieldProps('user_signature' ,{
      rules: [{ required: true,message:'真的不打算说点什么吗？' }],
      initialValue: this.state.user_signature
    });
    
    let signatureFormItem = <FormItem
        {...formItemLayout}
        label="签名：">
      <Input {...signatureProps} type="textarea" placeholder="随便写" />
    </FormItem>;

    const locateProps = getFieldProps('locate', {
      initialValue: this.state.locate
    });
    
    let locateFormItem = <FormItem
        {...formItemLayout}
        label="选择地址：">
      <Cascader options={address} {...locateProps} onChange={this.changeLocate} />
    </FormItem>;

    const zipcodeProps = getFieldProps('user_zipcode' ,{
      rules: [{ required: false }],
      initialValue: this.state.user_zipcode
    });
    
    let zipcodeFormItem = <FormItem
        {...formItemLayout}
        label="邮编：">
      <Input {...zipcodeProps} type="text" placeholder="邮编" />
    </FormItem>;
    
    const addressProps = getFieldProps('user_address' ,{
      rules: [{ required: false,message:'地址还是填一个吧？' }],
      initialValue: this.state.user_address
    });
    
    let addressFormItem = <FormItem
        {...formItemLayout}
        label="详细地址：">
      <Input {...addressProps} type="textarea" placeholder="请填写你的详细地址" />
    </FormItem>;
    
    return (
      <Form horizontal>
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <ThumbUpload thumb={this.state.user_avatar}></ThumbUpload>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="用户名：">
          <p className="ant-form-text">{this.state.user_mail}</p>
        </FormItem>
        
        {nickFormItem}
        {realnameFormItem}
        {sexFormItem}
        {phoneFormItem}
        {signatureFormItem}
        {locateFormItem}
        {zipcodeFormItem}
        {addressFormItem}
        
        <FormItem
          wrapperCol={{ span: 12, offset: 7 }} >
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
});

UserinfoForm = createForm()(UserinfoForm);

function select(state){
  return {
    data: state
  }
}

export default connect(select)(UserinfoForm);
