import React from "react";
import {connect} from 'react-redux';
import {
    Select,
    Radio,
    Checkbox,
    Button,
    DatePicker,
    InputNumber,
    Form,
    Cascader,
    Input,
    Upload,
    Icon,
    Alert
} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

let WebsiteAddForm = React.createClass({
    getInitialState() {
        return {
            hashchecked: false,
            checkurl: '请输入网站域名',
            hashcode: '请输入网站域名',
            showalert: false,
            alerttype: 'info',
            alertmsg: '请将上面的hash代码保存到指定网址到文件后点击验证来确认是否能够与平台相连接。',
            checking: false
        };
    },

    hashCheck() {
        let _this = this;
        var obj = this.props.form.getFieldsValue();
        this.setState({
            checking: true
        })
        $.ajax({
            url: this.props.data.prefix + "/api/me/checkuri",
            type: "post",
            dataType: "json",
            data: {
                domain: obj.domain
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                //$btn.button('reset');
                // if (data.code == 0) {
                //     $("#domainAccess").addClass('panel-success');
                //     $("#domainAccess").removeClass('panel-danger');
                //     $('#accessTip').html("(验证成功，请继续填写表单并保存)")
                // }else{
                //     $("#domainAccess").addClass('panel-danger');
                //     $("#domainAccess").removeClass('panel-success');
                //     $('#accessTip').html("(验证不通过,请确认 <a  target='_blank'  href="+remote+">" + remote +"</a> 可以访问，且验证码准确)")
                // }
                //console.log(data);
                if( data.code == 0 ){
                    alert('验证成功')
                    _this.setState({
                        hashchecked: true
                    })
                }
                else{
                    _this.setState({
                        showalert: true,
                        alerttype: 'error',
                        alertmsg: '验证失败'
                    })
                }
            },
            complete: function(){
                _this.setState({
                    checking: false
                })
            }
        })
        //this.setState({hashchecked: true});
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        let _this = this;
        this.props.form.validateFieldsAndScroll(function(errors, values){
            if( !!errors ){
                alert('请完成表单');
                return;
            }
            console.log(values);
            if( !_this.state.hashchecked ){
                alert('请先验证站点');
                return;
            }

            $.ajax({
                url: _this.props.data.prefix + "/api/me/website/add",
                type: "post",
                dataType: "json",
                data: {
                    name: values.name,
                    domain: values.domain,
                    desc: values.desc
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if ( data.code === 0 ){
                        alert('操作成功');
                        //window.location.href = '/me/website/list';
                    }else{
                        alert(data.message);
                    }
                }
            })
        });
        
    },

    getHashCode() {
        var obj = this.props.form.getFieldsValue();
        var _this = this;
        if( obj.domain ){
            $.ajax({
                url: this.props.data.prefix + "/api/me/encodeuri",
                type: "post",
                dataType: "json",
                data: {
                    domain: obj.domain
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data.code == 0) {
                        _this.setState({
                            checkurl: data.result.url,
                            hashcode: data.result.hash,
                            showalert: true,
                            alerttype: 'info',
                            alertmsg: '请将上面的hash代码保存到指定网址到文件后点击验证来确认是否能够与平台相连接'
                        });
                        
                        // $("#domainAccess").removeClass('panel-danger');
                        // $("#domainAccess").removeClass('panel-success');
                        // $('#accessTip').html('');
                        // $("#addCode").html(data.result.hash);
                        // remote = data.result.url;
                        // $('#url').html(data.result.url);
                        // $("#domainAccess").removeClass('hidden');
                    }
                },
                error:function(err){

                }
            })
        }
    },

    render() {
        let _this = this;
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 12}
        };

        const domainProps = getFieldProps('domain', {
            rules: [
                {required: true, message: '请填入有效的域名'}
            ],
            initialValue: ''
        });

        const nameProps = getFieldProps('name', {
            rules: [
                {required: true, message: '请填入有效的站点名'}
            ],
            initialValue: ''
        });

        const descProps = getFieldProps('desc', {
            rules: [
                {required: true, message: '请填入有效的站点描述'}
            ],
            initialValue: ''
        });


        return (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label="网站名称：">
                    <Input type="text" {...nameProps} placeholder="网站名称"/>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="网站域名：">
                    <Input type="text" {...domainProps} placeholder="请输入你的网站域名" onBlur={this.getHashCode}/>
                </FormItem>
                
                {function(){
                    if( _this.state.hashcode !== '请输入网站域名' ){
                        return (
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="验证地址：">
                                    <a href="http://www/rootbat.txt" target="_blank">{_this.state.checkurl}</a>
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="HashCode：">
                                    <code>{_this.state.hashcode}</code>
                                    <div>
                                        <Button type="ghost" loading={_this.state.checking} onClick={_this.hashCheck}>
                                            <Icon type="check"/> 去验证
                                        </Button>
                                    </div>
                                </FormItem>

                                <FormItem
                                    wrapperCol={{ span: 12, offset: 7 }}>
                                    {function(){
                                        if( _this.state.showalert ){
                                            return <Alert message="域名验证提示:"
                                                          description={_this.state.alertmsg}
                                                          type={_this.state.type}
                                                          showIcon/>
                                        }
                                    }()}
                                </FormItem>
                            </div>
                        )
                    }
                }()}

                

                <FormItem
                    {...formItemLayout}
                    label="网站描述：">
                    <Input type="textarea" {...descProps} placeholder="随便写" id="textarea" name="textarea"/>
                </FormItem>

                <FormItem
                    wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="ghost" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    },
});

WebsiteAddForm = createForm()(WebsiteAddForm);

function select(state) {
    return {
        data: state
    }
}

export default connect(select)(WebsiteAddForm);