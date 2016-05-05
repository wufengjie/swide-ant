
import React from "React";
import { Select, Radio, Checkbox, Button, DatePicker, InputNumber, Form, Cascader,Input,Upload,Icon } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import { connect } from 'react-redux';

let UserinfoForm = React.createClass({
  getInitialState(){
    return {
      datestr: '1990-01-01'
    }
  },

  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true
    });
    
    fetch('http://127.0.0.1:9002/api/me/status', {credentials: 'include'}).then((data) => {
      data.json().then((data) => {
        this.setState(data.result.other);
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

  handleSubmit(e) {
    e.preventDefault();
    var obj = this.props.form.getFieldsValue();
    var form = [];
    Object.keys(obj).forEach(function(key){
      if(typeof obj[key] !== 'undefined'){
        form.push(key + '=' + obj[key])
        //form.append(key, obj[key]);
      }
      
    })
    
    fetch('http://127.0.0.1:9002/api/me/user/modify', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: form.join('&')
    }).then(function(data){
      data.json().then(function(result){
        console.log(result)
      }, function(err){
        console.log(err)
      })
    }, function(){})
    // this.props.form.validateFieldsAndScroll((errors, values) => {
    //   if (!!errors) {
    //     console.log(errors);
    //     console.log('Errors in form!!!');
    //     return;
    //   }
    //   console.log('Submit!!!');
    //   console.log(values);
    // });
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
  
  dateChange(date){
    var d = new Date(date);
    var str = [d.getFullYear(), ('0' + (d.getMonth()+1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');

    this.setState({
      datestr: str
    });
  },

  render() {
    const dispatch = this.props.dispatch;
    const address = [{
      value: 'zhejiang',
      label: '浙江',
      children: [{
        value: 'hangzhou',
        label: '杭州'
      }],
    }];
    const { getFieldProps } = this.props.form;
    
    const uploadProps = {
      action: '/upload.do',
      listType: 'picture-card',
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
    // const selectProps = getFieldProps('select', {
    //   rules: [
    //     { required: true, message: '请选择您的国籍' }
    //   ],
    // });
    // const multiSelectProps = getFieldProps('multiSelect', {
    //   rules: [
    //     { required: true, message: '请选择您喜欢的颜色', type: 'array' },
    //   ]
    // });
    const radioProps = getFieldProps('radio', {
      rules: [
        { required: true, message: '你不会是其他性别吧？' }
      ]
    });
    const birthdayProps = getFieldProps('birthday', {
    
      rules: [
        {
          required: false,
          type: 'date',
          message: '你的生日是什么呢?'
        }, {
          validator: this.checkBirthday,
        }
      ]
    });
    // const primeNumberProps = getFieldProps('primeNumber', {
    //   rules: [{ validator: this.checkPrime }],
    // });
    const addressProps = getFieldProps('user_address2', {
      rules: [{ required: true, type: 'array',message:'你不可能来自氪星吧？' }],
    });
    const signatureProps = getFieldProps('user_signature' ,{
      rules: [{ required: true,message:'真的不打算说点什么吗？' }],
      initialValue: this.state.user_address
    })
    const fulladdressProps = getFieldProps('user_address' ,{
      rules: [{ required: false,message:'地址还是填一个吧？' }],
      initialValue: this.state.user_address
    })
    const zipcodeProps = getFieldProps('user_zipcode' ,{
      rules: [{ required: false }],
      initialValue: this.state.user_address
    })
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };
    
    return (


      <Form horizontal>
        <FormItem {...formItemLayout} label=" ">
          <Upload {...uploadProps} >
            <Icon type="plus" className="me-upload-icon"/>
            <div className="ant-upload-text">上传头像</div>
          </Upload>
        </FormItem>

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
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="签名：">
          <Input {...signatureProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="生日：">
          <DatePicker {...birthdayProps} onChange={this.dateChange} value={this.state.datestr} defaultValue={this.state.datestr} format="yyyy-MM-dd"/>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="选择地址：">
          <Cascader {...addressProps} options={address} />
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
