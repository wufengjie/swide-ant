import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const ResetPassword = React.createClass({
    submit() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if( !!errors ){
                if( errors.origin_password ){
                    alert(errors.origin_password.errors[0].message);
                }
                else if( errors.new_password ){
                    alert(errors.new_password.errors[0].message);
                }
                else {
                    alert(errors.confirm_password.errors[0].message);
                }
                return;
            }
            if( values.new_password !== values.confirm_password ){
                alert('两次密码不一样');
                return;
            }
            
            $.ajax({
                url: this.props.data.prefix + '/api/me/user/' + this.props.data.userInfo.user_openid + '/password',
                method: 'POST',
                data: {
                    oldpassword: values.origin_password,
                    newpassword: values.new_password
                },
                xhrFields: {
                    withCredentials: true
                }
            }).then((data) => {
                if( data.code == 0 ){
                    alert('修改成功');
                    location.href = '/page/login';
                }
                else {
                    alert( data.message );
                }
            }, (err) => {
                alert(err.message);
            });
        });
    },

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 }
        };

        const originPasswordProps = getFieldProps('origin_password', {
            rules: [
                {required: true, message: '请输入当前的登录密码'}
            ],
            initialValue: ''
        });

        let originPasswordFormItem = <FormItem
            {...formItemLayout}
            label="原始密码：">
            <Input type="password" {...originPasswordProps} placeholder="原始密码"/>
        </FormItem>;
        
        const newPasswordProps = getFieldProps('new_password', {
            rules: [
                {required: true, message: '请输入新密码'}
            ],
            initialValue: ''
        });

        let newPasswordFormItem = <FormItem
            {...formItemLayout}
            label="新密码：">
            <Input type="password" {...newPasswordProps} placeholder="新密码"/>
        </FormItem>;

        const confirmPasswordProps = getFieldProps('confirm_password', {
            rules: [
                {required: true, message: '请输入确认密码'}
            ],
            initialValue: ''
        });

        let confirmPasswordFormItem = <FormItem
            {...formItemLayout}
            label="确认密码：">
            <Input type="password" {...confirmPasswordProps} placeholder="确认密码"/>
        </FormItem>;

        return (
            <Form horizontal>
                {originPasswordFormItem}
                {newPasswordFormItem}
                {confirmPasswordFormItem}

                <FormItem
                    wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.submit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
});

let resetForm = Form.create({})(ResetPassword);

function select(state) {
    return {data: state}
}

export default connect(select)(resetForm);