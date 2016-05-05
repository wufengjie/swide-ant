
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

  hashCheck() {
    this.setState({ hashchecked: true });
  },

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
      console.log('Submit!!!');
      console.log(values);
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
          <Input  type="text" placeholder="请输入你的网站域名" />
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
          <Input type="textarea" placeholder="随便写" id="textarea" name="textarea" />
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
