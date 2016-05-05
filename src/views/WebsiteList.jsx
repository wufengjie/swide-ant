
import React from "React";
import { Select, Radio, Checkbox, Button, DatePicker, InputNumber, Form, Cascader,Input,Upload,Icon ,Alert} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

let WebsiteAddForm = React.createClass({
  getInitialState() {
    return {
      hashchecked: false
    };
  },
  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true,
    });
  },

  hashCheck() {
    this.setState({ hashchecked: true });
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
        <FormItem
          {...formItemLayout}
          label="网站名称：">
           <Input type="text" placeholder="网站名称" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="网站域名：">
          <Input {...usernameProps} type="text" placeholder="请输入你的网站域名" />
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 7 }} >
          <Alert message="域名验证提示:"
              description="请将下面的hash代码保存到指定网址到文件后点击验证来确认是否能够与平台相连接。"
              type="info"
              showIcon />


        </FormItem>

        <FormItem
          {...formItemLayout}
          label="验证地址：">
          <a href="http://www/rootbat.txt" target="_blank">http://www/rootbat.txt</a>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="HashCode：">
          <code>04b77005dba997c3242e726d8a62d950ba1f2544</code>
          <div>
            <Button type="ghost" loading={this.state.hashchecked} onClick={this.hashCheck}>
              <Icon type="check" /> 去验证
          </Button>
          </div>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="网站描述：">
          <Input {...signatureProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
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

WebsiteAddForm = createForm()(WebsiteAddForm);

export default WebsiteAddForm;
