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

let WebsiteList = React.createClass({
    getInitialState() {
        return {
            list: []
        };
    },
    componentDidMount() {
        var _this = this;
        $.ajax({
            url: this.props.data.prefix + '/api/me/website/list',
            xhrFields: {
                withCredentials: true
            }
        }).then(function(data){
            _this.setState({
                list: data.result
            })
        }, function(){

        })
    },

    hashCheck() {
        this.setState({hashchecked: true});
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
        return (
            <div className="website-list">
                {this.state.list.map(function(item){
                    return <div className="website-box" key={item.terminal_key}>
                        <div className="website-box-content">
                            <p className="website-box-content-title">{item.website_title}</p>
                            <p>AK:&emsp;{item.terminal_key}</p>
                            <p>AS:&emsp;{item.terminal_token}</p>
                            <p className="website-box-content-domain">{item.website_domain}</p>
                            <div className="website-box-content-icon">
                                <Icon type="edit" />
                                <Icon type="delete" />
                            </div>
                        </div>
                        <div className="website-box-foot">
                            <div className="website-box-foot-title">
                                描述
                            </div>
                            <p>{item.website_desc}</p>
                        </div>
                    </div>
                })}

            </div>
        );
    }
});

function select(state) {
    return {
        data: state
    }
}

export default connect(select)(WebsiteList);