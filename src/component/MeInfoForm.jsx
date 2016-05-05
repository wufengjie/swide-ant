
import React from "React";
import { Select, Radio, Checkbox, Button, DatePicker, InputNumber, Form, Cascader,Input,Upload,Icon } from 'antd';

import './MeInfoForm.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

let MeInfoForm = React.createClass({
  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true,
    });
  },

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
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

  render() {
    const address = [{
      value: 'zhejiang',
      label: '浙江',
      children: [{
        value: 'hangzhou',
        label: '杭州',
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
    const usernameProps = getFieldProps('input',{
      rules: [
        { required: true, message: '真实姓名还是需要的' }
      ],
    })
    const selectProps = getFieldProps('select', {
      rules: [
        { required: true, message: '请选择您的国籍' }
      ],
    });
    const multiSelectProps = getFieldProps('multiSelect', {
      rules: [
        { required: true, message: '请选择您喜欢的颜色', type: 'array' },
      ]
    });
    const radioProps = getFieldProps('radio', {
      rules: [
        { required: true, message: '你不会是其他性别吧？' }
      ]
    });
    const birthdayProps = getFieldProps('birthday', {

      rules: [
        {
          required: true,
          type: 'date',
          message: '你的生日是什么呢?'
        }, {
          validator: this.checkBirthday,
        }
      ]
    });
    const primeNumberProps = getFieldProps('primeNumber', {
      rules: [{ validator: this.checkPrime }],
    });
    const addressProps = getFieldProps('address', {
      rules: [{ required: true, type: 'array',message:'你不可能来自氪星吧？' }],
    });
    const signatureProps = getFieldProps('textarea' ,{
      rules: [{ required: true,message:'真的不打算说点什么吗？' }],
    })
    const fulladdressProps = getFieldProps('fulladdress' ,{
      rules: [{ required: false,message:'地址还是填一个吧？' }],
    })
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (


      <Form horizontal form={this.props.form}>
        <FormItem {...formItemLayout} label=" ">
          <Upload {...uploadProps} >
            <Icon type="plus" className="me-upload-icon"/>
            <div className="ant-upload-text">上传头像</div>
          </Upload>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="用户名：">
          <p className="ant-form-text" id="userName" name="userName">wufengjie9@163.com</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="昵称：">
           <Input type="text" placeholder="昵称" />
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
          <DatePicker {...birthdayProps}  value="1990-01-01"/>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="选择地址：">
          <Cascader {...addressProps} options={address} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮编：">
           <Input type="text" placeholder="邮编" />
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

MeInfoForm = createForm()(MeInfoForm);

export default MeInfoForm;
